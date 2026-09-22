"use strict";

process.env.TZ = "UTC";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const corpusPath = path.join(__dirname, "contracts", "expressions.json");
const corpus = JSON.parse(fs.readFileSync(corpusPath, "utf8"), revive);
const matrixPath = path.join(__dirname, "contracts", "function-matrix.json");
const variables = require("./variables.json");

function revive(key, value) {
  if (value && value.$date) return new Date(`${value.$date}T00:00:00.000Z`);
  return value;
}

function normalize(value, seen = new WeakSet()) {
  if (value === undefined) return { $type: "undefined" };
  if (typeof value === "number" && Number.isNaN(value)) return { $type: "nan" };
  if (value === Infinity) return { $type: "infinity", sign: 1 };
  if (value === -Infinity) return { $type: "infinity", sign: -1 };
  if (Object.is(value, -0)) return { $type: "number", value: "-0" };
  if (value instanceof Date) return { $date: value.toISOString().slice(0, 10) };
  if (typeof value === "function") return { $type: "function" };
  if (value instanceof Error) {
    return { $type: "error", name: value.name, message: value.message };
  }
  if (Array.isArray(value)) {
    if (seen.has(value)) return { $type: "circular" };
    seen.add(value);
    try {
      return value.map((item) => normalize(item, seen));
    } finally {
      seen.delete(value);
    }
  }
  if (value && typeof value === "object") {
    if (seen.has(value)) return { $type: "circular" };
    seen.add(value);
    try {
      const output = {};
      Object.keys(value).sort().forEach((key) => {
        output[key] = normalize(value[key], seen);
      });
      return output;
    } finally {
      seen.delete(value);
    }
  }
  return value;
}

function isPlainObject(value) {
  if (!value || Object.prototype.toString.call(value) !== "[object Object]") return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function normalizeLocalScriptSource(source) {
  const trimmed = source.trim();
  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(trimmed)) return null;
  return path.posix.basename(path.posix.normalize(trimmed.replace(/[?#].*$/, "")));
}

function extractLocalScriptSources(html) {
  const scriptSources = [];
  const scriptTagPattern = /<script\b[^>]*\bsrc\s*=\s*(?:(["'])(.*?)\1|([^\s"'=<>`]+))[^>]*>/gi;
  let match;
  while ((match = scriptTagPattern.exec(html)) !== null) {
    const normalized = normalizeLocalScriptSource(match[2] || match[3]);
    if (normalized) scriptSources.push(normalized);
  }
  return scriptSources;
}

function loadMatrix() {
  if (!fs.existsSync(matrixPath)) return null;
  return JSON.parse(fs.readFileSync(matrixPath, "utf8"), revive);
}

function loadAdapter(moduleName) {
  if (!moduleName || moduleName === "legacy") return createLegacyAdapter();

  const candidate = require(path.resolve(moduleName));
  const factory = candidate.createContractAdapter || candidate.default || candidate;
  const adapter = typeof factory === "function" ? factory({ variables }) : factory;
  if (!adapter || typeof adapter.invoke !== "function") {
    throw new Error(`${moduleName} must export an adapter with invoke(name, args, configure)`);
  }
  return adapter;
}

function createLegacyAdapter() {
  require("coffee-script/register");
  const runtime = require("../runtime");
  require("../functions");

  function reset(configure) {
    global.RESETCONFIG();
    global.CONFIGURE(variables);
    runtime.form = variables.form;
    runtime.values = variables.values.form_values;
    runtime.prepare();
    runtime.setupValues();
    global.CONFIGURE(configure || {});
    runtime.resetResults();
    runtime.isCalculation = false;
  }

  reset();
  return {
    invoke(name, args, configure) {
      reset(configure);
      if (typeof global[name] !== "function") throw new Error(`Unknown expression function: ${name}`);
      try {
        const value = global[name].apply(null, args);
        return { value, results: runtime.results };
      } catch (error) {
        return { error, results: runtime.results };
      }
    },
    lifecycle() {
      reset();
      return {
        runtimeGlobals: ["$$runtime", "$$prepare", "$$evaluate", "$$trigger", "$$finishAsync"]
          .every((name) => Object.prototype.hasOwnProperty.call(global, name)),
        functionGlobals: ["ARRAY", "CONFIGURE", "RESETCONFIG", "SETVALUE", "GEOMETRYPOINT"]
          .every((name) => typeof global[name] === "function"),
      };
    },
  };
}

function assertPackageContracts() {
  const packageJson = require("../package.json");
  assert.strictEqual(packageJson.name, corpus.package.name);
  assert.strictEqual(packageJson.main, corpus.package.main);

  const html = fs.readFileSync(path.join(__dirname, "..", "expressions.html"), "utf8");
  const scriptNames = extractLocalScriptSources(html);
  assert.deepStrictEqual(scriptNames, corpus.package.browserScripts);
  assert.ok(fs.readFileSync(path.join(__dirname, "..", "expressions-proxy.coffee"), "utf8")
    .includes("finishAsyncCallback"));
}

function run(adapter, compareAdapter, activeCorpus = corpus) {
  assertPackageContracts();
  const lifecycle = adapter.lifecycle ? adapter.lifecycle() : null;
  if (lifecycle) assert.deepStrictEqual(lifecycle, { runtimeGlobals: true, functionGlobals: true });

  let count = 0;
  activeCorpus.cases.forEach((contract) => {
    const actual = invokeAdapter(adapter, contract);
    const observed = contract.observe === "results" ? actual.results : actual.error || actual.value;
    const normalized = normalize(observed);
    assertContract(contract, observed, normalized);
    if (compareAdapter) {
      const candidate = invokeAdapter(compareAdapter, contract);
      const candidateObserved = contract.observe === "results"
        ? candidate.results
        : candidate.error || candidate.value;
      const candidateNormalized = normalize(candidateObserved);
      assertContract(contract, candidateObserved, candidateNormalized);
      if (!contract.expectedType) {
        assert.deepStrictEqual(candidateNormalized, normalized, contract.id);
      }
    }
    count += 1;
  });
  return count;
}

function invokeAdapter(adapter, contract) {
  try {
    return adapter.invoke(contract.function, contract.args, contract.configure);
  } catch (error) {
    return { error, results: [] };
  }
}

function assertContract(contract, observed, normalized) {
  if (contract.expectedType) {
      assert.strictEqual(typeof observed, contract.expectedType, contract.id);
  } else if (contract.expected && contract.expected.$type === "object") {
      assert.ok(isPlainObject(observed), contract.id);
  } else {
      assert.deepStrictEqual(normalized, normalize(contract.expected), contract.id);
  }
}

function optionValue(option) {
  const index = process.argv.indexOf(option);
  if (index < 0) return null;
  const value = process.argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${option} requires a value`);
  }
  return value;
}

if (require.main === module) {
  const candidate = optionValue("--runtime");
  const compare = optionValue("--compare");
  const adapter = loadAdapter(candidate || "legacy");
  const compareAdapter = compare ? loadAdapter(compare) : null;
  const count = run(adapter, compareAdapter);
  const matrix = loadMatrix();
  const matrixCount = matrix ? run(adapter, compareAdapter, matrix) : 0;
  if (matrix) {
    const expectedCases = (matrix.coverage.functions - matrix.limitations.length) * matrix.coverage.probesPerFunction;
    assert.strictEqual(matrix.cases.length, expectedCases, "function matrix coverage metadata");
  }
  console.log(`Contract suite passed: ${count + matrixCount} cases (${count} baseline, ${matrixCount} function matrix)`);
}

module.exports = {
  createLegacyAdapter,
  extractLocalScriptSources,
  loadAdapter,
  loadMatrix,
  isPlainObject,
  normalizeLocalScriptSource,
  normalize,
  run,
  revive,
};

"use strict";

process.env.TZ = "UTC";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const createRuntimeAdapter = require("./runtime-adapter");

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
  if (Object.prototype.toString.call(value) === "[object Date]") {
    if (Number.isNaN(value.getTime())) return { $type: "invalid-date" };
    return { $date: value.toISOString().slice(0, 10) };
  }
  if (typeof value === "function") return { $type: "function" };
  if (value instanceof Error || Object.prototype.toString.call(value) === "[object Error]") {
    return { $type: "error", name: value.name, message: value.message };
  }
  if (Array.isArray(value)) {
    if (seen.has(value)) return { $type: "circular" };
    seen.add(value);
    try {
      return Array.from(value, (item) => normalize(item, seen));
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
  return prototype === Object.prototype
    || prototype === null
    || Object.getPrototypeOf(prototype) === null
      && Object.prototype.hasOwnProperty.call(prototype, "constructor")
      && prototype.constructor.name === "Object";
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
  if (moduleName === "hybrid") return createHybridAdapter();

  const candidate = require(path.resolve(moduleName));
  const factory = candidate.createContractAdapter || candidate.default || candidate;
  const adapter = typeof factory === "function" ? factory({ variables }) : factory;
  if (!adapter || typeof adapter.invoke !== "function") {
    throw new Error(`${moduleName} must export an adapter with invoke(name, args, configure)`);
  }
  return adapter;
}

function createLegacyAdapter() {
  const bundlePath = path.join(__dirname, "..", "dist", "legacy", "expressions.js");
  if (fs.existsSync(bundlePath)) return createBundledAdapter(bundlePath, "Legacy");

  require("coffee-script/register");
  const runtime = require("../runtime");
  require("../functions");

  return createRuntimeAdapter(global, runtime);
}

function createHybridAdapter() {
  const bundlePath = path.join(__dirname, "..", "dist", "hybrid", "expressions.js");
  return createBundledAdapter(bundlePath, "Hybrid");
}

function createBundledAdapter(bundlePath, channelName) {
  if (!fs.existsSync(bundlePath)) {
    throw new Error(`${channelName} expression bundle is missing: ${bundlePath}`);
  }

  const scope = vm.createContext({ console });
  vm.runInContext(fs.readFileSync(bundlePath, "utf8"), scope, { filename: bundlePath });
  if (!scope.$$runtime) {
    throw new Error(`${channelName} expression bundle did not initialize its runtime`);
  }

  return createRuntimeAdapter(scope, scope.$$runtime);
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

function run(adapter, compareAdapter, activeCorpus = corpus, groupReport = null) {
  let count = 0;
  const groupCounts = groupReport && groupReport.counts;
  activeCorpus.cases.forEach((contract) => {
    const label = `${contract.function || "unknown"} (${contract.id})`;
    try {
      const actual = invokeAdapter(adapter, contract);
      if (contract.observe === "results") {
        assert.strictEqual(actual.error, undefined, `${label}: side-effect invocation threw`);
      }
      const observed = contract.observe === "results" ? actual.results : actual.error || actual.value;
      const normalized = normalize(observed);
      assertContract(contract, observed, normalized, label);
      if (compareAdapter) {
        const candidate = invokeAdapter(compareAdapter, contract);
        if (contract.observe === "results") {
          assert.strictEqual(candidate.error, undefined, `${label}: candidate invocation threw`);
        }
        const candidateObserved = contract.observe === "results"
          ? candidate.results
          : candidate.error || candidate.value;
        const candidateNormalized = normalize(candidateObserved);
        assertContract(contract, candidateObserved, candidateNormalized, label);
        if (contract.limitation !== "volatile-result") {
          assert.deepStrictEqual(candidateNormalized, normalized, `${label}: legacy differential`);
        }
      }
      if (groupCounts) {
        const functionName = contract.function || "unknown";
        groupCounts[functionName] = (groupCounts[functionName] || 0) + 1;
      }
      count += 1;
    } catch (error) {
      if (groupReport) {
        console.error(
          `[${groupReport.channel}] ${contract.function || "unknown"}: FAIL (${contract.id}): ${error.message}`
        );
      }
      throw error;
    }
  });
  return count;
}

function assertAdapterContracts(adapter) {
  assertPackageContracts();
  const lifecycle = adapter.lifecycle ? adapter.lifecycle() : null;
  if (lifecycle) assert.deepStrictEqual(lifecycle, { runtimeGlobals: true, functionGlobals: true });
}

function invokeAdapter(adapter, contract) {
  try {
    return adapter.invoke(contract.function, contract.args, contract.configure);
  } catch (error) {
    return { error, results: [] };
  }
}

function assertContract(contract, observed, normalized, label = contract.id) {
  if (contract.expectedType) {
    assert.strictEqual(typeof observed, contract.expectedType, label);
    if (contract.expectedType === "number" && contract.finite) {
      assert.ok(Number.isFinite(observed), `${label}: expected a finite number`);
    }
  } else if (contract.expected && contract.expected.$type === "object") {
    assert.ok(isPlainObject(observed), label);
  } else {
    assert.deepStrictEqual(normalized, normalize(contract.expected), label);
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
  const requireMatrix = process.argv.includes("--require-matrix");
  const adapter = loadAdapter(candidate || "legacy");
  const compareAdapter = compare ? loadAdapter(compare) : null;
  const groupReport = process.argv.includes("--report-groups")
    ? { channel: candidate || "legacy", counts: {} }
    : null;
  assertAdapterContracts(adapter);
  if (compareAdapter) assertAdapterContracts(compareAdapter);
  const count = run(adapter, compareAdapter, corpus, groupReport);
  const matrix = loadMatrix();
  if (requireMatrix && !matrix) {
    throw new Error("Contract matrix is required but test/contracts/function-matrix.json is missing");
  }
  const matrixCount = matrix ? run(adapter, compareAdapter, matrix, groupReport) : 0;
  if (matrix) {
    assert.strictEqual(matrix.cases.length, matrix.coverage.cases, "function matrix coverage metadata");
  }
  if (groupReport) {
    const groupCounts = groupReport.counts;
    Object.keys(groupCounts).sort().forEach((functionName) => {
      console.log(`[${groupReport.channel}] ${functionName}: PASS (${groupCounts[functionName]} cases)`);
    });
  }
  console.log(`Contract suite passed: ${count + matrixCount} cases (${count} baseline, ${matrixCount} function matrix)`);
}

module.exports = {
  createLegacyAdapter,
  createHybridAdapter,
  extractLocalScriptSources,
  loadAdapter,
  loadMatrix,
  isPlainObject,
  normalizeLocalScriptSource,
  normalize,
  run,
  revive,
};

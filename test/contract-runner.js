"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const corpusPath = path.join(__dirname, "contracts", "expressions.json");
const corpus = JSON.parse(fs.readFileSync(corpusPath, "utf8"), revive);
const variables = require("./variables.json");

function revive(key, value) {
  if (value && value.$date) return new Date(`${value.$date}T00:00:00.000Z`);
  return value;
}

function normalize(value) {
  if (value === undefined) return { $type: "undefined" };
  if (typeof value === "number" && Number.isNaN(value)) return { $type: "nan" };
  if (value instanceof Date) return { $date: value.toISOString().slice(0, 10) };
  if (typeof value === "function") return { $type: "function" };
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === "object") {
    const output = {};
    Object.keys(value).sort().forEach((key) => {
      output[key] = normalize(value[key]);
    });
    return output;
  }
  return value;
}

function loadAdapter(moduleName) {
  if (!moduleName || moduleName === "legacy") return createLegacyAdapter();

  const candidate = require(path.resolve(moduleName));
  const factory = candidate.createContractAdapter || candidate.default || candidate;
  const adapter = typeof factory === "function" ? factory({ variables }) : factory;
  if (!adapter || typeof adapter.invoke !== "function") {
    throw new Error(`${moduleName} must export an adapter with invoke(name, args)`);
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
    runtime.results = [];
    runtime.isCalculation = false;
  }

  reset();
  return {
    invoke(name, args, configure) {
      reset(configure);
      if (typeof global[name] !== "function") throw new Error(`Unknown expression function: ${name}`);
      const value = global[name].apply(null, args);
      return { value, results: runtime.results };
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
  const scriptNames = [...html.matchAll(/<script src=["']([^"']+)["']/g)]
    .map((match) => match[1])
    .filter((name) => !name.startsWith("http"));
  assert.deepStrictEqual(scriptNames, corpus.package.browserScripts);
  assert.ok(fs.readFileSync(path.join(__dirname, "..", "expressions-proxy.coffee"), "utf8")
    .includes("finishAsyncCallback"));
}

function run(adapter, compareAdapter) {
  assertPackageContracts();
  const lifecycle = adapter.lifecycle ? adapter.lifecycle() : null;
  if (lifecycle) assert.deepStrictEqual(lifecycle, { runtimeGlobals: true, functionGlobals: true });

  let count = 0;
  corpus.cases.forEach((contract) => {
    const actual = adapter.invoke(contract.function, contract.args, contract.configure);
    const observed = contract.observe === "results" ? actual.results : actual.value;
    const normalized = normalize(observed);
    if (compareAdapter) {
      const candidate = compareAdapter.invoke(contract.function, contract.args, contract.configure);
      const candidateObserved = contract.observe === "results" ? candidate.results : candidate.value;
      assert.deepStrictEqual(normalize(candidateObserved), normalized, contract.id);
    } else if (contract.expected && contract.expected.$type === "object") {
      assert.strictEqual(typeof observed, "object", contract.id);
      assert.ok(observed !== null, contract.id);
    } else {
      assert.deepStrictEqual(normalized, normalize(contract.expected), contract.id);
    }
    count += 1;
  });
  return count;
}

const runtimeIndex = process.argv.indexOf("--runtime");
const compareIndex = process.argv.indexOf("--compare");
const candidate = runtimeIndex >= 0 ? process.argv[runtimeIndex + 1] : null;
const compare = compareIndex >= 0 ? process.argv[compareIndex + 1] : null;
const count = run(loadAdapter(candidate || "legacy"), compare ? loadAdapter(compare) : null);
console.log(`Contract suite passed: ${count} cases`);

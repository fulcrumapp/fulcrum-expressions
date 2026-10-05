"use strict";

const assert = require("assert");
const { spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  createLegacyAdapter,
  createHybridAdapter,
  assertAdapterContracts,
  extractLocalScriptSources,
  isPlainObject,
  normalize,
  normalizeLocalScriptSource,
  run,
} = require("./contract-runner");
const applyFunctionOverrides = require("../migration/apply-function-overrides");
const createRuntimeAdapter = require("./runtime-adapter");

assert.strictEqual(process.env.TZ, "UTC");
assert.strictEqual(normalizeLocalScriptSource("./expressions.js?v=1#runtime"), "expressions.js");
assert.strictEqual(normalizeLocalScriptSource("/sandbox/expressions-proxy.js#v1"), "expressions-proxy.js");
assert.strictEqual(normalizeLocalScriptSource("//cdn.example.com/library.js"), null);
assert.strictEqual(normalizeLocalScriptSource("https://cdn.example.com/library.js"), null);
assert.deepStrictEqual(extractLocalScriptSources(`
  <script type="text/javascript" src = "./expressions.js?v=1"></script>
  <script defer src='expressions-proxy.js#runtime'></script>
  <script async src=expressions.js></script>
  <script src="//cdn.example.com/library.js"></script>
`), ["expressions.js", "expressions-proxy.js", "expressions.js"]);

assert.strictEqual(isPlainObject({}), true);
assert.strictEqual(isPlainObject(Object.create(null)), true);
assert.strictEqual(isPlainObject([]), false);
assert.strictEqual(isPlainObject(new Date()), false);
assert.strictEqual(isPlainObject(null), false);
assert.deepStrictEqual(normalize(new Date(NaN)), { $type: "invalid-date" });
assert.deepStrictEqual(normalize(new Error("boom")), {
  $type: "error",
  name: "Error",
  message: "boom",
});
assert.deepStrictEqual(normalize("thrown"), "thrown");

const adapter = createLegacyAdapter();
const alertResult = adapter.invoke("ALERT", ["first"]);
assert.deepStrictEqual(Object.keys(alertResult).sort(), ["results", "value"]);
assert.deepStrictEqual(normalize(alertResult.results), [
  { type: "message", title: null, message: "first" },
]);
const openResult = adapter.invoke("OPENURL", ["https://example.com"]);
assert.deepStrictEqual(Object.keys(openResult).sort(), ["results", "value"]);
assert.deepStrictEqual(normalize(openResult.results), [
  { type: "open", value: "\"https://example.com\"" },
]);
assert.strictEqual(adapter.invoke("DATE", [2020, 1, 2]).value.toISOString(), "2020-01-02T00:00:00.000Z");
assert.deepStrictEqual(adapter.lifecycle(), { runtimeGlobals: true, functionGlobals: true });
assert.throws(
  () => assertAdapterContracts({ invoke() {} }),
  /Runtime adapter must provide lifecycle/
);

let appliedConfiguration;
const fakeRuntime = {
  results: ["result"],
  form: {},
  values: {},
  prepare() {},
  setupValues() {},
  resetResults() {},
  isCalculation: false,
};
const fakeScope = {
  RESETCONFIG() {},
  CONFIGURE(configure) {
    appliedConfiguration = configure;
  },
  TEST() {
    throw new Error("adapter test");
  },
};
const contractAdapter = createRuntimeAdapter(fakeScope, fakeRuntime);
assert.deepStrictEqual(contractAdapter.invoke("TEST", [], { locale: "en" }), {
  error: new Error("adapter test"),
  results: ["result"],
});
assert.deepStrictEqual(appliedConfiguration, { locale: "en" });
assert.throws(() => contractAdapter.invoke("MISSING", []), /Unknown expression function: MISSING/);
assert.deepStrictEqual(contractAdapter.lifecycle(), { runtimeGlobals: false, functionGlobals: false });

const legacyFunction = () => "legacy";
const fallbackFunction = () => "fallback";
const functions = { REPLACE: legacyFunction, FALLBACK: fallbackFunction };
const replacementFunction = () => "typescript";
assert.strictEqual(applyFunctionOverrides(functions, { REPLACE: replacementFunction }), functions);
assert.strictEqual(functions.REPLACE(), "typescript");
assert.strictEqual(functions.FALLBACK(), "fallback");
assert.throws(
  () => applyFunctionOverrides({}, { MISSING: replacementFunction }),
  /no matching CoffeeScript function: MISSING/
);
assert.throws(
  () => applyFunctionOverrides({ INVALID: legacyFunction }, { INVALID: "not a function" }),
  /override must be a function: INVALID/
);

const overrideFixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "expression-overrides-"));
try {
  const fixturePath = path.join(overrideFixtureRoot, "function-overrides.ts");
  const outputPath = path.join(overrideFixtureRoot, "compiled");
  const typeRootsPath = path.join(overrideFixtureRoot, "types");
  fs.mkdirSync(outputPath);
  fs.mkdirSync(typeRootsPath);
  fs.writeFileSync(fixturePath, [
    "type ExpressionFunction = (...args: never[]) => unknown;",
    "const functionOverrides: Readonly<Record<string, ExpressionFunction>> = Object.freeze({",
    "  REPLACE: () => \"typescript\",",
    "});",
    "export { functionOverrides };",
    "",
  ].join("\n"));
  const compileResult = spawnSync(process.execPath, [
    path.join(__dirname, "..", "node_modules", "typescript", "bin", "tsc"),
    fixturePath,
    "--strict",
    "--noEmitOnError",
    "--target", "ES5",
    "--lib", "ES2015",
    "--module", "commonjs",
    "--typeRoots", typeRootsPath,
    "--outDir", outputPath,
  ], { cwd: path.join(__dirname, ".."), encoding: "utf8" });
  assert.strictEqual(
    compileResult.status,
    0,
    `strict TypeScript override fixture failed to compile:\n${compileResult.stdout}${compileResult.stderr}`
  );
  const compiledOverrides = require(path.join(outputPath, "function-overrides.js")).functionOverrides;
  const hybridFunctions = { REPLACE: legacyFunction, FALLBACK: fallbackFunction };
  applyFunctionOverrides(hybridFunctions, compiledOverrides);
  assert.strictEqual(hybridFunctions.REPLACE(), "typescript");
  assert.strictEqual(hybridFunctions.FALLBACK(), "fallback");
} finally {
  fs.rmSync(overrideFixtureRoot, { recursive: true, force: true });
}

if (fs.existsSync(path.join(__dirname, "..", "dist", "hybrid", "expressions.js"))) {
  const hybridAdapter = createHybridAdapter();
  assert.deepStrictEqual(hybridAdapter.lifecycle(), { runtimeGlobals: true, functionGlobals: true });
  const legacyValue = adapter.invoke("ARRAY", [[1, [2, 3]]]).value;
  const hybridValue = hybridAdapter.invoke("ARRAY", [[1, [2, 3]]]).value;
  assert.deepStrictEqual(normalize(hybridValue), normalize(legacyValue));
}

const originalError = console.error;
let failureReport = "";
console.error = (message) => {
  failureReport = message;
};
try {
  assert.throws(() => run(
    { invoke: () => ({ value: 2, results: [] }) },
    { invoke: () => ({ value: 1, results: [] }) },
    { cases: [{ id: "abs-differential-failure", function: "ABS", args: [], expected: 2 }] },
    { channel: "hybrid", counts: {} }
  ), /ABS \(abs-differential-failure\)/);
  assert.match(failureReport, /^\[hybrid\] ABS: FAIL \(abs-differential-failure\):/);
  failureReport = "";
  assert.throws(() => run(
    { invoke: () => ({ value: { legacy: true }, results: [] }) },
    { invoke: () => ({ value: { hybrid: true }, results: [] }) },
    {
      cases: [{
        id: "storage-object-differential-failure",
        function: "STORAGE",
        args: [],
        expected: { $type: "object" },
      }],
    },
    { channel: "hybrid", counts: {} }
  ), /STORAGE \(storage-object-differential-failure\)/);
  assert.match(failureReport, /^\[hybrid\] STORAGE: FAIL \(storage-object-differential-failure\):/);
} finally {
  console.error = originalError;
}

console.log("Contract runner focused checks passed");

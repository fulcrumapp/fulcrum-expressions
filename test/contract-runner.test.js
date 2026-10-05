"use strict";

const assert = require("assert");
const {
  createLegacyAdapter,
  extractLocalScriptSources,
  isPlainObject,
  normalize,
  normalizeLocalScriptSource,
  run,
} = require("./contract-runner");
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
} finally {
  console.error = originalError;
}
assert.match(failureReport, /^\[hybrid\] ABS: FAIL \(abs-differential-failure\):/);

console.log("Contract runner focused checks passed");

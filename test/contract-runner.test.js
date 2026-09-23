"use strict";

const assert = require("assert");
const {
  createLegacyAdapter,
  extractLocalScriptSources,
  isPlainObject,
  normalize,
  normalizeLocalScriptSource,
} = require("./contract-runner");

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
assert.deepStrictEqual(adapter.invoke("ALERT", ["first"]).results, [
  { type: "message", title: null, message: "first" },
]);
assert.deepStrictEqual(adapter.invoke("OPENURL", ["https://example.com"]).results, [
  { type: "open", value: "\"https://example.com\"" },
]);
assert.strictEqual(adapter.invoke("DATE", [2020, 1, 2]).value.toISOString(), "2020-01-02T00:00:00.000Z");

console.log("Contract runner focused checks passed");

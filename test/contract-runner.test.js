"use strict";

const assert = require("assert");
const {
  createLegacyAdapter,
  isPlainObject,
  normalizeLocalScriptSource,
} = require("./contract-runner");

assert.strictEqual(normalizeLocalScriptSource("./expressions.js?v=1#runtime"), "expressions.js");
assert.strictEqual(normalizeLocalScriptSource("/sandbox/expressions-proxy.js#v1"), "expressions-proxy.js");
assert.strictEqual(normalizeLocalScriptSource("//cdn.example.com/library.js"), null);
assert.strictEqual(normalizeLocalScriptSource("https://cdn.example.com/library.js"), null);

assert.strictEqual(isPlainObject({}), true);
assert.strictEqual(isPlainObject(Object.create(null)), true);
assert.strictEqual(isPlainObject([]), false);
assert.strictEqual(isPlainObject(new Date()), false);
assert.strictEqual(isPlainObject(null), false);

const adapter = createLegacyAdapter();
assert.deepStrictEqual(adapter.invoke("ALERT", ["first"]).results, [
  { type: "message", title: null, message: "first" },
]);
assert.deepStrictEqual(adapter.invoke("OPENURL", ["https://example.com"]).results, [
  { type: "open", value: "\"https://example.com\"" },
]);

console.log("Contract runner focused checks passed");

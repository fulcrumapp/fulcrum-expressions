"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const CoffeeScript = require("coffee-script");

const marker = "__EXPRESSION_SANDBOX_ALLOWED_ORIGINS__";
const trustedOrigin = "https://trusted.example";
const source = fs.readFileSync(path.join(__dirname, "..", "expressions-proxy.coffee"), "utf8");

function createSandbox(origins) {
  const replies = [];
  const parent = { postMessage: (data, origin) => replies.push({ data: JSON.parse(data), origin }) };
  const window = {
    parent,
    addEventListener: (name, handler) => {
      assert.strictEqual(name, "message");
      window.onMessage = handler;
    },
  };
  const runtime = {};
  const context = {
    window,
    console: { log() {}, error() {} },
    require: (name) => {
      assert.strictEqual(name, "browser-request");
      return () => { throw new Error("Unexpected HTTP request"); };
    },
    $$runtime: runtime,
    $$prepare: () => {},
    $$evaluate: () => ["calculation"],
    $$trigger: () => ["event"],
    $$finishAsync: () => ["callback"],
  };
  let code = CoffeeScript.compile(source, { bare: true });
  if (origins !== undefined) code = code.replace(marker, origins.join(","));
  vm.runInNewContext(code, context);

  function send(message, overrides = {}) {
    window.onMessage({
      isTrusted: true,
      source: parent,
      origin: trustedOrigin,
      data: typeof message === "string" ? message : JSON.stringify(message),
      ...overrides,
    });
  }

  return { send, replies, runtime, window, parent };
}

{
  const sandbox = createSandbox([trustedOrigin]);
  const valid = { name: "prepare", id: "request-1", form: { elements: [] } };
  const rejected = [
    { origin: "https://untrusted.example" },
    { origin: "https://trusted.example.attacker.invalid" },
    { origin: "null" },
    { source: {} },
    { source: sandbox.window },
    { isTrusted: false },
  ];
  rejected.forEach((overrides) => sandbox.send(valid, overrides));
  ["not json", "null", "[]", JSON.stringify({ name: "respond" }),
    JSON.stringify({ name: "constructor" }), JSON.stringify({ name: "prepare", form: [] }),
    JSON.stringify({ name: "prepare", form: {} }),
    JSON.stringify({ name: "prepare", form: { elements: [null] } }),
    JSON.stringify({ name: "prepare", form: { elements: [], status_field: { choices: [null] } } }),
    JSON.stringify({ name: "prepare", form: { elements: [{ key: "__proto__" }] } }),
    JSON.stringify({ name: "prepare", form: { elements: [], status_field: { choices: [{ value: "__proto__" }] } } }),
    JSON.stringify({ name: "evaluate", extra: true }),
    JSON.stringify({ name: "globals", globals: { locale: {} } }),
    JSON.stringify({ name: "globals", globals: { evaluate: "overwritten" } }),
    '{"name":"values","customVariables":{"__proto__":{}}}',
    JSON.stringify({ name: "expressions", expressions: [{ expression: 1 }] }),
    JSON.stringify({ name: "httpRequest", options: { url: "https://example.com", proxy: "http://proxy" } }),
    JSON.stringify({ name: "httpRequest", options: { url: "https://example.com", headers: { host: "other.example" } } }),
    '{"name":"httpRequest","options":{"url":"https://example.com","qs":{"hasOwnProperty":"bad"}}}',
  ].forEach((message) => sandbox.send(message));
  assert.strictEqual(sandbox.replies.length, 0);
  assert.strictEqual(sandbox.runtime.form, undefined);
}

{
  const sandbox = createSandbox();
  sandbox.send({ name: "prepare", form: { elements: [] } });
  assert.strictEqual(sandbox.replies.length, 0, "missing trusted origins must fail closed");
}

{
  const sandbox = createSandbox([trustedOrigin]);
  sandbox.send({
    name: "prepare",
    form: {
      elements: [{ key: "constructor", data_name: "prototype" }],
      status_field: { choices: [{ value: "constructor" }] },
    },
  });
  sandbox.send({ name: "values", values: { constructor: "value" }, customVariables: { prototype: "value" } });
  assert.deepStrictEqual(sandbox.replies.map((reply) => reply.data.name), ["prepare", "values"]);
}

{
  const sandbox = createSandbox([trustedOrigin, "https://other.example"]);
  const commands = [
    { name: "globals", id: "1", globals: { locale: "en_US" } },
    { name: "prepare", id: "2", form: { elements: [] } },
    { name: "expressions", id: "3", expressions: [{ key: "key", dataName: "field", expression: "1" }] },
    { name: "values", id: "4", values: {}, customVariables: {}, featureVariables: { featureIsNew: true } },
    { name: "evaluate", id: "5" },
    { name: "triggerDataEvent", id: "6", event: { name: "load-record" } },
    { name: "finishAsyncCallback", id: "7", callbackID: 1, callbackArguments: null },
    { name: "evaluate", id: null },
    { name: "evaluate" },
  ];
  commands.forEach((message) => sandbox.send(message));
  assert.deepStrictEqual(sandbox.replies.map((reply) => reply.data.name), commands.map((command) => command.name));
  assert.deepStrictEqual(sandbox.replies.slice(0, -1).map((reply) => reply.data.id),
    commands.slice(0, -1).map((command) => command.id));
  assert.ok(sandbox.replies.every((reply) => reply.origin === trustedOrigin));
  assert.strictEqual(sandbox.runtime.locale, "en_US");
  sandbox.send({ name: "evaluate" }, { origin: "https://other.example" });
  assert.strictEqual(sandbox.replies.length, commands.length, "parent origin must remain bound to the session");
  sandbox.runtime.$$messageBox({ title: "Test" }, 42);
  assert.strictEqual(sandbox.replies.at(-1).data.functionName, "messageBox");
  assert.deepStrictEqual(sandbox.replies.at(-1).data.argumentList, [{ title: "Test" }, 42]);
}

console.log("Expression sandbox message validation checks passed.");

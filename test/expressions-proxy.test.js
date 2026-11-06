const assert = require("assert");
const fs = require("fs");
const vm = require("vm");
const coffee = require("coffee-script");
const trustedOrigins = require("../trusted-origins");

const source = coffee.compile(fs.readFileSync("expressions-proxy.coffee", "utf8"));
const origin = "https://web.example.com";

{
  const allowed = [origin, "http://localhost:3000", "http://127.0.0.1:3000", "http://[::1]:3000"];
  const result = trustedOrigins(allowed);
  assert.deepStrictEqual(result, allowed);
  assert.notStrictEqual(result, allowed);
  allowed.push("https://another.example.com");
  assert.strictEqual(result.length, 4);

  for (const invalid of [
    null, [], Array(1), [origin, null], [origin, "https://*.example.com"],
    ["https://user@web.example.com"], ["https://:password@web.example.com"],
    ["https://user:password@web.example.com"], ["https://web.example.com/"],
    ["https://web.example.com?query=1"], ["https://web.example.com:443"],
    ["HTTPS://web.example.com"], ["http://web.example.com"],
    ["http://localhost.example.com"], ["http://192.168.1.1"],
    ["file:///tmp/file"], ["null"],
  ]) {
    assert.deepStrictEqual(trustedOrigins(invalid), [], `invalid policy ${JSON.stringify(invalid)}`);
  }
}

function harness(policy = [origin], requestImpl) {
  const replies = [];
  const requests = [];
  const errors = [];
  const parent = { postMessage: (data, target) => replies.push({ data: JSON.parse(data), target }) };
  const runtime = { asyncCallbacks: {} };
  let listener;
  const window = {
    parent,
    EXPRESSION_SANDBOX_ALLOWED_ORIGINS: policy,
    addEventListener: (_, fn) => { listener = fn; },
  };
  const context = {
    window, URL, console: { log() {}, error: (...args) => errors.push(args) }, $$runtime: runtime,
    $$prepare: () => {},
    $$evaluate: () => [],
    $$trigger: () => [],
    $$finishAsync: () => [],
    require: (name) => name === "./trusted-origins"
      ? require("../trusted-origins")
      : requestImpl || ((options, callback) => requests.push({ options, callback })),
  };
  vm.runInNewContext(source, context);
  const send = (payload, sender = parent, from = origin, trusted = true) => listener({
    source: sender, origin: from, isTrusted: trusted,
    data: typeof payload === "string" ? payload : JSON.stringify(payload),
  });
  return { send, replies, requests, parent, runtime, context, errors };
}

{
  const h = harness();
  h.send({ name: "globals", globals: { locale: "injected" } }, h.parent, origin, false);
  assert.strictEqual(h.replies.length, 0);
  assert.strictEqual(h.runtime.locale, undefined);
  h.send({ name: "globals", globals: { locale: "en" } });
  assert.strictEqual(h.replies.length, 1);
}

for (const policy of [undefined, null, [], ["*"], ["https://*.example.com"],
  ["https://web.example.com/path"], ["null"], [origin, "bad"],
  ["http://web.example.com"], ["http://localhost.example.com"],
  ["http://192.168.1.1"], [origin, "http://preview.example.com"]]) {
  const h = harness(policy === undefined ? null : policy);
  h.send({ name: "globals", globals: { locale: "en" } });
  assert.strictEqual(h.replies.length, 0, `invalid policy ${JSON.stringify(policy)}`);
  assert.strictEqual(h.runtime.locale, undefined);
  assert.strictEqual(h.errors.length, 1, "invalid configuration must be visible");
}

for (const trusted of ["http://localhost:3000", "http://127.0.0.1:3000",
  "http://[::1]:3000", "https://preview.example.com"]) {
  const h = harness([trusted]);
  h.send({ name: "globals", globals: { locale: "en" } }, h.parent, trusted);
  assert.strictEqual(h.replies.length, 1, `trusted origin ${trusted}`);
  assert.strictEqual(h.replies[0].target, trusted);
}

{
  const h = harness(["https://*.example.com"]);
  h.send({ name: "globals", globals: { locale: "en" } }, h.parent, "https://*.example.com");
  assert.strictEqual(h.replies.length, 0);
}

{
  const h = harness();
  for (const [payload, sender, from] of [
    [{ name: "globals", globals: { locale: "evil" } }, {}, origin],
    [{ name: "globals", globals: { locale: "evil" } }, h.parent, "https://evil.example"],
    ["{", h.parent, origin],
    [{ name: "respond" }, h.parent, origin],
    [{ name: "constructor" }, h.parent, origin],
    [{ name: "__proto__" }, h.parent, origin],
    [{ name: "globals", globals: { evaluate: "evil" } }, h.parent, origin],
    [{ name: "values", values: {}, featureVariables: { prepare: "evil" } }, h.parent, origin],
    [{ name: "expressions", expressions: {} }, h.parent, origin],
    [{ name: "triggerDataEvent", event: null }, h.parent, origin],
    [{ name: "prepare", form: { elements: [null] } }, h.parent, origin],
    [{ name: "prepare", form: { elements: [], script: {} } }, h.parent, origin],
    [{ name: "prepare", form: { elements: [], status_field: { choices: [null] } } }, h.parent, origin],
    [{ name: "expressions", expressions: [{ key: "a", dataName: "a", expression: {} }] }, h.parent, origin],
    [{ name: "globals", globals: { locale: {} } }, h.parent, origin],
    [{ name: "values", values: {}, featureVariables: { featureIsNew: {} } }, h.parent, origin],
    ['{"name":"values","values":{},"customVariables":{"__proto__":{"polluted":true}}}', h.parent, origin],
    [{ name: "evaluate", id: null }, h.parent, origin],
    [{ name: "evaluate", globals: { locale: "evil" } }, h.parent, origin],
    [{ name: "httpRequest", options: { url: "https://example.com", proxy: "bad" } }, h.parent, origin],
    [{ name: "httpRequest", options: { url: 3, uri: "https://example.com" } }, h.parent, origin],
    [{ name: "finishAsyncCallback", callbackID: 1, callbackArguments: [] }, h.parent, origin],
  ]) h.send(payload, sender, from);
  assert.strictEqual(h.replies.length, 0);
  assert.deepStrictEqual(Object.keys(h.runtime), ["asyncCallbacks"]);
}

{
  const h = harness();
  h.send({ name: "prepare", form: { elements: [] } });
  h.context.$$trigger = () => {
    h.runtime.$$setTimeout(10, 4);
    return [];
  };
  h.send({ name: "triggerDataEvent", event: { name: "load-record" }, id: "original" });
  assert.strictEqual(h.replies[1].data.id, "original");
  assert.strictEqual(h.replies[1].data.functionName, "setTimeout");
  h.send({ name: "finishAsyncCallback", callbackID: 4, callbackArguments: null, id: 0 });
  assert.strictEqual(h.replies[3].data.name, "finishAsyncCallback");
  assert.strictEqual(h.replies[3].data.id, 0);
  h.send({ name: "finishAsyncCallback", callbackID: 4, callbackArguments: [], id: 3 });
  assert.strictEqual(h.replies.length, 4);
}

{
  const h = harness();
  h.send({ name: "prepare", form: { elements: [] }, id: "sandbox-1/1" });
  h.context.$$trigger = () => {
    h.runtime.$$setTimeout(1, h.runtime.nextCallback);
    return [];
  };
  h.runtime.nextCallback = 1;
  h.send({ name: "triggerDataEvent", event: { name: "change", field: "a" }, id: "sandbox-1/2" });
  h.runtime.nextCallback = 2;
  h.send({ name: "triggerDataEvent", event: { name: "change", field: "b" }, id: "sandbox-1/3" });
  h.context.$$finishAsync = () => {
    h.runtime.$$setTimeout(2, 3);
    return [];
  };
  const repliesBeforeRejectedCallback = h.replies.length;
  h.send({ name: "finishAsyncCallback", callbackID: 1, callbackArguments: [], id: "evil" },
    h.parent, "https://evil.example");
  assert.strictEqual(h.replies.length, repliesBeforeRejectedCallback);
  h.send({ name: "finishAsyncCallback", callbackID: 1, callbackArguments: null, id: "sandbox-1/4" });
  assert.strictEqual(h.replies[h.replies.length - 2].data.id, "sandbox-1/4");
  assert.strictEqual(h.replies[h.replies.length - 1].data.id, "sandbox-1/4");
}

{
  // Fulcrum editor and external contributions populate the same globals,
  // omitting undefined properties during JSON serialization.
  const globals = {
    language: "en-US", timeZone: "America/New_York", decimalSeparator: ".",
    groupingSeparator: ",", currencySymbol: null, currencyCode: null,
    country: null, deviceIdentifier: null, deviceModel: null,
    deviceManufacturer: null, platform: "Mac OS", platformVersion: "14",
    application: "Chrome", applicationVersion: "120", applicationBuild: "120",
  };
  const featureVariables = {
    userEmail: "editor@example.com", userFullName: "Example User", userRoleName: "Owner",
    recordID: null, recordStatus: null, recordClientCreatedAt: "", recordClientUpdatedAt: "",
    recordProject: null, recordProjectName: "", recordGeometry: null, recordAltitude: null,
    recordVerticalAccuracy: null, recordHorizontalAccuracy: null,
    recordCreatedLatitude: null, recordCreatedLongitude: null, recordCreatedAltitude: null,
    recordCreatedAccuracy: null, recordUpdatedLatitude: null, recordUpdatedLongitude: null,
    recordUpdatedAltitude: null, recordUpdatedAccuracy: null, recordCreatedDuration: null,
    recordUpdatedDuration: null, recordEditedDuration: null, repeatable: null, featureID: null,
    featureIndex: null, featureIsNew: true, featureCreatedAt: "", featureUpdatedAt: "",
    featureGeometry: { type: "Point", coordinates: [0, 0] },
    featureCreatedLatitude: null, featureCreatedLongitude: null, featureCreatedAltitude: null,
    featureCreatedAccuracy: null, featureUpdatedLatitude: null, featureUpdatedLongitude: null,
    featureUpdatedAltitude: null, featureUpdatedAccuracy: null, featureCreatedDuration: null,
    featureUpdatedDuration: null, featureEditedDuration: null, currentLocation: null,
  };
  for (const id of ["sandbox-1/1", 0]) {
    const h = harness();
    h.send({ name: "globals", globals, id });
    h.send({ name: "prepare", form: { elements: [], script: null, status_field: null }, id });
    h.send({ name: "values", values: { field: null }, customVariables: null,
      featureVariables: { ...featureVariables, ...(typeof id === "string" ? { recordVersion: 0 } : {}) }, id });
    h.send({ name: "expressions", expressions: [{ key: "field", dataName: "field", expression: "" }], id });
    h.send({ name: "triggerDataEvent", event: { name: "change", field: "field", value: null,
      errors: [{ field: "field", message: "Required" }], isValid: false, isDraft: false }, id });
    h.send({ name: "evaluate", id });
    assert.strictEqual(h.replies.length, 6);
    assert.ok(h.replies.every(reply => reply.data.id === id && reply.target === origin));
    assert.strictEqual(h.runtime.recordGeometry, null);
    assert.strictEqual(h.runtime.featureGeometry.coordinates[0], 0);
    assert.strictEqual(h.runtime.event.value, null);
  }
  const tester = harness();
  tester.send({ name: "prepare", form: { elements: [] } });
  tester.send({ name: "expressions", expressions: [{ key: "field", dataName: "field", expression: null }] });
  tester.send({ name: "values", values: null, customVariables: { "$field": "example" } });
  tester.send({ name: "evaluate" });
  assert.deepStrictEqual(tester.replies.map(reply => reply.data.name),
    ["prepare", "expressions", "values", "evaluate"]);
  assert.ok(tester.replies.every(reply => !Object.hasOwn(reply.data, "id")));
}

{
  const h = harness();
  h.send({ name: "prepare", form: { elements: [] }, id: "sandbox-1/1" });
  h.send({ name: "evaluate", id: "sandbox-1/2" });
  assert.throws(() => h.runtime.$$setTimeout(10, 12), /no authorized request context/i);
  assert.strictEqual(h.replies.length, 2);
}

{
  const h = harness();
  const valid = [
    { name: "prepare", form: { elements: [] }, id: "sandbox-1/1" },
    { name: "expressions", expressions: [{ key: "a", dataName: "a", expression: "1" }], id: 0 },
    { name: "values", values: null, customVariables: { x: 1 }, featureVariables: { featureIsNew: true } },
    { name: "globals", globals: { locale: "en_US", timeZone: null } },
    { name: "evaluate" },
    { name: "triggerDataEvent", event: { name: "load-record" } },
  ];
  valid.forEach(message => h.send(message));
  assert.strictEqual(h.replies.length, valid.length);
  assert.strictEqual(h.replies[0].data.id, "sandbox-1/1");
  assert.strictEqual(h.replies[1].data.id, 0);
  assert.strictEqual(Object.hasOwn(h.replies[2].data, "id"), false);
  assert.strictEqual(h.runtime.featureIsNew, true);
}

{
  const h = harness();
  h.send({ name: "httpRequest", options: { url: "https://example.com" }, id: 0 });
  h.send({ name: "httpRequest", options: { url: "https://example.org" }, id: "other" });
  h.send({ name: "globals", globals: { locale: "en" }, id: "later" });
  h.send({ name: "globals", globals: { locale: "evil" }, id: "invalid" }, {}, origin);
  h.requests[1].callback(null, { statusCode: 200 }, "other");
  h.requests[0].callback(null, { statusCode: 200 }, "ok");
  const response = h.replies[h.replies.length - 1];
  assert.strictEqual(response.data.id, 0);
  assert.strictEqual(response.target, origin);
  assert.strictEqual(h.replies[h.replies.length - 2].data.id, "other");
  assert.strictEqual(h.runtime.locale, "en");
}

{
  const secondOrigin = "https://second.example.com";
  const h = harness([origin, secondOrigin]);
  h.send({ name: "globals", globals: { locale: "en" }, id: 1 });
  h.send({ name: "globals", globals: { locale: "other" }, id: 2 }, h.parent, secondOrigin);
  assert.strictEqual(h.replies.length, 1);
  assert.strictEqual(h.runtime.locale, "en");
}

{
  require("coffee-script/register");
  const runtime = require("../runtime");
  runtime.scriptInitialized = false;
  runtime.isCalculation = false;
  const h = harness();
  Object.assign(h.context, {
    $$runtime: runtime, $$prepare: global.$$prepare, $$evaluate: global.$$evaluate,
    $$trigger: global.$$trigger, $$finishAsync: global.$$finishAsync,
  });
  const indexes = [runtime.elementsByKey, runtime.elementsByDataName, runtime.dataNames, runtime.statusesByValue];
  const originalPrototypes = indexes.map(index => Object.getPrototypeOf(index));
  for (const form of [
    { elements: [{ key: "__proto__", data_name: "evil", type: "TextField" }] },
    { elements: [{ key: "ok", data_name: "__proto__", type: "TextField" }] },
    { elements: [{ key: "group", elements: [{ key: "__proto__" }] }] },
    { elements: [{ key: "constructor", data_name: "ok" }] },
    { elements: [], status_field: { choices: [{ value: "__proto__", label: "bad" }] } },
  ]) {
    h.send({ name: "prepare", form });
    assert.strictEqual(h.replies.length, 0);
    indexes.forEach((index, i) => assert.strictEqual(Object.getPrototypeOf(index), originalPrototypes[i]));
  }
  h.send({ name: "prepare", form: {
    elements: [{ key: "date", data_name: "date", type: "DateField" }],
  } });
  h.send({ name: "values", values: { date: "2025-01-03" } });
  const before = runtime.values;
  h.send({ name: "values", values: { date: { length: 2 } } });
  assert.strictEqual(h.replies.length, 3);
  assert.notStrictEqual(runtime.values, before);
  h.send({ name: "evaluate" });
  assert.strictEqual(h.replies.length, 3);
  h.send({ name: "values", values: { date: "2025-01-03" } });
  h.send({ name: "expressions", expressions: [{ key: "date", dataName: "date", expression: "1" }] });
  h.send({ name: "evaluate" });
  assert.strictEqual(h.replies[h.replies.length - 1].data.results[0].value, 1);
  h.send({ name: "values", values: { date: null } });
  h.send({ name: "values", values: { date: "2025-01-03T12:00:00Z" } });
  h.send({ name: "values", values: { laterDate: { length: 2 } } });
  const replyCount = h.replies.length;
  h.send({ name: "prepare", form: {
    elements: [{ key: "laterDate", data_name: "later", type: "DateTimeField" }],
  } });
  assert.strictEqual(h.replies.length, replyCount + 1);
  h.send({ name: "evaluate" });
  h.send({ name: "triggerDataEvent", event: { name: "load-record" } });
  assert.strictEqual(h.replies.length, replyCount + 1);
  h.send({ name: "values", values: { laterDate: "2025-01-03T12:00:00Z" } });
  h.send({ name: "evaluate" });
  assert.strictEqual(h.replies[h.replies.length - 1].data.name, "evaluate");
  h.send({ name: "triggerDataEvent", event: { name: "load-record" } });
  assert.strictEqual(h.replies[h.replies.length - 1].data.name, "triggerDataEvent");
  const dateTimeReplyCount = h.replies.length;
  h.send({ name: "values", values: { laterDate: [] } });
  h.send({ name: "evaluate" });
  assert.strictEqual(h.replies.length, dateTimeReplyCount + 1);
  h.send({ name: "values", values: { laterDate: null } });
  assert.strictEqual(h.replies.length, dateTimeReplyCount + 2);
}

{
  require("coffee-script/register");
  const runtime = require("../runtime");
  const h = harness();
  Object.assign(h.context, {
    $$runtime: runtime, $$prepare: global.$$prepare, $$evaluate: global.$$evaluate,
    $$trigger: global.$$trigger, $$finishAsync: global.$$finishAsync,
  });
  h.send({ name: "prepare", form: {
    elements: [{ key: "switchField", data_name: "switchField", type: "Repeatable", elements: [] }],
  } });
  h.send({ name: "values", values: { switchField: [] } });
  h.send({ name: "prepare", form: {
    elements: [{ key: "switchField", data_name: "switchField", type: "DateField" }],
  } });
  h.send({ name: "values", values: { switchField: "2025-01-03" } });
  h.send({ name: "evaluate" });
  assert.deepStrictEqual(h.replies.map(reply => reply.data.name),
    ["prepare", "values", "prepare", "values", "evaluate"]);

  h.send({ name: "values", values: { switchField: [] } });
  h.send({ name: "prepare", form: {
    elements: [{ key: "switchField", data_name: "switchField", type: "Repeatable", elements: [] }],
  } });
  h.send({ name: "evaluate" });
  assert.deepStrictEqual(h.replies.slice(-3).map(reply => reply.data.name),
    ["values", "prepare", "evaluate"]);

  h.send({ name: "prepare", form: {
    elements: [{ key: "switchField", data_name: "switchField", type: "DateField" }],
  } });
  for (const invalid of [{ length: null }, { length: { toString: 0, valueOf: 0 } }]) {
    h.send({ name: "values", values: { switchField: invalid } });
    const count = h.replies.length;
    h.send({ name: "evaluate" });
    h.send({ name: "triggerDataEvent", event: { name: "load-record" } });
    assert.strictEqual(h.replies.length, count);
  }
  h.send({ name: "values", values: { switchField: "2025-01-03" } });
  h.send({ name: "evaluate" });
  assert.strictEqual(h.replies[h.replies.length - 1].data.name, "evaluate");
  h.send({ name: "prepare", form: { elements: [] } });
  h.send({ name: "values", values: { switchField: { length: null } } });
  const removedFieldCount = h.replies.length;
  h.send({ name: "evaluate" });
  assert.strictEqual(h.replies.length, removedFieldCount);
  h.send({ name: "values", values: { switchField: null } });
  h.send({ name: "evaluate" });
  assert.strictEqual(h.replies[h.replies.length - 1].data.name, "evaluate");
}

{
  class FakeXHR {
    constructor() { this.withCredentials = false; }
    open() {}
    send() { this.status = 200; this.responseText = "ok"; this.readyState = 4; this.onreadystatechange(); }
    toJSON() { return { statusCode: this.statusCode }; }
  }
  FakeXHR.DONE = 4;
  global.XMLHttpRequest = FakeXHR;
  global.location = { href: "https://example.com/" };
  const browserRequest = require("browser-request");
  const h = harness([origin], browserRequest);
  for (const property of ["form", "qs"]) {
    assert.throws(() => browserRequest({
      url: "https://example.com/", method: "POST", [property]: { hasOwnProperty: "x" },
    }, () => {}), /hasOwnProperty/);
    h.send({ name: "httpRequest", id: 0, options: {
      url: "https://example.com/", method: "POST", [property]: { hasOwnProperty: "x" },
    } });
  }
  assert.strictEqual(h.replies.length, 0);
  h.send({ name: "httpRequest", id: 1, options: {
    url: "https://example.com/", method: "POST", form: { value: "ok" }, qs: { q: "ok" },
  } });
  assert.strictEqual(h.replies.length, 1);
  assert.strictEqual(h.replies[0].data.id, 1);
  assert.strictEqual(h.replies[0].data.result[2], "ok");
  delete global.XMLHttpRequest;
  delete global.location;
}

{
  require("coffee-script/register");
  const runtime = require("../runtime");
  runtime.scriptInitialized = false;
  runtime.isCalculation = false;
  const h = harness();
  Object.assign(h.context, {
    $$runtime: runtime,
    $$prepare: global.$$prepare,
    $$evaluate: global.$$evaluate,
    $$trigger: global.$$trigger,
    $$finishAsync: global.$$finishAsync,
  });
  h.send({ name: "prepare", id: 1, form: {
    elements: [{ key: "a", data_name: "a", type: "TextField" }],
    script: "ON('load-record', function() { globalThis.__proxyDeferredHost = function() { SETTIMEOUT(function() {}, 1); }; SETTIMEOUT(function() { SETTIMEOUT(function() {}, 2); SETVALUE('a', 'done'); }, 1); });",
  } });
  h.send({ name: "values", values: { a: 2 } });
  h.send({ name: "expressions", expressions: [{ key: "a", dataName: "a", expression: "1 + 2" }] });
  h.send({ name: "evaluate", id: 0 });
  assert.strictEqual(h.replies[3].data.results[0].value, 3);
  h.send({ name: "triggerDataEvent", event: { name: "load-record" }, id: "event" });
  const hostCall = h.replies.find(reply => reply.data.name === "hostFunction").data;
  assert.strictEqual(hostCall.id, "event");
  const pendingCallback = runtime.asyncCallbacks[hostCall.argumentList[1]];
  assert.strictEqual(typeof pendingCallback, "function");
  assert.throws(() => runtime.$$setTimeout(1, hostCall.argumentList[1]), /no authorized request context/i);
  assert.strictEqual(runtime.asyncCallbacks[hostCall.argumentList[1]], pendingCallback);
  h.send({ name: "finishAsyncCallback", callbackID: hostCall.argumentList[1], callbackArguments: [], id: "callback" });
  const callback = h.replies[h.replies.length - 1].data;
  const nestedHostCall = h.replies[h.replies.length - 2].data;
  assert.strictEqual(callback.id, "callback");
  assert.strictEqual(nestedHostCall.name, "hostFunction");
  assert.strictEqual(nestedHostCall.id, "callback");
  assert.strictEqual(JSON.parse(callback.results[0].value), "done");
  h.send({ name: "finishAsyncCallback", callbackID: nestedHostCall.argumentList[1], callbackArguments: null, id: "callback-2" });
  assert.strictEqual(h.replies[h.replies.length - 1].data.id, "callback-2");
  assert.throws(() => global.__proxyDeferredHost(), /no authorized request context/i);
  delete global.__proxyDeferredHost;
}

console.log("expressions proxy security tests passed");

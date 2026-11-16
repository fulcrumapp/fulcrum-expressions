"use strict";

const assert = require("assert");
const { execFileSync } = require("child_process");
const { configureProxy } = require("../script/configure-sandbox-proxy");

const marker = "__EXPRESSION_SANDBOX_ALLOWED_ORIGINS__";
const source = `var origins = "${marker}";`;

assert.strictEqual(
  configureProxy(source, " https://web.example.com, http://localhost:3000 "),
  'var origins = "https://web.example.com,http://localhost:3000";'
);

for (const origins of [
  undefined, "", "null", "*", "https://*.example.com", "https://*.thefulcrum.team", "https://example.com/path",
  "https://example.com?query=1", "https://user@example.com", "https://example.com/",
  "https://example.com,,https://other.example.com", "javascript:alert(1)",
]) {
  assert.throws(() => configureProxy(source, origins), /trusted origins/i);
}
assert.throws(() => configureProxy("no marker", "https://example.com"), /marker/i);
assert.throws(() => configureProxy(`${marker} ${marker}`, "https://example.com"), /marker/i);

const wildcard = "https://*.thefulcrum.team";
assert.strictEqual(
  configureProxy(source, `${wildcard},${wildcard},https://web.example.com`, "development"),
  `var origins = "${wildcard},https://web.example.com";`
);
for (const environment of [undefined, "production", "preview", "Development"]) {
  assert.throws(() => configureProxy(source, wildcard, environment), /trusted origins/i);
  assert.strictEqual(configureProxy(source, "https://web.example.com", environment),
    'var origins = "https://web.example.com";');
}
for (const origin of [
  "*", "https://*", "http://*.thefulcrum.team", "https://*.team",
  "https://*.*.thefulcrum.team", "https://rails*.thefulcrum.team",
  "https://*.thefulcrum.team:443", "https://*.thefulcrum.team:8443",
  "https://*.thefulcrum.team/", "https://*.thefulcrum.team?query=1",
  "https://user@*.thefulcrum.team", "https://*.Thefulcrum.team",
  "https://*.-thefulcrum.team", "https://*.thefulcrum..team",
  "https://*.thefulcrum.team\ninjected",
]) {
  assert.throws(() => configureProxy(source, origin, "development"), /trusted origins/i);
}

const pack = JSON.parse(execFileSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
  cwd: require("path").resolve(__dirname, ".."),
  encoding: "utf8",
}));
assert.ok(pack[0].files.some((file) => file.path === "script/configure-sandbox-proxy.js"),
  "npm package must include the trusted-origin configurator");

console.log("Sandbox trusted-origin configuration checks passed.");

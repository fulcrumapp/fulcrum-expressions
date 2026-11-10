"use strict";

const assert = require("assert");
const { execFileSync } = require("child_process");
const { configureProxy } = require("../script/configure-sandbox-proxy");

const marker = "__EXPRESSION_SANDBOX_ALLOWED_ORIGINS__";
const source = `var origins = "${marker}";`;

assert.strictEqual(
  configureProxy(source, " https://web.example.com, http://localhost:3000 "),
  'var origins = "https://web.example.com,http://localhost:3000,https://*.thefulcrum.team";'
);

for (const origins of [
  undefined, "", "null", "*", "https://*.example.com", "https://example.com/path",
  "https://*.thefulcrum.team",
  "https://example.com?query=1", "https://user@example.com", "https://example.com/",
  "https://example.com,,https://other.example.com", "javascript:alert(1)",
]) {
  assert.throws(() => configureProxy(source, origins), /trusted origins/i);
}
assert.throws(() => configureProxy("no marker", "https://example.com"), /marker/i);
assert.throws(() => configureProxy(`${marker} ${marker}`, "https://example.com"), /marker/i);

const pack = JSON.parse(execFileSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
  cwd: require("path").resolve(__dirname, ".."),
  encoding: "utf8",
}));
assert.ok(pack[0].files.some((file) => file.path === "script/configure-sandbox-proxy.js"),
  "npm package must include the trusted-origin configurator");

console.log("Sandbox trusted-origin configuration checks passed.");

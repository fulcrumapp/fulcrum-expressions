"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { assertSandboxScripts } = require("../script/sandbox-scripts");

const shimSource = "https://html5shim.googlecode.com/svn/trunk/html5.js";
const shim = `<!--[if lt IE 9]><script src="${shimSource}"></script><![endif]-->`;
const expected = ["expressions.js", "../expressions-proxy.js"];
const runtime = '<script src="expressions.js"></script>';
const proxy = '<script src="../expressions-proxy.js"></script>';
const validPages = [
  `${runtime}${proxy}`,
  `<script src='expressions.js'></script ><script src='../expressions-proxy.js'></script >`,
  `<SCRIPT defer SRC = expressions.js data-note=">"></SCRIPT\n>` +
    `<script type='text/javascript'\n src = '../expressions-proxy.js' defer></script\t>`,
  `<!-- <script src="ignored-comment.js"></script> -->${runtime}${proxy}`,
];
for (const html of validPages) {
  assert.deepStrictEqual(assertSandboxScripts(html, expected), expected);
}

const invalidPages = [
  `${runtime}${proxy}<script src="unexpected.js"></script>`,
  `${runtime}${proxy}<script src="https://example.com/unexpected.js"></script>`,
  `${runtime}${proxy}<script src='https://example.com/unexpected.js'></script >`,
  `${runtime}${proxy}<SCRIPT defer SRC=https://example.com/unexpected.js></SCRIPT\n>`,
  `${runtime}${proxy}<script>unexpectedInlineCode()</script>`,
  `${proxy}${runtime}`,
  runtime,
  `${shim}${runtime}${proxy}`,
  `${runtime}${shim}${proxy}`,
  `<script src="${shimSource}"></script>${runtime}${proxy}`,
  `${shim}${shim}${runtime}${proxy}`,
  `<!--[if lt IE 9]><script src="unexpected.js"></script><![endif]-->${runtime}${proxy}`,
  `<!--[if lt IE 9]><script src="${shimSource}"></script>` +
    `<script src="unexpected.js"></script><![endif]-->${runtime}${proxy}`,
  `<!--[if IE]><script src="${shimSource}"></script><![endif]-->${runtime}${proxy}`,
  `${shim}<!--[IF IE]><script src="unexpected.js"></script><![endif]-->${runtime}${proxy}`,
];
for (const html of invalidPages) {
  assert.throws(() => assertSandboxScripts(html, expected), assert.AssertionError);
}

for (const channel of ["hybrid", "legacy", ""]) {
  const html = fs.readFileSync(path.join(__dirname, "..", channel, "expressions.html"), "utf8");
  assert.deepStrictEqual(assertSandboxScripts(html, [
    "expressions.js", channel ? "../expressions-proxy.js" : "expressions-proxy.js",
  ], { comparisonPage: channel === "" }),
  ["expressions.js", channel ? "../expressions-proxy.js" : "expressions-proxy.js"]);
}
assert.deepStrictEqual(assertSandboxScripts(`${shim}${runtime}${proxy}`, expected,
  { comparisonPage: true }), expected);
assert.throws(() => assertSandboxScripts(`${runtime}${proxy}`, expected,
  { comparisonPage: true }), assert.AssertionError);
console.log("Sandbox HTML parser checks passed: syntax variants accepted; unexpected, inline, reordered, and conditional scripts rejected.");

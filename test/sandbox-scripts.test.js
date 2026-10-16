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
  `${shim}${runtime}${proxy}`,
  `${shim}<script src='expressions.js'></script ><script src='../expressions-proxy.js'></script >`,
  `${shim}<SCRIPT defer SRC = expressions.js data-note=">"></SCRIPT\n>` +
    `<script type='text/javascript'\n src = '../expressions-proxy.js' defer></script\t>`,
  `${shim}<!-- <script src="ignored-comment.js"></script> -->${runtime}${proxy}`,
];
for (const html of validPages) {
  assert.deepStrictEqual(assertSandboxScripts(html, expected), expected);
}

const invalidPages = [
  `${shim}${runtime}${proxy}<script src="unexpected.js"></script>`,
  `${shim}${runtime}${proxy}<script src="https://example.com/unexpected.js"></script>`,
  `${shim}${runtime}${proxy}<script src='https://example.com/unexpected.js'></script >`,
  `${shim}${runtime}${proxy}<SCRIPT defer SRC=https://example.com/unexpected.js></SCRIPT\n>`,
  `${shim}${runtime}${proxy}<script>unexpectedInlineCode()</script>`,
  `${shim}${proxy}${runtime}`,
  `${shim}${runtime}`,
  `${runtime}${proxy}`,
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
  ]), ["expressions.js", channel ? "../expressions-proxy.js" : "expressions-proxy.js"]);
}
console.log("Sandbox HTML parser checks passed: syntax variants accepted; unexpected, inline, reordered, and conditional scripts rejected.");

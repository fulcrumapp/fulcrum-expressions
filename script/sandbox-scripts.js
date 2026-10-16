"use strict";

const assert = require("assert");
const parse5 = require("parse5");

const shimSource = "https://html5shim.googlecode.com/svn/trunk/html5.js";
const conditionalStart = "[if lt IE 9]>";
const conditionalEnd = "<![endif]";

function assertSandboxScripts(html, expectedSources) {
  const scripts = [];
  function visit(node, condition = null) {
    if (node.tagName === "script") {
      const source = node.attrs.find((attribute) => attribute.name === "src");
      scripts.push({ source: source ? source.value : null, condition });
    }
    if (node.nodeName === "#comment") {
      const comment = node.data.trim();
      if (comment.toLowerCase().startsWith("[if")) {
        assert.ok(condition === null && comment.startsWith(conditionalStart) &&
          comment.endsWith(conditionalEnd), "unexpected sandbox conditional comment");
        const fragment = comment.slice(conditionalStart.length, -conditionalEnd.length);
        visit(parse5.parseFragment(fragment), "lt IE 9");
      }
    }
    for (const child of node.childNodes || []) visit(child, condition);
  }
  visit(parse5.parse(html));
  assert.deepStrictEqual(scripts, [
    { source: shimSource, condition: "lt IE 9" },
    ...expectedSources.map((source) => ({ source, condition: null })),
  ], "sandbox must load only the conditional compatibility shim, runtime, and proxy in order");
  return scripts.slice(1).map((script) => script.source);
}

module.exports = { assertSandboxScripts };

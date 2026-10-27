"use strict";

const assert = require("assert");
const parse5 = require("parse5");

const shimSource = "https://html5shim.googlecode.com/svn/trunk/html5.js";
const conditionalStart = "[if lt IE 9]>";
const conditionalEnd = "<![endif]";

function assertSandboxScripts(html, expectedSources, { comparisonPage = false } = {}) {
  const scripts = [];
  function visit(node, condition = null) {
    if (node.tagName === "script") {
      const source = node.attrs.find((attribute) => attribute.name === "src");
      scripts.push({ source: source ? source.value : null, condition });
    }
    if (node.nodeName === "#comment") {
      const comment = node.data.trim();
      if (comment.toLowerCase().startsWith("[if")) {
        const received = comment.length > 200 ? `${comment.slice(0, 200)}...` : comment;
        assert.ok(condition === null && comment.startsWith(conditionalStart) &&
          comment.endsWith(conditionalEnd),
        `unexpected conditional comment; expected exactly ${conditionalStart}...${conditionalEnd}; received: ${received}`);
        const fragment = comment.slice(conditionalStart.length, -conditionalEnd.length);
        visit(parse5.parseFragment(fragment), "lt IE 9");
      }
    }
    for (const child of node.childNodes || []) visit(child, condition);
    if (node.content) visit(node.content, condition);
  }
  visit(parse5.parse(html));
  assert.deepStrictEqual(scripts, [
    ...(comparisonPage ? [{ source: shimSource, condition: "lt IE 9" }] : []),
    ...expectedSources.map((source) => ({ source, condition: null })),
  ], "sandbox must load only its expected scripts in order");
  return scripts.slice(comparisonPage ? 1 : 0).map((script) => script.source);
}

module.exports = {
  assertSandboxScripts,
  shimSource,
  conditionalStart,
  conditionalEnd,
};

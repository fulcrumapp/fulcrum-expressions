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
        const conditional = comment.match(/^\[\s*if\s+lt\s+ie\s+9\s*\]>\s*([\s\S]*?)\s*<!\[endif\]\s*$/i);
        assert.ok(condition === null && conditional,
          `unexpected conditional comment; expected an lt IE 9 shim bounded by ${conditionalStart} and ${conditionalEnd}; received: ${received}`);
        visit(parse5.parseFragment(conditional[1]), "lt IE 9");
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

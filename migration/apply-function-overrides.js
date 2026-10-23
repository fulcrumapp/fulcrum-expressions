"use strict";

function applyFunctionOverrides(functions, overrides) {
  if (overrides === null || typeof overrides !== "object"
    || ![null, Object.prototype].includes(Object.getPrototypeOf(overrides))) {
    throw new TypeError("TypeScript overrides must be a plain or null-prototype object");
  }
  Object.keys(overrides).forEach((name) => {
    if (["__proto__", "constructor", "prototype"].includes(name)) {
      throw new Error(`TypeScript override uses a reserved property: ${name}`);
    }
    if (!Object.prototype.hasOwnProperty.call(functions, name) || typeof functions[name] !== "function") {
      throw new Error(`TypeScript override has no matching CoffeeScript function: ${name}`);
    }
    if (typeof overrides[name] !== "function") {
      throw new TypeError(`TypeScript override must be a function: ${name}`);
    }
    functions[name] = overrides[name];
  });
  return functions;
}

module.exports = applyFunctionOverrides;

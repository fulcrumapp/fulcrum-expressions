"use strict";

const functions = require("../functions");
const { functionOverrides } = require("../dist/.migration-build/function-overrides");

Object.keys(functionOverrides).forEach((name) => {
  functions[name] = functionOverrides[name];
});

module.exports = require("../runtime");

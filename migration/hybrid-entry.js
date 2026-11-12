"use strict";

const functions = require("../functions");
const { functionOverrides } = require("../dist/.migration-build/migration/function-overrides");
const applyFunctionOverrides = require("./apply-function-overrides");

applyFunctionOverrides(functions, functionOverrides);

module.exports = require("../runtime");

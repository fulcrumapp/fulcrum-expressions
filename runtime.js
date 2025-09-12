// Entry point that provides the runtime for Node.js environments
// This replaces the old runtime.coffee for requiring in tests

const Runtime = require("./dist/ts/runtime/index.js").default;

// Create and export runtime instance
module.exports = new Runtime();
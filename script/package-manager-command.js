"use strict";

const path = require("path");

function packageManagerCommand(packageManagerScript, task) {
  const args = ["run", task];
  if (!packageManagerScript) return ["yarn", args];

  if ([".js", ".cjs", ".mjs"].includes(path.extname(packageManagerScript).toLowerCase())) {
    return [process.execPath, [packageManagerScript, ...args]];
  }
  return [packageManagerScript, args];
}

module.exports = { packageManagerCommand };

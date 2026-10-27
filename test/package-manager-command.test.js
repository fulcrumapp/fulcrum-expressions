"use strict";

const assert = require("assert");
const { packageManagerCommand } = require("../script/package-manager-command");

for (const extension of [".js", ".cjs", ".mjs"]) {
  assert.deepStrictEqual(
    packageManagerCommand(`/tools/yarn${extension}`, "build:sandbox"),
    [process.execPath, [`/tools/yarn${extension}`, "run", "build:sandbox"]]
  );
}
for (const executable of ["/tools/yarn", "/tools/pnpm", "/tools/npm.cmd"]) {
  assert.deepStrictEqual(
    packageManagerCommand(executable, "build:sandbox:debug"),
    [executable, ["run", "build:sandbox:debug"]]
  );
}
assert.deepStrictEqual(
  packageManagerCommand(undefined, "build:sandbox"),
  ["yarn", ["run", "build:sandbox"]]
);
console.log("Package-manager command selection passed for JS entry points, executables, and Yarn fallback.");

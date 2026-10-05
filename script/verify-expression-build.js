"use strict";

const assert = require("assert");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const buildScript = path.join(root, "script", "build-expressions.js");
const dist = path.join(root, "dist");
const channels = ["legacy", "hybrid"];

function runBuild() {
  const result = spawnSync(process.execPath, [buildScript], {
    cwd: root,
    encoding: "utf8",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error([
      `Expression build failed with exit code ${result.status}.`,
      result.stdout,
      result.stderr,
    ].filter(Boolean).join("\n"));
  }
}

function inventory(directory) {
  const entries = [];
  function visit(currentPath) {
    fs.readdirSync(currentPath, { withFileTypes: true })
      .sort((left, right) => left.name.localeCompare(right.name))
      .forEach((entry) => {
        const absolutePath = path.join(currentPath, entry.name);
        if (entry.isDirectory()) {
          visit(absolutePath);
        } else if (entry.isFile()) {
          const contents = fs.readFileSync(absolutePath);
          entries.push({
            path: path.relative(directory, absolutePath).split(path.sep).join("/"),
            size: contents.length,
            sha256: crypto.createHash("sha256").update(contents).digest("hex"),
          });
        } else {
          throw new Error(`Unexpected non-file artifact: ${absolutePath}`);
        }
      });
  }
  visit(directory);
  return entries;
}

function verifyMigrationTypecheckScope() {
  const configPath = path.join(root, "migration", "tsconfig.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  assert.strictEqual(config.compilerOptions.strict, true, "migration TypeScript must be strict");
  assert.strictEqual(
    config.compilerOptions.noEmitOnError,
    true,
    "migration diagnostics must prevent JavaScript emission"
  );
  assert.deepStrictEqual(
    config.include,
    ["function-overrides.ts"],
    "migration TypeScript closure must be explicit and isolated"
  );
}

function verifyArtifactInventory() {
  const result = {};
  channels.forEach((channel) => {
    const directory = path.join(dist, channel);
    assert.ok(fs.statSync(directory).isDirectory(), `missing dist/${channel}`);
    const files = inventory(directory);
    assert.ok(files.some((file) => file.path === "expressions.js" && file.size > 0),
      `missing stable dist/${channel}/expressions.js`);
    result[channel] = files;
  });
  assert.ok(
    fs.readFileSync(path.join(dist, "expressions.js"))
      .equals(fs.readFileSync(path.join(dist, "legacy", "expressions.js"))),
    "dist/expressions.js must remain the legacy-compatible entry point"
  );
  assert.ok(!fs.existsSync(path.join(dist, ".migration-build")),
    "temporary TypeScript output must not be part of the release artifacts");
  return result;
}

verifyMigrationTypecheckScope();
runBuild();
const firstInventory = verifyArtifactInventory();
runBuild();
const secondInventory = verifyArtifactInventory();
assert.deepStrictEqual(secondInventory, firstInventory, "repeated builds must be deterministic");
console.log("Expression build integrity passed: both channels are present and inventories are stable.");

"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const debug = process.argv.includes("--debug");
const dist = path.join(root, "dist");
const legacyDir = path.join(dist, "legacy");
const hybridDir = path.join(dist, "hybrid");
const migrationBuildDir = path.join(dist, ".migration-build");

function runNodeScript(script, args, input) {
  const result = spawnSync(process.execPath, [script, ...args], {
    cwd: root,
    encoding: "utf8",
    input,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error([
      `${path.basename(script)} failed with exit code ${result.status}.`,
      result.stdout,
      result.stderr,
    ].filter(Boolean).join("\n"));
  }
  return result.stdout;
}

function bundle(entry) {
  const browserify = path.join(root, "node_modules", "browserify", "bin", "cmd.js");
  const source = runNodeScript(browserify, [
    "-t", "coffeeify",
    "--extension=.coffee",
    entry,
  ]);
  if (debug) return source;
  const terser = path.join(root, "node_modules", "terser", "bin", "terser");
  return runNodeScript(terser, ["--compress", "keep_fargs=true"], source);
}

function writeBundle(file, source) {
  fs.writeFileSync(file, source);
}

fs.mkdirSync(dist, { recursive: true });
fs.rmSync(legacyDir, { recursive: true, force: true });
fs.rmSync(hybridDir, { recursive: true, force: true });
fs.rmSync(migrationBuildDir, { recursive: true, force: true });
fs.mkdirSync(legacyDir, { recursive: true });
fs.mkdirSync(hybridDir, { recursive: true });

const legacyBundle = bundle("runtime.coffee");
writeBundle(path.join(legacyDir, "expressions.js"), legacyBundle);
writeBundle(path.join(dist, "expressions.js"), legacyBundle);
fs.copyFileSync(path.join(root, "package.json"), path.join(dist, "package.json"));

try {
  runNodeScript(path.join(root, "node_modules", "typescript", "bin", "tsc"), [
    "--project",
    path.join(root, "migration", "tsconfig.json"),
  ]);
  const hybridBundle = bundle("migration/hybrid-entry.js");
  writeBundle(path.join(hybridDir, "expressions.js"), hybridBundle);
} finally {
  fs.rmSync(migrationBuildDir, { recursive: true, force: true });
}

console.log(`Built legacy and hybrid expression bundles${debug ? " (debug)" : ""}.`);

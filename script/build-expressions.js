"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const debug = process.argv.includes("--debug");
const legacyOnly = process.argv.includes("--legacy-only");
const dist = path.join(root, "dist");
const legacyDir = path.join(dist, "legacy");
const hybridDir = path.join(dist, "hybrid");
const migrationBuildDir = path.join(dist, ".migration-build");
const maxBuffer = 50 * 1024 * 1024;

function runNodeScript(script, args, input) {
  const result = spawnSync(process.execPath, [script, ...args], {
    cwd: root,
    encoding: "utf8",
    input,
    maxBuffer,
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
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, source);
}

function buildLegacy() {
  const source = bundle("runtime.coffee");
  writeBundle(path.join(legacyDir, "expressions.js"), source);
  writeBundle(path.join(dist, "expressions.js"), source);
  fs.copyFileSync(path.join(root, "package.json"), path.join(dist, "package.json"));
}

fs.mkdirSync(dist, { recursive: true });
if (legacyOnly) {
  buildLegacy();
  console.log(`Built legacy expression bundle${debug ? " (debug)" : ""}.`);
} else {
  fs.rmSync(legacyDir, { recursive: true, force: true });
  fs.rmSync(hybridDir, { recursive: true, force: true });
  fs.rmSync(migrationBuildDir, { recursive: true, force: true });

  buildLegacy();

  try {
    runNodeScript(path.join(root, "node_modules", "typescript", "bin", "tsc"), [
      "--project",
      path.join(root, "migration", "tsconfig.json"),
    ]);
    writeBundle(
      path.join(hybridDir, "expressions.js"),
      bundle("migration/hybrid-entry.js")
    );
  } finally {
    fs.rmSync(migrationBuildDir, { recursive: true, force: true });
  }

  console.log(`Built legacy and hybrid expression bundles${debug ? " (debug)" : ""}.`);
}

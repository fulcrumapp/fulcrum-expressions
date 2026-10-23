"use strict";

const assert = require("assert");
const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const { assertSandboxScripts } = require("./sandbox-scripts");

const root = path.resolve(__dirname, "..");
const buildScript = path.join(root, "script", "build-expressions.js");
const dist = path.join(root, "dist");
const channels = ["legacy", "hybrid"];
const maxBuffer = 50 * 1024 * 1024;

function runCommand(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    maxBuffer,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error([
      `${command} ${args.join(" ")} failed with exit code ${result.status}.`,
      result.stdout,
      result.stderr,
    ].filter(Boolean).join("\n"));
  }
}

function runBuild(debug) {
  runCommand(process.execPath, [buildScript, ...(debug ? ["--debug"] : [])]);
  const packageManagerScript = process.env.npm_execpath;
  if (packageManagerScript) {
    runCommand(process.execPath, [
      packageManagerScript,
      "run",
      debug ? "build:sandbox:debug" : "build:sandbox",
    ]);
  } else {
    runCommand("yarn", ["run", debug ? "build:sandbox:debug" : "build:sandbox"]);
  }
}

function inventory(directory) {
  const entries = [];
  function visit(currentPath) {
    fs.readdirSync(currentPath, { withFileTypes: true })
      .sort((left, right) => left.name < right.name ? -1 : left.name > right.name ? 1 : 0)
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
  const migrationConfigPath = path.join(root, "migration", "tsconfig.json");
  const config = JSON.parse(fs.readFileSync(migrationConfigPath, "utf8"));
  assert.strictEqual(config.compilerOptions.strict, true, "migration TypeScript must be strict");
  assert.strictEqual(config.compilerOptions.rootDir, "..",
    "migration TypeScript root must include the explicitly imported function sources");
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

  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "expression-typecheck-"));
  const sourcePath = path.join(temporaryRoot, "typecheck-failure.ts");
  const diagnosticConfigPath = path.join(temporaryRoot, "tsconfig.json");
  const outputPath = path.join(temporaryRoot, "out");
  try {
    fs.writeFileSync(sourcePath, "const invalidValue: string = 123;\nexport { invalidValue };\n");
    fs.writeFileSync(diagnosticConfigPath, JSON.stringify({
      compilerOptions: {
        ...config.compilerOptions,
        rootDir: temporaryRoot,
        outDir: outputPath,
      },
      include: [sourcePath],
    }));
    const result = spawnSync(process.execPath, [
      path.join(root, "node_modules", "typescript", "bin", "tsc"),
      "--project",
      diagnosticConfigPath,
    ], {
      cwd: root,
      encoding: "utf8",
      maxBuffer,
    });
    if (result.error) throw result.error;
    assert.notStrictEqual(result.status, 0, "migration type diagnostics must fail the compiler");
    assert.match(result.stdout + result.stderr, /TS2322/, "typecheck failure must report the diagnostic");
    assert.deepStrictEqual(
      fs.existsSync(outputPath) ? inventory(outputPath) : [],
      [],
      "no files may be emitted when migration typechecking fails"
    );
  } finally {
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
}

function verifyArtifactInventory() {
  const result = {};
  channels.forEach((channel) => {
    const directory = path.join(dist, channel);
    assert.ok(fs.statSync(directory).isDirectory(), `missing dist/${channel}`);
    const files = inventory(directory);
    assert.deepStrictEqual(
      files.map((file) => file.path),
      ["expressions.html", "expressions.js"],
      `unexpected dist/${channel} artifact inventory`
    );
    assert.ok(
      files.some((file) => file.path === "expressions.js" && file.size > 0),
      `missing stable dist/${channel}/expressions.js`
    );
    const pagePath = path.join(directory, "expressions.html");
    const html = fs.readFileSync(pagePath, "utf8");
    assert.strictEqual(html, fs.readFileSync(path.join(root, channel, "expressions.html"), "utf8"),
      `dist/${channel}/expressions.html must match its source`);
    const scripts = assertSandboxScripts(html, ["expressions.js", "../expressions-proxy.js"]);
    const resolvedScripts = scripts.map((src) => path.resolve(directory, src));
    assert.deepStrictEqual(resolvedScripts, [
      path.join(directory, "expressions.js"),
      path.join(dist, "expressions-proxy.js"),
    ]);
    resolvedScripts.forEach((file) => assert.ok(fs.statSync(file).size > 0,
      `missing sandbox dependency: ${file}`));
    result[channel] = files;
  });
  const comparisonSource = fs.readFileSync(path.join(root, "expressions.html"));
  // Change this fingerprint only with explicit approval to update the frozen comparison page.
  // After approval, use `sha256sum expressions.html` and review the page diff.
  assert.strictEqual(
    crypto.createHash("sha256").update(comparisonSource).digest("hex"),
    "b858414b6250edef49569ad7ed7bf92cd876cfbb176a5059b2e648e6c063f23b",
    "the original frozen-runtime comparison page must remain unchanged"
  );
  assert.ok(fs.readFileSync(path.join(dist, "expressions.html")).equals(comparisonSource),
    "dist/expressions.html must preserve the comparison page");
  result.shared = inventory(dist).filter((file) => [
    "expressions.js", "expressions.html", "expressions-proxy.js",
  ].includes(file.path));
  assert.deepStrictEqual(result.shared.map((file) => file.path), [
    "expressions-proxy.js", "expressions.html", "expressions.js",
  ]);
  const compatibilityPath = path.join(dist, "expressions.js");
  assert.ok(
    fs.existsSync(compatibilityPath) && fs.statSync(compatibilityPath).isFile(),
    "missing stable dist/expressions.js legacy-compatible entry point"
  );
  assert.ok(
    fs.readFileSync(compatibilityPath)
      .equals(fs.readFileSync(path.join(dist, "legacy", "expressions.js"))),
    "dist/expressions.js must remain the legacy-compatible entry point"
  );
  assert.ok(!fs.existsSync(path.join(dist, ".migration-build")),
    "temporary TypeScript output must not be part of the release artifacts");
  return result;
}

verifyMigrationTypecheckScope();
for (const debug of [true, false]) {
  runBuild(debug);
  const firstInventory = verifyArtifactInventory();
  runBuild(debug);
  const secondInventory = verifyArtifactInventory();
  assert.deepStrictEqual(secondInventory, firstInventory,
    `repeated ${debug ? "debug" : "release"} builds must be deterministic`);
}
console.log("Expression build integrity passed: release/debug channel pages resolve correctly and inventories are stable.");

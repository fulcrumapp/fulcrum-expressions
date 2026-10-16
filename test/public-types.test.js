"use strict";

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const apiPath = path.join(root, "ts", "api.ts");
const rawPath = path.join(root, "dist", "api.raw.d.ts");
const apiSource = fs.readFileSync(apiPath, "utf8");
const rawSource = fs.readFileSync(rawPath, "utf8");
const wrapper = ts.createSourceFile("api.ts", apiSource, ts.ScriptTarget.Latest, true);
assert.deepStrictEqual(wrapper.parseDiagnostics, [], "public API module must parse");
assert.strictEqual(wrapper.statements.length, 1, "public API must export only its declaration string");
const exported = wrapper.statements[0];
assert.ok(ts.isExportAssignment(exported), "public API must have a default export");
assert.notStrictEqual(exported.isExportEquals, true, "public API must not use export =");
assert.ok(ts.isNoSubstitutionTemplateLiteral(exported.expression));
const declarations = exported.expression.text;
const api = ts.createSourceFile("api.d.ts", declarations, ts.ScriptTarget.Latest, true);
assert.deepStrictEqual(api.parseDiagnostics, [], "flattened public declarations must parse");

const functionNames = fs.readdirSync(path.join(root, "ts", "functions"))
  .filter((name) => name.endsWith(".ts") && name !== "index.ts")
  .map((name) => name.slice(0, -3));
const typeNames = fs.readdirSync(path.join(root, "ts", "types"))
  .filter((name) => name.endsWith(".d.ts") && !["globals.d.ts", "node_modules.d.ts"].includes(name))
  .map((name) => name.slice(0, -5));
const expectedModules = [
  ...functionNames.map((name) => `functions/${name}`),
  ...typeNames.map((name) => `types/${name}`),
].sort();
function declaredModuleNames(source) {
  const parsed = ts.createSourceFile("raw.d.ts", source, ts.ScriptTarget.Latest, true);
  assert.deepStrictEqual(parsed.parseDiagnostics, [], "raw declarations must parse");
  return parsed.statements
    .filter((statement) => ts.isModuleDeclaration(statement) && ts.isStringLiteral(statement.name))
    .map((statement) => statement.name.text).sort();
}
assert.deepStrictEqual(
  declaredModuleNames("declare module 'functions/SINGLE' {}\ndeclare module \"functions/DOUBLE\" {}"),
  ["functions/DOUBLE", "functions/SINGLE"],
  "raw module inventory must accept either quote style"
);
const actualModules = declaredModuleNames(rawSource);
assert.deepStrictEqual(
  actualModules,
  expectedModules,
  "raw declaration inventory must contain public function/type modules only"
);
const publicNames = new Set();
api.statements.forEach((statement) => {
  if (ts.isFunctionDeclaration(statement)) publicNames.add(statement.name.text);
  if (ts.isVariableStatement(statement)) {
    statement.declarationList.declarations.forEach((declaration) => {
      publicNames.add(declaration.name.getText(api));
    });
  }
});
functionNames.forEach((name) => {
  assert.ok(publicNames.has(name), `missing public expression declaration: ${name}`);
});
assert.ok(
  !/\b(prepareRuntime|finishAsync|extendToBeWithinRange|extendContainAllElements|_default)\b/.test(declarations),
  "test helpers and fixture declarations must not leak into the public API"
);

const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "expression-public-types-"));
try {
  const declarationPath = path.join(fixtureRoot, "api.d.ts");
  const consumerPath = path.join(fixtureRoot, "consumer.ts");
  fs.writeFileSync(declarationPath, declarations);
  fs.writeFileSync(consumerPath, [
    "const numericAbsolute: number = ABS(-1);",
    "const stringAbsolute: number = ABS('-1');",
    "const randomValue: number = RAND();",
    "const locale: string = CONFIG().locale;",
    "const invalidAbsolute: string = ABS(-1);",
    "const point: Point = { type: 'Point', coordinates: [1, 2] };",
    "const geometry: GeoJSONGeometry = point;",
    "const feature: Feature<Point> = GEOMETRYFEATURE(point);",
    "const geojson: GeoJSON = feature;",
    "const recordGeometry: GeoJSONGeometry | null = GEOMETRY();",
    "",
  ].join("\n"));
  const program = ts.createProgram([declarationPath, consumerPath], {
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    types: [],
    target: ts.ScriptTarget.ES2015,
  });
  const diagnostics = ts.getPreEmitDiagnostics(program);
  assert.deepStrictEqual(
    diagnostics.map((diagnostic) => diagnostic.code),
    [2322],
    `generated API consumer must accept valid calls and reject the wrong return type:\n${ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (file) => file,
      getCurrentDirectory: () => root,
      getNewLine: () => "\n",
    })}`
  );
  assert.strictEqual(diagnostics[0].file.fileName, consumerPath);
  assert.strictEqual(diagnostics[0].file.getLineAndCharacterOfPosition(diagnostics[0].start).line, 4);
} finally {
  fs.rmSync(fixtureRoot, { recursive: true, force: true });
}

const regenerate = spawnSync("make", ["types"], {
  cwd: root,
  encoding: "utf8",
  maxBuffer: 50 * 1024 * 1024,
});
if (regenerate.error) throw regenerate.error;
assert.strictEqual(regenerate.status, 0, regenerate.stdout + regenerate.stderr);
assert.strictEqual(fs.readFileSync(apiPath, "utf8"), apiSource, "public API must regenerate identically");
assert.strictEqual(fs.readFileSync(rawPath, "utf8"), rawSource, "raw declarations must regenerate identically");
console.log(`Public declarations passed: ${functionNames.length} expression names, ${expectedModules.length} public modules, consumer type checks, no test leakage, identical regeneration.`);

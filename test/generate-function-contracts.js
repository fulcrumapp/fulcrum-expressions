"use strict";

const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const { loadAdapter, normalize } = require("./contract-runner");

const root = path.join(__dirname, "..");
const functionsDir = path.join(root, "ts", "functions");
const output = path.join(__dirname, "contracts", "function-matrix.json");
const volatile = new Set(["RAND", "RANDBETWEEN"]);
const unsupported = new Set([
  "CLEARINTERVAL", "CLEARTIMEOUT", "LOADFILE", "LOADFORM", "LOADRECORDS", "REQUEST", "TIMESTAMP",
  "OPENEXTENSION", "RECOGNIZETEXT", "CONFIG", "CONFIGURE", "STORAGE", "CONFIRM", "PROMPT", "MESSAGEBOX",
]);
const sideEffects = new Set([
  "ALERT", "CONFIRM", "MESSAGEBOX", "OPENURL", "PROGRESS", "PROMPT",
  "SETASSIGNMENT", "SETCHOICEFILTER", "SETCHOICES", "SETCONFIGURATION",
  "SETDESCRIPTION", "SETDISABLED", "SETFORMATTRIBUTES", "SETGEOMETRY",
  "SETHIDDEN", "SETLABEL", "SETLOCATION", "SETMAXLENGTH", "SETMINLENGTH",
  "SETPROJECT", "SETPROJECTHIDDEN", "SETPROJECTREADONLY", "SETREADONLY",
  "SETREQUIRED", "SETRESULT", "SETSTATUS", "SETSTATUSFILTER",
  "SETSTATUSHIDDEN", "SETSTATUSREADONLY", "SETVALUE", "SHOWERRORS",
]);

function sourceNames() {
  return fs.readdirSync(functionsDir)
    .filter((name) => name.endsWith(".ts") && name !== "index.ts")
    .map((name) => name.slice(0, -3))
    .sort();
}

function parameterCount(source) {
  const file = ts.createSourceFile("function.ts", source, ts.ScriptTarget.Latest, true);
  let maximum = 0;
  let found = false;
  function visit(node) {
    if (ts.isFunctionDeclaration(node)
      && node.modifiers
      && node.modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword)
      && node.modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
      found = true;
      maximum = Math.max(maximum, node.parameters.length);
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  return found ? maximum : null;
}

function argsFor(name, arity, probe) {
  let args;
  if (probe === "blank") args = Array.from({ length: arity }, () => null);
  if (probe === "boundary") {
    if (name === "DATE") args = [1970, 1, 1];
    else if (name === "DATEADD" || name === "TIMEADD") args = ["2020-01-01", 0];
    else if (name === "GEOMETRYPOINT") args = [[0, 0]];
    else args = Array.from({ length: arity }, () => 0);
  }
  if (probe === "coercion") {
    if (name === "IF") args = [1, "yes", "no"];
    else if (name === "DATE") args = ["2020", "1", "2"];
    else args = Array.from({ length: arity }, () => "1");
  }
  if (!args) {
    if (name === "IF") args = [true, "yes", "no"];
    else if (name === "DATE") args = [2020, 1, 2];
    else if (name === "GEOMETRYPOINT") args = [[-82.6, 27.7]];
    else if (name === "SETVALUE") args = ["name", "Changed"];
    else if (name === "SETLOCATION") args = [27.7, -82.6];
    else args = Array.from({ length: arity }, (_, index) => index + 1);
  }
  if (arity === 0) return args;
  return args.slice(0, arity).concat(Array.from({ length: Math.max(0, arity - args.length) }, () => null));
}

function runProbe(adapter, name, args) {
  const actual = adapter.invoke(name, args, configureFor(name));
  const observed = sideEffects.has(name) ? actual.results : actual.error || actual.value;
  return normalize(observed);
}

function configureFor(name) {
  if (name === "DECIMALSEPARATOR") return { decimalSeparator: "." };
  if (name === "GROUPINGSEPARATOR") return { groupingSeparator: "," };
  if (name === "LOCALE") return { locale: "en_US" };
  if (name === "TIMEZONE") return { timeZone: "UTC" };
  return undefined;
}

const adapter = loadAdapter("legacy");
const cases = [];
const limitations = [];
const names = sourceNames();
for (const name of names) {
  const source = fs.readFileSync(path.join(functionsDir, `${name}.ts`), "utf8");
  const arity = parameterCount(source);
  const fn = global[name];
  if (unsupported.has(name) || typeof fn !== "function" || arity === null) {
    limitations.push({
      function: name,
      reason: arity === null
        ? "No exported default function declaration was found for deterministic arity discovery."
        : typeof fn !== "function"
        ? "Exported TypeScript compatibility surface is not installed as a legacy global."
        : "Host-dependent or intentionally unsupported in deterministic Node harness.",
    });
    continue;
  }
  for (const probe of ["normal", "coercion", "blank", "boundary"]) {
    const args = argsFor(name, arity, probe);
    const id = `matrix-${name.toLowerCase()}-${probe}`;
    const actual = adapter.invoke(name, args, configureFor(name));
    if (sideEffects.has(name) && actual.error) {
      limitations.push({
        function: name,
        reason: `Host callback is required for deterministic ${probe} probe: ${actual.error.message}`,
      });
      continue;
    }
    if (volatile.has(name)) {
      cases.push({
        id,
        function: name,
        args,
        expectedType: "number",
        finite: probe !== "blank",
        limitation: "volatile-result",
      });
      continue;
    }
    cases.push({
      id,
      function: name,
      args,
      configure: configureFor(name),
      expected: normalize(sideEffects.has(name) ? actual.results : actual.error || actual.value),
      observe: sideEffects.has(name) ? "results" : undefined,
    });
  }
}

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify({
  version: 1,
  description: "Generated deterministic probes for every legacy expression function file.",
  coverage: { functions: names.length, probesPerFunction: 4, cases: cases.length },
  limitations,
  cases,
}, null, 2)}\n`);
console.log(`Generated ${cases.length} cases for ${names.length} functions (${limitations.length} classified limitations).`);

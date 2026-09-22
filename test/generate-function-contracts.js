"use strict";

const fs = require("fs");
const path = require("path");
const { loadAdapter, normalize } = require("./contract-runner");

const root = path.join(__dirname, "..");
const functionsDir = path.join(root, "ts", "functions");
const output = path.join(__dirname, "contracts", "function-matrix.json");
const volatile = new Set(["RAND", "RANDBETWEEN"]);
const unsupported = new Set([
  "CLEARINTERVAL", "CLEARTIMEOUT", "LOADFILE", "LOADFORM", "LOADRECORDS", "REQUEST", "TIMESTAMP",
  "OPENEXTENSION", "RECOGNIZETEXT", "CONFIG", "CONFIGURE", "STORAGE",
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
  const declarations = [...source.matchAll(/export default function[^(]*\(([^)]*)\)/g)];
  return declarations.reduce((maximum, declaration) => {
    const parameters = declaration[1].trim();
    if (!parameters) return maximum;
    const count = parameters.split(",").length;
    return Math.max(maximum, count);
  }, 0);
}

function argsFor(name, arity, probe) {
  if (probe === "blank") return Array.from({ length: arity }, () => null);
  if (probe === "boundary") {
    if (name === "DATE") return [1970, 1, 1];
    if (name === "DATEADD" || name === "TIMEADD") return ["2020-01-01", 0];
    if (name === "GEOMETRYPOINT") return [[0, 0]];
    return Array.from({ length: arity }, () => 0);
  }
  if (probe === "coercion") {
    if (name === "IF") return [1, "yes", "no"];
    if (name === "DATE") return ["2020", "1", "2"];
    return Array.from({ length: arity }, () => "1");
  }
  if (name === "IF") return [true, "yes", "no"];
  if (name === "DATE") return [2020, 1, 2];
  if (name === "GEOMETRYPOINT") return [[-82.6, 27.7]];
  if (name === "SETVALUE") return ["name", "Changed"];
  if (name === "SETLOCATION") return [27.7, -82.6];
  return Array.from({ length: arity }, (_, index) => index + 1);
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
for (const name of sourceNames()) {
  const source = fs.readFileSync(path.join(functionsDir, `${name}.ts`), "utf8");
  const arity = parameterCount(source);
  const fn = global[name];
  if (unsupported.has(name) || typeof fn !== "function") {
    limitations.push({
      function: name,
      reason: typeof fn !== "function"
        ? "Exported TypeScript compatibility surface is not installed as a legacy global."
        : "Host-dependent or intentionally unsupported in deterministic Node harness.",
    });
    continue;
  }
  for (const probe of ["normal", "coercion", "blank", "boundary"]) {
    const args = argsFor(name, arity, probe);
    const id = `matrix-${name.toLowerCase()}-${probe}`;
    if (volatile.has(name)) {
      cases.push({ id, function: name, args, expectedType: "number", limitation: "volatile-result" });
      continue;
    }
    cases.push({
      id,
      function: name,
      args,
      configure: configureFor(name),
      expected: runProbe(adapter, name, args),
      observe: sideEffects.has(name) ? "results" : undefined,
    });
  }
}

fs.writeFileSync(output, `${JSON.stringify({
  version: 1,
  description: "Generated deterministic probes for every legacy expression function file.",
  coverage: { functions: sourceNames().length, probesPerFunction: 4, cases: cases.length },
  limitations,
  cases,
}, null, 2)}\n`);
console.log(`Generated ${cases.length} cases for ${sourceNames().length} functions (${limitations.length} classified limitations).`);

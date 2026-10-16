"use strict";

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const deployScript = path.join(root, "script", "deploy");
const workflow = fs.readFileSync(
  path.join(root, ".github", "workflows", "expression-migration-gates.yml"),
  "utf8"
);
assert.match(workflow, /^  pull_request:$/m);
assert.match(workflow, /^  push:\n    branches:\n      - main$/m);
assert.match(workflow, /^  migration-gates:\n    name: Expression migration gates$/m);
assert.match(workflow, /^  deploy-production:\n    name: Deploy to S3 \(main only\)\n    needs: migration-gates\n    if: success\(\) && github\.event_name == 'push' && github\.ref == 'refs\/heads\/main'$/m);
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "expression-deploy-test-"));
const binDirectory = path.join(temporaryRoot, "bin");
const callLog = path.join(temporaryRoot, "aws-calls.jsonl");
const awsStub = path.join(binDirectory, "aws");
fs.mkdirSync(binDirectory);
fs.writeFileSync(awsStub, [
  `#!${process.execPath}`,
  "const fs = require('fs');",
  "fs.appendFileSync(process.env.AWS_CALL_LOG, `${JSON.stringify(process.argv.slice(2))}\\n`);",
  "",
].join("\n"), { mode: 0o755 });

function invokeDeploy(args, user) {
  fs.writeFileSync(callLog, "");
  const result = spawnSync(deployScript, args, {
    cwd: root,
    encoding: "utf8",
    env: {
      ...process.env,
      AWS_CALL_LOG: callLog,
      PATH: `${binDirectory}${path.delimiter}${process.env.PATH}`,
      USER: user,
    },
  });
  if (result.error) throw result.error;
  return {
    status: result.status,
    output: result.stdout + result.stderr,
    calls: fs.readFileSync(callLog, "utf8").trim().split("\n").filter(Boolean).map(JSON.parse),
  };
}

function assertUploads(result, bucket) {
  const s3Uploads = result.calls.filter((call) => call[0] === "s3" && call[1] === "cp");
  const targets = s3Uploads.map((call) => call[call.length - 1]);
  assert.deepStrictEqual(targets, [
    `s3://${bucket}/expv1/legacy/expressions.js`,
    `s3://${bucket}/expv1/hybrid/expressions.js`,
    `s3://${bucket}/expv1/expressions-proxy.js`,
    `s3://${bucket}/expv1/expressions.html`,
  ]);
  assert.ok(!targets.includes(`s3://${bucket}/expv1/expressions.js`));
  assert.ok(!result.output.includes(`Deployed https://${bucket}.s3.amazonaws.com/expv1/expressions.js\n`));
}

try {
  const preview = invokeDeploy([], "expression-preview-test");
  assert.strictEqual(preview.status, 0, preview.output);
  assertUploads(preview, "fulcrumapp-world-expression-preview-test");
  assert.ok(!preview.calls.some((call) => call[0] === "cloudfront"));

  const production = invokeDeploy(["production", "--yes"], "expression-preview-test");
  assert.strictEqual(production.status, 0, production.output);
  assertUploads(production, "fulcrum-assets");
  assert.deepStrictEqual(
    production.calls.filter((call) => call[0] === "cloudfront"),
    [["cloudfront", "create-invalidation", "--distribution-id", "E1ONQRALSE0LBO", "--paths", "/expv1/*"]]
  );

  const obsoleteOption = invokeDeploy(["--skip-compatibility"], "expression-preview-test");
  assert.strictEqual(obsoleteOption.status, 2);
  assert.match(obsoleteOption.output, /Unknown option: --skip-compatibility/);

  console.log("Deployment path checks passed: preview and production publish both channels and sandbox assets only; compatibility upload is impossible.");
} finally {
  fs.rmSync(temporaryRoot, { recursive: true, force: true });
}

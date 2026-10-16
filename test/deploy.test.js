"use strict";

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const yaml = require("js-yaml");

const root = path.resolve(__dirname, "..");
const deployScript = path.join(root, "script", "deploy");
const workflow = yaml.load(fs.readFileSync(
  path.join(root, ".github", "workflows", "expression-migration-gates.yml"),
  "utf8"
));
assert.ok(
  Object.prototype.hasOwnProperty.call(workflow.on, "pull_request"),
  "migration gates must run for pull requests"
);
assert.deepStrictEqual(workflow.on.push.branches, ["main"]);
assert.strictEqual(workflow.jobs["migration-gates"].name, "Expression migration gates");
assert.strictEqual(workflow.jobs["deploy-production"].name, "Deploy to S3 (main only)");
assert.strictEqual(workflow.jobs["deploy-production"].needs, "migration-gates");
assert.strictEqual(
  workflow.jobs["deploy-production"].if,
  "success() && github.event_name == 'push' && github.ref == 'refs/heads/main'"
);
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
  const env = {
    ...process.env,
    AWS_CALL_LOG: callLog,
    PATH: `${binDirectory}${path.delimiter}${process.env.PATH}`,
  };
  if (user === undefined) delete env.USER;
  else env.USER = user;
  const result = spawnSync(deployScript, args, {
    cwd: root,
    encoding: "utf8",
    env,
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
    `s3://${bucket}/expv1/legacy/expressions.html`,
    `s3://${bucket}/expv1/hybrid/expressions.html`,
    `s3://${bucket}/expv1/expressions-proxy.js`,
    `s3://${bucket}/expv1/expressions.html`,
  ]);
  s3Uploads.forEach((call) => {
    const target = call[call.length - 1];
    const source = call[call.length - 2];
    const relativePath = target.split("/expv1/")[1];
    assert.strictEqual(path.resolve(source), path.join(root, "dist", relativePath));
    assert.strictEqual(
      call[call.indexOf("--content-type") + 1],
      target.endsWith(".html") ? "text/html" : "application/javascript",
      `incorrect content type for ${target}`
    );
    assert.strictEqual(call[call.indexOf("--acl") + 1], "public-read");
    assert.strictEqual(
      call[call.indexOf("--cache-control") + 1],
      "no-cache, no-store, max-age=0, must-revalidate"
    );
    assert.strictEqual(call[call.indexOf("--expires") + 1], "Mon, 01 Jan 1990 00:00:00 GMT");
    if (target.endsWith(".html")) {
      const html = fs.readFileSync(source, "utf8");
      assert.strictEqual(html, fs.readFileSync(path.join(root, relativePath), "utf8"));
      const scripts = Array.from(html.matchAll(/<script src="([^"]+)"><\/script>/g),
        (match) => match[1]).filter((src) => !src.startsWith("https://"));
      const channelPage = relativePath.includes("/");
      assert.deepStrictEqual(scripts, [
        "expressions.js",
        channelPage ? "../expressions-proxy.js" : "expressions-proxy.js",
      ]);
      const pageUrl = new URL(`/expv1/${relativePath}`, `https://${bucket}.s3.amazonaws.com`);
      assert.deepStrictEqual(scripts.map((src) => new URL(src, pageUrl).pathname), [
        channelPage ? `/expv1/${relativePath.split("/")[0]}/expressions.js` : "/expv1/expressions.js",
        "/expv1/expressions-proxy.js",
      ]);
      assert.ok(result.output.includes(`Deployed ${pageUrl.href}\n`));
    }
  });
  assert.ok(!targets.includes(`s3://${bucket}/expv1/expressions.js`));
  assert.ok(!result.output.includes(`Deployed https://${bucket}.s3.amazonaws.com/expv1/expressions.js\n`));
}

try {
  const preview = invokeDeploy([], "expression-preview-test");
  assert.strictEqual(preview.status, 0, preview.output);
  assertUploads(preview, "fulcrumapp-world-expression-preview-test");
  assert.ok(!preview.calls.some((call) => call[0] === "cloudfront"));

  for (const user of [undefined, ""]) {
    const fallback = invokeDeploy([], user);
    assert.strictEqual(fallback.status, 0, fallback.output);
    assertUploads(fallback, `fulcrumapp-world-${os.userInfo().username}`);
  }
  const explicitEnvironment = invokeDeploy(["explicit-preview"], undefined);
  assert.strictEqual(explicitEnvironment.status, 0, explicitEnvironment.output);
  assertUploads(explicitEnvironment, "fulcrumapp-world-explicit-preview");
  const emptyEnvironment = invokeDeploy([""], undefined);
  assert.strictEqual(emptyEnvironment.status, 2);
  assert.match(emptyEnvironment.output, /environment must not be empty/);
  assert.deepStrictEqual(emptyEnvironment.calls, []);

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

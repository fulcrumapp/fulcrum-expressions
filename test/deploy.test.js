"use strict";

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const yaml = require("js-yaml");
const { assertSandboxScripts } = require("../script/sandbox-scripts");

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
assert.deepStrictEqual(workflow.on.merge_group.types, ["checks_requested"]);
assert.ok(Object.prototype.hasOwnProperty.call(workflow.on, "create"));
const gates = workflow.jobs["migration-gates"];
const deployment = workflow.jobs["deploy-production"];
assert.strictEqual(gates.name, "Expression migration gates");
assert.strictEqual(gates.if, "github.event_name != 'create' || github.ref_type == 'tag'");
assert.strictEqual(gates.outputs.stable_release_tag, "${{ steps.release-tag.outputs.is_stable }}");
assert.strictEqual(deployment.name, "Deploy to S3 (release tag only)");
assert.strictEqual(deployment.needs, "migration-gates");
assert.strictEqual(
  deployment.if,
  "success() && github.event_name == 'create' && github.ref_type == 'tag' && needs.migration-gates.outputs.stable_release_tag == 'true'"
);
assert.strictEqual(
  workflow.jobs["build-and-test"].if,
  "always() && (github.event_name != 'create' || github.ref_type == 'tag')"
);
assert.strictEqual(gates.steps.find((step) => step.name === "Check out source").with.ref,
  "${{ github.event_name == 'create' && github.ref || github.sha }}");
assert.strictEqual(deployment.steps.find((step) => step.name === "Check out source").with.ref, "${{ github.ref }}");
assert.strictEqual(deployment.environment, "production");
assert.strictEqual(deployment.concurrency.group, "${{ github.repository }}-expression-production-deploy");
assert.strictEqual(deployment.concurrency["cancel-in-progress"], false);
assert.strictEqual(deployment.concurrency.queue, "max");
assert.strictEqual(deployment.steps.find((step) => step.name === "Publish legacy and hybrid bundles").run,
  "./script/deploy production --yes");

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

function optionValue(call, option, target) {
  const equalsOption = call.find((argument) => argument.startsWith(`${option}=`));
  if (equalsOption !== undefined) {
    const value = equalsOption.slice(option.length + 1);
    assert.ok(value.length > 0, `missing value for ${option} for ${target}`);
    return value;
  }
  const index = call.indexOf(option);
  assert.ok(index >= 0, `missing ${option} for ${target}`);
  assert.ok(index + 1 < call.length && !call[index + 1].startsWith("--"),
    `missing value for ${option} for ${target}`);
  return call[index + 1];
}

for (const option of ["--content-type", "--acl", "--cache-control", "--expires"]) {
  assert.throws(() => optionValue(["s3", "cp"], option, "test-target"),
    { message: `missing ${option} for test-target` });
  for (const suffix of [[], ["--another-option"]]) {
    assert.throws(() => optionValue(["s3", "cp", option, ...suffix], option, "test-target"),
      { message: `missing value for ${option} for test-target` });
  }
  assert.strictEqual(optionValue(["s3", "cp", option, "value"], option, "test-target"), "value");
  assert.strictEqual(optionValue(["s3", "cp", `${option}=value`], option, "test-target"), "value");
  assert.throws(() => optionValue(["s3", "cp", `${option}=`], option, "test-target"),
    { message: `missing value for ${option} for test-target` });
}

function assertUploads(result, bucket) {
  const s3Uploads = result.calls.filter((call) => call[0] === "s3" && call[1] === "cp");
  const targets = s3Uploads.map((call) => call[call.length - 1]);
  assert.deepStrictEqual(targets, [
    `s3://${bucket}/expv1/legacy/expressions.js`,
    `s3://${bucket}/expv1/hybrid/expressions.js`,
    `s3://${bucket}/expv1/expressions-proxy.js`,
    `s3://${bucket}/expv1/legacy/expressions.html`,
    `s3://${bucket}/expv1/hybrid/expressions.html`,
    `s3://${bucket}/expv1/expressions.html`,
  ]);
  s3Uploads.forEach((call) => {
    const target = call[call.length - 1];
    const source = call[call.length - 2];
    const relativePath = target.split("/expv1/")[1];
    const distPathSegments = relativePath.split("/");
    assert.strictEqual(path.resolve(source), path.join(root, "dist", ...distPathSegments));
    assert.strictEqual(
      optionValue(call, "--content-type", target),
      target.endsWith(".html") ? "text/html" : "application/javascript",
      `incorrect content type for ${target}`
    );
    assert.strictEqual(optionValue(call, "--acl", target), "public-read");
    assert.strictEqual(
      optionValue(call, "--cache-control", target),
      "no-cache, no-store, max-age=0, must-revalidate"
    );
    assert.strictEqual(optionValue(call, "--expires", target), "Mon, 01 Jan 1990 00:00:00 GMT");
    if (target.endsWith(".html")) {
      const html = fs.readFileSync(source, "utf8");
      assert.strictEqual(html, fs.readFileSync(path.join(root, ...distPathSegments), "utf8"));
      const channelPage = relativePath.includes("/");
      const scripts = assertSandboxScripts(html, [
        "expressions.js",
        channelPage ? "../expressions-proxy.js" : "expressions-proxy.js",
      ], { comparisonPage: !channelPage });
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
  const gitStub = path.join(binDirectory, "git");
  fs.writeFileSync(gitStub, [
    "#!/bin/sh",
    'if [ "$1" = ls-remote ]; then printf "%s" "$MOCK_GIT_TAGS";',
    'else printf "%s\\n" "$MOCK_GIT_HEAD"; fi',
    "",
  ].join("\n"), { mode: 0o755 });
  const tagStep = gates.steps.find((step) => step.id === "release-tag");
  assert.strictEqual(tagStep.if, "github.event_name == 'create' && github.ref_type == 'tag'");
  const sha = "a".repeat(40);
  const outputFile = path.join(temporaryRoot, "tag-output");
  function runTagStep(ref, head = sha) {
    fs.writeFileSync(outputFile, "");
    const result = spawnSync("bash", ["-e", "-o", "pipefail", "-c", tagStep.run], {
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${binDirectory}${path.delimiter}${process.env.PATH}`,
        GITHUB_REF: ref,
        GITHUB_SHA: sha,
        MOCK_GIT_HEAD: head,
        GITHUB_OUTPUT: outputFile,
      },
    });
    return { ...result, output: fs.readFileSync(outputFile, "utf8") };
  }
  for (const tag of ["v0.0.0", "v1.2.3", "v123.456.789"]) {
    const result = runTagStep(`refs/tags/${tag}`);
    assert.strictEqual(result.status, 0, result.stderr);
    assert.strictEqual(result.output, "is_stable=true\n");
  }
  for (const tag of ["1.2.3", "v01.2.3", "v1.02.3", "v1.2.03", "v1.2", "v1.2.3-rc.1", "v1.2.3+build", "v1.2.3\n"]) {
    const result = runTagStep(`refs/tags/${tag}`);
    assert.strictEqual(result.status, 0, result.stderr);
    assert.strictEqual(result.output, "is_stable=false\n", tag);
  }
  const movedTag = runTagStep("refs/tags/v1.2.3", "b".repeat(40));
  assert.notStrictEqual(movedTag.status, 0);
  assert.match(movedTag.stdout, /does not match the triggering commit/);
  assert.strictEqual(movedTag.output, "");
  const verifyDeployment = deployment.steps.find((step) => step.name === "Verify triggering tag").run;
  for (const [head, valid] of [[sha, true], ["b".repeat(40), false]]) {
    const result = spawnSync("bash", ["-e", "-o", "pipefail", "-c", verifyDeployment], {
      encoding: "utf8",
      env: { ...process.env, PATH: `${binDirectory}${path.delimiter}${process.env.PATH}`, GITHUB_SHA: sha, MOCK_GIT_HEAD: head },
    });
    assert.strictEqual(result.status === 0, valid);
  }
  const staleCheck = deployment.steps.find((step) => step.name === "Reject stale production release").run;
  assert.ok(deployment.steps.findIndex((step) => step.name === "Reject stale production release") <
    deployment.steps.findIndex((step) => step.name === "Publish legacy and hybrid bundles"));
  function runStaleCheck(refs, ref = "refs/tags/v1.2.3") {
    return spawnSync("bash", ["-e", "-o", "pipefail", "-c", staleCheck], {
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${binDirectory}${path.delimiter}${process.env.PATH}`,
        GITHUB_REF: ref,
        RUNNER_TEMP: temporaryRoot,
        MOCK_GIT_TAGS: refs.map((tag) => `${sha}\trefs/tags/${tag}\n`).join(""),
      },
    });
  }
  for (const refs of [
    ["v1.2.3"],
    ["v1.2.2", "v1.2.3", "v1.2.4-rc.1", "v01.2.4"],
    ["v1.2.3", "v0.999999999999999999999999.0"],
  ]) {
    const result = runStaleCheck(refs);
    assert.strictEqual(result.status, 0, result.stderr);
  }
  for (const refs of [
    ["v1.2.3", "v1.2.4"],
    ["v1.2.3", "v1.3.0"],
    ["v1.2.3", "v2.0.0"],
    ["v1.2.3", "v999999999999999999999999.0.0"],
    ["v1.2.2"],
    [],
  ]) {
    const result = runStaleCheck(refs);
    assert.notStrictEqual(result.status, 0, refs.join(", "));
  }

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

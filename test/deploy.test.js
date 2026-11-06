"use strict";

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const vm = require("vm");
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
assert.ok(!Object.prototype.hasOwnProperty.call(workflow.on, "push"));
assert.ok(Object.prototype.hasOwnProperty.call(workflow.on, "create"));
assert.ok(!Object.prototype.hasOwnProperty.call(workflow.on, "merge_group"));
const ci = yaml.load(fs.readFileSync(path.join(root, ".github", "workflows", "ci.yml"), "utf8"));
assert.deepStrictEqual(ci.on.push.branches, ["main"]);
assert.match(ci.jobs.ci.steps.find((step) => step.name === "Run build and expression migration gates").run,
  /yarn test:migration-gates/);
const gates = workflow.jobs["migration-gates"];
const deployment = workflow.jobs["deploy-production"];
const classifier = workflow.jobs["classify-tag"];
assert.strictEqual(classifier.if, "github.event_name == 'create' && github.ref_type == 'tag'");
assert.strictEqual(classifier.outputs.is_stable, "${{ steps.classify.outputs.is_stable }}");
assert.strictEqual(gates.name, "Expression migration gates");
assert.strictEqual(gates.needs, "classify-tag");
assert.strictEqual(gates.if, "${{ !cancelled() && (github.event_name == 'pull_request' || (github.event_name == 'create' && github.ref_type == 'tag' && needs.classify-tag.result == 'success' && needs.classify-tag.outputs.is_stable == 'true')) }}");
assert.strictEqual(gates.outputs.stable_release_tag, "${{ steps.release-tag.outputs.is_stable }}");
assert.strictEqual(deployment.name, "Deploy to S3 (release tag only)");
assert.strictEqual(deployment.needs, "migration-gates");
assert.strictEqual(
  deployment.if,
  "success() && github.event_name == 'create' && github.ref_type == 'tag' && needs.migration-gates.outputs.stable_release_tag == 'true'"
);
assert.ok(!workflow.jobs["build-and-test"]);
assert.ok(!workflow.jobs.tag);
assert.strictEqual(gates.steps.find((step) => step.name === "Check out source").with.ref,
  "${{ github.event_name == 'create' && github.ref || '' }}");
assert.strictEqual(deployment.steps.find((step) => step.name === "Check out source").with.ref, "${{ github.ref }}");
assert.strictEqual(deployment.environment, "production");
assert.strictEqual(deployment.concurrency.group, "${{ github.repository }}-expression-production-deploy");
assert.strictEqual(deployment.concurrency["cancel-in-progress"], false);
assert.strictEqual(deployment.concurrency.queue, "max");
assert.strictEqual(deployment.steps.find((step) => step.name === "Publish legacy and hybrid bundles").run,
  "./script/deploy production --yes");
assert.strictEqual(
  deployment.steps.find((step) => step.name === "Publish legacy and hybrid bundles").env.EXPRESSION_SANDBOX_ALLOWED_ORIGINS,
  "${{ vars.EXPRESSION_SANDBOX_ALLOWED_ORIGINS }}"
);

const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "expression-deploy-test-"));
const binDirectory = path.join(temporaryRoot, "bin");
const callLog = path.join(temporaryRoot, "aws-calls.jsonl");
const awsStub = path.join(binDirectory, "aws");
const deployedProxy = path.join(temporaryRoot, "deployed-expressions-proxy.js");
const trustedOrigins = ["https://web.example.com", "https://preview-a.example.com", "https://preview-b.example.com"];
fs.mkdirSync(binDirectory);
fs.writeFileSync(awsStub, [
  `#!${process.execPath}`,
  "const fs = require('fs');",
  "fs.appendFileSync(process.env.AWS_CALL_LOG, `${JSON.stringify(process.argv.slice(2))}\\n`);",
  "if (process.argv[process.argv.length - 1].endsWith('/expv1/expressions-proxy.js')) {",
  "  fs.copyFileSync(process.argv[process.argv.length - 2], process.env.DEPLOYED_PROXY);",
  "}",
  "",
].join("\n"), { mode: 0o755 });

function invokeDeploy(args, user, policy = JSON.stringify(trustedOrigins)) {
  fs.writeFileSync(callLog, "");
  const env = {
    ...process.env,
    AWS_CALL_LOG: callLog,
    DEPLOYED_PROXY: deployedProxy,
    PATH: `${binDirectory}${path.delimiter}${process.env.PATH}`,
  };
  if (policy === null) delete env.EXPRESSION_SANDBOX_ALLOWED_ORIGINS;
  else env.EXPRESSION_SANDBOX_ALLOWED_ORIGINS = policy;
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

function assertUploads(result, bucket, origins = trustedOrigins) {
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
    if (!target.endsWith("/expressions-proxy.js")) {
      assert.strictEqual(path.resolve(source), path.join(root, "dist", ...distPathSegments));
    }
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
  const configuredProxy = fs.readFileSync(deployedProxy, "utf8");
  assert.ok(configuredProxy.startsWith(`window.EXPRESSION_SANDBOX_ALLOWED_ORIGINS = ${JSON.stringify(origins)};\n`));
  assert.ok(configuredProxy.endsWith(fs.readFileSync(path.join(root, "dist", "expressions-proxy.js"), "utf8")));
  for (const senderOrigin of [...origins, "https://untrusted.example.com"]) {
    let listener;
    const replies = [];
    const parent = { postMessage: (data, origin) => replies.push({ data: JSON.parse(data), origin }) };
    const window = { parent, addEventListener: (_, fn) => { listener = fn; } };
    const runtime = {};
    vm.runInNewContext(configuredProxy, {
      window, URL, console, XMLHttpRequest: function () {}, $$runtime: runtime,
    });
    listener({
      source: parent, origin: senderOrigin, isTrusted: true,
      data: JSON.stringify({ name: "globals", globals: { locale: "en" }, id: 0 }),
    });
    if (origins.includes(senderOrigin)) {
      assert.strictEqual(runtime.locale, "en");
      assert.strictEqual(replies.length, 1);
      assert.strictEqual(replies[0].origin, senderOrigin);
      assert.strictEqual(replies[0].data.id, 0);
    } else {
      assert.strictEqual(runtime.locale, undefined);
      assert.strictEqual(replies.length, 0);
    }
  }
}

try {
  const gitStub = path.join(binDirectory, "git");
  fs.writeFileSync(gitStub, [
    "#!/bin/sh",
    'if [ "$1" = ls-remote ]; then printf "%s" "$MOCK_GIT_TAGS";',
    'elif [ "$2" = --verify ]; then printf "%s\\n" "$MOCK_GIT_TAG";',
    'else printf "%s\\n" "$MOCK_GIT_HEAD"; fi',
    "",
  ].join("\n"), { mode: 0o755 });
  const tagStep = gates.steps.find((step) => step.id === "release-tag");
  assert.strictEqual(tagStep.if, "github.event_name == 'create' && github.ref_type == 'tag'");
  const sha = "a".repeat(40);
  const outputFile = path.join(temporaryRoot, "tag-output");
  function runClassification(ref) {
    fs.writeFileSync(outputFile, "");
    const result = spawnSync("bash", ["-e", "-o", "pipefail", "-c",
      classifier.steps.find((step) => step.id === "classify").run], {
      encoding: "utf8", env: { ...process.env, GITHUB_REF: ref, GITHUB_OUTPUT: outputFile },
    });
    return { ...result, output: fs.readFileSync(outputFile, "utf8") };
  }
  function runTagStep(ref, head = sha, tag = sha) {
    fs.writeFileSync(outputFile, "");
    const result = spawnSync("bash", ["-e", "-o", "pipefail", "-c", tagStep.run], {
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${binDirectory}${path.delimiter}${process.env.PATH}`,
        GITHUB_REF: ref,
        GITHUB_SHA: sha,
        MOCK_GIT_HEAD: head,
        MOCK_GIT_TAG: tag,
        GITHUB_OUTPUT: outputFile,
      },
    });
    return { ...result, output: fs.readFileSync(outputFile, "utf8") };
  }
  for (const tag of ["v0.0.0", "v1.2.3", "v123.456.789"]) {
    const result = runTagStep(`refs/tags/${tag}`);
    assert.strictEqual(result.status, 0, result.stderr);
    assert.strictEqual(result.output, "is_stable=true\n");
    const classification = runClassification(`refs/tags/${tag}`);
    assert.strictEqual(classification.status, 0, classification.stderr);
    assert.strictEqual(classification.output, "is_stable=true\n");
  }
  for (const tag of ["1.2.3", "v01.2.3", "v1.02.3", "v1.2.03", "v1.2", "v1.2.3-rc.1", "v1.2.3+build", "v1.2.3\n"]) {
    const result = runTagStep(`refs/tags/${tag}`);
    assert.strictEqual(result.status, 0, result.stderr);
    assert.strictEqual(result.output, "is_stable=false\n", tag);
    const classification = runClassification(`refs/tags/${tag}`);
    assert.strictEqual(classification.status, 0, classification.stderr);
    assert.strictEqual(classification.output, "is_stable=false\n", tag);
  }
  const movedTag = runTagStep("refs/tags/v1.2.3", "b".repeat(40));
  assert.notStrictEqual(movedTag.status, 0);
  assert.match(movedTag.stdout, /does not match the triggering commit/);
  assert.strictEqual(movedTag.output, "");
  const movedRef = runTagStep("refs/tags/v1.2.3", sha, "b".repeat(40));
  assert.notStrictEqual(movedRef.status, 0);
  assert.strictEqual(movedRef.output, "");
  const verifyDeployment = deployment.steps.find((step) => step.name === "Verify triggering tag").run;
  for (const [head, tag, valid] of [[sha, sha, true], ["b".repeat(40), sha, false], [sha, "b".repeat(40), false]]) {
    const result = spawnSync("bash", ["-e", "-o", "pipefail", "-c", verifyDeployment], {
      encoding: "utf8",
      env: { ...process.env, PATH: `${binDirectory}${path.delimiter}${process.env.PATH}`, GITHUB_REF: "refs/tags/v1.2.3", GITHUB_SHA: sha, MOCK_GIT_HEAD: head, MOCK_GIT_TAG: tag },
    });
    assert.strictEqual(result.status === 0, valid);
  }
  const staleCheck = deployment.steps.find((step) => step.name === "Reject stale production release").run;
  assert.ok(deployment.steps.findIndex((step) => step.name === "Reject stale production release") <
    deployment.steps.findIndex((step) => step.name === "Publish legacy and hybrid bundles"));
  function runStaleCheck(refs, ref = "refs/tags/v1.2.3", raw = false) {
    return spawnSync("bash", ["-e", "-o", "pipefail", "-c", staleCheck], {
      cwd: root,
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${binDirectory}${path.delimiter}${process.env.PATH}`,
        GITHUB_REF: ref,
        GITHUB_SHA: sha,
        RUNNER_TEMP: temporaryRoot,
        MOCK_GIT_TAGS: raw ? refs : refs.map((tag) => `${sha}\trefs/tags/${tag}\n`).join(""),
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
  const other = "b".repeat(40);
  const currentRef = "refs/tags/v1.2.3";
  for (const [listing, valid] of [
    [`${sha}\t${currentRef}\n`, true],
    [`${other}\t${currentRef}\n`, false],
    [`${other}\t${currentRef}\n${sha}\t${currentRef}^{}\n`, true],
    [`${other}\t${currentRef}\n${other}\t${currentRef}^{}\n`, false],
    [`${sha}\t${currentRef}^{}\n`, false],
    [`${sha}\t${currentRef}\n${other}\t${currentRef}\n`, false],
    ["invalid remote output\n", false],
  ]) {
    const result = runStaleCheck(listing, currentRef, true);
    assert.strictEqual(result.status === 0, valid, `${listing}: ${result.stderr}`);
  }
  function realGit(args, cwd = root, input) {
    const result = spawnSync("git", args, { cwd, input, encoding: "utf8" });
    assert.strictEqual(result.status, 0, result.stderr);
    return result.stdout.trim();
  }
  const bare = path.join(temporaryRoot, "remote.git");
  const client = path.join(temporaryRoot, "client");
  const taggedSource = path.join(temporaryRoot, "tagged-source.git");
  const actualSha = realGit(["rev-parse", "HEAD"]);
  realGit(["init", "--bare", taggedSource]);
  realGit(["--git-dir", taggedSource, "fetch", "--no-tags", root, "HEAD:refs/heads/main"]);
  realGit(["--git-dir", taggedSource, "update-ref", "refs/tags/v99.0.0", actualSha]);
  realGit(["init", "--bare", bare]);
  realGit(["--git-dir", bare, "fetch", "--no-tags", taggedSource, "refs/heads/main:refs/tags/v1.2.3"]);
  realGit(["init", client]);
  realGit(["remote", "add", "origin", bare], client);
  function runAgainstRemote() {
    return spawnSync(process.execPath, [path.join(root, ".github/actions/npm-common/remote-tag.js"), "--reject-newer"], {
      cwd: client, encoding: "utf8",
      env: { ...process.env, RUNNER_TEMP: temporaryRoot, GITHUB_REF: currentRef, GITHUB_SHA: actualSha },
    });
  }
  const lightweight = runAgainstRemote();
  assert.strictEqual(lightweight.status, 0, lightweight.stderr);
  const tagObject = realGit(["--git-dir", bare, "hash-object", "-t", "tag", "-w", "--stdin"], root,
    `object ${actualSha}\ntype commit\ntag v1.2.3\ntagger Test <test@example.com> 0 +0000\n\nrelease\n`);
  realGit(["--git-dir", bare, "update-ref", currentRef, tagObject]);
  const annotated = runAgainstRemote();
  assert.strictEqual(annotated.status, 0, annotated.stderr);
  realGit(["--git-dir", bare, "update-ref", "refs/tags/v1.2.4", actualSha]);
  assert.notStrictEqual(runAgainstRemote().status, 0);

  const preview = invokeDeploy([], "expression-preview-test");
  assert.strictEqual(preview.status, 0, preview.output);
  assertUploads(preview, "fulcrumapp-world-expression-preview-test");
  assert.ok(!preview.calls.some((call) => call[0] === "cloudfront"));

  const localOrigins = ["http://localhost:3000", "http://127.0.0.1:3000", "http://[::1]:3000"];
  const local = invokeDeploy(["local-test"], undefined, JSON.stringify(localOrigins));
  assert.strictEqual(local.status, 0, local.output);
  assertUploads(local, "fulcrumapp-world-local-test", localOrigins);

  for (const policy of [null, "", "not-json", "[]", '["*"]',
    '["https://web.example.com/path"]', '["https://web.example.com","https://*.example.com"]',
    '["http://web.example.com"]', '["https://web.example.com","http://preview.example.com"]']) {
    const invalid = invokeDeploy(["production", "--yes"], "expression-preview-test", policy);
    assert.notStrictEqual(invalid.status, 0, `invalid policy: ${policy}`);
    assert.match(invalid.output, /EXPRESSION_SANDBOX_ALLOWED_ORIGINS/);
    assert.deepStrictEqual(invalid.calls, [], "invalid policy must not upload any assets");
  }

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

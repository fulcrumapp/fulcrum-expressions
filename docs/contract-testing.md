# Expression contract testing

`test/contracts/expressions.json` is the hand-curated deterministic behavioral
corpus for the current expression runtime. The generated
`test/contracts/function-matrix.json` adds four probes (normal, coercion,
blank/null, and boundary) for every function source file in `ts/functions`.
Together they intentionally live beside, rather than replace, the existing
CoffeeScript unit suite.

Run the baseline suite with:

```sh
yarn test:contracts
```

`yarn test:contracts` runs the hand-curated and generated cases. Use
`yarn test:contracts:check` as the CI-equivalent check when the generated
fixture is already present; `yarn test:contracts:generate` updates the fixture
intentionally from the checked-in legacy runtime. The matrix records 27
classified limitations for host-only, time-dependent, or TypeScript-only surfaces;
these are reported in the fixture and are not silently omitted.
Generation always loads CoffeeScript source, even when release bundles exist.
The default runner and `--runtime legacy-source` always use current CoffeeScript
source. `--runtime legacy` and `--runtime hybrid` require their respective built
channel bundles and fail if missing; they never silently fall back to source.

The runner normalizes dates, `undefined`, `NaN`, errors, functions, circular
objects, nested objects, and arrays before comparison. This keeps the contract
portable across compatible implementations while preserving meaningful result
shapes. A runtime adapter provides `invoke(name, args, configure)` and `lifecycle()`.
The two invalid-input `CLEAN` probes assert the `TypeError` name and a narrowly
anchored message pattern because mangling changes the receiver identifier in
engine-generated messages. Hybrid-versus-legacy differential checks still compare
the complete normalized errors exactly.
`invoke` returns `{ value, results }` on success, `{ error, results }` when an
expression throws, and throws for an unknown expression name. The lifecycle
probe reports the required runtime and expression globals. To run a custom
adapter with the harness, pass its module path:

```sh
node test/contract-runner.js --runtime ./path/to/adapter.js --compare legacy
```

The built legacy and hybrid adapters use the same contract. Hybrid runs in an
isolated JavaScript context so its globals do not overwrite legacy state.

Run `yarn test:contracts:legacy` and `yarn test:contracts:hybrid` to report
contract results by function group. The hybrid command compares each
deterministic result with legacy; cases marked `volatile-result` are checked
against their declared result shape but not for exact values. Failures include
the channel, function group, case ID, and assertion message. `yarn test:migration-gates`
also runs CoffeeScript tests, the strict isolated migration typecheck, and
the unified runtime/sandbox/public-typings build, public declaration checks,
and deterministic build integrity checks.

`yarn test:types` generates public API declarations through `make types` and
checks their syntax, complete expression-name inventory, public-only module
scope, representative TypeScript consumers, and byte-identical regeneration.
The generator excludes test helpers/fixtures and runtime/host internals from
declaration output. CI also rejects stale checked-in `ts/api.ts` content.
Declaration generation and these consumer checks do not replace the strict
migration-owned check or claim the existing project-wide TypeScript baseline
passes.

Automated gates are necessary but do not establish application-runtime acceptance.
The [migration roadmap](typescript-migration-roadmap.md#phase-1b-rails-consumer-readiness-task-7-prerequisite)
requires minimum Rails consumer integration and exercised selection, lifecycle,
host wiring, fallback and rollback before Phase 2 batches are exposed. That
integration is separate Rails work and is not implemented by this harness.
Release and debug builds package `dist/hybrid/expressions.html` and
`dist/legacy/expressions.html`, deployed at `/expv1/hybrid/expressions.html`
and `/expv1/legacy/expressions.html`. Each loads adjacent `expressions.js`
followed by shared `../expressions-proxy.js`; the original `expressions.html`
comparison page is unchanged.
`yarn build:verify` checks both modes for exact channel inventories, page
contents and script order, local dependency resolution, unchanged comparison
HTML, and stable repeated-build hashes including the shared proxy.
`yarn test:deploy` uses an AWS stub to verify preview/production endpoint
targets, page contents, URL resolution, `text/html`, preserved bundle/proxy
uploads, and no upload to frozen `/expv1/expressions.js`.
These checks do not deploy assets or establish live endpoint availability.
After deployment, verify endpoint loading and browser/host behavior separately.
Rails must select those HTML URLs under the flag/fallback, not only identify a
JavaScript channel. Rails wiring remains unimplemented in this repository;
packaging and URL-resolution checks do not satisfy consumer acceptance.

Each gated TypeScript batch is released in hybrid alongside complete legacy,
then exercised through `hybrid/expressions.html` and the real deployed hybrid
runtime in the flagged application
runtime. Record the release/channel and affected expression flows, values/errors,
lifecycle and host effects; review acceptance before advancing to another batch.
Problems require rollback to legacy and correction/revalidation, not postponing
runtime use until migration ends. Rails owns release selection:
`expressions-ts-migration=true` selects hybrid, while `false` or an unreadable
flag selects legacy. This repository does not evaluate the flag or target
customers. Requiring the CI status check in branch protection is a separate
repository-administrator setting.

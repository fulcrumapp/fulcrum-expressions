# TypeScript Expressions migration roadmap

The migration is designed for incremental adoption: keep the complete
CoffeeScript runtime available while TypeScript implementations are added in
bounded batches and exposed through a hybrid release. The roadmap follows the
original task IDs for traceability, but not their original execution order:
tasks 1–3 establish the release and gate foundation, the minimum Rails consumer
integration from task 7 is a prerequisite to exposing Phase 2 batches, and
tasks 4–6 migrate, release, and validate each batch in the application runtime.
Publishing bundles or passing isolated contracts alone is not runtime acceptance.
This plan does not imply that consumer integration or migration is complete.

## Phase 1: Build and gate legacy and hybrid releases (tasks 1–3)

**Deliverables**

- Define one adapter contract for legacy and hybrid execution, including
  invocation inputs/results/errors and any lifecycle probe needed for parity
  tests. The [contract-testing guide](contract-testing.md) describes the
  existing behavioral corpus and adapter comparison approach.
- Build and deploy two independently addressable channels together for each
  migration release:
  `dist/legacy/expressions.js` and `dist/hybrid/expressions.js`. The legacy
  channel is the complete current CoffeeScript runtime. The hybrid channel
  starts from that same complete runtime and applies only TypeScript function
  overrides; a TypeScript function replaces its same-named CoffeeScript
  function, while every function without an override remains CoffeeScript.
  Keep `dist/expressions.js` as the backwards-compatible legacy entry point.
- Keep the migration-owned TypeScript check strict and isolated, with an
  explicit source/dependency closure. Diagnostics in that closure block the
  hybrid build. The existing project-wide `ts/tsconfig.json` check has baseline
  diagnostics; do not make legacy output depend on it or describe it as a
  passing check.
- Establish per-batch CI gates for legacy contracts, hybrid contracts,
  unchanged-function differential checks, and focused parity checks for
  migrated functions. Report outcomes by function group; failures must block
  the batch and include actionable logs.

The overlay is based on explicit same-name function overrides, not a separate
migration manifest or a wholesale runtime rewrite. Build-integrity checks
should verify both channel entry points, expected artifacts, the legacy
compatibility entry point, and stable artifact inventories across repeated
builds.

**Phase 1 readiness:** the adapter contract is usable by both channels; one
build produces and deploys independently loadable legacy and hybrid artifacts;
migration TypeScript diagnostics are isolated and blocking; and the CI gate
foundation reports actionable per-batch results for the required gate
categories.

## Phase 1b: Rails consumer readiness (task 7 prerequisite)

Before Phase 2 migrated batches are exposed, implement and exercise the minimum
consumer integration in the Rails repository. This is separate implementation
work, not work deferred until expression migration finishes:

- This repository packages parallel sandbox HTML outputs in release
  and debug builds and includes them in both deployment paths. It does not rewrite the original
  `expressions.html` or replace its frozen root runtime:

  | Build output | Production URL | Relative scripts, in load order |
  | --- | --- | --- |
  | `dist/hybrid/expressions.html` | `https://assets.fulcrumapp.com/expv1/hybrid/expressions.html` | `expressions.js`, `../expressions-proxy.js` |
  | `dist/legacy/expressions.html` | `https://assets.fulcrumapp.com/expv1/legacy/expressions.html` | `expressions.js`, `../expressions-proxy.js` |

  Channel-local pages load their adjacent runtime and reuse the existing root
  proxy through `../expressions-proxy.js`. The original
  `/expv1/expressions.html` continues loading `expressions.js` and
  `expressions-proxy.js` as the frozen-runtime comparison sandbox. Preserve
  its contents; adding parallel pages must not change baseline selection.
  Build integrity checks verify release/debug pages, ordered script paths,
  dependency resolution, unchanged comparison HTML, and stable inventories.
  Preview and production deployment upload both pages with `text/html`; AWS-stub
  tests check targets, contents, and metadata without publishing anything.
  These checks establish packaging and deployment behavior, not live endpoint
  availability or browser/host acceptance; verify those after deployment.
- Load the real deployed hybrid channel when `expressions-ts-migration` is
  `true` by selecting the hybrid sandbox URL in Rails' expression sandbox URL
  configuration; select the legacy sandbox URL when it is `false` or
  unreadable. Verify both endpoints load their intended runtime and proxy,
  with correct URL resolution locally and after deployment. Verify the selected
  artifact is actually executing expressions, not the original comparison
  sandbox or an isolated test adapter.
- Wire the required application adapter, initialization, host callbacks,
  expression invocation/completion, and startup fallback behavior. Necessary
  lifecycle and fallback behavior cannot be postponed as optional hardening.
- Exercise rollback to the complete legacy channel and record reviewable
  application-runtime results for selection, host effects, and fallback.
  The empty-override hybrid can verify this wiring before any expression is
  migrated; it is not evidence that future TypeScript functions are accepted.

**Readiness prerequisite:** the Rails integration is implemented and exercised
against both deployed channel sandbox endpoints, with evidence of flag selection, lifecycle/host
behavior, fallback and rollback. This is not implemented or demonstrated by the
Phase 1 build/gate work in this repository. Until it is ready, do not expose
migrated batches or count channel publication as application-runtime use.

## Phase 2: Migrate deterministic batches (tasks 4–6)

After Phase 1b readiness, migrate cohesive, deterministic groups in bounded batches. For each
batch, add only the intended TypeScript functions to the hybrid override set;
verify those exports are present and that functions without overrides continue
to use the legacy implementation. Do not remove or reduce the complete
CoffeeScript implementation from the legacy channel.

Every batch must have evidence from all required gate categories before it is
merged or released:

- The legacy and hybrid contract suites pass.
- Differential checks find no regressions in unchanged functions.
- Focused parity checks for migrated functions pass, including output/result
  shape and host effects such as side-effect ordering and idempotency where
  applicable.
- Lifecycle checks cover relevant initialization, invocation, and completion
  behavior, not just pure-function return values. Deterministic cases are
  compared with legacy; volatile results still meet their declared
  result-shape/type expectations.
- Hybrid overlay validation rejects missing or unexpected overrides. Failures
  block the batch and provide actionable CI output; assertions are not relaxed
  to make a batch pass.

After the automated gates pass, release that batch in hybrid alongside complete
legacy and exercise `hybrid/expressions.html` and its deployed hybrid runtime
through the flagged Rails application. Record the release identity, selected sandbox URL/channel, affected expression
flows, observed values/errors, lifecycle and host effects, and comparison with
legacy. Review those results before advancing to the next batch. If problems
appear, roll back selection to legacy and correct and revalidate the batch;
do not accumulate unobserved batches behind the flag.

**Per-batch acceptance:** the intended override set is explicit, all required
gate categories pass, the hybrid preserves legacy fallback for other functions,
and actual flagged application-runtime use has reviewable accepted results.
Isolated contract success and publication alone do not satisfy this acceptance.
Completion does not trigger a global default switch or remove legacy rollback.

## Later adoption and optional hardening

Broader default adoption, retirement of legacy paths, and hardening beyond the
minimum Phase 1b selection/lifecycle/host/fallback requirements can be separately
approved later. They are not a final promotion dependency for exercising Phase 2
batches. Rails implementation remains outside this repository; its prerequisite
timing does not authorize Rails changes in the Phase 1 expressions PR.

## Release selection, rollback, and scope

Rails owns the `expressions-ts-migration` flag and release selection:
`true` selects the hybrid channel; `false` selects legacy; an unreadable flag
defaults to legacy. For each migration release, the expressions repository
publishes both independently addressable channels. Rails can roll back affected
customers by selecting the complete legacy release; both channels are already
available, so this does not require rebuilding. The rollback is channel-wide,
not a per-function switch. The workflow can fail a batch on gate errors;
requiring its status check in branch protection is a separate repository
settings decision.

Keep the complete legacy channel available throughout migration. The original
production `/expv1/expressions.js` object remains frozen for comparison; neither
manual nor automated deployment replaces it. Local `dist/expressions.js` remains
a compatibility build artifact. Existing sandbox HTML continues loading the
frozen object; Rails must select a parallel channel sandbox URL rather than
rewrite that original HTML. Parallel pages are packaged and included in
deployment by this repository; Rails selection and application-runtime
acceptance remain separate, unimplemented consumer work.

This plan does not delete legacy runtime paths during migration, broaden
expression behavior beyond parity-targeted changes, or implement Rails
integration work in the expressions repository. The migration proceeds by
passing batches; it does not define a one-time final promotion gate.

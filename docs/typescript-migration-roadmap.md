# TypeScript expressions migration roadmap

The migration is designed for incremental adoption: keep the complete
CoffeeScript runtime available while TypeScript implementations are added in
bounded batches and exposed through a hybrid release. The roadmap follows the
seven-task sequence in the migration plan: tasks 1–3 establish the release and
gate foundation, tasks 4–6 migrate and release batches, and task 7 is a deferred
Rails follow-on. It does not imply that planned work is complete.

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

## Phase 2: Migrate deterministic batches (tasks 4–6)

Migrate cohesive, deterministic function groups in bounded batches. For each
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

Include each passing batch in the hybrid release as it is merged and released,
while publishing the complete legacy release alongside it. This is an
incremental release model, not a single promotion after all TypeScript work is
finished. The same per-batch gates apply throughout migration.

**Per-batch acceptance:** the intended override set is explicit, all required
gate categories pass with reviewable evidence, and the hybrid preserves legacy
fallback behavior for functions not in that batch. Completion of a batch does
not itself trigger a global default switch or remove the legacy rollback path.

## Phase 3: Rails runtime integration (task 7; deferred)

After the expressions migration work, a separate Rails follow-on may update the
application runtime integration: the adapter seam, startup fallback, and
server-side flag handling/hardening. This work is explicitly deferred and
outside this repository's implementation scope. The expressions package builds
and deploys both channels; it does not evaluate LaunchDarkly flags, target
customers, or implement Rails startup fallback.

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

This plan does not delete legacy runtime paths during migration, broaden
expression behavior beyond parity-targeted changes, or implement Rails
integration work in the expressions repository. The migration proceeds by
passing batches; it does not define a one-time final promotion gate.

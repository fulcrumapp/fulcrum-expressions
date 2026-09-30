# Proposal

## Why

Contract-test setup is already complete (905-case contracts, legacy suite green, and review hardening closed), so the plan should optimize for low-risk rollout rather than baseline creation. We will build side-by-side from the start—full legacy and hybrid artifacts produced in early implementation—so migration can proceed incrementally with immediate rollback options.

## What Changes

- Record completed setup explicitly: legacy contract framework complete; contract corpus expanded to 905 cases (18 baseline + 887 matrix); legacy suite remains passing; Copilot review hardening findings resolved.
- Make **dual publish** the primary strategy from the beginning:
  - publish `dist/legacy/*` as the complete current CoffeeScript build
  - publish `dist/hybrid/*` as the complete current CoffeeScript build plus a separately compiled TypeScript overlay; for any function name present in both, the TypeScript implementation overrides the CoffeeScript implementation
  - build and deploy both independently addressable releases together for each migration release
  - Rails owns the LaunchDarkly `expressions-ts-migration` flag and selects which release to use: `true` selects hybrid; `false` selects legacy
  - if Rails cannot read the flag, it treats the value as `false` and selects legacy
- Apply the existing automated CI/test gates to each migrated batch. Once a batch passes and is merged/released, that batch is present in the hybrid release; there is no separate final production-promotion event for the entire migration.
- Sequence work and PR layers around safety-gated slices:
  - **1** define the shared adapter contract
  - **2** enable TS skeleton packaging and side-by-side artifacts
  - **3** add CI contract, differential, and gate-reporting jobs against both channels
  - **4** route deterministic parity batches (iterative TS migration)
  - **5** validate host effects + lifecycle parity
  - **6** verify each merged/released batch is included in the hybrid release while preserving the complete legacy release
- Run or extend CI gate coverage only after both legacy and hybrid artifacts are buildable; the gates apply to each migrated batch, not to a one-time end-of-migration channel promotion.
- Treat the existing project-wide TypeScript compiler errors as a known baseline, not as a passing check: hybrid build validation must use a strict, isolated TypeScript project for migration-owned sources and must not silently suppress or misreport existing diagnostics.
- Require the automated gates for each migrated batch before merge/release:
  - legacy contract suite passes
  - hybrid contract suite passes
  - differential checks legacy full vs hybrid unchanged functions
  - focused parity tests for migrated functions, including host-effect and result-shape parity

## Capabilities

### New Capabilities

- `ts-hybrid-rollout`: Defines required rollout behavior for side-by-side legacy/hybrid releases, deterministic per-function routing, per-batch automated gates, and rollback rules during incremental TypeScript migration.

### Modified Capabilities

- None.

## Impact

- Affected artifacts: side-by-side builds and release artifacts consumed by the Rails application. The LaunchDarkly flag and release selection are Rails-owned and are not implemented in this repository.
- Delivery impact: supports incremental migration with rollback path and explicit automated gates for each batch.
- Release impact: requires explicit bundle layout (`dist/legacy/*`, `dist/hybrid/*`) and both releases to be published together for each migration release.
- Rails integration contract: `expressions-ts-migration=true` selects the hybrid release; `false` selects the legacy release. If the flag cannot be read, Rails defaults to `false`. Rails owns LaunchDarkly configuration and release selection.

# Proposal

## Why

Contract-test setup is already complete (905-case contracts, legacy suite green, and review hardening closed), so the plan should optimize for low-risk rollout rather than baseline creation. We will build side-by-side from the start—full legacy and hybrid artifacts produced in early implementation—so migration can proceed incrementally with immediate rollback options.

## What Changes

- Record completed setup explicitly: legacy contract framework complete; contract corpus expanded to 905 cases (18 baseline + 887 matrix); legacy suite remains passing; Copilot review hardening findings resolved.
- Make **dual publish** the primary strategy from the beginning:
  - publish `dist/legacy/*` as full authoritative CoffeeScript build
  - publish `dist/hybrid/*` as legacy runtime shell plus completed TypeScript implementations
  - feature flag selects legacy vs hybrid at runtime (in Rails app)
- Encode rollback path: switch selector to full legacy bundle
- Sequence work and PR layers around safety-gated slices:
  - **1** adapter contract + CI gates
  - **2** TS skeleton behind adapter with side-by-side artifact builds enabled
  - **3** parity batches (iterative TS migration)
  - **4** host effects + lifecycle parity
  - **5** promote TS/hybrid channel to production default (remove feature flag)
- Require gates per migrated slice:
  - legacy contract suite passes
  - hybrid contract suite passes
  - differential checks legacy full vs hybrid unchanged functions
  - focused parity tests for migrated functions, including host-effect and result-shape parity

## Capabilities

### New Capabilities

- None. All capabilities should remain in parity during migration.

### Modified Capabilities

- None. All capabilities should remain in parity during migration.

## Impact

- Affected artifacts: side-by-side builds and feature flag operations.
- Delivery impact: supports incremental migration with rollback path and explicit promotion gates.
- Release impact: requires explicit bundle layout (`dist/legacy/*`, `dist/hybrid/*`) and flag loader selection.

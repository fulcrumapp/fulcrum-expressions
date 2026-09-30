# Proposal

## Why

Contract-test setup is already complete (905-case contracts, legacy suite green, and review hardening closed), so the plan should optimize for low-risk rollout rather than baseline creation. We will build side-by-side from the start—full legacy and hybrid artifacts produced in early implementation—so migration can proceed incrementally with immediate rollback options.

## What Changes

- Record completed setup explicitly: legacy contract framework complete; contract corpus expanded to 905 cases (18 baseline + 887 matrix); legacy suite remains passing; Copilot review hardening findings resolved.
- Make **dual publish** the primary strategy from the beginning:
  - publish `dist/legacy/*` as the complete current CoffeeScript build
  - publish `dist/hybrid/*` as the complete current CoffeeScript build plus a separately compiled TypeScript overlay; for any function name present in both, the TypeScript implementation overrides the CoffeeScript implementation
  - before production promotion, legacy remains the default; after gate-approved promotion, hybrid is the production default
  - evaluate an operational rollback flag before runtime startup; when enabled for a customer, it selects that customer's complete legacy bundle instead of hybrid, without changing either artifact
- Keep the operational rollback flag available after hybrid becomes the production default; it redirects affected customers to legacy while an issue is investigated and fixed.
- Sequence work and PR layers around safety-gated slices:
  - **1** define the shared adapter contract
  - **2** enable TS skeleton packaging, side-by-side artifacts, and channel selection
  - **3** add CI contract, differential, and gate-reporting jobs against both channels
  - **4** route deterministic parity batches (iterative TS migration)
  - **5** validate host effects + lifecycle parity
  - **6** promote TS/hybrid channel to production default while retaining the operational legacy rollback flag
- Run CI gate setup only after both legacy and hybrid channels are buildable and selectable.
- Treat the existing project-wide TypeScript compiler errors as a known baseline, not as a passing check: hybrid build validation must use a strict, isolated TypeScript project for migration-owned sources and must not silently suppress or misreport existing diagnostics.
- Require gates per migrated slice:
  - legacy contract suite passes
  - hybrid contract suite passes
  - differential checks legacy full vs hybrid unchanged functions
  - focused parity tests for migrated functions, including host-effect and result-shape parity

## Capabilities

### New Capabilities

- `ts-hybrid-rollout`: Defines required rollout behavior for side-by-side legacy/hybrid artifacts, deterministic per-function routing, promotion gates, and rollback rules during incremental TypeScript migration.

### Modified Capabilities

- None.

## Impact

- Affected artifacts: side-by-side builds and host/application operational flag behavior.
- Delivery impact: supports incremental migration with rollback path and explicit promotion gates.
- Release impact: requires explicit bundle layout (`dist/legacy/*`, `dist/hybrid/*`) and flag loader selection.
- Open integration detail: this repository specifies the required operational flag behavior but not the Rails feature-flag key, configuration source, or customer targeting mechanism. Those external wiring details must be agreed with the Rails owner.

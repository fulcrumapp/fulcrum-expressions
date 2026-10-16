# Proposal

## Why

Incremental TypeScript migration needs a safe release foundation before expression functions are migrated: both the complete CoffeeScript runtime and an additive hybrid runtime must be buildable and independently consumable, with comparable runtime contracts and blocking evidence for each batch. Phase 1 of the migration roadmap establishes that foundation without implementing Rails selection or migrating functions.

## What Changes

- Define one adapter contract for legacy and hybrid execution, including inputs, results, errors, and lifecycle behavior needed by parity tests.
- Specify side-by-side legacy and hybrid release artifacts, same-name TypeScript overrides, CoffeeScript fallback, stable channel entry points, and the backwards-compatible legacy entry point.
- Require a strict, explicit, migration-owned TypeScript dependency closure for hybrid builds; keep legacy builds independent of the known-failing project-wide TypeScript check.
- Define blocking per-batch contract, differential, parity, and deterministic artifact-integrity gates, with actionable results reported by function group.
- Unify runtime and public API declaration generation for CI and manual release builds, excluding test/internal declarations and checking reproducibility without broadening the isolated hybrid typecheck.
- Document the Rails release-selection seam without implementing flag evaluation, targeting, fallback, or startup behavior in this repository.
- Require the separate minimum Rails consumer integration before Phase 2 batch exposure, and actual flagged application-runtime acceptance of each released batch before the next proceeds; isolated contracts and publication alone are not runtime acceptance.
- Specify the outstanding parallel sandbox HTML prerequisite: root `expressions-hybrid.html` and `expressions-legacy.html` with correct channel/proxy references, release/debug build and deploy outputs, and Rails HTML URL selection; preserve original `expressions.html` and the frozen runtime as the comparison endpoint. This plan clarification does not implement or deploy those pages.

## Capabilities

### New Capabilities

- `ts-hybrid-rollout`: Defines the legacy and hybrid release contract, shared adapter and lifecycle parity surface, isolated hybrid typecheck, and blocking release gates for migrated batches.

### Modified Capabilities

None. The local OpenSpec baseline contains no existing capability specs.

## Impact

This change implements the Phase 1 build, adapter, release, and CI gate foundation and updates its OpenSpec artifacts. It does not implement Rails flag evaluation or runtime selection, migrate expression functions, or complete Phase 1b consumer readiness or Phase 2 runtime acceptance. Rails integration is separate repository work but is a prerequisite, not a post-migration phase. Requiring the migration status check in repository branch protection remains an administrator-owned setting, not a deliverable or blocker.

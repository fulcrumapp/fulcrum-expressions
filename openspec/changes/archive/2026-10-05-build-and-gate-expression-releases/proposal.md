# Proposal

## Why

Incremental TypeScript migration needs a safe release foundation before expression functions are migrated: both the complete CoffeeScript runtime and an additive hybrid runtime must be buildable and independently consumable, with comparable runtime contracts and blocking evidence for each batch. Phase 1 of the migration roadmap establishes that foundation without implementing Rails selection or migrating functions.

## What Changes

- Define one adapter contract for legacy and hybrid execution, including inputs, results, errors, and lifecycle behavior needed by parity tests.
- Specify side-by-side legacy and hybrid release artifacts, same-name TypeScript overrides, CoffeeScript fallback, stable channel entry points, and the backwards-compatible legacy entry point.
- Require a strict, explicit, migration-owned TypeScript dependency closure for hybrid builds; keep legacy builds independent of the known-failing project-wide TypeScript check.
- Define blocking per-batch contract, differential, parity, and deterministic artifact-integrity gates, with actionable results reported by function group.
- Document the Rails release-selection seam without implementing flag evaluation, targeting, fallback, or startup behavior in this repository.

## Capabilities

### New Capabilities

- `ts-hybrid-rollout`: Defines the legacy and hybrid release contract, shared adapter and lifecycle parity surface, isolated hybrid typecheck, and blocking release gates for migrated batches.

### Modified Capabilities

None. The local OpenSpec baseline contains no existing capability specs.

## Impact

This change implements the Phase 1 build, adapter, release, and CI gate foundation and updates its OpenSpec artifacts. It does not implement Rails flag evaluation or runtime selection, migrate expression functions, or complete the Phase 2/3 roadmap work. Requiring the migration status check in repository branch protection remains an administrator-owned setting, not a deliverable or blocker.

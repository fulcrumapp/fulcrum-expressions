# Tasks

## 1. Shared adapter contract

- [x] 1.1 Define and document the adapter contract surface used by both legacy and hybrid channels, and verify contract-focused unit tests pass for adapter inputs/outputs.

## 2. Side-by-side build enablement from the start

- [x] 2.1 Implement build pipeline outputs for `dist/legacy/*` and `dist/hybrid/*` in the same build flow, with stable entry points `dist/legacy/expressions.js` and `dist/hybrid/expressions.js`: legacy is the complete current CoffeeScript build, and hybrid is that build plus a TypeScript overlay where TypeScript overrides same-named CoffeeScript functions. Keep legacy output independent of the known-failing project-wide `ts/tsconfig.json` check; compile only migration-owned TypeScript sources with a strict isolated configuration, and verify both artifact trees are produced in one build invocation.
- [x] 2.2 Make both independently addressable expression releases available together for every migration release: Rails selects hybrid when its LaunchDarkly `expressions-ts-migration` flag is `true`, and legacy when it is `false` or cannot be read. Implement only the expressions-repository artifact/release side; Rails owns flag evaluation and customer targeting.
- [x] 2.3 Add build integrity checks (artifact presence + deterministic output constraints), verify repeated builds produce stable artifact inventories, and ensure the isolated migration-source type check blocks on diagnostics without representing the existing project-wide `ts/tsconfig.json` diagnostics as passing.

## 3. CI gate foundation

- [x] 3.1 Ensure per-batch CI runs the required legacy and hybrid contract suites, unchanged-function differential checks, and migrated-function parity tests; reuse existing automated gates and add only missing hybrid/differential coverage, verifying failures block that batch's merge/release.
- [x] 3.2 Add CI visibility/reporting for gate outcomes per function group, and verify a failed gate produces a blocking status with actionable failure logs.

## 4. Incremental TypeScript override batches and parity

- [ ] 4.1 Wire each migrated TypeScript implementation into the hybrid overlay so it overrides the same-named CoffeeScript implementation, and verify functions without TypeScript implementations continue to use CoffeeScript.
- [ ] 4.2 Define first deterministic function migration batch and move only that batch to TypeScript implementations, and verify batch-scoped parity tests pass.
- [ ] 4.3 Add hybrid overlay validation for the migrated batch's expected TypeScript exports and unchanged CoffeeScript fallbacks, and verify missing or unexpected overrides fail CI before merge.
- [ ] 4.4 Verify the Task 3.1 unchanged-function differential gate covers non-migrated functions in the hybrid release, with no diff regressions on baseline data.

## 5. Host effects and lifecycle parity closure

- [ ] 5.1 Implement host-effect parity tests for migrated function batches, and verify side effects (including ordering/idempotency expectations) match legacy behavior.
- [ ] 5.2 Implement lifecycle/result-shape parity tests for migrated batches, and verify output structure/value contracts match legacy snapshots.
- [ ] 5.3 Add tests and close discovered parity gaps in TS implementations or adapter plumbing, and verify all host/lifecycle parity suites pass without relaxing assertions.

## 6. Per-batch hybrid release

- [ ] 6.1 Verify each passing, merged migration batch is included in the hybrid release while the complete legacy release is published alongside it; there is no separate end-of-migration promotion step.

## 7. Deferred Rails follow-on scope after migration

- [ ] 7.1 Record Rails rework (adapter seam, startup fallback, server flag hardening) as explicitly deferred post-6 follow-on tasks, and verify no in-scope implementation PR for this phase includes those changes.

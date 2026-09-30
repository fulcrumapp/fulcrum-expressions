# Tasks

## 1. Shared adapter contract

- [ ] 1.1 Define and document the adapter contract surface used by both legacy and hybrid channels, and verify contract-focused unit tests pass for adapter inputs/outputs.

## 2. Side-by-side build enablement from the start

- [ ] 2.1 Implement build pipeline outputs for `dist/legacy/*` and `dist/hybrid/*` in the same build flow: legacy is the complete current CoffeeScript build, and hybrid is that build plus a TypeScript overlay where TypeScript overrides same-named CoffeeScript functions. Keep legacy output independent of the known-failing project-wide `ts/tsconfig.json` check; compile only migration-owned TypeScript sources with a strict isolated configuration, and verify both artifact trees are produced in one build invocation.
- [ ] 2.2 Define pre-start channel selection: legacy is the default before promotion; after gate-approved promotion, hybrid is the production default. The host/application evaluates an operational customer rollback flag before startup and loads the complete legacy bundle for selected customers, without rebuilding either artifact or switching channels after startup. Leave the Rails flag key, configuration source, customer targeting mechanism, and URL mapping unresolved until agreed with the Rails owner.
- [ ] 2.3 Add build integrity checks (artifact presence + deterministic output constraints), verify repeated builds produce stable artifact manifests, and ensure the isolated migration-source type check blocks on diagnostics without representing the existing project-wide `ts/tsconfig.json` diagnostics as passing.

## 3. CI gate foundation

- [ ] 3.1 Add CI jobs that run the legacy contract suite, hybrid contract suite, and unchanged-function differential checks after both channels are buildable and selectable; verify all three gate categories pass on a baseline run.
- [ ] 3.2 Add CI visibility/reporting for gate outcomes per function group, and verify a failed gate produces a blocking status with actionable failure logs.

## 4. Deterministic manifest routing and parity batches

- [ ] 4.1 Implement manifest-based routing (`function -> legacy|ts`) with default-to-legacy behavior for unmigrated functions, and verify unmapped or legacy-marked functions always resolve to legacy runtime.
- [ ] 4.2 Define first deterministic function migration batch and move only that batch to TypeScript implementations, and verify batch-scoped parity tests pass.
- [ ] 4.3 Add manifest validation checks (unknown keys, missing keys, invalid target values), and verify invalid manifest edits fail CI before merge.
- [ ] 4.4 Verify the Task 3.1 unchanged-function differential gate covers non-migrated functions after manifest routing, with no diff regressions on baseline data.

## 5. Host effects and lifecycle parity closure

- [ ] 5.1 Implement host-effect parity tests for migrated function batches, and verify side effects (including ordering/idempotency expectations) match legacy behavior.
- [ ] 5.2 Implement lifecycle/result-shape parity tests for migrated batches, and verify output structure/value contracts match legacy snapshots.
- [ ] 5.3 Add tests and close discovered parity gaps in TS implementations or adapter plumbing, and verify all host/lifecycle parity suites pass without relaxing assertions.

## 6. Promotion readiness and controlled default switch

- [ ] 6.1 Promote the hybrid channel to production default after all required gate evidence passes, retaining the operational flag that can redirect affected customers to the complete legacy bundle until the issue is fixed.

## 7. Deferred follow-on scope after 6

- [ ] 7.1 Record Rails rework (adapter seam, startup fallback, server flag hardening) as explicitly deferred post-6 follow-on tasks, and verify no in-scope implementation PR for this phase includes those changes.

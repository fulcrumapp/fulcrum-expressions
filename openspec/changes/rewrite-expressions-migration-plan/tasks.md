# Tasks

## 1. Adapter contract and CI gate foundation

- [ ] 1.1 Define and commit the adapter contract surface used by both legacy and hybrid channels, and verify contract-focused unit tests pass for adapter inputs/outputs.
- [ ] 1.2 Add CI jobs that run legacy contract suite, hybrid contract suite, and unchanged-function differential checks, and verify CI reports all three gate categories as passing on a baseline run.
- [ ] 1.3 Add CI visibility/reporting for gate outcomes per function group, and verify a failed gate produces a blocking status with actionable failure logs.

## 2. Side-by-side build enablement from the start

- [ ] 2.1 Implement build pipeline outputs for `dist/legacy/*` and `dist/hybrid/*` in the same build flow, and verify both artifact trees are produced in one build invocation.
- [ ] 2.2 Wire runtime channel selection so legacy remains default and hybrid is selectable, and verify channel toggle selects the expected bundle without code changes.
- [ ] 2.3 Add build integrity checks (artifact presence + deterministic output constraints), and verify repeated builds produce stable artifact manifests.

## 3. Deterministic manifest routing and parity batches

- [ ] 3.1 Implement manifest-based routing (`function -> legacy|ts`) with default-to-legacy behavior for unmigrated functions, and verify unmapped or legacy-marked functions always resolve to legacy runtime.
- [ ] 3.2 Define first deterministic function migration batch and move only that batch to TypeScript implementations, and verify batch-scoped parity tests pass.
- [ ] 3.3 Add manifest validation checks (unknown keys, missing keys, invalid target values), and verify invalid manifest edits fail CI before merge.
- [ ] 3.4 Add unchanged-function differential checks between legacy full and hybrid for non-migrated functions, and verify no diff regressions on baseline data.

## 4. Host effects and lifecycle parity closure

- [ ] 4.1 Implement host-effect parity tests for migrated function batches, and verify side effects (including ordering/idempotency expectations) match legacy behavior.
- [ ] 4.2 Implement lifecycle/result-shape parity tests for migrated batches, and verify output structure/value contracts match legacy snapshots.
- [ ] 4.3 Add tests and close discovered parity gaps in TS implementations or adapter plumbing, and verify all host/lifecycle parity suites pass without relaxing assertions.

## 5. Promotion readiness and controlled default switch

- [ ] 5.1 Promote TS/hybrid channel to production default.

## 6. Deferred follow-on scope after 5

- [ ] 6.1 Record Rails rework (adapter seam, startup fallback, server flag hardening) as explicitly deferred post-5 follow-on tasks, and verify no in-scope implementation PR for this phase includes those changes.

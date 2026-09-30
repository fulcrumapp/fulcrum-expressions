# Design

## Context

See `proposal.md` for motivation and approved sequencing. This design covers only the incremental TypeScript migration phase and assumes the contract baseline is already complete (905-case corpus, legacy suite green, review hardening complete). The rollout model is side-by-side from the start: both `dist/legacy/*` and `dist/hybrid/*` are built early, with runtime selection preserving safe fallback.

The current `ts/tsconfig.json` project-wide check is not a clean baseline: `yarn tsc --project ts --noEmit` reports existing diagnostics across the function modules, runtime, declarations, and library typings. This change must not describe that command as passing or make its success a prerequisite for emitting the legacy bundle. Hybrid TypeScript code must instead be isolated in a migration-owned entry point and strict compiler configuration whose source/dependency closure is explicit and whose diagnostics are blocking. The hybrid build must not use broad error suppression or treat the existing project-wide errors as successful type-check evidence.

## Goals / Non-Goals

**Goals:**

- Build and ship dual artifacts from early implementation onward: complete current CoffeeScript legacy bundle plus a hybrid bundle composed of that same CoffeeScript build and a TypeScript overlay.
- Let TypeScript implementations override same-named CoffeeScript functions in the hybrid bundle.
- Before promotion, keep legacy as the default; after gate-approved promotion, use hybrid by default in production.
- Retain an operational flag that can select the complete legacy bundle for affected customers as an emergency rollback, without rebuilding either artifact.
- Migrate function groups to TypeScript in slices, each gated by parity and regression checks.
- Preserve immediate rollback options throughout migration and promotion.
- Promote TS/hybrid to production default only after explicit step 6 gates pass.

**Non-Goals:**

- Rails rework in this phase, including adapter seam restructuring, startup fallback redesign, or server-flag refactors beyond what is already needed to select bundle/channel.
- Deleting legacy runtime paths during this phase.
- Broad behavioral changes to expression semantics beyond parity-targeted migrations.

## Decisions

1. **Side-by-side artifact builds start at step 2, not at end-of-phase.**  
   - **Decision:** Enable production-like packaging for both channels as soon as TS skeleton exists behind adapter.  
   - **Why:** Earlier packaging catches integration and release-shape issues before deep migration work accumulates.  
   - **Alternative considered:** Build hybrid artifacts only near step 6. Rejected because it delays release-risk discovery and weakens rollback rehearsal.

2. **Hybrid runtime uses deterministic manifest routing.**  
   - **Decision:** Hybrid loader resolves each function through a manifest entry (`legacy|ts`), defaulting every function to `legacy` unless explicitly migrated.  
   - **Why:** Function-level control gives predictable rollout and surgical rollback without channel flips.  
   - **Alternative considered:** Module- or package-level routing. Rejected because it is too coarse for safe incremental migration.

3. **The hybrid artifact overlays TypeScript implementations on the complete CoffeeScript build.**
   - **Decision:** `dist/legacy/*` contains the complete current CoffeeScript build. `dist/hybrid/*` contains that same complete CoffeeScript build plus the TypeScript overlay. When a function name is defined by both implementations, hybrid dispatches to TypeScript; functions without an overlay continue to use CoffeeScript.
   - **Why:** The hybrid channel must remain complete and behaviorally available while functions are migrated incrementally.
   - **Build constraint:** Compile migration-owned TypeScript with the strict isolated project described above; do not present the existing project-wide check as passing.

4. **Channel selection is an operational, pre-start customer override with a hybrid production default after promotion.**
   - **Decision:** Before promotion, the default channel is legacy. After the step-6 gate-approved promotion, production defaults to hybrid. The host evaluates an operational flag before loading the runtime; for a customer selected for rollback, the flag chooses `dist/legacy/expressions.js`, otherwise it chooses `dist/hybrid/expressions.js`. This is a whole-channel selection and does not change after runtime startup.
   - **Why:** A host-side pre-start selection fits the existing script-entry loading model and can redirect selected customers to the full current implementation without rebuilding bundles.
   - **Emergency rollback:** Keep the operational flag available after promotion; enable it for affected customers to route them to legacy until the issue is fixed, then disable it to return them to hybrid.
   - **Unresolved integration detail:** This repository specifies the flag's required behavior but contains no Rails feature-flag implementation or contract. Its exact key, configuration source, customer targeting mechanism, and URL mapping must be agreed with the Rails owner; do not infer these names here.

5. **Maintain two rollback paths for all slices.**
   - **Decision:** Preserve both rollback options: (a) switch runtime selector to full legacy bundle, (b) keep hybrid selected but flip manifest entries back to legacy.  
   - **Why:** These paths cover both severe and localized regressions while minimizing response time.  
   - **Alternative considered:** Single rollback via full legacy selector. Rejected because it is heavier-weight and obscures per-slice recovery confidence.

6. **Per-slice safety gates are mandatory before manifest promotion.**
   - **Decision:** For each migrated function group, require:  
     - legacy contract suite pass  
     - hybrid contract suite pass  
     - differential checks on unchanged functions (legacy full vs hybrid)  
     - focused parity tests for migrated functions, including host-effect and lifecycle/result-shape parity  
   - **Why:** Multi-angle evidence catches regression classes that a single suite can miss.  
   - **Alternative considered:** Contract-only gating. Rejected due to weaker coverage on host/lifecycle integration behavior.

7. **CI gate setup follows dual-channel build and runtime selection.**
   - **Decision:** Establish the shared adapter contract first, enable side-by-side artifacts and channel selection second, then add the CI jobs and reporting that exercise both channels.
   - **Why:** CI must exercise a real hybrid channel; a legacy-only baseline cannot prove hybrid or differential gates.
   - **Alternative considered:** Configure hybrid CI before the hybrid runtime is selectable. Rejected because it would create placeholder or duplicate legacy gates rather than useful rollout evidence.

8. **Step 6 is a promotion gate, not implementation start.**
   - **Decision:** Step 6 promotes the hybrid channel to production default only after cumulative gate evidence is met. The operational flag remains available to select the legacy bundle for emergency customer rollback.
   - **Why:** Keeps operational risk bounded while allowing meaningful production-readiness confidence.
   - **Alternative considered:** Promote by schedule/date. Rejected because readiness must be evidence-driven.

9. **Defer Rails hardening beyond the required selector behavior.**
   - **Decision:** The host/application must provide the specified pre-start operational rollback behavior, but adapter seam rewrites, startup fallback redesign, and broader server-flag hardening are deferred until after step 6 promotion.
   - **Why:** Keeps this phase focused on TS parity and channel promotion readiness; avoids mixing infrastructure refactors with migration risk.  
   - **Alternative considered:** Parallel Rails rework during steps 1–4. Rejected because it increases concurrent change surface and rollback complexity.

## Risks / Trade-offs

- **[Risk] Existing TypeScript diagnostics block a project-wide hybrid build** → **Mitigation:** Keep legacy output independent; compile the migration-owned TypeScript entry point using an isolated strict configuration and fail on diagnostics in that scope. Track the existing broad-project diagnostics as baseline technical debt without claiming they pass.
- **[Risk] Dual artifact builds increase CI/release complexity early** → **Mitigation:** Introduce packaging and publish checks incrementally; keep shared build primitives and enforce deterministic outputs.
- **[Risk] Manifest drift between intended and actual migrated functions** → **Mitigation:** Version manifest with review-required changes; add CI checks for unknown/missing function keys and default-to-legacy enforcement.
- **[Risk] Hybrid parity blind spots in host/lifecycle behavior** → **Mitigation:** Keep explicit host-effect/lifecycle parity tests per migrated slice plus differential checks on unchanged functions.
- **[Risk] Slow migration cadence due to strict gates** → **Mitigation:** Migrate by cohesive deterministic function groups and parallelize test execution where safe.
- **[Risk] Premature promotion pressure** → **Mitigation:** Require objective step 6 gate checklist and keep rollback drills exercised before default switch.

## Migration Plan

1. **1. Shared adapter contract**
   - Lock the shared adapter interface used by legacy and hybrid channels.

2. **2. TS skeleton behind adapter + side-by-side build enablement**
   - Produce `dist/legacy/*` as the complete current CoffeeScript build.
   - Produce `dist/hybrid/*` from that complete CoffeeScript build plus the TypeScript overlay; TS implementations override CoffeeScript functions with the same name.
   - Compile only migration-owned TypeScript sources with a strict isolated project; do not require the known-failing project-wide `ts/tsconfig.json` check to pass.
   - Before promotion, default to legacy; after step-6 promotion, default production to hybrid.
   - Evaluate the operational customer rollback flag before startup: select the legacy entry point for flagged customers and hybrid otherwise. Keep this flag operational after promotion.
   - Leave the exact Rails feature-flag key, configuration source, customer targeting mechanism, and host-side URL mapping open for agreement with the Rails owner.

3. **3. CI gate foundation**
   - Add CI jobs that execute legacy contracts, hybrid contracts, and unchanged-function differential checks.
   - Report gate outcomes per function group and make failures blocking with actionable logs.

4. **4. Parity batches on deterministic functions**
   - Migrate function groups incrementally.
   - For each batch, update manifest entries from `legacy` to `ts` only after per-slice gates pass.

5. **5. Host effects + lifecycle parity**
   - Validate and close parity gaps involving host interactions, lifecycle hooks, and result-shape behavior.

6. **6. Promote TS/hybrid channel to production default**
   - Switch default channel only after cumulative gate criteria are satisfied and rollback paths are verified operational.

7. **Post-step-6 follow-on hardening (deferred scope)**
   - Execute Rails/runtime-selection hardening tasks as separate follow-on work: adapter seam updates, startup fallback hardening, and server-flag refactors.

**Rollback strategy during steps 1–6 and after promotion:**

- Path A: enable the operational flag for affected customers to select the complete legacy bundle without rebuilding.
- Path B: keep hybrid selected and revert manifest entries to legacy for affected function groups.

## Open Questions

- None blocking for this phase; deferred Rails/runtime-selection hardening details will be specified in follow-on artifacts after step 6 promotion readiness is demonstrated.

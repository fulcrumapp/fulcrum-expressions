# Design

## Context

See `proposal.md` for motivation and approved sequencing. This design covers only the incremental TypeScript migration phase and assumes the contract baseline is already complete (905-case corpus, legacy suite green, review hardening complete). The rollout model is side-by-side from the start: both `dist/legacy/*` and `dist/hybrid/*` are built early, with runtime selection preserving safe fallback.

## Goals / Non-Goals

**Goals:**

- Build and ship dual artifacts from early implementation onward: authoritative legacy bundle plus hybrid bundle.
- Introduce routing via feature flag in Rails.
- Migrate function groups to TypeScript in slices, each gated by parity and regression checks.
- Preserve immediate rollback options throughout migration and promotion.
- Promote TS/hybrid to production default only after explicit step 5 gates pass.

**Non-Goals:**

- Rails rework in this phase, including adapter seam restructuring, startup fallback redesign, or server-flag refactors beyond what is already needed to select bundle/channel.
- Deleting legacy runtime paths during this phase.
- Broad behavioral changes to expression semantics beyond parity-targeted migrations.

## Decisions

1. **Side-by-side artifact builds start at step 2, not at end-of-phase.**  
   - **Decision:** Enable production-like packaging for both channels as soon as TS skeleton exists behind adapter.  
   - **Why:** Earlier packaging catches integration and release-shape issues before deep migration work accumulates.  
   - **Alternative considered:** Build hybrid artifacts only near step 5. Rejected because it delays release-risk discovery and weakens rollback rehearsal.

2. **Hybrid runtime uses deterministic manifest routing.**  
   - **Decision:** Hybrid loader resolves each function through a manifest entry (`legacy|ts`), defaulting every function to `legacy` unless explicitly migrated.  
   - **Why:** Function-level control gives predictable rollout and surgical rollback without channel flips.  
   - **Alternative considered:** Module- or package-level routing. Rejected because it is too coarse for safe incremental migration.

3. **Maintain two rollback paths for all slices.**  
   - **Decision:** Preserve both rollback options: (a) switch runtime selector to full legacy bundle, (b) keep hybrid selected but flip manifest entries back to legacy.  
   - **Why:** These paths cover both severe and localized regressions while minimizing response time.  
   - **Alternative considered:** Single rollback via full legacy selector. Rejected because it is heavier-weight and obscures per-slice recovery confidence.

4. **Per-slice safety gates are mandatory before manifest promotion.**  
   - **Decision:** For each migrated function group, require:  
     - legacy contract suite pass  
     - hybrid contract suite pass  
     - differential checks on unchanged functions (legacy full vs hybrid)  
     - focused parity tests for migrated functions, including host-effect and lifecycle/result-shape parity  
   - **Why:** Multi-angle evidence catches regression classes that a single suite can miss.  
   - **Alternative considered:** Contract-only gating. Rejected due to weaker coverage on host/lifecycle integration behavior.

5. **Step 5 is a promotion gate, not implementation start.**  
   - **Decision:** Step 5 promotes TS/hybrid channel to production default only after cumulative gate evidence is met; legacy remains authoritative default until then.  
   - **Why:** Keeps operational risk bounded while allowing meaningful production-readiness confidence.  
   - **Alternative considered:** Promote by schedule/date. Rejected because readiness must be evidence-driven.

6. **Defer Rails/runtime-selection hardening beyond this phase.**  
   - **Decision:** Adapter seam rewrites, startup fallback redesign, and broader server-flag hardening are explicitly deferred until after step 5 promotion.  
   - **Why:** Keeps this phase focused on TS parity and channel promotion readiness; avoids mixing infrastructure refactors with migration risk.  
   - **Alternative considered:** Parallel Rails rework during steps 1–4. Rejected because it increases concurrent change surface and rollback complexity.

## Risks / Trade-offs

- **[Risk] Dual artifact builds increase CI/release complexity early** → **Mitigation:** Introduce packaging and publish checks incrementally; keep shared build primitives and enforce deterministic outputs.
- **[Risk] Manifest drift between intended and actual migrated functions** → **Mitigation:** Version manifest with review-required changes; add CI checks for unknown/missing function keys and default-to-legacy enforcement.
- **[Risk] Hybrid parity blind spots in host/lifecycle behavior** → **Mitigation:** Keep explicit host-effect/lifecycle parity tests per migrated slice plus differential checks on unchanged functions.
- **[Risk] Slow migration cadence due to strict gates** → **Mitigation:** Migrate by cohesive deterministic function groups and parallelize test execution where safe.
- **[Risk] Premature promotion pressure** → **Mitigation:** Require objective step 5 gate checklist and keep rollback drills exercised before default switch.

## Migration Plan

1. **1. Adapter contract + CI gates**  
   - Lock adapter interfaces and add gating jobs that execute legacy/hybrid contract suites and differential checks.

2. **2. TS skeleton behind adapter + side-by-side build enablement**  
   - Create TS runtime skeleton integrated through adapter contract.  
   - Produce both `dist/legacy/*` and `dist/hybrid/*` from this stage onward.

3. **3. Parity batches on deterministic functions**  
   - Migrate function groups incrementally.  
   - For each batch, update manifest entries from `legacy` to `ts` only after per-slice gates pass.

4. **4. Host effects + lifecycle parity**  
   - Validate and close parity gaps involving host interactions, lifecycle hooks, and result-shape behavior.

5. **5. Promote TS/hybrid channel to production default**  
   - Switch default channel only after cumulative gate criteria are satisfied and rollback paths are verified operational.

6. **Post-step-5 follow-on hardening (deferred scope)**  
   - Execute Rails/runtime-selection hardening tasks as separate follow-on work: adapter seam updates, startup fallback hardening, and server-flag refactors.

**Rollback strategy during steps 1–5:**

- Path A: switch selector to full legacy bundle.
- Path B: keep hybrid selected and revert manifest entries to legacy for affected function groups.

## Open Questions

- None blocking for this phase; deferred Rails/runtime-selection hardening details will be specified in follow-on artifacts after step 5 promotion readiness is demonstrated.

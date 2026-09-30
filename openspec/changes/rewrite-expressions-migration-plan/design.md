# Design

## Context

See `proposal.md` for motivation and approved sequencing. This design covers only the incremental TypeScript migration phase and assumes the contract baseline is already complete (905-case corpus, legacy suite green, review hardening complete). The rollout model is side-by-side from the start: both `dist/legacy/*` and `dist/hybrid/*` are built and deployed together for each migration release.

The current `ts/tsconfig.json` project-wide check is not a clean baseline: `yarn tsc --project ts --noEmit` reports existing diagnostics across the function modules, runtime, declarations, and library typings. This change must not describe that command as passing or make its success a prerequisite for emitting the legacy bundle. Hybrid TypeScript code must instead be isolated in a migration-owned entry point and strict compiler configuration whose source/dependency closure is explicit and whose diagnostics are blocking. The hybrid build must not use broad error suppression or treat the existing project-wide errors as successful type-check evidence.

## Goals / Non-Goals

**Goals:**

- Build and ship dual artifacts from early implementation onward: complete current CoffeeScript legacy bundle plus a hybrid bundle composed of that same CoffeeScript build and a TypeScript overlay.
- Let TypeScript implementations override same-named CoffeeScript functions in the hybrid bundle.
- Publish each passing, merged migration batch in the hybrid release alongside the complete legacy release.
- Keep release selection in the Rails application: LaunchDarkly `expressions-ts-migration=true` selects hybrid; `false` selects legacy; an unreadable flag is treated as `false`.
- Migrate function groups to TypeScript in slices, each gated by parity and regression checks.
- Make each batch available for production use as it is merged and released after its automated CI/test gates pass; do not wait for a separate final promotion across the whole migration.
- Preserve the complete legacy release as the emergency rollback path throughout migration.

**Non-Goals:**

- Rails rework in this phase, including adapter seam restructuring, startup fallback redesign, or server-flag refactors beyond what is already needed to select bundle/channel.
- Deleting legacy runtime paths during this phase.
- Broad behavioral changes to expression semantics beyond parity-targeted migrations.

## Decisions

1. **Side-by-side artifact builds and deployment start at step 2, not at end-of-phase.**
   - **Decision:** Enable production-like packaging for both channels as soon as TS skeleton exists behind adapter.  
   - **Why:** Earlier packaging catches integration and release-shape issues before deep migration work accumulates.  
   - **Alternative considered:** Build hybrid artifacts only after migration is complete. Rejected because it delays release-risk discovery and weakens rollback rehearsal.

2. **Hybrid runtime uses deterministic manifest routing.**  
   - **Decision:** Hybrid loader resolves each function through a manifest entry (`legacy|ts`), defaulting every function to `legacy` unless explicitly migrated.  
   - **Why:** Function-level control gives predictable rollout and surgical rollback without channel flips.  
   - **Alternative considered:** Module- or package-level routing. Rejected because it is too coarse for safe incremental migration.

3. **The hybrid artifact overlays TypeScript implementations on the complete CoffeeScript build.**
   - **Decision:** `dist/legacy/*` contains the complete current CoffeeScript build. `dist/hybrid/*` contains that same complete CoffeeScript build plus the TypeScript overlay. When a function name is defined by both implementations, hybrid dispatches to TypeScript; functions without an overlay continue to use CoffeeScript.
   - **Why:** The hybrid channel must remain complete and behaviorally available while functions are migrated incrementally.
   - **Build constraint:** Compile migration-owned TypeScript with the strict isolated project described above; do not present the existing project-wide check as passing.

4. **Rails selects the release; this repository builds and deploys both releases.**
   - **Decision:** For each migration release, publish the complete legacy CoffeeScript release and the hybrid CoffeeScript-plus-TypeScript release together. Rails owns the LaunchDarkly `expressions-ts-migration` flag and selects the release: `true` selects hybrid; `false` selects legacy. If Rails cannot read the flag, it defaults to `false`, selecting legacy.
   - **Why:** Keeping release selection in Rails avoids duplicating LaunchDarkly/customer configuration in this expressions repository, while publishing both releases makes either path available without rebuilding.
   - **Batch rollout:** Each migrated batch becomes part of the hybrid release as that batch passes its CI/test gates and is merged/released. There is no separate end-of-migration promotion step; Rails can direct customers to the released hybrid or legacy version.
   - **Scope boundary:** This repository is responsible for producing and deploying both independently addressable releases. Rails is responsible for reading the flag and mapping it to the appropriate release.

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

8. **Automated gates apply to each batch; there is no global promotion milestone.**
   - **Decision:** Use the existing automated CI/test gates for each migrated batch. Once a batch passes and is merged/released, it is available in the hybrid release; the complete legacy release remains available in parallel.
   - **Why:** This matches the incremental release model and avoids suggesting that all TypeScript work must finish before hybrid can be used.
   - **Alternative considered:** A one-time production default switch after all migration gates pass. Rejected because migrated batches are released incrementally.

9. **Rails flag evaluation is outside this repository's implementation scope.**
   - **Decision:** This repository publishes both releases and documents the selection contract; the Rails repository owns LaunchDarkly configuration, flag evaluation, customer targeting, and fallback-to-legacy behavior when the flag cannot be read. Broader Rails hardening remains separate follow-on work.
   - **Why:** Keeps this phase focused on building and publishing the two expressions releases and validating TypeScript parity.
   - **Alternative considered:** Implement the flag reader or customer targeting here. Rejected because those responsibilities belong to Rails.

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
   - For each migration release, publish both the complete legacy release and the hybrid release containing the TypeScript overrides merged in that batch.
   - Rails selects the release using LaunchDarkly `expressions-ts-migration`: `true` selects hybrid; `false` selects legacy; if the flag cannot be read, Rails treats it as `false`.
   - This repository does not read the flag or target customers; it ensures both independently addressable releases are built and deployed.

3. **3. CI gate foundation**
   - Add CI jobs that execute legacy contracts, hybrid contracts, and unchanged-function differential checks.
   - Report gate outcomes per function group and make failures blocking with actionable logs.

4. **4. Parity batches on deterministic functions**
   - Migrate function groups incrementally.
   - For each batch, update manifest entries from `legacy` to `ts` only after per-slice gates pass.

5. **5. Host effects + lifecycle parity**
   - Validate and close parity gaps involving host interactions, lifecycle hooks, and result-shape behavior.

6. **6. Release each passing migration batch**
   - Include the batch's TypeScript overrides in the hybrid release as the batch is merged and released.
   - Publish the complete legacy release alongside it; Rails selects which release customers use through its LaunchDarkly flag.

7. **Post-step-6 follow-on hardening (deferred scope)**
   - Execute broader Rails/runtime-selection hardening tasks separately: adapter seam updates, startup fallback hardening, and server-flag refactors.

**Rollback strategy for every migration release:**

- Path A: Rails sets `expressions-ts-migration` to `false` for affected customers to select the complete legacy release; an unreadable flag also defaults to `false`.
- Path B: keep hybrid selected and revert manifest entries to legacy for affected function groups.

## Open Questions

- None blocking for this phase. LaunchDarkly flag evaluation and release selection are Rails-owned; this repository's responsibility is to build and deploy both complete legacy and hybrid releases.

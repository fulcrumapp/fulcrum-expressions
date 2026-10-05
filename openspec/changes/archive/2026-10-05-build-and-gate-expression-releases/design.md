# Design

## Context

See `proposal.md` for motivation and `specs/ts-hybrid-rollout/spec.md` for the
normative behavior contract. The current release is CoffeeScript-based, and the
project-wide TypeScript configuration has baseline diagnostics; therefore the
hybrid migration check must be isolated without gating legacy output. The local
OpenSpec baseline has no capability specs.

PR [#126](https://github.com/fulcrumapp/fulcrum-expressions/pull/126) supplied
the implementation outline for the adapter, side-by-side build, isolated
TypeScript configuration, CI workflow, and artifact-integrity checks. This
branch implements the Phase 1 contract in its own changes; no source branch was
merged or cherry-picked. The implementation leaves all function-migration and
Rails runtime work to their explicitly out-of-scope phases.

## Goals / Non-Goals

**Goals:**

- Establish one adapter and lifecycle contract that makes legacy and hybrid
  execution comparable, including relevant host effects.
- Keep a complete CoffeeScript release available beside the hybrid release,
  with hybrid override behavior determined only by same-name TypeScript
  implementations.
- Gate each migration batch on strict isolated typechecking, contracts,
  differential/parity evidence, and deterministic artifact verification.

**Non-Goals:**

- Add a per-function routing manifest or make the project-wide TypeScript
  check a condition of producing legacy artifacts.
- Implement Rails flag evaluation, targeting, startup fallback, or runtime
  selection; implement only the consumer contract.
- Complete the future function-migration batches or the deferred Rails phase.

## Decisions

1. **Define the adapter contract before depending on parity results.**
   - **Decision:** Specify common invocation inputs, success/error result shape,
     and lifecycle probes for both channels, with host effects observable to the
     harness.
   - **Rationale:** A common observable contract makes channel comparison
     meaningful and prevents a passing return-value-only test from masking
     lifecycle or host-effect differences.
   - **Alternative considered:** Maintain separate channel-specific harnesses.
     Rejected because they could drift and make results incomparable.

2. **Build the hybrid as a complete legacy runtime plus same-name overrides.**
   - **Decision:** Keep the complete CoffeeScript implementation in legacy;
     hybrid starts with the same runtime and replaces only functions with a
     same-named TypeScript implementation. Preserve the legacy-compatible
     top-level entry point as well as stable channel entry points.
   - **Rationale:** This gives every not-yet-migrated function an explicit
     fallback and keeps rollback independent of migration progress.
   - **Alternative considered:** Route functions through a separate
     per-function manifest or rewrite the runtime around TypeScript. Rejected:
     the roadmap requires same-name overrides and a complete legacy path.

3. **Keep the TypeScript gate strict but bounded to migration-owned sources.**
   - **Decision:** Define the hybrid compiler input as an explicit dependency
     closure and fail hybrid work on any diagnostic in that closure. Do not
     couple legacy output to the known-diagnostic project-wide check or report
     that check as passing.
   - **Rationale:** Migration code receives a real strict gate while baseline
     debt outside its ownership cannot prevent publishing or rolling back to
     the complete legacy runtime.
   - **Alternative considered:** Require a clean project-wide check before
     building either channel. Rejected because existing diagnostics would block
     legacy output without proving anything about migration-owned code.

4. **Run the full gate set per batch and report actionable evidence.**
   - **Decision:** CI runs the existing CoffeeScript suite, isolated strict
     typecheck, legacy and hybrid contract suites, unchanged-function
     differential checks, migrated-function parity checks, and deterministic
     build/inventory checks. The `Expression migration gates` job fails if any
     required category fails and reports failures by function group.
   - **Rationale:** Channel contracts, differential checks, focused migrated
     parity, and stable artifacts detect different classes of regression; all
     must be reviewable for each batch.
   - **Alternative considered:** Treat a successful build or a single
     end-of-migration verification as sufficient. Rejected because neither
     establishes per-batch behavioral safety.

5. **Keep selection with Rails and release batches incrementally.**
   - **Decision:** This repository documents the `true` → hybrid,
     `false`/unreadable → legacy consumer contract and makes both artifacts
     independently addressable. Each passing batch is included in the
     hybrid release as merged/released; the complete legacy release ships
     alongside it. Branch-protection enforcement remains an administrator
     setting.
   - **Rationale:** Selection and targeting belong to the Rails consumer, while
     concurrent complete artifacts enable channel-wide rollback without a
     rebuild. Incremental inclusion avoids a final all-migration promotion.
   - **Alternative considered:** Implement flag selection here or defer hybrid
     release until every function is migrated. Rejected as out of scope and
     inconsistent with the approved release model.

## Risks / Trade-offs

- **[Risk] A shared adapter can hide differences if it omits runtime lifecycle
  or host effects** → **Mitigation:** Make those observations part of the
  contract and gate parity on them, not only pure return values.
- **[Risk] A permissive or implicit TypeScript input set can let unrelated
  baseline errors escape the intended gate** → **Mitigation:** Require a
  strict, explicit migration-owned closure and treat its diagnostics as
  blocking.
- **[Risk] Early dual-channel releases increase packaging and operational
  complexity** → **Mitigation:** Verify stable entry points and deterministic
  inventories on every gated build, while retaining the existing legacy
  entry point.
- **[Risk] CI may be green without being required by repository merge rules**
  → **Mitigation:** Keep the job itself blocking on gate failures and identify
  branch-protection configuration as a separate repository-administrator
  action, not a deliverable of this change.

## Migration Plan

1. Define the shared adapter and lifecycle/host-effect contract for both
   channels.
2. Build the complete legacy and hybrid channels in the same release flow,
   preserve the legacy-compatible entry point, and gate hybrid compilation on
   the strict isolated TypeScript closure.
3. Add the per-batch contracts, differential/parity reporting, deterministic
   artifact checks, and failing `Expression migration gates` CI job. Document
   the Rails consumer seam without changing Rails behavior.
4. For each later migration batch, require all gates before merge/release and
   include passing overrides in hybrid while publishing complete legacy
   alongside it. Do not introduce a final all-functions promotion milestone.

Rollback selects the independently addressable complete legacy release; it
does not require rebuilding and is implemented by the Rails consumer, not this
repository.

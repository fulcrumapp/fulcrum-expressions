# TypeScript expressions migration roadmap

The migration is staged so TypeScript implementations can be proven function by
function without interrupting the existing CoffeeScript release. Each phase
builds on the prior phase; the legacy release remains available until a separate
cutover decision.

## Phase 1: Build and gate legacy and hybrid releases (tasks 1–3)

Establish the release foundation while keeping the current legacy release
unchanged. Build and deploy legacy and hybrid artifacts side by side. Keep
migration TypeScript checks strict and isolated from the legacy build so neither
toolchain masks failures in the other.

Define the adapter contract used to run and compare legacy and TypeScript
implementations. The existing
[contract-testing guide](contract-testing.md) describes the behavioral corpus
and adapter comparison entry point. Add CI gates for each migration batch:
only batches meeting the contract and parity checks can enter the hybrid
release. Rails owns feature-flag evaluation; this package builds and gates the
artifacts, but does not decide which release Rails serves.

## Phase 2: Migrate deterministic batches (tasks 4–6)

Migrate deterministic functions or function sets to TypeScript in bounded
batches. Validate each batch against the legacy implementation and the
established CI gates, then add only passing batches to the hybrid release. Keep
the full legacy release available throughout this phase; migrating a function
does not remove it from that release.

Parity includes observable results and errors as well as host and lifecycle
behavior: the TypeScript implementation must work with the same host-provided
capabilities and preserve the runtime's expected initialization, invocation,
and completion/teardown semantics. Do not treat matching pure-function outputs
alone as sufficient evidence for host-dependent or stateful functions.

## Phase 3: Rails runtime integration (task 7; deferred)

A Rails follow-on updates the application-side expressions runtime integration:
the adapter seam, startup fallback, and server-side flag handling. This work is
explicitly deferred and outside the scope of this repository. The expressions
package must not take ownership of Rails flag evaluation or application
fallback behavior.

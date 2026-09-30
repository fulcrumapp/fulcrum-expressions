# TS Hybrid Rollout

## Purpose

Define the expressions repository's build and release behavior for incremental TypeScript migration: publish complete legacy and hybrid releases together, with deterministic TypeScript overrides and per-batch automated gates. Rails owns production release selection.

## ADDED Requirements

### Requirement: Dual artifact channels are complete and selectable
The expressions build MUST produce both the complete current CoffeeScript legacy artifact and a hybrid artifact composed of that CoffeeScript build plus a TypeScript overlay. A TypeScript implementation MUST override the CoffeeScript implementation with the same function name in the hybrid artifact; functions without a TypeScript overlay MUST continue to use CoffeeScript.

#### Scenario: Build emits both channels
- **WHEN** the project build runs for a migration release
- **THEN** `dist/legacy/*` contains the complete current CoffeeScript build
- **AND** `dist/hybrid/*` contains that build plus the TypeScript overlay
- **AND** each channel is independently loadable by the runtime selector

#### Scenario: TypeScript overlay overrides same-named CoffeeScript function
- **WHEN** a function is implemented in both CoffeeScript and TypeScript
- **AND** the hybrid channel is loaded
- **THEN** the TypeScript implementation handles that function
- **AND** functions without a TypeScript implementation continue to use CoffeeScript

### Requirement: Both expression releases are available for each migration batch
For each migration release, this repository MUST build and deploy both the complete current CoffeeScript release and the hybrid release composed of that CoffeeScript build plus the TypeScript overlay. A migrated batch MUST become part of the hybrid release as that batch passes the automated CI/test gates and is merged/released; there MUST NOT be a separate one-time promotion gate for the entire migration.

#### Scenario: A migration batch is released
- **WHEN** a migrated function batch passes its required automated CI/test gates and is merged for release
- **THEN** the hybrid release includes the batch's TypeScript implementations
- **AND** the complete legacy CoffeeScript release is also built and deployed alongside it
- **AND** both releases remain independently addressable by the consuming Rails application

#### Scenario: Rails selects the customer release
- **WHEN** Rails evaluates its LaunchDarkly `expressions-ts-migration` flag for a customer
- **THEN** a value of `true` selects the hybrid release
- **AND** a value of `false` selects the complete legacy release
- **AND** if Rails cannot read the flag, it treats the value as `false` and selects the legacy release
- **AND** flag evaluation and customer targeting are owned by Rails, not this repository

### Requirement: Hybrid TypeScript compilation is isolated from the existing project baseline
The hybrid build MUST compile migration-owned TypeScript sources with a strict, explicit compiler configuration and MUST NOT claim the existing project-wide TypeScript check passes unless that check is independently verified.

#### Scenario: Existing project-wide TypeScript diagnostics remain
- **WHEN** the existing `ts/tsconfig.json` project reports diagnostics
- **THEN** those diagnostics are recorded as existing baseline debt and are not reported as a passing type-check
- **AND** the hybrid build validates its migration-owned TypeScript source/dependency closure independently
- **AND** diagnostics in that isolated source/dependency closure block the hybrid build

#### Scenario: No TypeScript functions have been migrated
- **WHEN** the hybrid channel is built before any function is routed to TypeScript
- **THEN** its function behavior remains legacy-equivalent
- **AND** the hybrid entry point remains independently loadable

### Requirement: Hybrid routing is deterministic and legacy-first
Hybrid execution MUST route each function by deterministic manifest entry (`legacy|ts`) and MUST default unmigrated behavior to legacy.

#### Scenario: Manifest routes migrated function to TypeScript
- **WHEN** a function manifest entry is `ts`
- **THEN** hybrid dispatches that function to the TypeScript implementation
- **AND** non-targeted functions continue using their own manifest targets

#### Scenario: Unmapped or legacy-marked functions use legacy runtime
- **WHEN** a function entry is missing or set to `legacy`
- **THEN** that function executes through legacy runtime behavior
- **AND** no implicit upgrade to TypeScript occurs

### Requirement: Automated gates apply to every migrated batch
The required automated CI/test gates MUST run for each migrated batch before it is merged/released. Passing gates authorize that batch's inclusion in the hybrid release; they MUST NOT be described as a one-time promotion requirement for the entire migration.

#### Scenario: A batch is blocked when any required gate fails
- **WHEN** legacy contracts, hybrid contracts, unchanged-function differential checks, or focused migrated-function parity checks are failing
- **THEN** that migration batch is blocked from merge/release
- **AND** the already-published legacy release remains available
- **AND** previously released hybrid batches remain independently available

#### Scenario: A passing batch is included in hybrid
- **WHEN** the required gate categories pass for a migration batch
- **THEN** the batch may be merged/released in the hybrid artifact
- **AND** its CI outputs provide verifiable gate evidence

### Requirement: Rollback paths remain available throughout migration
The runtime MUST support rollback by either global channel selection or per-function manifest reversion during migration.

#### Scenario: Operational rollback selects the legacy channel for a customer
- **WHEN** Rails sets `expressions-ts-migration` to `false` for a customer
- **THEN** all execution uses legacy artifacts
- **AND** rollback does not require rebuilding bundles
- **AND** if the flag cannot be read, Rails selects legacy as though the flag were `false`
- **AND** setting the flag to `true` after the issue is fixed selects the available hybrid release

#### Scenario: Slice rollback by manifest reversion
- **WHEN** operators revert selected manifest entries from `ts` to `legacy`
- **THEN** affected functions execute on legacy runtime while hybrid channel remains selectable
- **AND** unaffected migrated functions can remain on TypeScript per manifest

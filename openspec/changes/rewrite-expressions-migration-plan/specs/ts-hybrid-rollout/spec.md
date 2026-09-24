# TS Hybrid Rollout

## Purpose

Define externally observable rollout behavior for incremental TypeScript migration with side-by-side legacy and hybrid channels, deterministic routing, gate-controlled default promotion, and rollback safety.

## Requirements

### Requirement: Dual artifact channels are produced and selectable
The expressions build MUST produce both legacy and hybrid artifact channels in the same migration era, and runtime selection MUST keep legacy as the default until promotion criteria are met.

#### Scenario: Build emits both channels
- **WHEN** the project build runs for a migration release
- **THEN** artifacts are emitted for both `dist/legacy/*` and `dist/hybrid/*`
- **AND** each channel is independently loadable by the runtime selector

#### Scenario: Legacy remains default prior to promotion
- **WHEN** no explicit channel override is configured
- **THEN** the legacy channel is selected
- **AND** hybrid is only selected when explicitly enabled

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

### Requirement: Promotion requires explicit gate evidence
Default promotion to hybrid/TypeScript MUST occur only after required migration gates pass.

#### Scenario: Promotion blocked when any required gate fails
- **WHEN** legacy contracts, hybrid contracts, unchanged-function differential checks, or focused migrated-function parity checks are failing
- **THEN** promotion to hybrid default is blocked
- **AND** legacy remains the default channel

#### Scenario: Promotion allowed after all gates pass
- **WHEN** all required gate categories pass for the migration scope
- **THEN** hybrid/TypeScript may be promoted to default
- **AND** promotion records verifiable gate evidence in CI outputs

### Requirement: Rollback paths remain available throughout migration
The runtime MUST support rollback by either global channel selection or per-function manifest reversion during migration.

#### Scenario: Global rollback to legacy channel
- **WHEN** operators switch runtime selection to legacy
- **THEN** all execution uses legacy artifacts
- **AND** rollback does not require rebuilding bundles

#### Scenario: Slice rollback by manifest reversion
- **WHEN** operators revert selected manifest entries from `ts` to `legacy`
- **THEN** affected functions execute on legacy runtime while hybrid channel remains selectable
- **AND** unaffected migrated functions can remain on TypeScript per manifest

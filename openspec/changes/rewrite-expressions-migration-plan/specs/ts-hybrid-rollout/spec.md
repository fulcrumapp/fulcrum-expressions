# TS Hybrid Rollout

## Purpose

Define externally observable rollout behavior for incremental TypeScript migration with side-by-side legacy and hybrid channels, deterministic routing, gate-controlled default promotion, and rollback safety.

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

### Requirement: Production channel selection and emergency rollback are explicit
Before promotion, the default channel MUST be legacy. After gate-approved promotion, production MUST default to hybrid. The host/application MUST evaluate an operational customer rollback flag before runtime startup and select the complete legacy bundle for customers enabled for rollback; it MUST keep this rollback mechanism available until the issue is fixed.

#### Scenario: Legacy is the pre-promotion default
- **WHEN** hybrid has not passed the promotion gate
- **AND** no explicit channel selection is made
- **THEN** the legacy channel is selected

#### Scenario: Hybrid is the production default after promotion
- **WHEN** the step-6 promotion gate has passed
- **AND** the operational rollback flag is disabled for a customer
- **THEN** production loads `dist/hybrid/expressions.js` for that customer

#### Scenario: Operational rollback routes a customer to legacy
- **WHEN** the operational rollback flag is enabled for a customer
- **THEN** the host loads `dist/legacy/expressions.js` for that customer before runtime startup
- **AND** the complete CoffeeScript implementation is used without rebuilding either artifact
- **AND** disabling the flag after the issue is fixed returns that customer to the production-default hybrid channel
- **AND** the runtime does not change channels after initialization

#### Scenario: Flag wiring is external to this repository
- **WHEN** this repository's build and runtime channel contract is implemented
- **THEN** it provides independently loadable legacy and hybrid entry points
- **AND** it does not invent the Rails flag key, configuration source, customer targeting mechanism, or Rails-side URL mapping

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

#### Scenario: Operational rollback selects the legacy channel for a customer
- **WHEN** operators enable the operational rollback flag for a customer
- **THEN** all execution uses legacy artifacts
- **AND** rollback does not require rebuilding bundles
- **AND** disabling the flag after the issue is fixed restores the production-default hybrid channel

#### Scenario: Slice rollback by manifest reversion
- **WHEN** operators revert selected manifest entries from `ts` to `legacy`
- **THEN** affected functions execute on legacy runtime while hybrid channel remains selectable
- **AND** unaffected migrated functions can remain on TypeScript per manifest

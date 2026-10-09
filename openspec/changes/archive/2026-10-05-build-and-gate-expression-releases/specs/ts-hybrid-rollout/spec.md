# Spec Delta

## Purpose

Defines the independently addressable legacy and hybrid expression release contract and the automated evidence required to release incremental TypeScript batches safely.

## ADDED Requirements

### Requirement: Legacy and hybrid releases preserve the shared adapter contract
The legacy and hybrid channels MUST expose the same runtime-adapter invocation, result, error, and lifecycle semantics required by the parity harness, including relevant host effects.

#### Scenario: Both channels satisfy the adapter contract
- **WHEN** the parity harness invokes a function or lifecycle probe against either channel
- **THEN** each channel accepts the same invocation inputs and exposes equivalent result and error shapes
- **AND** host effects and required runtime lifecycle behavior are observable through the shared contract

### Requirement: Each migration release contains complete legacy and hybrid channels
Each migration release MUST provide independently loadable legacy and hybrid artifacts at stable channel entry points, while preserving the backwards-compatible legacy entry point.

#### Scenario: Build emits both release channels
- **WHEN** a migration release is built
- **THEN** `dist/legacy/expressions.js` is the complete current CoffeeScript runtime
- **AND** `dist/hybrid/expressions.js` starts from that complete runtime and applies TypeScript implementations for same-named functions
- **AND** functions without a TypeScript implementation continue to use CoffeeScript
- **AND** `dist/expressions.js` remains the legacy-compatible entry point

### Requirement: Hybrid overrides use same-name implementations without a routing manifest
The hybrid channel MUST select TypeScript implementations by same-name override of CoffeeScript functions and MUST NOT require a per-function routing manifest.

#### Scenario: A function is or is not overridden
- **WHEN** a function has both CoffeeScript and TypeScript implementations
- **THEN** the hybrid channel executes its TypeScript implementation
- **AND** when it has no TypeScript implementation, the hybrid channel executes its CoffeeScript implementation

### Requirement: Hybrid typechecking is strict and isolated from the project baseline
The hybrid build MUST typecheck an explicit, migration-owned TypeScript dependency closure in strict mode, and diagnostics in that closure MUST block the hybrid build without making legacy output depend on the project-wide TypeScript check.

#### Scenario: Migration-owned TypeScript has diagnostics
- **WHEN** the isolated migration-owned TypeScript closure reports a diagnostic
- **THEN** the hybrid build fails
- **AND** the legacy build remains independent of that failure

#### Scenario: The project-wide TypeScript check has baseline diagnostics
- **WHEN** `yarn tsc --project ts --noEmit` reports its existing baseline diagnostics
- **THEN** the migration release does not claim that check passed or require it for legacy output

### Requirement: Automated parity and integrity gates run for each migration batch
Every migration batch MUST run the existing CoffeeScript tests, strict isolated TypeScript check, legacy and hybrid parity contracts, unchanged-function differential checks, migrated-function parity checks, and deterministic artifact verification with inventory checks.

#### Scenario: A batch runs its required gates
- **WHEN** CI evaluates a migration batch
- **THEN** all required test, typecheck, parity, differential, and artifact-integrity gate categories run against the applicable channels
- **AND** parity results identify the affected function group and provide actionable failure details

#### Scenario: Repeated builds are checked for stable artifacts
- **WHEN** deterministic build verification repeats the migration build
- **THEN** both stable channel entry points and the required legacy-compatible entry point are present
- **AND** the expected artifact inventories are stable across the builds

### Requirement: The Expression migration gates CI job blocks on any failed gate
The CI job named `Expression migration gates` MUST fail when any required migration gate fails, and its failure output MUST identify the failed gate with actionable details.

#### Scenario: A required gate fails
- **WHEN** any required migration gate fails
- **THEN** the `Expression migration gates` job fails
- **AND** its output identifies the failing gate and relevant function group where applicable

#### Scenario: Repository branch protection is configured separately
- **WHEN** repository administrators decide whether a status check is required for merge
- **THEN** requiring `Expression migration gates` is managed in repository settings outside this change
- **AND** the absence of that administrative setting does not change the CI job's failure behavior

### Requirement: Passing main-branch gates publish comparison channels without changing the compatibility baseline
The migration gate workflow MUST run on every pull request and push to `main`. After the gates pass on a push to `main`, it MUST publish the independently addressable legacy and hybrid bundles to production S3 without overwriting the existing backwards-compatible expression entry point.

#### Scenario: A pull request passes the migration gates
- **WHEN** a pull request passes all migration gates
- **THEN** the workflow reports gate success without running the production S3 deployment

#### Scenario: A main-branch push passes the migration gates
- **WHEN** a push to `main` passes all migration gates
- **THEN** the workflow builds the release bundles and deploys `legacy/expressions.js` and `hybrid/expressions.js` to their production S3 locations
- **AND** the existing `expressions.js` compatibility object is left unchanged as the comparison baseline

#### Scenario: A main-branch push fails a migration gate
- **WHEN** any migration gate fails on a push to `main`
- **THEN** the production deployment job does not run
- **AND** no expression bundle is published by that workflow run

### Requirement: Rails release selection remains a documented consumer contract
For each migration release, the legacy and hybrid channels MUST be independently addressable for the Rails consumer, while this repository documents but does not implement flag evaluation or customer targeting.

#### Scenario: Rails selects a release channel
- **WHEN** Rails reads `expressions-ts-migration` as `true`
- **THEN** Rails selects the hybrid channel
- **WHEN** Rails reads it as `false` or cannot read it
- **THEN** Rails selects the legacy channel
- **AND** this repository does not evaluate the flag, target customers, or implement startup fallback

### Requirement: Passing batches enter hybrid incrementally
Each migrated batch that passes its required gates MUST be included in the hybrid release when merged and released, alongside the complete legacy release, without a separate final-promotion milestone.

#### Scenario: A passing batch is merged and released
- **WHEN** a migration batch passes all required gates and is merged for release
- **THEN** its TypeScript implementations are included in the hybrid release
- **AND** the complete legacy release is published alongside it
- **AND** no all-functions-complete promotion is required

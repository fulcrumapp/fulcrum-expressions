---
name: coffee-to-typescript-runtime-migration
description: "Migrate fulcrum-expressions from CoffeeScript to TypeScript consistently. Use when porting runtime.coffee, functions.coffee, expressions-proxy.coffee, or test/docs scripts to TypeScript, enforcing parity, tests, and build cutover to a single TypeScript runtime source."
argument-hint: "Scope to migrate, for example: runtime hooks, function names, or specific CoffeeScript files"
user-invocable: true
---

# CoffeeScript to TypeScript Runtime Migration

Use this skill to port CoffeeScript implementation code to TypeScript in small, verifiable slices while preserving runtime behavior.

## When To Use
- Porting any remaining CoffeeScript runtime code.
- Moving expression function logic from CoffeeScript to TypeScript.
- Replacing CoffeeScript build entrypoints with TypeScript entrypoints.
- Converting legacy CoffeeScript tests/docs scripts to TypeScript-based workflows.

## Current Repository Baseline
- Remaining CoffeeScript files include runtime.coffee, functions.coffee, expressions-proxy.coffee, and CoffeeScript test/docs and script files.
- The TypeScript runtime and function surface already exist under ts/runtime and ts/functions.
- Current build and test commands still execute CoffeeScript entrypoints.

Read the repo-specific baseline before making migration decisions:
- [Repository migration baseline](./references/repo-baseline.md)

## Migration Procedure
1. Select a thin migration slice.
2. Build a parity map from CoffeeScript source to TypeScript destination modules.
3. Port behavior and types to TypeScript without changing public semantics.
4. Add or extend adversarial tests for edge cases and failure modes.
5. Run verification commands and compare behavior before/after.
6. Remove or isolate obsolete CoffeeScript code only after parity is proven.

## Step 1: Select Slice
Choose one of these slice types:
- Single function or small function family.
- Runtime subsystem, for example hooks, async callback flow, configuration, or event trigger path.
- Sandbox proxy or docs generation path.

Keep slices small enough to verify in one PR.

## Step 2: Build A Parity Map
For each slice, create a source to destination mapping:
- CoffeeScript source path and symbol.
- TypeScript destination path and symbol.
- Existing tests that cover behavior.
- New tests required for parity and edge cases.

Use this checklist template:
- [Migration checklist](./assets/migration-checklist.md)

## Step 3: Port Implementation
Rules:
- Preserve function names and runtime contracts used by expressions.
- Prefer type-system constraints over runtime guards when possible.
- Keep behavior identical unless a bug fix is explicitly scoped and tested.
- Ensure graceful degradation for host-dependent paths and async callbacks.

Common destinations:
- Function implementations: ts/functions/*.ts and ts/functions/index.ts.
- Runtime state and trigger flow: ts/runtime/index.ts.
- Host shims: ts/host/*.ts.
- Utilities: ts/util/*.ts.

## Step 4: Add Adversarial Tests
For each migrated area, test:
- Null, undefined, NaN, empty arrays, empty strings.
- Invalid types and malformed input objects.
- Bounds and precision-sensitive numeric behavior.
- Async callback ordering and missing host injection scenarios.

If no TypeScript test harness exists for the target area, add one in ts/test and wire it to package test scripts.

## Step 5: Verify Each Slice
Run these checks after every migration slice:
- yarn build
- yarn test
- make types

If behavior differs, either:
- Correct the TypeScript implementation to match CoffeeScript behavior, or
- Document and test the intentional behavior change.

## Step 6: Cutover To TypeScript Single Source
When all runtime-critical slices reach parity:
- Switch package build scripts to TypeScript entrypoints.
- Remove CoffeeScript runtime entrypoints from build scripts.
- Remove coffee-script and coffeeify dependencies once no longer needed.
- Keep a rollback plan for one release cycle.

## Completion Criteria
- No runtime code path depends on CoffeeScript entrypoints.
- Build and test scripts run TypeScript-only implementation.
- Public API and runtime behavior have parity coverage.
- All related docs and generated type artifacts come from TypeScript sources.

## References
- [Repository migration baseline](./references/repo-baseline.md)
- [Migration checklist](./assets/migration-checklist.md)

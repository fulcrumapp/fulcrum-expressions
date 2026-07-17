# Migration Checklist

Use this checklist for each migration slice.

## 1. Scope

- CoffeeScript source file and symbols:
- TypeScript destination file and symbols:
- Public behavior contract affected:

## 2. Parity Map

- Inputs and outputs documented:
- Side effects and host callbacks documented:
- Global runtime state touched documented:

## 3. Type Design

- Function signatures narrowed with explicit types:
- Null and undefined behavior preserved intentionally:
- Error and fallback behavior documented:

## 4. Tests

- Existing coverage identified:
- Added adversarial tests for invalid inputs:
- Added bounds and precision tests where numeric logic exists:
- Added async and host injection tests if applicable:

## 5. Validation

- yarn build passed:
- yarn test passed:
- make types passed:
- Manual parity spot-check completed:

## 6. Cutover Safety

- Legacy CoffeeScript path still available behind controlled fallback, if needed:
- Rollback plan documented:
- Follow-up cleanup tasks listed:

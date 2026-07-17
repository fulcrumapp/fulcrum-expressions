# Repository Migration Baseline

This baseline captures the current migration state so each PR can measure progress.

## File Inventory Snapshot

- CoffeeScript files remaining: 11
- TypeScript files under ts: 284

Remaining CoffeeScript files:

- runtime.coffee
- functions.coffee
- expressions-proxy.coffee
- utils.coffee
- test/test.coffee
- test/docs.coffee
- script/copy-files.coffee
- script/generate-help.coffee
- script/generators/base_generator.coffee
- script/generators/event.coffee
- script/generators/expression.coffee

## Key Observations

- Build scripts still compile CoffeeScript entrypoints through browserify and coffeeify.
- Test command still runs CoffeeScript tests through mocha with coffee-script/register and coffee-coverage.
- TypeScript runtime exists at ts/runtime/index.ts and most expression functions are already under ts/functions.
- ts/test currently contains helpers and fixtures but no active end-to-end TypeScript parity suite.

## Migration Priority

1. Runtime and function execution path: runtime.coffee and functions.coffee.
2. Sandbox/proxy path: expressions-proxy.coffee.
3. Test and docs script modernization: test and script CoffeeScript files.

## Verification Commands

- yarn build
- yarn test
- make types

## Exit Conditions For Full Cutover

- package build scripts point only to TypeScript entrypoints.
- no CoffeeScript runtime imports remain in distribution path.
- CoffeeScript dependencies can be removed safely.

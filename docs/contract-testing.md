# Expression contract testing

`test/contracts/expressions.json` is the hand-curated deterministic behavioral
corpus for the current expression runtime. The generated
`test/contracts/function-matrix.json` adds four probes (normal, coercion,
blank/null, and boundary) for every function source file in `ts/functions`.
Together they intentionally live beside, rather than replace, the existing
CoffeeScript unit suite.

Run the baseline suite with:

```sh
yarn test:contracts
```

`yarn test:contracts` runs the hand-curated and generated cases. Use
`yarn test:contracts:check` as the CI-equivalent check when the generated
fixture is already present; `yarn test:contracts:generate` updates the fixture
intentionally from the checked-in legacy runtime. The matrix records 14
classified limitations for host-only, time-dependent, or TypeScript-only surfaces;
these are reported in the fixture and are not silently omitted.

The runner normalizes dates, `undefined`, `NaN`, errors, functions, circular
objects, nested objects, and arrays before comparison. This keeps the contract
portable across compatible implementations while preserving meaningful result
shapes. A future runtime can export `createContractAdapter` from a module passed with
`node test/contract-runner.js --runtime ./path/to/adapter.js`; the adapter must
provide `invoke(name, args, configure)` and may provide `lifecycle()`. To compare
it with the legacy baseline, use `--compare` with the candidate adapter:

```sh
node test/contract-runner.js --runtime ./path/to/adapter.js --compare legacy
```

Both channel adapters implement the same contract:

- `invoke(name, args, configure?)` calls one expression function after resetting
  runtime state and returns `{ value, results }` on success or
  `{ error, results }` when the function throws. Unknown function names are
  adapter errors, not successful empty results.
- `lifecycle()` returns `{ runtimeGlobals, functionGlobals }`; both fields must
  be `true` when the required runtime and expression globals are installed.

The built hybrid channel is selected with `--runtime hybrid`; it is loaded in an
isolated JavaScript context so legacy and hybrid comparisons cannot overwrite
each other's globals. Comparison mode does not alter the package entry point,
sandbox files, or legacy published behavior.

The CI commands `yarn test:contracts:legacy` and `yarn test:contracts:hybrid`
report passing cases by function group. The hybrid command differentially
compares deterministic cases with legacy; cases explicitly marked
`volatile-result` still have to meet their declared result-shape/type
expectations but are not compared for exact values.
On failure, the runner prints the channel, function, contract case ID, and
assertion message before exiting nonzero; GitHub Actions therefore exposes an
actionable failed check. For that check to block merges, repository branch
protection must separately require the `Expression migration gates` status;
this repository change does not modify branch-protection settings.

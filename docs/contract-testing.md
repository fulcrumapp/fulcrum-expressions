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

The comparison mode is intended for a later migration adapter and does not alter
the package entry point, runtime implementation, sandbox files, or published
behavior.

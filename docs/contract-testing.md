# Expression contract testing

`test/contracts/expressions.json` is the deterministic behavioral corpus for the
current expression runtime. It intentionally lives beside, rather than replaces,
the existing CoffeeScript unit suite. The corpus covers representative exported
functions, runtime globals and reset/configuration lifecycle, host-effect result
shapes, geometry, locale/timezone values, and package/browser/iframe wiring.

Run the baseline suite with:

```sh
yarn test:contracts
```

The runner normalizes dates, `undefined`, `NaN`, functions, nested objects, and
arrays before comparison. This keeps the contract portable across compatible
implementations while preserving meaningful result shapes. A future runtime can
export `createContractAdapter` from a module passed with
`node test/contract-runner.js --runtime ./path/to/adapter.js`; the adapter must
provide `invoke(name, args, configure)` and may provide `lifecycle()`. To compare
it with the legacy baseline, use `--compare` with the candidate adapter:

```sh
node test/contract-runner.js --runtime ./path/to/adapter.js --compare legacy
```

The comparison mode is intended for a later migration adapter and does not alter
the package entry point, runtime implementation, sandbox files, or published
behavior.

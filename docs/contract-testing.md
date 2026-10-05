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
shapes. A runtime adapter provides `invoke(name, args, configure)` and `lifecycle()`.
`invoke` returns `{ value, results }` on success, `{ error, results }` when an
expression throws, and throws for an unknown expression name. The lifecycle
probe reports the required runtime and expression globals. To run a custom
adapter with the harness, pass its module path:

```sh
node test/contract-runner.js --runtime ./path/to/adapter.js --compare legacy
```

The built legacy and hybrid adapters use the same contract. Hybrid runs in an
isolated JavaScript context so its globals do not overwrite legacy state.

Run `yarn test:contracts:legacy` and `yarn test:contracts:hybrid` to report
contract results by function group. The hybrid command compares each
deterministic result with legacy; cases marked `volatile-result` are checked
against their declared result shape but not for exact values. Failures include
the channel, function group, case ID, and assertion message. `yarn test:migration-gates`
also runs CoffeeScript tests, the strict isolated migration typecheck, and
deterministic build integrity checks.

Each passing TypeScript batch is released in the hybrid channel alongside the
complete legacy channel. Rails owns release selection:
`expressions-ts-migration=true` selects hybrid, while `false` or an unreadable
flag selects legacy. This repository does not evaluate the flag or target
customers. Requiring the CI status check in branch protection is a separate
repository-administrator setting.

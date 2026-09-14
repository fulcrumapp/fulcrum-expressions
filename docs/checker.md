# Headless expression checker

`checker/index.js` exports the transport-neutral static checker for deployable
Fulcrum JavaScript. It is a source-only TypeScript 4.9.5 analysis boundary; it
does not import `runtime.coffee`, evaluate candidate code, resolve candidate
modules, access the filesystem, or make network requests.

The checker uses the pinned TypeScript compiler at runtime. It is declared as
an optional dependency so runtime-only consumers can install the package with
optional dependencies omitted; those deployments must not invoke the checker
subpath. It is also listed in `devDependencies` so repository builds and
lockfile-based development installs remain deterministic even when a package
manager is configured to omit optional dependencies.

## Public API

```js
const {
  validate,
  checkDataEvent,
  checkCalculation,
} = require('@fulcrumapp/fulcrum-expressions/checker')
```

The package export map preserves the runtime entry (`.`), the bare `dist`
compatibility path, extensionless and explicit `dist/expressions` and
`dist/expressions-proxy` runtime assets, `dist/*` runtime assets,
`package.json`, and the checker subpath. Other source and build files are implementation details rather than
supported package imports; consumers should use the runtime entry or the
checker subpath instead of relying on arbitrary deep imports. This detailed
document is repository-side API and design documentation; the published
README contains the supported checker entry and minimal invocation example.

`validate(request)` accepts a complete candidate request:

```js
validate({
  contract_version: 'v1',
  artifact_type: 'data_event', // or 'calculation'
  operation: 'validate',
  artifact: {
    source: 'ON("change", "status", (event) => ALERT(event.value));'
  },
  context: {
    form: {
      elements: [
        { data_name: 'status', type: 'TextField' },
      ],
    },
  },
  checks: ['syntax', 'api', 'hooks', 'fields'],
})
```

Calculation requests use `artifact.expression` and
`context: { form, repeatable, feature_index }`. The repeatable value is the
runtime repeatable element key, not an enum describing the calculation scope.

`checkDataEvent` and `checkCalculation` are convenience entry points that force
the corresponding profile and also accept the legacy source/form shorthand for
local callers. Every result uses the approved `v1` common envelope:
`contract_version`, `outcome`, `diagnostics`, `coverage`, and `versions`.
Coverage retains `requested`, `completed`, `skipped`, `unsupported`,
`unverified`, and `failures`.
`versions` reports the checker, exact TypeScript compiler, generated
`ts/api.ts` identity, expression runtime lineage, and profile.

Outcome selection is deterministic: source errors produce `invalid`; a checker
or approved dependency failure produces `unavailable`; missing, unsupported, or
unverified requested coverage produces `incomplete`; only complete, error-free
coverage produces `valid`. Coverage and diagnostics are retained for every
outcome.

Form variables are generated as nullable declarations (`$data_name`) and field
names remain permissive in the authoritative declarations. The checker adds
literal AST field-reference checks for `FIELD`, `VALUE`, setters, hook targets,
and repeatable helpers. Computed references are explicitly unverified and
cannot result in warning-only `valid` output. Calculation restrictions mirror
the deployed `runtime.coffee` calculation guard and are separate from Data
Event API checking.

The default bounds are 256 KiB of source, 128 KiB of form context, 20,000
source AST nodes at depth 200, 20,000 form nodes at depth 200, and 100
diagnostics. These are local pure-core bounds; HTTP, authentication, worker
resource isolation, package publication, and deployment remain separate
lifecycle gates.

Build the fixed declaration module after changing generated declarations:

```sh
yarn build:checker
```

This packages the pinned declaration and standard-library text into fixed
in-memory modules. It does not change `dist/expressions.js` or the CoffeeScript
runtime entry point.

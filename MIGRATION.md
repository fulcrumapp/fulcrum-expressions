# Migration Guide: v2 → v3

This guide covers the breaking changes when upgrading from `fulcrum-expressions` v2 to `@fulcrumapp/expressions` v3.

## Package Name

The package has been renamed from `fulcrum-expressions` to `@fulcrumapp/expressions` and is published to GitHub Packages.

```diff
- "fulcrum-expressions": "^2.1.6"
+ "@fulcrumapp/expressions": "^3.0.0"
```

Update your `.npmrc` to resolve the scoped package from GitHub Packages:

```
@fulcrumapp:registry=https://npm.pkg.github.com
```

## Module Format

v2 shipped a single browserified CJS bundle (`dist/expressions.js`). v3 ships dual ESM/CJS:

| Format | Entry point |
| ------ | ----------- |
| ESM    | `dist/index.js` |
| CJS    | `dist/index.cjs` |
| Types  | `dist/index.d.ts` / `dist/index.d.cts` |

```typescript
// ESM (recommended)
import { Runtime, functions } from "@fulcrumapp/expressions"

// CJS (legacy)
const { Runtime, functions } = require("@fulcrumapp/expressions")
```

## Runtime Instantiation

v2 auto-instantiated the runtime on import:

```javascript
// v2 — importing the bundle immediately set up globals
require("fulcrum-expressions/dist/expressions")
const runtime = $$runtime
```

v3 exports the `Runtime` class. You create and manage the instance yourself:

```typescript
// v3
import { Runtime } from "@fulcrumapp/expressions"
const runtime = new Runtime()
// Global functions ($$runtime, CONFIGURE, SUM, etc.) are now available
```

## CoffeeScript Removal

All CoffeeScript source files have been rewritten in TypeScript. The following files no longer exist:

| v2 file | v3 equivalent |
| ------- | ------------- |
| `runtime.coffee` | `src/runtime/index.ts` |
| `functions.coffee` | `src/functions/index.ts` |
| `utils.coffee` | Utilities inlined into function modules |

## Removed Artifacts

### Sandbox / Proxy

The expression sandbox (`expressions-proxy.coffee` → `dist/expressions-proxy.js`) has been removed. This was a postMessage-based iframe bridge used by older Fulcrum clients to evaluate expressions in an isolated context. Modern Fulcrum clients no longer use this mechanism.

If you relied on the sandbox, you should import and instantiate `Runtime` directly in your host environment.

### HTML Harness

`expressions.html` (the HTML page that loaded `expressions.js` and `expressions-proxy.js` inside an iframe) has been removed along with the sandbox.

### Docs / Help Generation

The `docs/` directory (`docs.js`, `docs.json`, `event_docs.js`, `event_docs.json`) and the `script/generate-help.coffee` helper have been removed. Function documentation now lives in JSDoc comments on the TypeScript source in `src/functions/`.

### Build Scripts

The CoffeeScript build pipeline (browserify + coffeeify + terser) has been replaced with [tsdown](https://github.com/nicolo-ribaudo/tsdown) (Rolldown-based bundler). The following scripts are gone:

- `build:expressions` / `build:expressions:debug`
- `build:sandbox` / `build:sandbox:debug`
- `build:docs` / `build:help`
- `build:dist`
- `copy` / `deploy`
- `console`

The new scripts are:

| Script | Description |
| ------ | ----------- |
| `yarn build` | Build ESM + CJS bundles with type declarations |
| `yarn test` | Run mocha tests |
| `yarn typecheck` | Type-check with `tsc --noEmit` |
| `yarn clean` | Remove `dist/` |

### Makefile and Type Generation

The `Makefile` (which ran `dts-generator` to produce `dist/api.raw.d.ts`) has been removed. Types are now generated automatically by tsdown from the TypeScript source.

### Misc Removed Files

- `.tool-versions` (asdf version pinning)
- `.npmignore` (replaced by `"files"` in package.json)
- `console` (CoffeeScript REPL helper)
- `script/` directory (deploy, copy, and help generation scripts)

## Dependency Changes

### Runtime Dependencies

| v2 | v3 |
| -- | -- |
| `@turf/turf` (full bundle) | Individual `@turf/*` v7 packages |
| `underscore` + `underscore.string` | `lodash` |
| `query-string` v3 | `query-string` v9 |
| `encodeurl` v1 | `encodeurl` v2 |
| `object-inspect` v1 | `object-inspect` v1 (unchanged) |

### Dev Dependencies

| v2 | v3 |
| -- | -- |
| browserify, coffeeify, terser | tsdown |
| coffee-script, coffee-coverage | — (removed) |
| mocha, should, istanbul | mocha, chai |
| typescript 4.x | typescript 5.x |
| dts-generator, jsdoc, marked, etc. | — (removed) |

## Function Parity

All 253 exported functions from v2 are present in v3. The function signatures and behavior are unchanged. The internal helper `MATH_FUNC` and the private `extensionMessageHandlers`/`nextExtensionSessionID` properties are no longer exported (they were implementation details of the removed sandbox).

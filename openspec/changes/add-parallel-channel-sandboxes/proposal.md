## Why

Phase 1b Rails consumer readiness needs independently addressable legacy and
hybrid sandbox endpoints. This repository currently builds and deploys only
the original frozen-runtime comparison page.

## What Changes

- Add channel-local sandbox HTML sources and release/debug outputs at
  `dist/hybrid/expressions.html` and `dist/legacy/expressions.html`.
- Load local `expressions.js`, followed by shared `../expressions-proxy.js`.
- Publish both pages through preview and production deployment with `text/html`.
- Verify page contents, relative paths, stable inventories, and upload metadata.
- Update consumer documentation while preserving the original `expressions.html`
  and frozen `/expv1/expressions.js`.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `ts-hybrid-rollout`: Define channel-local sandbox packaging and deployment.

## Impact

Changes affect sandbox sources, build integrity checks, deployment and its stub
tests, and migration documentation. Rails flag selection, host wiring, and
application-runtime acceptance remain separate work and are not implemented here.

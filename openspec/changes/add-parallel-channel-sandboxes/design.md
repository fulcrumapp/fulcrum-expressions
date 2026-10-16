## Context

Both runtime channels are already built and deployed, but only the original
comparison sandbox is packaged. That page loads the frozen root runtime and
must remain unchanged.

## Goals / Non-Goals

Goals: package and deploy explicit channel-local pages in release and debug
builds, verify relative script resolution and stable inventories, and document
the independently selectable endpoints.

Non-goals: Rails integration, flag evaluation, host lifecycle wiring, actual
production deployment, or application-runtime acceptance.

## Decisions

Add `hybrid/expressions.html` and `legacy/expressions.html` as explicit sources.
Each loads `expressions.js` and then `../expressions-proxy.js`. Copy them into
their channel directories alongside bundles; the shared proxy stays at the
dist/deployment root. Preserve the original page byte-for-byte.

Build verification checks release and debug outputs, exact script order,
relative URL resolution, expected artifacts, comparison-page preservation, and
stable repeated-build inventories within each mode.

Deployment adds both channel pages with `text/html` without changing bucket
selection, existing JavaScript uploads, or CloudFront invalidation. AWS-stub
tests check preview and production targets, source contents, metadata, and the
continued prohibition on frozen root runtime uploads.

## Risks / Trade-offs

- Explicit HTML sources can drift: verify script order and comparison contents.
- Relative paths can resolve incorrectly: check local and deployment URLs.
- Incorrect content types can break loading: assert upload metadata.

## Migration Plan

Publish both new pages alongside existing assets. Rails adoption and exercised
fallback/rollback are separate prerequisites before migrated batches are exposed.
Do not claim deployed availability from local or stub checks alone.

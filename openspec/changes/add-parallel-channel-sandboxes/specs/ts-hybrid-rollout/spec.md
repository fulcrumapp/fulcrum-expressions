## MODIFIED Requirements

### Requirement: Rails release selection remains a documented consumer contract
For each migration release, the legacy and hybrid channels MUST be independently addressable for the Rails consumer, while this repository documents but does not implement flag evaluation or customer targeting.

#### Scenario: Parallel sandbox artifacts precede migrated batch exposure
- **WHEN** preparing Phase 1b consumer readiness
- **THEN** release and debug builds MUST emit `dist/hybrid/expressions.html` and `dist/legacy/expressions.html` alongside their channel bundles
- **AND** each page MUST load local `expressions.js`, followed by shared `../expressions-proxy.js`
- **AND** inventories MUST verify page contents, relative resolution to the channel bundle and shared root proxy, and stable repeated-build output
- **AND** preview and production deployment MUST upload `/expv1/hybrid/expressions.html` and `/expv1/legacy/expressions.html` with `text/html`
- **AND** deployment tests MUST verify endpoint targets, page contents, metadata, and preserved bundle/proxy uploads
- **AND** the original `expressions.html` contents and frozen root runtime MUST remain unchanged as the comparison sandbox
- **AND** asset availability MUST NOT be claimed before the relevant build and deployment checks pass
- **AND** these assets do not implement or establish acceptance of the separate Rails prerequisite

#### Scenario: Consumer readiness precedes migrated batch exposure
- **WHEN** Phase 2 migrated batches are to be exposed
- **THEN** the separate Rails integration MUST already load and exercise the real deployed hybrid channel under the flag, including required lifecycle and host wiring
- **AND** false or unreadable flag selection, startup fallback, and rollback to complete legacy MUST be exercised with reviewable application-runtime evidence
- **AND** Rails sandbox URL configuration MUST select `/expv1/hybrid/expressions.html` for flag true and `/expv1/legacy/expressions.html` for false, unreadable or rollback
- **AND** an empty-override hybrid MAY establish baseline wiring but does not establish acceptance of migrated functions
- **AND** this expressions change does not claim this separate Rails prerequisite is complete

#### Scenario: Rails selects a release channel
- **WHEN** Rails reads `expressions-ts-migration` as `true`
- **THEN** Rails selects the hybrid channel
- **WHEN** Rails reads it as `false` or cannot read it
- **THEN** Rails selects the legacy channel
- **AND** this repository does not evaluate the flag, target customers, or implement startup fallback

### Requirement: Passing batches enter hybrid incrementally
Each migrated batch that passes its required gates MUST be included in the hybrid release when merged and released, alongside the complete legacy release, without a separate final-promotion milestone.

#### Scenario: A passing batch is merged and released
- **WHEN** a migration batch passes all required gates and is merged for release
- **THEN** its TypeScript implementations are included in the hybrid release
- **AND** the complete legacy release is published alongside it
- **AND** no all-functions-complete promotion is required

#### Scenario: Each released batch is accepted in the application runtime before the next
- **WHEN** a gated batch is released in hybrid
- **THEN** the deployed hybrid MUST be exercised through the flagged Rails application runtime
- **AND** this execution MUST use the parallel `/expv1/hybrid/expressions.html` endpoint rather than the original comparison sandbox
- **AND** reviewable evidence MUST identify the release and selected channel, affected expression flows, values or errors, lifecycle and host effects, and comparison with legacy
- **AND** the next batch MUST NOT proceed until the current batch's runtime results are accepted
- **AND** problems MUST trigger rollback to legacy and correction and revalidation before advancing
- **AND** publication or isolated contract success alone MUST NOT count as runtime acceptance

## ADDED Requirements

### Requirement: Evidence matrix separates observed and normative behavior
The inventory SHALL identify the source repository, branch/commit or PR,
file/symbol, observed behavior, confidence, and whether the behavior is
merged, open/provisional, or proposed. Unverified assumptions SHALL be
listed as unknowns and SHALL NOT be promoted to compatibility requirements.

#### Scenario: Cross-repository evidence is traceable
- **WHEN** a reviewer selects any inventory row
- **THEN** the cited repository source and version can be inspected and the
  row states whether it is merged or provisional

#### Scenario: Conflicting behavior is visible
- **WHEN** expression, KMP, Android, or iOS evidence differs
- **THEN** the matrix records the conflict and a design-review decision gate
  rather than silently selecting one implementation

### Requirement: INFERENCE reference-file semantics are documented
The inventory SHALL document model/reference resolution order, form ID/name
selection, ordering, encoding, size limits or the absence of an observed
limit, missing/unavailable behavior, prompt/context injection, model
selection, result envelopes, and compatibility aliases. It SHALL identify
which semantics are expression-layer validation versus native host behavior.

#### Scenario: Model and labels behavior is covered
- **WHEN** a reviewer reads the inventory
- **THEN** it explains form-scoped model lookup, downloaded/catalog lookup
  where evidenced, `labels.txt` parsing and precedence, and the different
  consequences of missing model versus missing optional labels

#### Scenario: Unknown limits are not guessed
- **WHEN** no source establishes a byte, line, or context limit
- **THEN** the inventory says “not observed,” adds a review question, and
  blocks normative implementation until the limit is approved

### Requirement: PR and release dependencies are explicit
The plan SHALL identify the continuation, merge, or closure strategy for PR
#107 and the dependency order for expression, KMP, Android, and iOS work.
No later implementation SHALL treat an open PR as a released compatibility
baseline.

#### Scenario: PR #107 disposition is locked
- **WHEN** planning artifacts are finalized for FLCRM-21463
- **THEN** PR #107 is kept non-normative and closed by default, with only
  reviewed non-conflicting expression documentation carried into the canonical
  FLCRM-21463 artifacts, and no duplicate normative contract

#### Scenario: Later implementation is gated
- **WHEN** a platform implementation ticket starts
- **THEN** it links the approved contract and conformance fixtures and records
  the exact baseline release/commit it implements

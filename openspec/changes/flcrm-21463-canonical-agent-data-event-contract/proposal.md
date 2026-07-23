## Why

The existing `INFERENCE()` reference-file contract is distributed across the
expression runtime, KMP, Android, and iOS, while the AGENT data-event work is
already progressing in platform branches. Without a reviewed, evidence-backed
contract, later implementations can diverge on model lookup, reference-file
semantics, prompt/context boundaries, task schemas, tool permissions, errors,
and compatibility. FLCRM-21463 establishes the canonical contract before
expression or platform implementation proceeds.

## What Changes

- Inventory and cite the current `INFERENCE()` reference-file behavior in
  `fulcrum-expressions`, KMP, Android, and iOS.
- Capture representative, sanitized offline fixtures for model references,
  `labels.txt`, ordering, encoding, limits, missing/unavailable files, and
  compatibility behavior.
- Define the canonical AGENT payload and result contract, including model
  selection, task input/output schemas, references, prompt/context injection,
  tool descriptors and per-invocation allow-lists, versioning, and stable
  error categories.
- Record the observed behavior-versus-proposed-contract delta so later tickets
  do not silently convert an observation into a compatibility promise.
- Establish review gates and cross-repository conformance requirements before
  any expression or platform implementation changes.
- Do not modify production code, generated runtime behavior, APIs, database
  schema, dependencies, or deployment configuration in this planning change.

## Capabilities

### New Capabilities

- `agent-data-event-contract`: Canonical, versioned AGENT schema, compatibility
  rules, reference semantics, security boundaries, and conformance fixtures.
- `inference-reference-file-inventory`: Evidence-backed inventory of existing
  INFERENCE model/reference-file resolution and error behavior across all
  participating repositories.

### Modified Capabilities

- None. This change defines a new contract and records existing behavior; it
  does not change an existing runtime requirement.

## Impact

The primary artifact is documentation and fixtures in this repository's
planning layer. The evidence set covers the expression CoffeeScript runtime
and TypeScript declarations, KMP inference/agent models and resolver, Android
expression invocation and local model runtime, and iOS expression resolver and
bridge. Later implementation changes will affect those repositories and their
tests, but this ticket intentionally creates no production dependency or
runtime change. PR #107 is locked to closure as a non-normative side path.
Carry forward only reviewed expression-only INFERENCE wording into canonical
FLCRM-21463 artifacts. No competing normative AGENT contract source is allowed.

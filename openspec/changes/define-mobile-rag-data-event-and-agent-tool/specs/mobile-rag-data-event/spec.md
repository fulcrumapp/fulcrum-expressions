## Purpose

Define the mobile-only Data Event boundary for safe, local RAG retrieval
from the active form's validated offline bundle.

## ADDED Requirements

### Requirement: The mobile RAG Data Event has one ratified public contract

The system SHALL treat `RAG(options, callback)` as the provisional public
Data Event name and SHALL use asynchronous callback completion semantics
consistent with the existing host-function pattern. Before a native host
exposes the function, FLCRM-22079 SHALL ratify one closed, versioned public
contract that defines the final function name, options schema, result schema,
error schema, numeric bounds, and compatibility rules. A host MUST NOT expose
an unversioned or host-specific variation of that contract.

#### Scenario: A native implementation is prepared for release

- **WHEN** an iOS or Android host prepares to expose RAG to Data Events
- **THEN** it uses the single contract revision ratified by FLCRM-22079

#### Scenario: The provisional contract has not been ratified

- **WHEN** the required FLCRM-22079 contract decisions are incomplete
- **THEN** no implementation SHALL publish a public RAG surface based on
  locally invented names, fields, error codes, or limits

### Requirement: Availability is mobile-only and local

In v1, iOS and Android native ExpressionEngine hosts SHALL provide RAG using
only local retrieval. Web execution SHALL complete through the callback with
the stable `rag_unavailable` error and MUST NOT call Synapse. A native host
without the current form's valid local bundle SHALL complete with the
ratified availability or bundle error and MUST NOT fall back to remote
retrieval.

#### Scenario: A Data Event runs in the web host

- **WHEN** a Data Event invokes RAG in web execution
- **THEN** its callback receives `rag_unavailable` and no Synapse request is
  made

#### Scenario: A mobile host has no valid bundle

- **WHEN** a Data Event invokes RAG on iOS or Android and the active form has
  no valid local RAG bundle
- **THEN** its callback receives the ratified availability or bundle error
  without a remote, cross-form, or empty-success fallback

### Requirement: Retrieval is isolated to the current active form

RAG SHALL bind each invocation to the current active form and SHALL search
only that form's locally present, signed, and validated RAG bundle. The
public options contract MUST NOT accept an alternate form identifier, and an
invocation MUST NOT perform cross-form search, multi-form aggregation, or
fallback to any other bundle.

#### Scenario: A caller attempts to select another form

- **WHEN** an invocation provides an alternate-form selector or equivalent
  unsupported input
- **THEN** the host rejects it using the ratified error contract and does not
  inspect another form's bundle

#### Scenario: The active form has a valid local bundle

- **WHEN** RAG starts retrieval for an active form with a valid local bundle
- **THEN** every passage and citation returned by that invocation originates
  only from that form's bundle

### Requirement: RAG returns retrieval data and never generates an answer

On successful retrieval, RAG SHALL return a bounded, ranked set of passages
with citation or source metadata, a result count, and local bundle/version
correlation in the ratified result schema. RAG MUST NOT generate an answer,
invoke an LLM, transmit document content, or call Synapse at query time.

#### Scenario: Local retrieval finds matching passages

- **WHEN** a valid local query matches content in the active form's bundle
- **THEN** the callback receives only the ratified retrieval and citation
  data for the bounded ranked results

#### Scenario: Retrieval is invoked at query time

- **WHEN** RAG evaluates a Data Event invocation
- **THEN** it performs no LLM invocation, answer generation, document
  transmission, or Synapse retrieval request

### Requirement: Completion, privacy, and bounds are explicit

The ratified contract SHALL define availability, cancellation, and timeout
semantics. A completed, cancelled, unavailable, or timed-out invocation MUST
complete its callback exactly once; a cancelled or timed-out invocation MUST
not return partial passage data. The implementation SHALL enforce the
ratified result-count, passage-size, metadata, and execution-time bounds and
apply the ratified privacy and redaction rules before delivering data to the
Data Event.

#### Scenario: An invocation is cancelled

- **WHEN** the ratified cancellation trigger occurs before retrieval
  completes
- **THEN** the callback completes once with the ratified cancellation outcome
  and no passage payload is delivered afterward

#### Scenario: Retrieval exceeds its allowed time

- **WHEN** an invocation reaches the ratified retrieval timeout
- **THEN** the callback completes once with the ratified timeout outcome and
  no partial result is returned

#### Scenario: A result exceeds an approved privacy or size boundary

- **WHEN** retrieval data would exceed a ratified bound or disclose content
  prohibited by the ratified redaction policy
- **THEN** the host enforces that policy before callback delivery

### Requirement: Contract fixtures prove host conformance

The change SHALL define versioned golden fixtures using non-sensitive test
content for the ratified contract. The fixture suite SHALL cover successful
ranked retrieval with citations, current-form isolation, unavailable or
invalid bundles, cancellation, timeout, result bounds, privacy redaction,
and web `rag_unavailable` behavior. iOS and Android host implementations
MUST validate against the same fixture expectations.

#### Scenario: A mobile host implements the RAG contract

- **WHEN** an iOS or Android host is validated for release
- **THEN** it passes the golden fixtures for the ratified RAG contract

#### Scenario: Web RAG behavior is validated

- **WHEN** the web execution host is evaluated against the RAG fixtures
- **THEN** it produces `rag_unavailable` without a Synapse interaction

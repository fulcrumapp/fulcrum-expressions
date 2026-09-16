## Purpose

Define the separate Android conversational-agent tool boundary for safe,
policy-controlled local RAG retrieval from the active form's bundle.

## ADDED Requirements

### Requirement: Android agent retrieval is distinct from the Data Event

Android conversational agents SHALL use a distinct local RAG
AgentToolRegistration, analogous in responsibility to
`SearchLocalRecordsAgentToolRegistry`, rather than invoking Data Event
JavaScript. The registration MUST NOT expose itself as the public
`RAG(options, callback)` language function and MUST NOT execute a Data Event
to perform retrieval.

#### Scenario: An authorized Android agent invokes local RAG

- **WHEN** an authorized agent selects the registered local RAG tool
- **THEN** the tool invokes local retrieval directly without executing Data
  Event JavaScript

#### Scenario: A Data Event is unavailable to the agent

- **WHEN** an Android agent needs retrieval but no Data Event invocation is
  available
- **THEN** the agent tool's behavior remains independent of the public RAG
  Data Event function

### Requirement: The agent tool shares the local retrieval and isolation boundary

The Android agent tool SHALL use the same KMP local retrieval core as mobile
RAG Data Event hosts. It SHALL bind retrieval to the current active form and
only that form's signed, validated local RAG bundle. The tool input MUST NOT
permit an alternate form, cross-form search, aggregation, fallback, remote
Synapse retrieval, or document transmission.

#### Scenario: The agent searches an active form with a valid bundle

- **WHEN** the agent tool receives an authorized request for the active form
- **THEN** all retrieval data comes from the active form's validated local
  bundle through the shared KMP retrieval core

#### Scenario: The agent requests data from another form

- **WHEN** an agent tool input attempts to select or aggregate another form
- **THEN** the tool rejects the request under its agent-tool policy without
  accessing another bundle

### Requirement: The agent tool has its own policy and lifecycle contract

The agent tool SHALL have an Android-specific allowlist, authorization
policy, versioned input/output contract, and invocation lifecycle that are
separate from Data Event validation and callback semantics. Before release,
FLCRM-22079 SHALL ratify the compatible retrieval/citation profile, public
bounds, cancellation, timeout, availability behavior, and error mapping
needed by both surfaces. The agent tool MUST enforce its policy before
retrieval begins and MUST complete each accepted invocation according to its
ratified lifecycle without delegating to Data Event JavaScript.

#### Scenario: An unallowlisted agent attempts retrieval

- **WHEN** an agent that is not authorized by the local RAG tool policy
  attempts invocation
- **THEN** the tool denies the request before retrieval and does not execute
  a Data Event or contact Synapse

#### Scenario: An agent invocation is cancelled or times out

- **WHEN** cancellation or timeout occurs according to the ratified agent
  tool lifecycle
- **THEN** the tool produces the ratified terminal outcome without returning
  partial retrieval data afterward

### Requirement: Agent-tool output is retrieval-compatible but not generative

For a successful authorized request, the agent tool SHALL return the
ratified bounded ranked passages, citation or source metadata, result count,
and local bundle/version correlation compatible with the shared retrieval
profile. The tool MUST NOT generate an answer, invoke an LLM, call Synapse,
or expose a Data Event callback API.

#### Scenario: The agent tool finds local matches

- **WHEN** an authorized request matches passages in the active form's local
  bundle
- **THEN** the output contains only the ratified bounded retrieval and
  citation data

#### Scenario: The tool is used during an agent conversation

- **WHEN** the agent tool performs retrieval
- **THEN** the tool itself does not generate an answer or make a query-time
  Synapse request

### Requirement: Agent-tool conformance preserves privacy and shared fixtures

The Android agent tool SHALL apply the ratified privacy, redaction, and
retrieval bounds before delivering tool output. Its conformance suite SHALL
use the versioned, non-sensitive golden fixtures shared with the mobile RAG
contract and SHALL additionally verify allowlist enforcement and the absence
of Data Event JavaScript execution.

#### Scenario: A fixture contains redacted or oversized retrieval data

- **WHEN** the agent tool is exercised with a golden fixture that triggers
  redaction or a result bound
- **THEN** the delivered output complies with the ratified privacy and
  bounds rules

#### Scenario: Agent-tool isolation is tested

- **WHEN** the Android agent tool conformance suite runs
- **THEN** it verifies policy enforcement, active-form isolation, shared
  retrieval fixture output, and no Data Event JavaScript execution

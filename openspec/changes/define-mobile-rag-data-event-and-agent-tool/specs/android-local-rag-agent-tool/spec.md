## Purpose

Define the final v1 Android `search_form_knowledge` tool for independently
authorized, active-form local RAG retrieval without Data Event JavaScript.

## ADDED Requirements

### Requirement: search_form_knowledge is a closed v1 Android agent tool

Android conversational agents SHALL expose the local retrieval tool named
`search_form_knowledge`. It SHALL be a closed, versioned v1 agent-tool
surface, distinct from the public Data Event `RAG(options, callback)`. The
tool MUST NOT register as a Data Event function, expose a Data Event callback
API, start an expression engine, or invoke Data Event JavaScript.

Its input SHALL be an object with exactly:

| Property | Requirement |
| --- | --- |
| `query` | Required literal plain-text string; after trimming, 1 through 1,000 Unicode scalar values |
| `limit` | Optional integer; default `5`; inclusive range `1..20` |
| `min_score` | Optional finite normalized number; default `0.70`; inclusive range `0..1` |
| `timeout_ms` | Optional integer in milliseconds; default `2000`; inclusive range `2000..10000` |

The tool MUST NOT accept `null`, coercion, non-finite values, undeclared
properties, or a form, attachment, document, bundle, cross-form, or
all-bundles selector. `query` MUST be handled as literal plain text, not as a
query DSL, expression, regular expression, URL, or source selector. A missing
or invalid query returns `rag_invalid_query` only after options-object shape,
unknown properties, and optional-field values pass validation. Every invalid
options-object shape, optional value, or unknown property returns
`rag_invalid_options`.

The tool SHALL validate options-object shape, unknown properties, and optional
field values before it validates `query`; it SHALL validate `query` before it
evaluates its allowlist/policy, active-form availability, or bundle
availability. The first failing category is terminal. Therefore an invalid
option or query SHALL not be masked by an unavailable host, a missing active
form, an unusable bundle, or a denied agent policy.

The tool's successful output SHALL be the same closed
`RagRetrievalResultV1` schema used by RAG:

```text
{
  bundle_version: string,
  result_count: integer,
  results: Array<{
    rank: integer,
    score: number,
    text: string,
    citation: {
      attachment_id: string,
      filename: string,
      page_number: integer,
      chunk_id: string,
      section_heading?: string
    }
  }>
}
```

The only stable v1 tool error codes are `rag_invalid_options`,
`rag_invalid_query`, `rag_unavailable`, `rag_timeout`, and `rag_cancelled`.
Any change to these public input, output, or error fields requires a new
contract version.

#### Scenario: An agent supplies only a valid query

- **WHEN** an authorized agent invokes `search_form_knowledge` with a valid
  `query` and omits optional inputs
- **THEN** the tool uses `limit: 5`, `min_score: 0.70`, and
  `timeout_ms: 2000`

#### Scenario: An agent supplies an alternate-form selector

- **WHEN** an agent supplies `form_id`, `attachment_id`, `document_id`, a
  bundle selector, or any other undeclared input
- **THEN** the tool terminates with `rag_invalid_options` and does not begin
  retrieval

#### Scenario: The tool returns retrieval data

- **WHEN** an authorized local retrieval completes with eligible matches
- **THEN** the tool returns only the exact closed v1 result schema and no
  Data Event callback surface

### Requirement: The agent tool enforces its own authorization and lifecycle

The Android agent runtime SHALL apply the
`search_form_knowledge` AgentToolRegistration allowlist and policy after
input validation and before calling local retrieval. This authorization
boundary SHALL be independent of Data Event validation, permissions, and
callback lifecycle. A caller that is not allowed by the tool policy SHALL
receive `rag_unavailable`, and the tool MUST NOT invoke the shared retrieval
core, Data Event JavaScript, or Synapse.

For an accepted request, the tool SHALL complete through its agent invocation
lifecycle with exactly one terminal success or one closed v1 error code. Its
timeout clock SHALL start only after input validation, allowlist/policy,
active-form, and bundle preflight have accepted local retrieval. Record,
editor, or associated agent invocation unload SHALL cancel an accepted
in-flight request as `rag_cancelled` before its context is disposed. The first
terminal transition wins a cancellation-versus-timeout race, and no partial,
late, or duplicate output is permitted.

#### Scenario: An unallowlisted agent requests retrieval

- **WHEN** an agent is not allowed by the
  `search_form_knowledge` policy
- **THEN** the tool returns `rag_unavailable` before calling the KMP core and
  does not execute Data Event JavaScript or contact Synapse

#### Scenario: Invalid input takes precedence over agent policy

- **WHEN** an unallowlisted agent supplies a blank `query` after trimming
- **THEN** the tool terminates with `rag_invalid_query` before it evaluates
  the allowlist/policy

#### Scenario: An allowed agent request is cancelled on unload

- **WHEN** the record, editor, or associated agent invocation unloads before
  local retrieval completes
- **THEN** the tool terminates exactly once with `rag_cancelled` and emits no
  later retrieval output

#### Scenario: An allowed agent request exceeds its timeout

- **WHEN** a valid accepted request has not completed by its effective
  `timeout_ms`
- **THEN** the tool terminates exactly once with `rag_timeout`, no result, and
  no later output

### Requirement: The agent tool uses the shared active-form KMP retrieval core

`search_form_knowledge` SHALL call the same KMP local retrieval core used by
the iOS and Android RAG Data Event adapters. Upon accepting a request, it
SHALL capture the current active form and search only that form's signed and
validated local RAG bundle.

The tool MUST NOT enumerate all downloaded bundles; search another form;
aggregate forms; select an independent attachment, document, or bundle; fall
back to another local bundle; or make a query-time Synapse request. If there
is no active form or its signed and validated local bundle is absent, invalid,
or unusable, the tool SHALL terminate with `rag_unavailable`.

#### Scenario: An active form has a usable local bundle

- **WHEN** an allowed agent invokes the tool for an active form with a signed
  and validated local bundle
- **THEN** every candidate and result originates only from that form's bundle
  through the shared KMP core

#### Scenario: The active form has no usable local bundle

- **WHEN** an allowed agent invokes the tool without an active form or with an
  absent, invalid, or unusable active-form bundle
- **THEN** the tool returns `rag_unavailable` without a cross-form,
  all-bundles, empty-success, or remote fallback

### Requirement: The agent tool preserves exact v1 retrieval semantics

The agent tool SHALL apply the same v1 retrieval semantics as RAG. The shared
core SHALL normalize each internal engine score to one finite `score` in the
inclusive range `0..1`, apply the effective `min_score` inclusively before the
effective `limit`, sort retained results by `score` descending, and sort equal
scores by `citation.chunk_id` in ascending Unicode code-point order. The raw
engine score MUST NOT be exposed.

`result_count` SHALL equal `results.length` and be in `0..effective limit`.
Each `rank` SHALL be one-based and contiguous. `text` SHALL be non-empty
redacted passage text of at most 2,000 Unicode scalar values.
`bundle_version`, `attachment_id`, `filename`, `page_number`, `chunk_id`, and
optional `section_heading` SHALL meet the same v1 bounds and semantics:

| Property | Requirement |
| --- | --- |
| `bundle_version` | Non-empty opaque identifier of at most 128 Unicode scalar values |
| `attachment_id` | Non-empty opaque identifier of at most 128 Unicode scalar values |
| `filename` | Non-empty redacted display filename of at most 255 Unicode scalar values |
| `page_number` | Integer in the inclusive range `1..100000` |
| `chunk_id` | Non-empty opaque identifier of at most 128 Unicode scalar values |
| `section_heading` | Optional; when present, non-empty redacted plain text of at most 500 Unicode scalar values |

An empty matching set SHALL be a successful result with `result_count: 0` and
`results: []`. The tool MUST NOT return a source URL, credential,
authentication material, user token, raw engine score, cross-form metadata,
or any undeclared result field.

#### Scenario: The threshold is applied before result count

- **WHEN** active-form retrieval has candidates above and below the effective
  `min_score` and more eligible candidates than the effective `limit`
- **THEN** the tool removes below-threshold candidates before returning at
  most the highest-ranked `limit` candidates

#### Scenario: Two candidates have the same normalized score

- **WHEN** two retained candidates have equal normalized `score`
- **THEN** the tool returns them in ascending Unicode code-point order of
  `citation.chunk_id`

#### Scenario: The tool finds no eligible candidate

- **WHEN** no active-form candidate satisfies the retrieval and output rules
- **THEN** the tool succeeds with the active bundle version,
  `result_count: 0`, and `results: []`

### Requirement: The agent tool protects retrieval output and diagnostics

Before output, the shared core SHALL redact prohibited credential,
authentication, user-token, source-URL, and cross-form metadata from text
fields. If a candidate cannot retain every required result and citation field
after sanitization and bounds enforcement, the tool SHALL omit that candidate.
The resulting `result_count` SHALL include only delivered candidates.

The tool is retrieval-only: it MUST NOT generate an answer, invoke an LLM,
transmit document content, or query Synapse during invocation. Tool errors and
logs MUST NOT contain query text, passage text, filenames, citation values,
document content, source URLs, credentials, authentication material, or user
tokens.

Delivering the bounded v1 result through the local agent invocation is
permitted retrieval output and is not document-content egress. The tool MUST
NOT send its query, passages, citations, or other document content to Synapse,
an LLM, or any other remote endpoint.

#### Scenario: A candidate cannot be safely represented

- **WHEN** a candidate cannot meet the required v1 output fields after
  sanitization and bounds enforcement
- **THEN** the tool omits that candidate and may return an otherwise
  successful empty result

#### Scenario: The tool handles a retrieval request

- **WHEN** `search_form_knowledge` performs an accepted retrieval
- **THEN** it returns passages and citations only, without answer generation,
  LLM invocation, document transmission, or a Synapse query

### Requirement: Agent-tool conformance uses the shared v1 golden fixtures

The Android agent-tool implementation SHALL pass the shared, versioned,
non-sensitive v1 golden fixtures. The suite SHALL prove input validation and
defaults; validation-before-policy/availability precedence; agent allowlist
denial; direct KMP use without Data Event JavaScript; active-form-only
retrieval; no cross-form, all-bundles, aggregate, fallback, or Synapse paths;
score normalization/filtering/ranking; exact output schema and bounds; empty
success; privacy sanitization; protected diagnostics; timeout; unload
cancellation; and exactly-once terminal behavior.

#### Scenario: The agent tool is ready for release

- **WHEN** Android declares `search_form_knowledge` ready for release
- **THEN** it passes the applicable shared v1 fixture suite, including the
  agent-specific policy and no-Data-Event-JavaScript assertions

## Purpose

Define the final v1 mobile-only Data Event interface for safe, bounded,
active-form local RAG retrieval from a validated offline bundle.

## ADDED Requirements

### Requirement: RAG is a closed, versioned v1 callback interface

The system SHALL expose the final public Data Event function
`RAG(options, callback)` in v1. RAG SHALL be asynchronous and callback-based,
consistent with the existing `INFERENCE(options, callback)` host-function
pattern. The v1 contract is closed: a producer MUST NOT add a public input,
result, result-item, citation, or stable error-code field without publishing a
new contract version.

`options` SHALL be an object with exactly these properties:

| Property | Requirement |
| --- | --- |
| `query` | Required literal plain-text string; after trimming, 1 through 1,000 Unicode scalar values |
| `limit` | Optional integer; default `5`; inclusive range `1..20` |
| `min_score` | Optional finite normalized number; default `0.70`; inclusive range `0..1` |
| `timeout_ms` | Optional integer in milliseconds; default `2000`; inclusive range `2000..10000` |

`query` MUST be treated as literal plain text and MUST NOT be interpreted as
a query DSL, expression, regular expression, URL, form selector, attachment
selector, document selector, or bundle selector. `null`, coercion,
non-finite values, and undeclared properties are invalid. In particular,
`form_id`, `attachment_id`, `document_id`, bundle selectors, and equivalent
alternate-form inputs are undeclared and invalid.

The callback MUST be callable. A missing or non-callable callback SHALL
synchronously throw an Error-compatible error with code `rag_invalid_options`
before retrieval because it has no callback delivery channel. For a callable
callback, every invocation SHALL complete asynchronously and exactly once.
Successful calls SHALL invoke `callback(null, result)`. Failed calls SHALL
invoke `callback(error, null)`, where `error.code` is one of the closed v1
codes.

For a callable callback, RAG SHALL validate options-object shape, unknown
properties, and optional-field values before it validates `query`; it SHALL
validate `query` before it evaluates host support, active-form availability,
or bundle availability. The first failing category is terminal. Therefore an
invalid option or query SHALL not be masked by web execution, a missing active
form, or an unusable bundle.

#### Scenario: RAG uses default option values

- **WHEN** a Data Event calls RAG with a valid `query` and omits `limit`,
  `min_score`, and `timeout_ms`
- **THEN** the invocation uses `limit: 5`, `min_score: 0.70`, and
  `timeout_ms: 2000`

#### Scenario: RAG rejects an unsupported selector or option

- **WHEN** a Data Event supplies an undeclared property such as `form_id`,
  `attachment_id`, `document_id`, or a non-integer `limit`
- **THEN** the callback completes asynchronously with `rag_invalid_options`
  and no retrieval begins

#### Scenario: RAG rejects an invalid query

- **WHEN** `query` is missing, non-string, empty after trimming, or longer
  than 1,000 Unicode scalar values after trimming
- **THEN** the callback completes asynchronously with `rag_invalid_query`
  and no retrieval begins

#### Scenario: RAG requires a callback

- **WHEN** RAG is called without a callable callback
- **THEN** it synchronously throws `rag_invalid_options` before local
  retrieval starts

#### Scenario: Invalid input takes precedence over unavailable retrieval

- **WHEN** a web invocation includes an unknown `form_id` option
- **THEN** the callback completes asynchronously with `rag_invalid_options`
  rather than `rag_unavailable`, and no retrieval begins

### Requirement: RAG is mobile-only and active-form-only

In v1, only iOS and Android native ExpressionEngine hosts SHALL implement
RAG. Web execution SHALL complete with `rag_unavailable` and MUST NOT contact
Synapse. A supported mobile host SHALL capture the current active form for a
valid request after input validation succeeds and SHALL retrieve only from
that form's local signed and validated RAG bundle.

RAG MUST NOT enumerate all downloaded bundles, retrieve from another form,
aggregate multiple forms, select an attachment or document independently of
the active form, use a caller-provided bundle, or fall back to any other local
or remote source. If no active form is available or its required local bundle
is missing, invalid, or unusable, RAG SHALL return `rag_unavailable`; it MUST
NOT substitute an empty-success or another retrieval source.

#### Scenario: RAG runs in web execution

- **WHEN** a Data Event invokes RAG in a web host
- **THEN** the callback completes asynchronously with `rag_unavailable` and
  the host makes no Synapse request

#### Scenario: The active form has a valid local bundle

- **WHEN** a valid RAG invocation runs on iOS or Android with a current active
  form whose signed and validated local bundle is available
- **THEN** every candidate considered and every result returned originates
  only from that active form's bundle

#### Scenario: The active form has no usable local bundle

- **WHEN** a valid RAG invocation runs without an active form or with an
  absent, invalid, or unusable active-form bundle
- **THEN** the callback completes asynchronously with `rag_unavailable` without a
  cross-form, all-bundles, empty-success, or remote fallback

### Requirement: RAG returns the exact v1 retrieval result

For a successful invocation, RAG SHALL return a closed result object with
exactly `bundle_version`, `result_count`, and `results`. `bundle_version`
SHALL be a non-empty opaque local-bundle identifier of at most 128 Unicode
scalar values. `result_count` SHALL equal `results.length` and SHALL be an
integer from `0` through the effective `limit`.

Every item in `results` SHALL have exactly `rank`, `score`, `text`, and
`citation`. Items SHALL appear in descending `score` order. `rank` SHALL be
one-based and contiguous from `1` through `result_count`. `score` SHALL be a
finite normalized number in the inclusive range `0..1` and SHALL be the only
score exposed to a Data Event. The raw engine score MUST NOT be returned under
any field.

`text` SHALL be non-empty redacted passage text of at most 2,000 Unicode
scalar values. `citation` SHALL have exactly:

| Property | Requirement |
| --- | --- |
| `attachment_id` | Non-empty opaque identifier of at most 128 Unicode scalar values |
| `filename` | Non-empty redacted display filename of at most 255 Unicode scalar values |
| `page_number` | Integer in the inclusive range `1..100000` |
| `chunk_id` | Non-empty opaque identifier of at most 128 Unicode scalar values |
| `section_heading` | Optional; when present, non-empty redacted plain text of at most 500 Unicode scalar values |

RAG MUST NOT return a source URL, credential, authentication material, user
token, raw engine score, cross-form metadata, or any undeclared result field.
An empty matching set SHALL be a successful result with `result_count: 0` and
`results: []`.

#### Scenario: RAG returns bounded ranked passages

- **WHEN** local retrieval finds eligible matching passages for the active
  form
- **THEN** the callback asynchronously receives exactly the closed v1 result schema with
  bounded passages, citations, one-based contiguous ranks, and normalized
  scores

#### Scenario: RAG finds no eligible passages

- **WHEN** no active-form candidate satisfies the retrieval and output rules
- **THEN** the callback asynchronously succeeds with the active bundle version,
  `result_count: 0`, and `results: []`

#### Scenario: A result would expose a prohibited field

- **WHEN** a retrieval candidate contains a source URL, credential,
  authentication material, user token, raw score, cross-form metadata, or
  another undeclared output field
- **THEN** RAG omits or redacts the prohibited value before delivery and never
  exposes it in the asynchronous callback's v1 result

### Requirement: RAG has no generative, remote, or document-egress path

RAG SHALL perform local retrieval only. It MUST NOT generate an answer, invoke
an LLM, make a query-time Synapse call, or transmit the query, document
content, passage text, or citation data to Synapse, an LLM, or any other
remote endpoint. Delivering the bounded v1 result through the invoking local
Data Event callback is permitted local retrieval output and is not
document-content egress.

RAG SHALL redact prohibited credential, authentication, user-token,
source-URL, and cross-form metadata from text fields before callback delivery.
If a candidate cannot retain every required result and citation field after
sanitization and bounds enforcement, RAG SHALL omit it. Errors and logs MUST
NOT contain query text, passage text, filenames, citation values, document
content, source URLs, credentials, authentication material, or user tokens.

#### Scenario: RAG returns local retrieval data

- **WHEN** RAG successfully retrieves passages for the active form
- **THEN** it asynchronously delivers only the bounded v1 result to the local
  callback and does not generate an answer, invoke an LLM, or make a remote
  request

#### Scenario: RAG emits diagnostics

- **WHEN** RAG reports an error or writes a diagnostic log
- **THEN** the diagnostic omits query text, retrieval content, citation data,
  source URLs, credentials, authentication material, and user tokens

### Requirement: RAG filters before limiting and uses deterministic ranking

The shared local retrieval core SHALL normalize candidate scores before output
and SHALL apply the effective `min_score` inclusively before it applies the
effective `limit`. It SHALL sort retained candidates by the single normalized
`score` in descending order. Candidates with equal normalized scores SHALL
sort by `citation.chunk_id` in ascending Unicode code-point order.

The core SHALL enforce all v1 output bounds before delivery. If a candidate
cannot retain every required result and citation field after redacting
credential, authentication, user-token, source-URL, or cross-form metadata,
the core SHALL omit that candidate. The result count SHALL describe only
delivered candidates.

#### Scenario: The threshold excludes a higher-ranked candidate count

- **WHEN** more than the effective `limit` candidates exist but some have a
  normalized score below `min_score`
- **THEN** RAG removes below-threshold candidates before selecting at most the
  effective `limit` highest-ranked remaining candidates

#### Scenario: Candidates have equal normalized scores

- **WHEN** two retained candidates have equal normalized `score` values
- **THEN** RAG orders them by ascending `citation.chunk_id` in Unicode
  code-point order

#### Scenario: A candidate cannot satisfy the v1 output bounds

- **WHEN** a candidate cannot be safely redacted or bounded while retaining
  every required result and citation field
- **THEN** RAG omits that candidate and may return an otherwise successful
  empty result

### Requirement: RAG has closed terminal errors and cancellation behavior

RAG SHALL expose only these stable v1 terminal error codes:
`rag_invalid_options`, `rag_invalid_query`, `rag_unavailable`, `rag_timeout`,
and `rag_cancelled`. `rag_invalid_options` covers a missing/non-object options
value, unknown option, invalid optional value, or missing/non-callable
callback. `rag_invalid_query` covers missing, non-string, blank, or
overlength query input. `rag_unavailable` covers unsupported web execution,
no active form, unavailable/invalid/unusable active-form bundle, or otherwise
unavailable local retrieval. `rag_timeout` covers a request that does not
complete by its effective timeout. `rag_cancelled` covers record or editor
unload before terminal completion.

For a callable callback, options validation takes precedence over query
validation, and query validation takes precedence over host/bundle
availability. Host and active-form bundle preflight SHALL complete before the
effective timeout clock starts. On record or editor unload after preflight
acceptance, the host SHALL transition the in-flight request to
`rag_cancelled` before disposing its invocation context. The first terminal
transition wins when cancellation races timeout. A terminal error MUST NOT
include a result payload, and no later partial or terminal output is
permitted.

Errors and logs MUST NOT contain query text, passage text, filename, citation
values, document content, source URLs, credentials, authentication material,
or user tokens.

#### Scenario: RAG exceeds its effective timeout

- **WHEN** a valid local request has not completed by its effective
  `timeout_ms`
- **THEN** the callback completes asynchronously exactly once with
  `rag_timeout`, no result, and no later output

#### Scenario: A record or editor unloads during retrieval

- **WHEN** the record or editor associated with an in-flight RAG call unloads
- **THEN** the host asynchronously completes the call as `rag_cancelled`
  before context disposal and suppresses all later retrieval output

#### Scenario: Cancellation and timeout occur together

- **WHEN** cancellation and timeout race for the same in-flight RAG call
- **THEN** the callback asynchronously completes exactly once with the first
  terminal transition, either `rag_cancelled` or `rag_timeout`

#### Scenario: An invalid query is submitted in an unavailable context

- **WHEN** a web call has a callable callback but its `query` is blank after
  trimming
- **THEN** the callback completes asynchronously with `rag_invalid_query`
  before `rag_unavailable` is considered

### Requirement: RAG v1 conformance uses shared golden fixtures

The v1 contract SHALL have shared, versioned, non-sensitive golden fixtures.
The fixtures SHALL verify defaults; validation and error codes; active-form
isolation; local-bundle availability; score normalization, threshold-before-
limit behavior, ordering, and empty success; exact closed result/citation
schema and bounds; prohibited-output sanitization; no content or secrets in
errors/logs; validation-before-availability precedence; web
`rag_unavailable`; timeout; record/editor-unload cancellation; and
exactly-once/late-result behavior.

iOS and Android RAG hosts MUST pass the same applicable fixture expectations.
Web MUST pass the `rag_unavailable` fixture without a Synapse interaction.

#### Scenario: A native host is released with RAG v1

- **WHEN** iOS or Android declares RAG v1 ready for release
- **THEN** it passes the shared RAG v1 golden fixtures for its host adapter
  and the local retrieval core

#### Scenario: Web behavior is tested

- **WHEN** the web RAG fixture executes
- **THEN** it observes `rag_unavailable` without local bundle enumeration or
  a Synapse interaction

## Context

The [FLCRM-22082 epic](https://fulcrumapp.atlassian.net/browse/FLCRM-22082)
defines two Phase 2 consumers over one local retrieval core:

1. A builder-authored Data Event language function.
2. A separate Android conversational-agent tool.

The [FLCRM-22079 spike](https://fulcrumapp.atlassian.net/browse/FLCRM-22079)
has ratified their v1 contract. Part 1's
[Synapse foundation contract](https://github.com/fulcrumapp/synapse/pull/1)
provides signed, validated, per-form offline bundles; its separately tracked
amendment makes form isolation explicit.

`INFERENCE(options, callback)` is the existing relevant Data Event pattern:
expression code invokes an asynchronous native host function and receives a
callback result. Data Events are Fulcrum's user-authored JavaScript subset.
Android's existing inference bridge uses ExpressionEngine `$$inference`, and
iOS uses `ExpressionEngineInvocation`; future RAG adapters follow that
asynchronous boundary without making the bridge implementation itself public.

This change is documentation only. It does not add RAG to CoffeeScript,
TypeScript declarations, generated help, native code, KMP code, CI,
dependencies, or configuration outside `openspec/`.

## Goals / Non-Goals

**Goals:**

- Make the ratified v1 request, result, error, isolation, and lifecycle rules
  precise enough for independent implementation teams to conform.
- Preserve one shared KMP local retrieval behavior while keeping Data Event and
  Android agent authorization/invocation surfaces separate.
- Define bounded, privacy-preserving retrieval outputs and repeatable
  cross-surface fixture expectations.

**Non-Goals:**

- Adding answer generation, LLM invocation, generic Data Event telemetry, a
  remote Synapse retrieval API, or document-content transmission at query
  time.
- Allowing caller-selected forms, attachments, documents, bundles, all-local
  bundle searches, cross-form lookup, aggregation, or fallback.
- Adding result fields beyond the closed v1 result/citation schemas or
  replacing the agent tool with Data Event JavaScript.

## Decisions

### Publish two versioned v1 surfaces over one retrieval profile

`RAG(options, callback)` is the final public mobile Data Event function.
`search_form_knowledge` is the final Android conversational-agent tool name.
Both are closed v1 compatibility surfaces. Their shared retrieval request and
success-result schemas are fixed as follows:

```text
RagRetrievalOptionsV1 = {
  query: string,
  limit?: integer,
  min_score?: number,
  timeout_ms?: integer
}

RagRetrievalResultV1 = {
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

The schemas are closed: no unlisted input, result, result-item, or citation
property is valid in v1. `bundle_version` correlates results to the local
bundle; it is not a contract-version field. Contract versioning is carried by
the named v1 surface. A behavior change or additional public field requires a
new contract version rather than a silent v1 extension.

The two surfaces use the same values and defaults:

| Field | Rule |
| --- | --- |
| `query` | Required literal plain-text string; 1 through 1,000 Unicode scalar values after trimming; no query DSL, form selector, document selector, or source selector |
| `limit` | Optional integer; default `5`; inclusive range `1..20` |
| `min_score` | Optional finite normalized number; default `0.70`; inclusive range `0..1` |
| `timeout_ms` | Optional integer in milliseconds; default `2000`; inclusive range `2000..10000` |
| `bundle_version` | Required opaque local-bundle identifier; 1 through 128 Unicode scalar values |
| `result_count` | Integer equal to `results.length`; inclusive range `0..effective limit` |
| `rank` | One-based contiguous integer from `1` through `result_count` |
| `score` | Finite normalized value in `0..1`; the only score visible to consumers |
| `text` | Non-empty redacted passage text; at most 2,000 Unicode scalar values |
| `attachment_id` | Non-empty opaque identifier; at most 128 Unicode scalar values |
| `filename` | Non-empty redacted display filename; at most 255 Unicode scalar values |
| `page_number` | Integer in the inclusive range `1..100000` |
| `chunk_id` | Non-empty opaque identifier; at most 128 Unicode scalar values |
| `section_heading` | Optional; when present, non-empty redacted plain text of at most 500 Unicode scalar values |

`null`, coercion, non-finite numbers, out-of-range values, and undeclared
properties are not accepted as valid substitutes for the listed types.

### Validate before availability and use explicit callback terminal semantics

RAG requires an options object and a callable callback. A missing or
non-callable callback SHALL synchronously throw an Error-compatible
`rag_invalid_options` error before retrieval because no valid callback delivery
channel exists. For an invocation with a callable callback, the callback
always completes asynchronously and exactly once:

- Success calls `callback(null, RagRetrievalResultV1)`.
- Failure calls `callback(error, null)`, where `error.code` is one of the
  closed v1 codes below.

For a callable callback, v1 evaluates terminal categories in this order:

1. Options-object and optional-field validation, including unknown properties,
   returns `rag_invalid_options`.
2. Query validation returns `rag_invalid_query`.
3. Host support and active-form bundle preflight returns `rag_unavailable`.
4. After a request is accepted for KMP retrieval, success, `rag_timeout`, and
   `rag_cancelled` race; the first terminal transition wins.

Therefore an invalid options object is not hidden by web execution, an absent
bundle, or an agent policy decision, and an invalid query is not hidden by
availability. Preflight completes before the timeout clock begins and does not
perform a retrieval, fallback, or remote call.

The exact stable error-code set is:

| Code | Required use |
| --- | --- |
| `rag_invalid_options` | Options object is missing or not an object; an unknown option is supplied; an optional field has an invalid type, null, non-finite value, or out-of-range value; or the callback is missing/non-callable |
| `rag_invalid_query` | `query` is missing, not a string, empty after trimming, or exceeds 1,000 Unicode scalar values after trimming |
| `rag_unavailable` | Execution is web or another unsupported host; no active form is available; the active form has no local signed and validated bundle; its bundle cannot safely be used; or local retrieval is denied or unavailable |
| `rag_timeout` | The accepted invocation has not reached a terminal result by its effective `timeout_ms` |
| `rag_cancelled` | The associated record or editor unloads before a terminal result |

No other public v1 error code is emitted. Error objects and logs contain the
code and non-sensitive diagnostics only; they never include query text,
passage text, filenames, citations, document content, source URLs,
credentials, authentication material, or user tokens.

### Bind every retrieval request to the active form

Once a request passes validation, its host adapter captures the current active
form. The KMP core only opens that form's local signed and validated bundle.
No v1 input field exists for `form_id`, `attachment_id`, `document_id`, a
bundle version, or any equivalent selector. Such a field is an unknown option
and is rejected as `rag_invalid_options`.

The core never enumerates all downloaded bundles, searches another form,
aggregates multiple forms, or falls back to another bundle or remote service.
Any missing, invalid, or unusable active-form bundle resolves as
`rag_unavailable`. Web always resolves as `rag_unavailable` and never
constructs a Synapse request.

### Normalize, filter, rank, and bound results in the shared KMP core

The KMP core is the only retrieval implementation. It selects candidates from
the captured active form's local bundle, normalizes each internal engine score
to the v1 `score` range, applies privacy/output eligibility, then applies
`min_score` before `limit`. The remaining results sort by normalized `score`
descending. Equal scores sort by `citation.chunk_id` in ascending Unicode
code-point order so fixtures are deterministic.

The raw engine score is internal and is never exposed in output, errors,
logs, or an alternate result property. An empty matching set is a successful
result with `result_count: 0` and `results: []`.

Before delivery, the core enforces the table bounds. It redacts prohibited
credential, authentication, user-token, source-URL, and cross-form metadata
from text fields. If a candidate cannot retain every required result and
citation field after sanitization, the core omits that candidate; the returned
count reflects only delivered candidates. This is not a fallback or an error
when no candidates remain.

### Keep local retrieval distinct from answer generation and remote access

The shared core and both adapters return retrieval passages and citations only.
They do not generate an answer, invoke an LLM, send document content, or make
a query-time Synapse call. This restriction applies equally to successful,
empty, error, timeout, and cancellation paths.

### Use independent adapters for Data Events and conversational agents

Native iOS and Android ExpressionEngine adapters validate `RAG` input,
capture the active form, call the KMP core, and translate its terminal state
to the callback contract. Web implements only the terminal
`rag_unavailable` callback behavior.

The Android conversational-agent runtime registers
`search_form_knowledge` independently. It performs the same options and query
validation precedence before it evaluates its own AgentToolRegistration
allowlist and policy. A caller denied by that policy receives
`rag_unavailable`, which avoids disclosing local tool eligibility; the tool
does not call the KMP core for that request. The tool uses the same
request/result/error values and timeout range, but it returns through the
agent runtime lifecycle rather than a Data Event callback. It never starts,
evaluates, or depends on Data Event JavaScript.

For both surfaces, local host, policy, active-form, and bundle preflight must
succeed before the timeout clock starts. On record or editor unload, the
host/tool transitions an accepted in-flight request to `rag_cancelled` before
disposing its invocation context and suppresses every later result. The first
terminal transition wins a timeout-versus-cancellation race; no partial result
or second terminal result is emitted.

### Prove the contract with shared, non-sensitive golden fixtures

[FLCRM-22288](https://fulcrumapp.atlassian.net/browse/FLCRM-22288) owns the
versioned fixture corpus and KMP conformance behavior. Fixtures use
non-sensitive documents and assert:

- defaults, type/range validation, and unknown-property rejection;
- active-form-only access and absence of all-bundle, cross-form, aggregate,
  fallback, and query-time Synapse paths;
- score normalization, threshold-before-limit behavior, descending ranking,
  deterministic ties, empty success, and no raw score;
- exact closed result/citation keys and all output bounds;
- privacy sanitization plus no content or secrets in errors/logs;
- deterministic validation-before-availability/policy precedence, web
  `rag_unavailable`, absent/invalid bundle `rag_unavailable`, timeout,
  record/editor-unload cancellation, exactly-once terminal behavior, and
  late-result suppression;
- Android agent allowlist denial and direct KMP use without Data Event
  JavaScript; and
- equivalent retrieval/citation output from all applicable native surfaces.

## Risks / Trade-offs

- **A caller needs another form's knowledge** → v1 rejects the request rather
  than expanding the authorization boundary; multi-form retrieval requires a
  future version and explicit product/security review.
- **A valid bundle cannot produce a safely bounded candidate** → the candidate
  is omitted and an empty success remains valid, avoiding unbounded or
  sensitive output.
- **A native callback is being torn down during unload** → the adapter
  transitions the request to `rag_cancelled` before context disposal and
  suppresses late output.
- **Agent policy and Data Event permissions drift** → the tool has an
  independent policy gate, while both paths must pass the same KMP fixtures.
- **An implementation exposes an internal ranking signal** → fixture schema
  assertions reject fields other than the one normalized v1 `score`.

## Migration Plan

This documentation PR has no deployed migration. The implementation sequence
is fixed by the existing epic children:

1. Confirm the Part 1 local signed/validated bundle and form-isolation output
   from the [Synapse foundation PR](https://github.com/fulcrumapp/synapse/pull/1).
2. Implement the KMP v1 retrieval core and golden fixtures in
   [FLCRM-22288](https://fulcrumapp.atlassian.net/browse/FLCRM-22288).
3. Add the RAG language function/source docs in
   [FLCRM-22289](https://fulcrumapp.atlassian.net/browse/FLCRM-22289) and
   editor declarations in [FLCRM-22292](https://fulcrumapp.atlassian.net/browse/FLCRM-22292).
4. Add native Data Event adapters in
   [FLCRM-22293](https://fulcrumapp.atlassian.net/browse/FLCRM-22293) for
   Android and [FLCRM-22294](https://fulcrumapp.atlassian.net/browse/FLCRM-22294)
   for iOS.
5. Add `search_form_knowledge` with its independent policy in
   [FLCRM-22290](https://fulcrumapp.atlassian.net/browse/FLCRM-22290).
6. Run cross-surface conformance and rollout evidence in
   [FLCRM-22291](https://fulcrumapp.atlassian.net/browse/FLCRM-22291).

If a surface must be rolled back, disable that adapter or the agent
registration. It must not broaden form access, introduce remote retrieval, or
replace web `rag_unavailable` behavior with a fallback.

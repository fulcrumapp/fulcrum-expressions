# FLCRM-22289: Retrieval-only RAG Data Event function

**Status:** Approved by the user on 2026-09-23.  
**Jira:** [FLCRM-22289](https://fulcrumapp.atlassian.net/browse/FLCRM-22289)  
**Normative contract:** [FLCRM-22079](https://fulcrumapp.atlassian.net/browse/FLCRM-22079) and `openspec/changes/define-mobile-rag-data-event-and-agent-tool/specs/mobile-rag-data-event/spec.md`

## Goal

Expose the ratified v1 `RAG(options, callback)` function in the Expressions
runtime. The function validates its public request, asynchronously delegates
to the native RAG host operation, and returns only the closed v1 retrieval
result or a stable error. It must not implement retrieval or answer
generation in JavaScript.

The user selected FLCRM-22079 as the source of truth and limited this issue
to the Expressions layer. Do not expand this work to the KMP retrieval core,
native host adapters, Android agent tool, or editor integration.

## Required behavior

### Public options and validation

`RAG(options, callback)` accepts exactly:

| Property | Contract |
| --- | --- |
| `query` | Required string; trim with the normative `trimQueryV1` rule, then require 1–1,000 Unicode scalar values |
| `limit` | Optional integer; default `5`; inclusive range `1..20` |
| `min_score` | Optional finite normalized number; default `0.70`; inclusive range `0..1` |
| `timeout_ms` | Optional integer; default `2000`; inclusive range `2000..10000` |

Reject undeclared properties, `null`, invalid types, non-finite numbers, and
out-of-range values without coercion. In particular, do not accept form,
attachment, document, or bundle selectors.

`trimQueryV1` removes only boundary Unicode scalar values in
`U+0009..U+000D`, `U+0020`, `U+0085`, `U+00A0`, `U+1680`, `U+2000..U+200A`,
`U+2028`, `U+2029`, `U+202F`, `U+205F`, and `U+3000`. Preserve interior
whitespace and all other scalar values. Use the trimmed query for emptiness,
length, and host retrieval; count scalar values, not UTF-16 code units or
grapheme clusters.

The callback must be callable. If it is missing or non-callable, synchronously
throw an Error-compatible error with code `rag_invalid_options` before
dispatch. For a callable callback, perform validation and all terminal
completion asynchronously and exactly once. Validation order is options
object/unknown properties/optional fields, then query, then host and active
bundle availability. An invalid query therefore yields `rag_invalid_query`,
not `rag_unavailable`.

### Callback, errors, and result

Success calls `callback(null, result)`. Failure calls `callback(error, null)`.
The only public error codes are:

- `rag_invalid_options`: invalid options shape/property/value or missing or
  non-callable callback.
- `rag_invalid_query`: missing, non-string, blank-after-trim, or overlength
  query.
- `rag_unavailable`: unsupported host, unavailable local RAG operation, or no
  usable active-form bundle.
- `rag_timeout`: accepted retrieval exceeded its effective timeout.
- `rag_cancelled`: record/editor unload cancelled an accepted retrieval.

Return only the closed result shape:

```ts
type RagRetrievalResultV1 = {
  bundle_version: string;
  result_count: number;
  results: Array<{
    rank: number;
    score: number;
    text: string;
    citation: {
      attachment_id: string;
      filename: string;
      page_number: number;
      chunk_id: string;
      section_heading?: string;
    };
  }>;
};
```

Enforce the contract bounds: non-empty `bundle_version` (maximum 128 Unicode
scalar values); `result_count === results.length` and no more than the
effective limit; one-based contiguous ranks; finite normalized scores in
`0..1`; non-empty passage text up to 2,000 Unicode scalar values; non-empty
`attachment_id` and `chunk_id` up to 128 scalar values; non-empty redacted
filename up to 255 scalar values; integer page number `1..100000`; and
optional non-empty redacted section heading up to 500 scalar values.

The host contract applies the inclusive `min_score` threshold before
`limit`, sorts by descending normalized score, and breaks ties by ascending
`chunk_id` Unicode code-point order. An empty eligible set is successful with
the active bundle version, `result_count: 0`, and `results: []`. Never expose
raw engine scores or add output fields. Reject malformed host results rather
than repairing, extending, or guessing their shape; map failures using only
the stable v1 error set.

### Host and lifecycle behavior

On iOS and Android, dispatch asynchronously through the dedicated native RAG
host operation using the active form's signed, validated local bundle. Pass
the validated options, including the effective timeout, across the existing
host-function boundary. Do not query Synapse, invoke an LLM, generate an
answer, search another form/bundle, or add retrieval logic in this package.

On Web, after callable-callback options and query validation succeeds, complete
asynchronously with `rag_unavailable` without dispatching a retrieval request
or contacting Synapse. Do not let Web availability mask input errors.

Forward native `rag_timeout` and `rag_cancelled` terminal errors without
changing their codes. Do not produce duplicate or late callback results.
Record/editor-unload cancellation and the timeout-versus-cancellation race
remain native-host lifecycle responsibilities in FLCRM-22293 and FLCRM-22294;
this library must preserve their terminal result through its callback.

Error messages and logs must not contain the query, passage text, filenames,
citations, document content, source URLs, credentials, authentication
material, or user tokens.

## Repository integration

Use the established `INFERENCE` and asynchronous host-function patterns,
adjusted to the stricter RAG v1 callback/error contract. The implementation
must expose `RAG` as a Data Event function and prevent its use in calculations.
Keep the library's public TypeScript declaration aligned with the runtime;
do not implement the separate Fulcrum Components Monaco/editor integration
tracked by FLCRM-22292.

Relevant inspected surfaces include:

- `functions.coffee` for runtime function and host-function dispatch.
- `runtime.coffee` for Data Event-only/special-function registration.
- `ts/functions/INFERENCE.ts` and generated `ts/api.ts` for the public type
  declaration pattern.
- `docs/docs.js` and the documentation generation flow for language docs.
- `test/test.coffee` and `test/docs.coffee` for function and documentation
  coverage.

Do not add a Web RAG host bridge that forwards a query to another service.
Coordinate the private native operation name with the Android/iOS bridge
owners before their bridge work consumes it; that internal name is not a new
public v1 option or field.

## Acceptance criteria

1. `RAG` validates the exact v1 options and Unicode query rule, with unknown
   properties rejected and no coercion.
2. With a callable callback, invalid options/query and host results complete
   asynchronously and exactly once with the specified stable error code; a
   missing/non-callable callback synchronously throws
   `rag_invalid_options`.
3. Valid calls delegate only through the native RAG host boundary and return
   the exact v1 result; no local retrieval, LLM, Synapse, or cross-form path
   exists in this JavaScript package.
4. Web returns asynchronous `rag_unavailable` after validation and does not
   dispatch a retrieval request.
5. `RAG` is registered as a Data Event function, not enabled for calculations.
6. Public type declarations and language documentation describe only the
   closed v1 contract.
7. Function-level tests cover defaults, each validation/error category,
   validation precedence, host request/result shape, empty success, async
   exactly-once behavior, Web unavailability, timeout/cancellation forwarding,
   and privacy-safe diagnostics. Documentation examples pass the existing
   docs test.

## Out of scope and dependencies

- FLCRM-22288 owns the KMP local retrieval API and shared conformance fixtures.
- FLCRM-22293 and FLCRM-22294 own Android and iOS native Data Event bridges,
  including active-form capture, bundle availability, timeout, and unload
  cancellation.
- FLCRM-22292 owns Fulcrum Components editor/Monaco authoring integration.
- FLCRM-22290 owns Android `search_form_knowledge`; FLCRM-22291 owns
  cross-surface conformance and rollout.
- No Jira issue links/statuses are changed in this work. Jira descriptions and
  link directions are not used to broaden this Expressions-only scope.

The Expressions wrapper and mocked function tests can be delivered separately
from the KMP core and native adapters. Native end-to-end retrieval cannot be
verified until FLCRM-22288, FLCRM-22293, and FLCRM-22294 are available. Their
current Jira status is Backlog.

## Validation

Run the repository's relevant checks after implementation:

- `yarn test`
- `yarn build:docs`
- `make types`

Implementation is authorized under this approved scope.

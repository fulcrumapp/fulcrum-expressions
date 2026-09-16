## 1. Foundation and contract traceability

- [ ] 1.1 Verify the signed, validated, per-form offline bundle produced by
  the [Synapse foundation PR #1](https://github.com/fulcrumapp/synapse/pull/1)
  and its form-isolation amendment supply the active-form-only bundle contract;
  prove absent, invalid, and unusable bundles cannot trigger a cross-form,
  all-bundles, or remote fallback.
- [ ] 1.2 Treat the ratified
  [FLCRM-22079](https://fulcrumapp.atlassian.net/browse/FLCRM-22079) v1
  schema, defaults, bounds, errors, lifecycle, and fixture behavior in this
  OpenSpec as the source contract for every
  [FLCRM-22082](https://fulcrumapp.atlassian.net/browse/FLCRM-22082)
  implementation child; verify no implementation introduces unlisted v1
  fields, error codes, or fallback behavior.

## 2. KMP local retrieval core and fixtures

- [ ] 2.1 In [FLCRM-22288](https://fulcrumapp.atlassian.net/browse/FLCRM-22288),
  define the shared closed `RagRetrievalOptionsV1`,
  `RagRetrievalResultV1`, citation, and error-code models; verify validation
  accepts only `query`, `limit`, `min_score`, and `timeout_ms` with the
  documented defaults and inclusive ranges; applies `trimQueryV1` before
  query length/retrieval; and resolves invalid options before invalid queries
  before availability/policy preflight.
- [ ] 2.2 In [FLCRM-22288](https://fulcrumapp.atlassian.net/browse/FLCRM-22288),
  implement active-form capture and signed/validated local-bundle retrieval;
  verify no path accepts `form_id`/attachment/document/bundle selectors,
  enumerates all bundles, aggregates forms, falls back, or makes a Synapse
  request.
- [ ] 2.3 In [FLCRM-22288](https://fulcrumapp.atlassian.net/browse/FLCRM-22288),
  implement score normalization, inclusive `min_score` filtering before
  `limit`, descending-score ranking, and `chunk_id` tie ordering; verify raw
  engine scores never enter public output and empty matches return the v1
  empty-success result.
- [ ] 2.4 In [FLCRM-22288](https://fulcrumapp.atlassian.net/browse/FLCRM-22288),
  enforce v1 passage/citation bounds and output sanitization; verify
  over-bound or unsafe candidates are omitted, `result_count` equals delivered
  results, and output exposes no URL, credential, authentication material,
  user token, or cross-form metadata.
- [ ] 2.5 In [FLCRM-22288](https://fulcrumapp.atlassian.net/browse/FLCRM-22288),
  create versioned non-sensitive golden fixtures for valid results, defaults,
  validation failures, unavailable bundles, ordering/ties, empty success,
  bounds/redaction, protected diagnostics, timeout, cancellation, and
  late-result suppression; verify `trimQueryV1` edge whitespace and
  Unicode-scalar-length cases plus mixed invalid-input/unavailable/policy
  cases use deterministic precedence and fixture expectations are reusable by
  all host adapters.

## 3. Data Event language and native hosts

- [ ] 3.1 In [FLCRM-22289](https://fulcrumapp.atlassian.net/browse/FLCRM-22289),
  add final `RAG(options, callback)` language/source documentation using the
  existing `INFERENCE`-style asynchronous host boundary; verify callable
  callbacks receive exactly one `callback(null, result)` or
  `callback(error, null)` terminal outcome, a missing/non-callable callback
  synchronously throws `rag_invalid_options`, and invalid options/query take
  precedence over unavailable retrieval.
- [ ] 3.2 In [FLCRM-22289](https://fulcrumapp.atlassian.net/browse/FLCRM-22289),
  add web RAG behavior that returns `rag_unavailable` only after callable-
  callback options/query validation succeeds; verify it has no local bundle
  enumeration and no Synapse client/request path, and invalid input preserves
  validation-error precedence.
- [ ] 3.3 In [FLCRM-22292](https://fulcrumapp.atlassian.net/browse/FLCRM-22292),
  add editor TypeScript/Monaco declarations for the closed RAG v1 schema;
  verify declarations expose no form, attachment, document, bundle, raw-score,
  or extra result fields.
- [ ] 3.4 In [FLCRM-22293](https://fulcrumapp.atlassian.net/browse/FLCRM-22293),
  add the Android native ExpressionEngine RAG adapter over the shared KMP core;
  verify it captures the active form, maps every v1 terminal code, cancels on
  record/editor unload, and passes Android Data Event golden fixtures.
- [ ] 3.5 In [FLCRM-22294](https://fulcrumapp.atlassian.net/browse/FLCRM-22294),
  add the iOS native ExpressionEngine RAG adapter over the shared KMP core;
  verify it captures the active form, maps every v1 terminal code, cancels on
  record/editor unload, and passes iOS Data Event golden fixtures.

## 4. Android conversational-agent tool

- [ ] 4.1 In [FLCRM-22290](https://fulcrumapp.atlassian.net/browse/FLCRM-22290),
  register the separate Android agent tool named `search_form_knowledge`;
  verify it accepts the same closed v1 `query`, `limit`, `min_score`, and
  `timeout_ms` input and returns the same closed retrieval/citation result
  without registering a Data Event surface, and validates options/query before
  agent policy or bundle availability.
- [ ] 4.2 In [FLCRM-22290](https://fulcrumapp.atlassian.net/browse/FLCRM-22290),
  enforce the tool's distinct AgentToolRegistration allowlist/policy before
  core invocation after valid input; verify denied agents receive
  `rag_unavailable`, no KMP retrieval begins, no Data Event JavaScript is
  started, and invalid input is not masked by policy denial.
- [ ] 4.3 In [FLCRM-22290](https://fulcrumapp.atlassian.net/browse/FLCRM-22290),
  route allowed agent calls directly to the shared KMP core; verify
  active-form-only retrieval, the same score/result semantics, timeout,
  record/editor/agent-unload cancellation after preflight acceptance, no
  partial/duplicate result, no LLM/answer generation, no document egress, and
  no query-time Synapse access.

## 5. Cross-surface conformance and rollout

- [ ] 5.1 In [FLCRM-22291](https://fulcrumapp.atlassian.net/browse/FLCRM-22291),
  run the shared golden fixture corpus across KMP, Android Data Event, iOS Data
  Event, web-unavailable behavior, and `search_form_knowledge`; verify
  equivalent retrieval/citation outputs where applicable and each surface's
  distinct terminal lifecycle, including validation-before-availability/policy
  precedence and timeout/cancellation races.
- [ ] 5.2 In [FLCRM-22291](https://fulcrumapp.atlassian.net/browse/FLCRM-22291),
  add conformance assertions that reject extra v1 fields/codes, raw engine
  score, prohibited diagnostics/output metadata, cross-form/all-bundles/
  aggregate/fallback paths, Data Event JavaScript from the agent tool, answer
  generation, LLM use, document transmission, and query-time Synapse calls.
- [ ] 5.3 In [FLCRM-22291](https://fulcrumapp.atlassian.net/browse/FLCRM-22291),
  define per-surface rollout/rollback evidence; verify a disabled adapter or
  agent registration yields its specified unavailable behavior rather than
  widening access or introducing remote fallback.

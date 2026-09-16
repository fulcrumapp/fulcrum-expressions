## Why

Phase 1 now provides signed, validated, per-form offline RAG bundles, and
[FLCRM-22079](https://fulcrumapp.atlassian.net/browse/FLCRM-22079) has
ratified the Phase 2 v1 retrieval contract. This change turns that ratified
decision into an implementation-ready, cross-surface contract while preserving
strict offline, active-form, and privacy boundaries.

## What Changes

- Define the final v1 public Data Event
  `RAG(options, callback)` for Fulcrum's user-authored JavaScript subset. It
  is asynchronous and callback-based, following the `INFERENCE` host-function
  model.
- Lock the closed v1 RAG request, result, citation, error, default, and
  boundary contracts, including the exact options
  `{ query, limit?, min_score?, timeout_ms? }`.
- Restrict RAG to iOS and Android native hosts. After v1 options and query
  validation succeeds for a callable callback, web completes asynchronously
  with `rag_unavailable` and never contacts Synapse.
- Require local retrieval from only the current active form's signed and
  validated bundle. RAG accepts no form, attachment, document, or bundle
  selector and cannot search across, aggregate, or fall back between forms.
- Define retrieval-only results: ranked, normalized-score passages and
  citations with bundle correlation; no answer generation, LLM invocation,
  document transmission, or query-time Synapse request.
- Define the separate Android conversational-agent tool
  `search_form_knowledge`. It shares the KMP local retrieval core and v1
  retrieval data contract, but has a distinct allowlist, policy, and lifecycle
  and never invokes Data Event JavaScript.
- Require shared golden fixtures and cross-surface conformance for the KMP
  core, iOS, Android Data Event, web-unavailable behavior, and Android agent
  tool.

## Capabilities

### New Capabilities

- `mobile-rag-data-event`: Defines the final v1 mobile-only Data Event
  retrieval contract, including validation, result schema, active-form
  isolation, lifecycle, privacy, and conformance behavior.
- `android-local-rag-agent-tool`: Defines the final v1 Android
  `search_form_knowledge` tool contract, its independent policy/lifecycle, and
  shared local retrieval semantics.

### Modified Capabilities

None.

## Impact

- **Documentation scope:** this ratification revision changes only the five
  artifacts under this OpenSpec change. The PR's earlier commit initialized the
  minimal `openspec/` root because none existed. Neither revision changes
  CoffeeScript, TypeScript, generated assets, CI, dependencies, or
  non-OpenSpec configuration.
- **Foundation dependency:** the
  [Synapse foundation contract](https://github.com/fulcrumapp/synapse/pull/1)
  and its per-form-isolation amendment supply the signed, validated local
  bundle required by v1.
- **Contract source:** [FLCRM-22079](https://fulcrumapp.atlassian.net/browse/FLCRM-22079)
  is the ratified Phase 2 v1 decision; the
  [FLCRM-22082 epic](https://fulcrumapp.atlassian.net/browse/FLCRM-22082)
  tracks delivery.
- **Implementation traceability:** [FLCRM-22288](https://fulcrumapp.atlassian.net/browse/FLCRM-22288)
  owns the KMP core and fixtures; [FLCRM-22289](https://fulcrumapp.atlassian.net/browse/FLCRM-22289)
  the expression function; [FLCRM-22292](https://fulcrumapp.atlassian.net/browse/FLCRM-22292)
  editor types; [FLCRM-22293](https://fulcrumapp.atlassian.net/browse/FLCRM-22293)
  Android Data Event hosting; [FLCRM-22294](https://fulcrumapp.atlassian.net/browse/FLCRM-22294)
  iOS hosting; [FLCRM-22290](https://fulcrumapp.atlassian.net/browse/FLCRM-22290)
  the Android agent tool; and [FLCRM-22291](https://fulcrumapp.atlassian.net/browse/FLCRM-22291)
  cross-surface conformance.
- **No remote retrieval:** this change introduces no Synapse retrieval API and
  permits no query-time Synapse interaction.

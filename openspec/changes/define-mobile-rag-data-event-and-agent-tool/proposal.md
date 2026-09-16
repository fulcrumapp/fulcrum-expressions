## Why

Phase 1 produces signed, validated, per-form offline RAG bundles, but Phase 2 needs a contract for consuming those bundles locally without allowing cross-form access, remote retrieval, or confusion between Data Events and Android conversational-agent tools. Defining that boundary now lets the dependent teams implement against one privacy-preserving retrieval model after FLCRM-22079 ratifies the public details.

## What Changes

- Define the provisional mobile Data Event function `RAG(options, callback)` for Fulcrum's user-authored JavaScript subset as an asynchronous, callback-based language surface analogous to `INFERENCE(options, callback)`.
- Define v1 host availability: native iOS and Android implement local retrieval; web returns the stable `rag_unavailable` error and never calls Synapse.
- Define current-active-form-only retrieval from that form's validated local bundle, with no caller-selected form, cross-form search, aggregation, or fallback.
- Define retrieval-only behavior: bounded ranked passages with citation/source metadata, result counts, and local bundle/version correlation; no answer generation, LLM invocation, document transmission, or query-time Synapse call.
- Define a distinct Android local RAG AgentToolRegistration contract, analogous in role to `SearchLocalRecordsAgentToolRegistry`, that uses the same KMP retrieval core without invoking Data Event JavaScript.
- Establish the Phase 2 contract-ratification gate for the public function name, closed versioned options/result/error schemas, numeric bounds, cancellation/timeout semantics, privacy/redaction rules, and golden fixtures. FLCRM-22079 provides the ratified values before implementation and public documentation; this change does not invent them.
- Record implementation ownership and dependencies only. Runtime implementation remains in separately tracked Epic children FLCRM-22289, FLCRM-22292, FLCRM-22288, FLCRM-22293, FLCRM-22294, FLCRM-22290, and FLCRM-22291.

## Capabilities

### New Capabilities

- `mobile-rag-data-event`: Defines the public, mobile-only Data Event retrieval boundary and its required isolation, error, privacy, and ratification behavior.
- `android-local-rag-agent-tool`: Defines the separate Android conversational-agent retrieval registration, policy boundary, and relationship to the shared KMP core.

### Modified Capabilities

None.

## Impact

- Documentation only in this repository's OpenSpec artifacts; no CoffeeScript, TypeScript, generated asset, CI, dependency, configuration, or runtime changes are included.
- Depends on the FLCRM-22079 Phase 2 contract spike and the Part 1 Synapse foundation contract in https://github.com/fulcrumapp/synapse/pull/1, including its separate amendment that makes per-form isolation explicit.
- Future implementation owners are: `fulcrum-expressions` for the Data Event language function and source docs; `fulcrum` components for editor TypeScript/Monaco types as applicable; Android and iOS for native bridges; and KMP for the shared local retrieval core.
- No remote Synapse retrieval API is introduced or required.

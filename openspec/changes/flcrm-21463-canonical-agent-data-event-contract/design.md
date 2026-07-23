## Context

FLCRM-21463 is the contract-first step of the FLCRM-21395/AGENT data-event
epic. `fulcrum-expressions` owns the expression-facing JavaScript contract,
but execution is split between native host callbacks and platform adapters.
The current expression implementation is CoffeeScript:

- `functions.coffee` validates `INFERENCE()` synchronously, injects the
  current `form_id` when no `form_name` is supplied, serializes the request,
  defers the host call through `SETTIMEOUT`, and flattens ML output values.
- `expressions-proxy.coffee` exposes the asynchronous `inference` host
  function; missing host support returns `Not Supported`.
- `ts/functions/INFERENCE.ts` and generated `docs/event_docs.*` describe the
  expression-facing Legacy ML, Modern ML, and Modern LLM shapes.
- The repository does not resolve attachments or execute models. The host
  resolves form-scoped model/reference files.

Cross-repository evidence is available from accessible GitHub branches and
PRs. KMP's `InferenceModelResolver` gives form attachments precedence over
downloaded storage and validates model names as path segments. Its
`LabelFileParser` reads ordered UTF-8 text and drops blank lines; inline
non-null labels, including `[]`, take precedence. Android PR #4026 is open and
uses local catalog/storage and LiteRT-LM for AGENT; iOS PR #3490 is open and
uses the KMP resolver plus a LiteRT-LM adapter. These branches are evidence,
not merged normative policy, and contain unresolved differences.

## Goals / Non-Goals

**Goals:**

- Produce one versioned AGENT contract for model, task contract, tools,
  allow-lists, typed inputs/outputs, references, prompt/context boundaries,
  compatibility, and stable error categories.
- Preserve existing `INFERENCE()` behavior unless a later, separately
  approved compatibility change says otherwise.
- Make observed behavior, proposed behavior, and evidence provenance
  distinguishable.
- Define offline, sanitized fixtures and cross-platform conformance checks
  before runtime work starts.
- Make reference data explicit and bounded; it must not become an implicit
  prompt-injection channel.

**Non-Goals:**

- Implementing `AGENT()` or changing `INFERENCE()`.
- Choosing new model formats, adding tools, downloading files, changing
  attachment APIs, or changing entitlement/plan policy.
- Treating currently open Android/iOS PRs as merged behavior.
- Resolving product-policy questions by inference from code.
- Adding production model binaries, customer data, secrets, network fixtures,
  database migrations, feature flags, or deployment steps.

## Decisions

1. **Canonical owner and versioning.** The normative public contract will be
   maintained with the expression-facing documentation and TypeScript
   declaration in `fulcrum-expressions`; KMP owns shared serializable/native
   representations and adapters conform to it. The v1 payload has an explicit
   integer `schemaVersion` and rejects unknown future versions rather than
   silently guessing. Generated docs are derived from the existing docs
   pipeline, while cross-repository fixtures are portable JSON/text.

2. **Canonical v1 payload (locked).** The user-facing shape is:

   ```json
   {
     "schemaVersion": 1,
     "agentId": "record-agent",
     "agent": {
       "model": "gemma.task",
       "mode": "SIMPLE",
       "systemPrompt": "Answer using the supplied record.",
       "allowedTools": ["lookup_record"],
       "generation": {
         "maxTokens": 256,
         "temperature": 0.7,
         "stopSequences": []
       }
     },
     "task": {
       "inputs": {"query": "open records"},
       "references": [],
       "contract": {
         "inputs": [{"name": "query", "type": "string", "required": true}],
         "outputs": [{"name": "answer", "type": "string", "required": true}]
       }
     }
   }
   ```

   `agent.model` is the selected model identifier string; `agent.allowedTools`
   is the caller's allow-list of registered tool names. Tool descriptors and
   executable handlers are host-owned metadata, never executable values in the
   form script. `task.references` is the approved location for explicit
   reference descriptors (`name`, `kind`, `required`, `encoding`, `maxBytes`).
   A reference resolves only through the current/selected form context and is
   not automatically copied into a prompt.

3. **Prompt/context boundary.** `systemPrompt`, task input values, tool
   arguments/results, and reference bytes remain separate typed message
   segments. Reference bytes are decoded according to their declared
   encoding, size-checked before allocation, and passed to the model only at
   an explicit adapter-defined context slot. File contents, model names,
   tool arguments, and model output are untrusted data; they cannot create
   tools, alter the allow-list, execute code, or override system policy.
   No implicit `LOADFILE()` JavaScript evaluation is reused for AGENT
   references.

4. **INFERENCE compatibility baseline.** Legacy flat ML, modern nested ML,
   text-only LLM, multimodal LLM, form ID/name selection, and the existing
   ML-tensor/LLM-text callback envelopes remain accepted as currently
   documented. Synchronous validation errors remain synchronous; host/model
   failures remain callback errors. `modelName` is documented only as a
   native/legacy compatibility alias where evidence proves it exists (iOS
   currently accepts it); it is not added to the expression API without
   explicit approval.

5. **Reference-file baseline (locked + conservative).** Existing observed
   semantics are recorded without broadening them: model lookup is form
   attachment first in KMP evidence, followed by downloaded model storage;
   `labels.txt` is UTF-8, supports CRLF/LF/CR, trims and drops blank lines,
   preserves non-blank order, and is optional/non-fatal; an inline non-null
   labels array wins. Universal byte/line/nesting/context limits remain
   **`not-observed`** in this planning ticket and are explicitly carried as
   lock prerequisites for later implementation (no guessed numeric defaults).

6. **Tool security and bounded execution (locked).** Runtime enforcement occurs
   at invocation time, not only in the UI or payload validator. Unknown and
   disallowed tools are not executed and produce typed safe failures. v1 lock
   defaults are `maxToolRounds = 8` and `maxToolCalls = 8` per invocation with
   deterministic event order and cancellation propagation.

7. **Evidence and release order (locked).** A reviewable evidence matrix and
   sanitized fixtures land first. Then expression contract/docs, KMP shared
   conformance, Android adapter, and iOS adapter are reviewed in dependency
   order. **PR #107 disposition (locked):** close PR #107 as a non-normative
   side path and carry forward only reviewed expression-only INFERENCE wording
   into the canonical FLCRM-21463 stream. No competing normative AGENT contract
   source.

8. **Error taxonomy and delivery split (locked).** Stable categories:
   `invalid-input`, `unsupported-schema-version`, `unsupported-mode`,
   `unsupported-model`, `plan-denied`, `missing-photo`, `model-not-found`,
   `reference-unavailable`, `reference-size-limit`, `tool-not-allowed`,
   `tool-invalid-arguments`, `tool-execution-failed`, `inference-failed`,
   `output-contract-violation`, and `cancelled`. Expression validation remains
   synchronous for malformed input/shape errors; host/runtime/model/tool errors
   remain asynchronous callback categories with redacted diagnostics.

9. **Compatibility aliases and strictness (locked).** `schemaVersion: 1` is
   required. `modelName` stays a native compatibility alias only where already
   evidenced (iOS) and is not added to the expression API surface in this
   ticket. Strict output validation is enabled for declared task outputs.

## Risks / Trade-offs

- **[Risk]** Open Android/iOS PRs and merged KMP work can drift before this
  contract is approved. → Pin evidence to commit/PR URLs, label unmerged
  behavior as provisional, and require conformance tests before implementation.
- **[Risk]** A model or reference identifier can become a path traversal or
  unbounded I/O vector. → Require path-segment validation, form-context
  resolution, pre-read byte limits, bounded line/field counts, and safe
  categorized errors.
- **[Risk]** Reference text can override system instructions or tool policy.
  → Keep references in typed context segments, define precedence explicitly,
  and test adversarial file contents as passive data.
- **[Risk]** Making missing labels fatal would break existing inference users;
  making a missing model non-fatal hides execution failure. → Preserve
  non-fatal optional-label behavior and make required model/reference policy
  explicit per descriptor.
- **[Risk]** iOS cache paths and Android catalog/storage state can race with
  deletion or sync. → Require deterministic missing/unavailable categories,
  no stale-path success, and concurrent deletion fixtures.
- **[Risk]** “Canonical” could accidentally freeze undocumented implementation
  details. → Separate observed, compatibility-required, and proposed sections;
  require design-review approval for every proposed field/default/limit.

## Migration Plan

This ticket has no production migration. The planning change is reversible by
reverting documentation, fixtures, and OpenSpec artifacts. After approval:

1. Apply the locked defaults in this design as the canonical planning baseline.
2. Merge the evidence/fixture contract in `fulcrum-expressions`.
3. Add KMP conformance models and tests without changing runtime behavior.
4. Update Android and iOS adapters to conform, each with platform-specific
   tests and independent rollback.
5. Keep PR #107 closed as non-normative and carry forward only reviewed
   expression-only wording.
6. Only then implement expression/platform AGENT behavior under later tickets.

## Locked Review Defaults (SPEC_REVIEW_READY auto-accepted)

- `task.references` is the approved canonical location.
- Required schema version is `1`; unsupported versions hard-fail before
  model/reference/tool access.
- Canonical `generation` keys remain `maxTokens`, `temperature`,
  and `stopSequences` for v1.
- Supported contract scalar field types: `string`, `number`, `boolean`,
  `integer`, `array`, `object`; unknown types fail validation.
- References are context-only typed descriptors in v1 and do not implicitly
  become prompt or user-message content.
- Missing optional labels/references remain non-fatal; missing required model
  or required reference fails before execution.
- Universal byte/line/nesting/context limits are explicitly `not-observed` in
  this planning change and must be approved before runtime implementation.
- Tool descriptors remain host registry metadata. Payload carries only
  `allowedTools` names.
- Execution bounds for v1 conformance fixtures are `maxToolRounds = 8` and
  `maxToolCalls = 8`; cancellation remains a first-class terminal category.
- PR #107 is locked to closure as a non-normative side path; carry forward
  only reviewed expression-only wording into canonical FLCRM-21463 artifacts,
  with no competing normative AGENT contract source.

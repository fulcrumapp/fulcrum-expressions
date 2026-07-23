# FLCRM-21463 Cross-Repository Evidence and Design-Review Record

## Requirement 1 per-claim matrix (explicit provenance + confidence + status)

| Claim ID | Repository | Branch/commit or PR | File/symbol | Observed behavior (passive evidence only) | Confidence | Status |
|---|---|---|---|---|---|---|
| EXPR-001 | `fulcrum-expressions` | Base commit `2d3b01b42dd0c2f960368d9bb22ee0cbf49f158a` | `functions.coffee` / `INFERENCE` | Synchronous validation accepts legacy flat ML, modern nested ML, and modern LLM shapes; `form_id` fallback uses current form when `form_name` absent. | High | merged |
| EXPR-002 | `fulcrum-expressions` | Base commit `2d3b01b42dd0c2f960368d9bb22ee0cbf49f158a` | `functions.coffee` / `INFERENCE`; `expressions-proxy.coffee` / `inference` | Request dispatch crosses async host callback boundary; ML callback output arrays are flattened for expression output. | High | merged |
| EXPR-003 | `fulcrum-expressions` | PR #107, commit `f8e0bd9`, branch `henrytabima-flcrm-21424-expression-docs` | `ts/functions/INFERENCE.ts` and PR docs/fixtures changes | Expression-only documentation/fixture wording is additive evidence and explicitly non-normative for AGENT contract behavior. | High | provisional |
| KMP-001 | `kmp` | PR #175 (merged) with inspected provenance branch `feature/FLCRM-21395-agent-data-event-green` | `InferenceModelResolver` / model resolution path | Resolver checks form attachment first, then downloaded storage matches (exact filename/id/name + ID-prefix fallback); path-segment validation rejects invalid names. | Medium | merged |
| KMP-002 | `kmp` | PR #175 (merged) with inspected provenance branch `feature/FLCRM-21395-agent-data-event-green` | `LabelFileParser`; `InferenceModelResolver.resolveLabels` | `labels.txt` parsing is UTF-8 with CRLF/LF/CR splitting, trim + blank removal, order preserved; inline non-null labels (including `[]`) take precedence; missing/unreadable optional labels are non-fatal. | High | merged |
| KMP-003 | `kmp` | PR #175 (merged) with inspected provenance branch `feature/FLCRM-21395-agent-data-event-green` | `InferenceModelResolver` comments vs control flow | Catalog lookup is mentioned in comments but not independently executed in inspected resolver path; treat as conflict/unknown, not a compatibility promise. | Medium | merged |
| AND-001 | `fulcrum-android` | PR #4026, branch `pedrodotavila-issue-flcrm-21395-agents-data-event` | AGENT bridge/resolver/tool event symbols in PR #4026 | Proposed AGENT bridge uses local model catalog/storage and LiteRT-LM pathing, plan gating, off-main execution, and tool lifecycle events. | Medium | provisional |
| AND-002 | `fulcrum-android` | Branch `issue/FLCRM-21207-android-support-labels-from-reference-files-labels-txt-with-newline-separated-label-list` | Labels/reference resolver symbols in branch | Android labels/reference behavior tracks newline-separated labels parity evidence; branch is not a released FLCRM-21463 baseline. | Medium | provisional |
| IOS-001 | `fulcrum-ios` | PR #3490, branch `feature/FLCRM-21395-agents-data-event` | `ExpressionInferenceRequest` model fields; resolver invocation symbols | Native request accepts `model` and compatibility alias `modelName`; resolver path uses form-attachment-aware lookup via KMP-backed layer. | Medium | provisional |
| IOS-002 | `fulcrum-ios` | PR #3490, branch `feature/FLCRM-21395-agents-data-event` | labels/tool/output-handling symbols in PR #3490 | Proposed bridge keeps UTF-8 labels semantics, strict task-output checks, LiteRT-LM adapter path, and static tool-selection behavior. | Medium | provisional |
| RAILS-001 | `fulcrum` | `main` tree evidence | attachment/reference-file services/controllers symbols | Rails repository owns attachment/reference-file transport and APIs; it is a prerequisite boundary, not native `INFERENCE()`/AGENT execution runtime. | High | merged |
| PLAN-001 | `fulcrum-expressions` planning artifacts | OpenSpec change `flcrm-21463-canonical-agent-data-event-contract` | `openspec/.../design.md`; `specs/.../spec.md` | Canonical v1 planning defaults are explicitly proposed: `schemaVersion: 1`, `task.references`, host-owned tool metadata, bounded calls/rounds, stable error categories. | High | proposed |
| PLAN-002 | `fulcrum-expressions` planning artifacts | OpenSpec change `flcrm-21463-canonical-agent-data-event-contract` | `openspec/.../design.md`; `.agents/specs/active-spec.md` | PR #107 disposition is locked: close as non-normative, carry forward only reviewed expression-only wording into canonical FLCRM-21463 artifacts, and keep AGENT contract norms single-sourced. | High | proposed |

## Conflicts and unknowns kept visible (non-normative)

- KMP catalog comment/control-flow mismatch remains unresolved evidence, not a
  compatibility requirement.
- Android GGUF/runtime format availability remains provisional in open-PR evidence.
- iOS final fallback and release-baseline behavior remain provisional in open-PR
  evidence.
- Universal byte/line/field/nesting/context limits are `not-observed` from merged
  execution owners and must be approved before runtime implementation.
- Open PR evidence (Android/iOS/PR #107 docs) is never treated as released baseline.

## Locked design-review defaults (auto-accepted safest path)

1. **Reference placement:** canonical location is `task.references`.
2. **Reference kinds in v1:** `model-attachment`, `labels-txt`, and
   `text-context` typed descriptors only; each reference remains passive data.
3. **Versioning:** `schemaVersion: 1` is required; unsupported versions fail
   closed before model/reference/tool access.
4. **Model identifier semantics:** `agent.model` is a logical identifier string
   resolved through form/storage boundaries only. `modelName` remains a native
   compatibility alias only where already evidenced (iOS), and is not added to
   expression syntax in this ticket.
5. **Generation fields:** canonical v1 keys are `maxTokens`, `temperature`, and
   `stopSequences`; defaults stay host-owned unless explicitly supplied.
6. **Context ordering and isolation:** context segments are ordered
   system prompt → task inputs → references → tool messages → model output.
   Reference content is untrusted data and cannot modify policy, contracts,
   tool registration, or allow-lists.
7. **Missing/required behavior:** missing optional labels/references remain
   non-fatal; missing required model/reference fails before execution.
8. **Tool bounds and ownership:** host registry owns descriptors/handlers;
   payload carries only `allowedTools`. Runtime bounds are
   `maxToolRounds = 8`, `maxToolCalls = 8`, with cancellation preserved as
   `cancelled`.
9. **Limit documentation:** byte/line/nesting/context limits not established by
   merged evidence stay explicitly `not-observed` in this planning ticket and
   must be approved before runtime implementation.
10. **PR #107 disposition (locked):** close PR #107 as non-normative and carry
    forward only reviewed expression-only INFERENCE wording into the canonical
    FLCRM-21463 stream; do not publish a second normative AGENT contract source.

## Canonical v1 error categories and delivery split

| Category | Delivery | Notes |
|---|---|---|
| `invalid-input` | Synchronous | Expression shape/type/required-field validation failure. |
| `unsupported-schema-version` | Synchronous | Version is unknown; no fallback guessing. |
| `unsupported-mode` | Synchronous | Mode rejected before execution. |
| `unsupported-model` | Asynchronous callback | Model identifier syntactically valid but unsupported by runtime capability. |
| `plan-denied` | Asynchronous callback | Entitlement check fails before model/reference/tool access. |
| `missing-photo` | Synchronous | Legacy ML input contract violation. |
| `model-not-found` | Asynchronous callback | Resolver cannot find model in allowed boundaries. |
| `reference-unavailable` | Asynchronous callback | Required reference missing/unreadable/not-synced. |
| `reference-size-limit` | Asynchronous callback | Declared/approved bound exceeded. |
| `tool-not-allowed` | Asynchronous callback | Requested tool not in allow-list/registry. |
| `tool-invalid-arguments` | Asynchronous callback | Tool args fail descriptor schema validation. |
| `tool-execution-failed` | Asynchronous callback | Allowed tool execution error. |
| `inference-failed` | Asynchronous callback | Runtime/model execution failure. |
| `output-contract-violation` | Asynchronous callback | Missing/extra/wrong-type strict output. |
| `cancelled` | Asynchronous callback | Cancellation remains distinct from failure categories. |

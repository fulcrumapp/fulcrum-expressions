## ADDED Requirements

### Requirement: Canonical AGENT payload is versioned and portable
The canonical AGENT contract SHALL define one versioned, JSON-serializable
payload that includes the agent model, execution mode, system prompt,
generation options, task contract, task inputs, references, and tool
allow-list. The expression-facing shape SHALL be the source of truth; KMP,
Android, and iOS adapters SHALL conform to it rather than publish conflicting
normative shapes.
`schemaVersion` SHALL be required and equal to `1` for v1, and references
SHALL be located at `task.references` (not a separate root collection).

#### Scenario: Canonical payload round-trips
- **WHEN** a valid v1 payload is serialized and decoded by each participating
  adapter
- **THEN** `schemaVersion`, `agentId`, model, task contract, inputs,
  references, generation options, and `allowedTools` retain their values and
  declared order

#### Scenario: Unsupported schema version is rejected
- **WHEN** an adapter receives a schema version it does not implement
- **THEN** it returns a stable validation/unsupported-version error without
  guessing defaults or executing the task

### Requirement: Task inputs and outputs are typed and contract-bound
The task contract SHALL declare ordered, uniquely named input and output
fields with supported types and requiredness. Required inputs SHALL be
present and type-compatible before model execution. Results SHALL contain
only declared output fields and SHALL report undeclared, missing-required, or
wrong-type outputs according to the agreed strictness policy.
Supported field types for v1 SHALL be `string`, `number`, `boolean`,
`integer`, `array`, and `object`; unknown types SHALL fail validation.

#### Scenario: Required input and valid output succeed
- **WHEN** all required inputs match their declared types and the model returns
  exactly the declared output shape
- **THEN** execution succeeds and the result preserves the declared output
  names, types, and order

#### Scenario: Invalid task input fails before model access
- **WHEN** a required input is absent or has the wrong declared type
- **THEN** the task returns a typed contract-violation error and does not
  resolve a model, read a reference, or invoke a tool

#### Scenario: Strict output violation is explicit
- **WHEN** strict output mode is active and the model omits a required field,
  adds an undeclared field, or returns a wrong type
- **THEN** execution returns a typed contract-violation error and does not
  silently pass through the invalid value

### Requirement: Model selection preserves INFERENCE compatibility
The contract SHALL document model identifier semantics and SHALL preserve the
existing INFERENCE compatibility baseline: legacy flat ML, modern nested ML,
text-only LLM, multimodal LLM, form ID/name context, and existing ML tensor
and LLM text result envelopes. Expression validation errors SHALL remain
synchronous; host/model failures SHALL be delivered through the existing
callback error channel.

#### Scenario: Existing INFERENCE shapes remain accepted
- **WHEN** a legacy ML, modern ML, text-only LLM, or multimodal LLM request
  uses a currently supported shape
- **THEN** the expression layer forwards the compatible normalized request and
  preserves the existing callback result envelope

#### Scenario: Missing model is safe
- **WHEN** the selected model cannot be resolved from the allowed form/storage
  context
- **THEN** execution returns a stable model-not-found category and never
  reads an arbitrary caller-supplied path

### Requirement: References are explicit, bounded, and isolated
AGENT references SHALL be declared as typed descriptors with explicit
requiredness and bounded size/encoding policy. Resolution SHALL use the
permitted form/reference context only. Reference contents SHALL remain
separate from system instructions, task inputs, tool policy, and executable
code unless the contract explicitly declares a context segment.

#### Scenario: Optional missing reference does not fail a task
- **WHEN** an optional reference is absent, not synchronized, unreadable, or
  empty and the model/task otherwise executes successfully
- **THEN** the task continues without silently inventing reference content and
  reports the reference as unavailable only through the documented diagnostic

#### Scenario: Required missing reference fails safely
- **WHEN** a required reference cannot be resolved or exceeds its declared
  limit
- **THEN** execution returns a stable reference-unavailable/size-limit error
  before model execution and does not access an arbitrary path

#### Scenario: Reference text cannot change policy
- **WHEN** a reference contains prompt-like instructions, tool names, or
  executable source
- **THEN** it is treated as data in its declared context segment and cannot
  change the system prompt, add an allow-listed tool, execute code, or alter
  the task contract

### Requirement: Tool metadata and allow-lists are enforced at runtime
The contract SHALL distinguish host-owned tool descriptors/handlers from the
caller-provided `allowedTools` names. A tool SHALL execute only when it is
registered, present in the invocation allow-list, and supplied arguments
match its declared schema. Unknown, disallowed, malformed, or failing tools
SHALL produce safe typed results without arbitrary dispatch.
For v1 conformance, runtimes SHALL enforce bounded execution with
`maxToolRounds = 8` and `maxToolCalls = 8` per invocation unless a later
approved contract version supersedes these limits.

#### Scenario: Allow-listed tool succeeds
- **WHEN** the model requests a registered tool whose name is in
  `allowedTools` and whose arguments match the descriptor
- **THEN** the host executes that tool and returns an identified tool result
  followed by the documented assistant/task event

#### Scenario: Disallowed or unknown tool is rejected
- **WHEN** the model requests a tool absent from `allowedTools` or absent from
  the host registry
- **THEN** the host does not execute it and returns a stable tool-not-allowed
  or unknown-tool result/event

#### Scenario: Tool execution is bounded and cancellable
- **WHEN** a task repeatedly requests tools, a tool fails, or cancellation
  occurs during generation/tool execution
- **THEN** the runtime stops at the approved bound, reports a typed failure,
  and preserves cancellation as cancellation rather than converting it into a
  normal tool error

### Requirement: Error and compatibility behavior is explicit
The contract SHALL define stable categories and platform mappings for invalid
input, unsupported schema/mode/model, plan or entitlement denial, missing
photo/model/reference, tool denial/failure, inference failure, output
contract violation, size-limit violation, and cancellation. Each category
SHALL specify whether it is synchronous validation or asynchronous callback
delivery and SHALL avoid leaking paths, prompts, credentials, or raw files.
The canonical v1 category names SHALL be `invalid-input`,
`unsupported-schema-version`, `unsupported-mode`, `unsupported-model`,
`plan-denied`, `missing-photo`, `model-not-found`, `reference-unavailable`,
`reference-size-limit`, `tool-not-allowed`, `tool-invalid-arguments`,
`tool-execution-failed`, `inference-failed`, `output-contract-violation`,
and `cancelled`.

#### Scenario: Plan denial stops before access
- **WHEN** the account or feature gate does not permit AGENT
- **THEN** the callback receives the approved plan-not-supported category and
  no model, reference, or tool is accessed

#### Scenario: Platform mappings preserve categories
- **WHEN** the same fixture error is processed by KMP, Android, and iOS
- **THEN** each adapter exposes the same stable category while using its
  platform-native error transport

#### Scenario: Diagnostics are redacted
- **WHEN** an error includes a model name, reference name, prompt, or tool
  argument
- **THEN** diagnostics use safe identifiers/categories and do not expose raw
  file contents, secrets, or arbitrary filesystem paths

### Requirement: Conformance fixtures are passive and representative
The contract SHALL ship sanitized offline fixtures covering model resolution
precedence, labels/reference ordering, CRLF/LF/CR and UTF-8 handling, empty
and missing files, size boundaries, prompt/context separation, model
selection, task validation, tool allow-lists, outputs, compatibility aliases,
errors, cancellation, and concurrent unavailability. Fixtures SHALL be parsed
as data and SHALL never be executed as code, commands, URLs, or prompts.

#### Scenario: Reference fixture captures observed semantics
- **WHEN** the representative labels/reference fixture is processed
- **THEN** non-blank lines preserve order after UTF-8 decoding, line-ending
  normalization, and trimming, while missing/empty optional files remain
  non-fatal

#### Scenario: Adversarial fixture remains inert
- **WHEN** a fixture contains traversal-like names, prompt injection text,
  JavaScript, shell syntax, or tool-looking JSON
- **THEN** the test treats it only as input data and no code, command, URL,
  tool, or prompt instruction is executed

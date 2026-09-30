## ADDED Requirements

### Requirement: Versioned FLOW options contract
The contract SHALL define the `FLOW()` data event options object with `schema_version`,
`workflow_id`, `workflow_version`, `steps`, optional `title`, `interaction`, `run_key`, and
`limits`, SHALL use `snake_case` keys, and SHALL state compatibility rules: adding an optional field
is compatible within a major version, while removing or renaming a field, or changing its meaning
or type, requires a new major version.

#### Scenario: A consumer receives a supported payload
- **WHEN** a form calls `FLOW()` with a supported `schema_version`
- **THEN** the payload is accepted for validation
- **AND** unknown optional fields are ignored, except the reserved runtime-assigned names, which fail with `invalid_definition`
- **AND** optional fields that do not apply are omitted.

#### Scenario: A consumer receives an unsupported version
- **WHEN** `schema_version` is not supported
- **THEN** the call fails with `unsupported_schema_version`.

#### Scenario: A form runs with no user interface
- **WHEN** `interaction` is `"none"`
- **THEN** a `confirmation` step, or a `node` step with a `prompt`, fails the call with `invalid_definition`.

#### Scenario: A form chooses how the run starts
- **WHEN** a valid definition is passed
- **THEN** the run starts as soon as the data event fires, in the chat when `interaction` is `"chat"` or omitted
- **AND** to ask the user first, the definition makes its first step a `confirmation`
- **AND** an `interaction` value other than `"chat"` or `"none"` fails with `invalid_definition`.

### Requirement: Step kinds and transitions
The contract SHALL define the step kinds `node`, `tool`, `confirmation`, `branch`, and `end`, with
required and optional fields for each, and SHALL require every transition to name the next step.

A run SHALL begin at the first step in `steps`. `on_error`, `on_rejected`, and `on_expired` SHALL
accept a step id or `abort`, and SHALL default to `abort`. A `branch` SHALL test its cases in order,
use the first match, and require a `default`. A step of kind `end` SHALL have no `next`.

#### Scenario: A branch matches no case
- **WHEN** no case of a `branch` step matches
- **THEN** control moves to its `default` step.

#### Scenario: A failure is routed onward
- **WHEN** a step fails and `on_error` names a step
- **THEN** the run continues at that step and does not end
- **AND** when `on_error` is `abort` or omitted the run ends with the outcome in the run outcome table.

#### Scenario: A workflow branches and loops
- **WHEN** a `branch` case or `on_rejected` targets an earlier step
- **THEN** the workflow loops
- **AND** each step runs at most `limits.max_step_visits` times.

### Requirement: Tools and confirmations
The contract SHALL allow a `tool` step to name any tool the chat exposes, SHALL make tool results
available as `steps.<id>.output`, and SHALL record a confirmation outcome as `accepted`,
`rejected`, or `expired` without storing the answer text.

#### Scenario: A tool step names an unknown tool
- **WHEN** a `tool` step names a tool id the chat does not expose
- **THEN** the definition still passes validation
- **AND** when the step runs it fails without retrying and follows `on_error`.

#### Scenario: A confirmation does not trigger a tool
- **WHEN** a confirmation step is accepted
- **THEN** control moves to its `next` step, which need not be a tool step.

### Requirement: Retries
The contract SHALL define `retry.max_attempts` on tool and confirmation steps, SHALL let the chat
decide whether a confirmation answer is complete and ask only for what is missing, and SHALL count
each question to the user as one attempt of the same step, bounded by `max_attempts`. `max_attempts`
SHALL be 1 to 5 and count the first attempt, defaulting to 1 for tool steps (no retry) and 2 for
confirmation steps. `retry.on` SHALL list `tool_error` and `timeout` and default to both.

#### Scenario: A confirmation is partly answered
- **WHEN** the user confirms only some of the items and attempts remain
- **THEN** the chat asks for the missing items
- **AND** when attempts are exhausted without an accepted answer the step counts as `rejected`.

#### Scenario: A tool fails and is retried
- **WHEN** a tool step fails with a retryable kind and attempts remain
- **THEN** the step runs again
- **AND** when attempts are exhausted control moves to `on_error`.

### Requirement: References and conditions
The contract SHALL define references `form.<field>`, `steps.<id>.output.<key>`, and
`steps.<id>.output.reply` (the user's reply to a `node` step that has a `prompt`), SHALL write
references in strings as `{{path}}`, and SHALL define branch conditions as structured
`{ ref, op, value }` objects with a bare path, using the operators `eq`, `ne`, `gt`, `gte`, `lt`,
`lte`, `in`, `exists`, and `not_exists`, rather than JavaScript.

#### Scenario: A later step uses the user's reply
- **WHEN** a `node` step with a `prompt` receives a reply and a later `tool` input references `{{steps.<id>.output.reply}}`
- **THEN** the reply text is used as the input value.

#### Scenario: A node step has no prompt
- **WHEN** a reference names the reply of a `node` step that has no `prompt`
- **THEN** the reference is treated as absent.

#### Scenario: A reference names a missing step
- **WHEN** a reference names a step id that does not exist
- **THEN** validation fails with `unknown_step`.

#### Scenario: A reference cannot be resolved
- **WHEN** a reference has no value at run time
- **THEN** `exists` is false
- **AND** a tool input that needs it fails the step.

### Requirement: Run outcome
The contract SHALL define the run outcome as a `status` of `completed`, `failed`, or `cancelled`
and a stable `termination_reason` vocabulary, and SHALL map each way a run can end to exactly one
outcome.

#### Scenario: A tool fails with no retries left
- **WHEN** a tool step fails, its attempts are exhausted, and `on_error` is `abort`
- **THEN** the run ends as `failed` with `retries_exhausted` when the step retried and used every attempt
- **AND** with `tool_error` when the tool call itself failed without retrying
- **AND** `unknown_tool` and `input_unresolved` take precedence over `tool_error`.

#### Scenario: Several limits trip together
- **WHEN** more than one limit is exceeded
- **THEN** the earliest recorded cause decides the outcome
- **AND** a step that runs more than `limits.max_step_visits` times ends the run as `failed` with `max_visits_exceeded`
- **AND** only `limits.timeout_seconds` ends it as `cancelled` with `timeout`.

#### Scenario: A consumer meets an unknown termination reason
- **WHEN** a consumer receives a `termination_reason` it does not know
- **THEN** it treats it as `unknown` within the same `status`.

#### Scenario: The user rejects a confirmation
- **WHEN** a confirmation is rejected and `on_rejected` is `abort`
- **THEN** the run ends as `cancelled` with `user_rejected`.

### Requirement: Runtime correlation fields
The contract SHALL define the correlation fields for workflow, run, agent, session, step, tool,
model, timing, outcome, and error. It SHALL distinguish the identity fields `workflow_id`,
`workflow_version`, and `run_key`, which the definition supplies and the runtime copies into
reports, from the remaining fields, which the runtime assigns. It SHALL state that a definition
cannot set a runtime-assigned field.

#### Scenario: A definition supplies a correlation field
- **WHEN** the options contain a runtime-assigned field such as `run_id`
- **THEN** validation fails with `invalid_definition`
- **AND** `workflow_id`, `workflow_version`, and `run_key` remain valid options.

#### Scenario: Two runs share a run key
- **WHEN** two runs use the same `run_key` at different times
- **THEN** each run has a different `run_id`.

### Requirement: Idempotency and nesting
The contract SHALL define run identity from `workflow_id`, `workflow_version`, the record, and
`run_key`, and SHALL state that nested workflows are not supported in version 1 and fail with
`invalid_definition`.

#### Scenario: The data event fires twice
- **WHEN** `FLOW()` fires again with the same identity while a run is active
- **THEN** no second run starts
- **AND** a different `run_key` starts an independent run.

#### Scenario: A definition tries to nest a workflow
- **WHEN** a step tries to start or embed another workflow
- **THEN** validation fails with `invalid_definition`.

### Requirement: Validation and errors
The contract SHALL define stable error codes for a disabled plan, an unsupported version, an
invalid definition, unknown or unreachable steps, duplicate step ids, and exceeded limits, and
SHALL state the size, count, and limit values: 1 to 50 steps, 32 KB, `max_step_visits` default 10 and
maximum 50, and `timeout_seconds` default 1800 and maximum 3600. Both limits are integers of at least 1; a non-integer value fails with `invalid_definition`. A consumer that meets an unknown
code SHALL treat it as an error of the same class.

#### Scenario: A payload exceeds a limit
- **WHEN** a definition has more than 50 steps, serializes to more than 32 KB, or sets a limit outside its range such as a `max_step_visits` above 50 or a `timeout_seconds` of 0, below 0 or above 3600
- **THEN** the call fails with `limit_exceeded`.

#### Scenario: A step cannot be reached or an id repeats
- **WHEN** a step cannot be reached from the first step
- **THEN** the call fails with `unreachable_step`
- **AND** when two steps share an `id` it fails with `duplicate_step_id`.

#### Scenario: A payload references a missing step
- **WHEN** a `next` value names a step that does not exist
- **THEN** the call fails with `unknown_step` before any step runs.

### Requirement: Privacy
The contract SHALL state that a definition contains author-written text and wiring only, no
secrets or user data, that user data enters a run only through references, and that a definition
is visible to anyone who can read the form.

#### Scenario: A reviewer checks a payload
- **WHEN** a reviewer reads a representative payload
- **THEN** it contains no secrets, credentials, or user data.

### Requirement: Cross-platform acceptance criteria
The contract SHALL define conformance criteria shared by KMP, Android, iOS, and Web, using the
representative payloads as shared fixtures, and SHALL list acceptance criteria for each platform,
including platforms that are blocked.

#### Scenario: A platform implements FLOW
- **WHEN** a platform implements `FLOW()`
- **THEN** it accepts the valid fixtures and returns the documented code for each invalid fixture.

#### Scenario: A platform has no chat yet
- **WHEN** iOS or Web has no chat surface
- **THEN** its criteria are still listed and it is marked blocked.

### Requirement: Evidence and implementation backlog
The contract SHALL link existing tickets and code as evidence and SHALL provide a
dependency-ordered backlog with owners and acceptance criteria and, where it exists, evidence, marking the result callback,
progress reporting, iOS and Web, and nested workflows as deferred.

#### Scenario: A platform team starts implementation
- **WHEN** a team reads the backlog
- **THEN** each item lists its dependencies and acceptance criteria
- **AND** lists its evidence where existing tickets or code apply.

### Requirement: Documentation-only scope
The change SHALL NOT add production code, dependencies, or orchestration changes.

#### Scenario: The change is reviewed
- **WHEN** the change is validated
- **THEN** only documentation and OpenSpec files differ from the base branch.

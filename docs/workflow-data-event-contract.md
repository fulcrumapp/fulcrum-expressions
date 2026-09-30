# Workflow data event contract

This document defines the input of the `FLOW()` data event: the options object a form's
JavaScript passes to create a workflow. The host runs it, in the chat or with no interface. It is platform-neutral and is
intended for KMP, Android, iOS, and Web. It defines the **options payload only**. The callback
result, progress reporting, and the runtime that executes a workflow are follow-up work (see
[Out of scope](#out-of-scope)).

## Where it fits

`FLOW()` follows the pattern of the existing data events (`INFERENCE()`, `LOADFORM()`,
`LOADRECORDS()`): a JavaScript function in the expression engine that receives an options object
and a callback, is gated by a plan attribute (proposed name `DataEventFlowEnabled`), and reports validation problems through the standard data-event error path.

```js
FLOW({
  schema_version: 1,
  workflow_id: 'pole-inspection',
  workflow_version: '1',
  steps: [ /* see below */ ]
});
```

## Contract identity

| Field | Requirement |
| --- | --- |
| Data event name | `FLOW` |
| Schema version | Integer major version, starting at `1` |
| Naming | Option keys are `snake_case`, as in the existing `INFERENCE()` options |
| Compatibility | Adding an optional field is compatible within a major version. Removing or renaming a field, or changing its meaning or type, requires a new major version. A consumer rejects an unknown `schema_version`. |
| Unknown fields | Ignored within a supported major version, except the runtime-assigned names in [Runtime correlation fields](#runtime-correlation-fields). Those are reserved and fail with `invalid_definition`. |
| Optional fields | Omitted when they do not apply. An explicit `null` is treated as absent. |

## Options object

| Field | Required | Description |
| --- | --- | --- |
| `schema_version` | Yes | Integer, `1` for this contract |
| `workflow_id` | Yes | Stable identifier of the workflow. Lowercase letters, digits, and `-`; at most 64 characters. |
| `workflow_version` | Yes | Version string of this definition, at most 64 characters |
| `title` | No | Human-readable name, at most 120 characters |
| `interaction` | No | `"chat"` (default) or `"none"`. The run always starts as soon as the data event fires. `"chat"` runs it in the chat. `"none"` runs it with no user interface, so a `confirmation` step or a `node` step with a `prompt` is invalid (`invalid_definition`). To ask the user whether to run the flow, make the first step a `confirmation`. Any other value fails with `invalid_definition` |
| `steps` | Yes | Array of 1 to 50 [steps](#steps) |
| `run_key` | No | Idempotency key, at most 64 characters (see [Idempotency](#idempotency)) |
| `limits` | No | `timeout_seconds` (integer 1 to 3600, default 1800) and `max_step_visits` (integer 1 to 50, default 10). A non-integer or non-numeric value fails with `invalid_definition`; an integer outside the range fails with `limit_exceeded` |

The whole options object must serialize to at most 32 KB. The definition is embedded in the
call; it is not referenced by id from a stored definition in version 1.

## Steps

Every step has an `id` (unique in the workflow, `^[a-z][a-z0-9-]*$`, at most 64 characters) and a
`kind`. Steps form a directed graph. Which step runs next is always named explicitly, so a
definition can branch and loop.

| `kind` | Purpose | Fields |
| --- | --- | --- |
| `node` | Talks to the user (`chat` only), or the LLM works on something | `prompt` and/or `instruction` (at least one); `next` |
| `tool` | Call a tool the chat exposes | `tool` (tool id); optional `input`; optional `retry`; optional `on_error`; `next` |
| `confirmation` | Ask the user a question; the outcome is bounded | `prompt`; optional `instruction`; optional `retry`; optional `on_rejected` and `on_expired`; `next` (used when accepted) |
| `branch` | Choose the next step from data | `cases` (array of `{ when, next }`); `default` |
| `end` | Finish the run | `status`: `completed`, `failed`, or `cancelled` |

Shared rules:

- `prompt` is fixed text written by the form author and shown to the user, at most 500 characters.
- `instruction` is a short direction for the LLM, at most 500 characters. When both are present the
  chat shows `prompt` and lets the LLM use `instruction` to interpret the user's reply.
- `next`, `on_error`, `on_rejected`, `on_expired`, `default`, and each case's `next` name a step
  `id`. `on_error`, `on_rejected`, and `on_expired` also accept the value `abort`, which ends the
  run without running further steps and gives it the outcome in [Run outcome](#run-outcome).
  Their default is `abort`.
- A step of kind `end` has no `next`.
- The run starts at the first step in `steps`. Every step must be reachable from it, and every
  referenced `id` must exist. Later steps may loop back to the first step.

### Tool steps

- `tool` is any tool id the chat exposes, including tools added in the future. It is not restricted
  to a fixed list. An unknown tool id is not rejected when the definition is validated, because the
  available tools depend on the device and plan. When the step runs, it fails without retrying
  and follows `on_error`.
- `input` is an object of tool arguments. String values may contain [references](#references).
- The tool's result is available to later steps as `steps.<id>.output`.
- `retry` is `{ "max_attempts": n, "on": [...] }`. `max_attempts` is 1 to 5 and counts the first
  attempt; default `1` (no retry). `on` lists the failure kinds that retry: `tool_error`,
  `timeout`. Default is both. When attempts are exhausted the step fails and control moves to
  `on_error`.

### Confirmation steps

- The user's answer resolves to one bounded outcome: `accepted`, `rejected`, or `expired`. The
  answer text itself is not part of the outcome and is never stored in the definition.
- `accepted` continues at `next`. `rejected` continues at `on_rejected`. `expired` continues at
  `on_expired`.
- The chat decides whether an answer is complete. When it is only partly answered, the chat asks
  for what is missing (for example, "and the vest?") instead of repeating the whole question. The
  author does not write the follow-up questions; `prompt` and `instruction` guide the chat, and
  `instruction` can list the items that must all be confirmed.
- Each question to the user is one attempt of the same step. The `retry.max_attempts` field (1 to
  5, default `2`) is the ceiling on attempts, including the first. A confirmation with several
  items may need a higher value. When attempts are exhausted without an accepted answer, the step
  counts as `rejected`.
- A confirmation is independent of tools: it does not have to trigger one.

### Branch steps

Each case is `{ "when": { ... }, "next": "<id>" }`. Cases are tested in order and the first match
wins. If none match, control moves to `default`, which is required.

A condition is `{ "ref": "<path>", "op": "<op>", "value": <literal> }`.

| `op` | Meaning |
| --- | --- |
| `eq`, `ne` | Equal, not equal |
| `gt`, `gte`, `lt`, `lte` | Numeric comparison |
| `in` | `ref` value is one of the array `value` |
| `exists`, `not_exists` | `ref` resolves to a value (no `value` field) |

Conditions are data, not JavaScript. `ref` is a bare [reference](#references) path.

## References

A reference reads data from outside the step:

| Path | Resolves to |
| --- | --- |
| `form.<field_data_name>` | Current value of a field in the record being edited |
| `steps.<step_id>.output.<key>` | A key of an earlier tool step's result |
| `steps.<step_id>.output.reply` | The text the user replied with to an earlier `node` step that has a `prompt` |

In string values (`prompt`, `instruction`, and tool `input` strings) a reference is written
`{{path}}`. A `node` step without a `prompt` asks the user nothing, so it has no `reply` and a
reference to it is treated as absent. In a branch condition, `ref` is the bare path. Step ids in a reference must exist in the
definition; a reference to a missing step id fails with `unknown_step`. A reference that cannot be resolved at run time is treated as absent: `exists` is false,
and a tool input that needs it fails the step (handled by `on_error`).

## Run outcome

Every run ends in exactly one outcome: a `status` and, unless it completed, a `termination_reason`.
The definition never sets the reason directly; the runtime derives it from what ended the run.
A run ends only when nothing routes it onward: a failure that `on_error` (or `on_rejected`,
`on_expired`) sends to another step does not end the run. Each row below is exclusive of the others.
Reporting the outcome back to the form (the callback) is follow-up work, but the vocabulary is
fixed here so it stays consistent.

| `status` | `termination_reason` | What ended the run |
| --- | --- | --- |
| `completed` | Omitted | An `end` step with `status: completed` |
| `failed` | `end_failed` | An `end` step with `status: failed` |
| `failed` | `tool_error` | A tool call that was found and had its inputs resolved returned a failure without retrying (`max_attempts` of 1, or the failure kind is not in `retry.on`) and `on_error` is `abort` |
| `failed` | `retries_exhausted` | A tool step retried, used every attempt, failed, and `on_error` is `abort` |
| `failed` | `unknown_tool` | A tool step names a tool the chat does not expose (not retried) and `on_error` is `abort` |
| `failed` | `input_unresolved` | A tool input reference had no value and `on_error` is `abort` |
| `failed` | `max_visits_exceeded` | A step ran more than `limits.max_step_visits` times |
| `failed` | `internal_error` | The runtime failed unexpectedly |
| `cancelled` | `end_cancelled` | An `end` step with `status: cancelled` |
| `cancelled` | `user_rejected` | A confirmation was rejected and `on_rejected` is `abort` |
| `cancelled` | `confirmation_expired` | A confirmation expired and `on_expired` is `abort` |
| `cancelled` | `timeout` | The run exceeded `limits.timeout_seconds` |
| `cancelled` | `user_cancelled` | The user cancelled the run. A run with `interaction` `"none"` cannot produce it |
| `cancelled` | `host_stopped` | The app or session stopped the run |

A tool-call timeout is a tool failure (`timeout` in `retry.on`). Only `limits.timeout_seconds`
produces the `cancelled` / `timeout` outcome. If several limits trip together, the earliest
recorded cause wins.

`user_cancelled`, `host_stopped`, and `internal_error` are originated by the runtime or the host,
not by the definition, so no step field produces them.

Values are additive within a major version. A consumer that meets an unknown `termination_reason`
treats it as `unknown` within the same `status`.

## Runtime correlation fields

These fields identify a run and describe what happened in it. The runtime assigns them, except
`workflow_id`, `workflow_version`, and `run_key`, which it copies from the options. Any other field
in this table that appears at the top level of the options fails validation with
`invalid_definition`. The reservation does not apply inside steps, where names such as `tool` and
`status` keep their step meaning.
They travel with the run outcome and with the progress reporting that is still follow-up work, so
that every report about a run can be joined to the same identifiers. Optional fields are omitted
when they have no value.

| Group | Field | Description |
| --- | --- | --- |
| Workflow | `workflow_id`, `workflow_version` | Copied from the options |
| Run | `run_id` | Unique id of this run, assigned when it starts (at most 64 characters) |
| Run | `run_key` | Copied from the options when provided |
| Run | `record_id`, `form_id` | The record that fired `FLOW()` |
| Agent | `agent_id` | The agent that runs the workflow |
| Session | `session_id` | The session that hosts the run. Absent when `interaction` is `"none"` |
| Step | `step_id`, `step_kind` | The step the report refers to |
| Step | `attempt` | Attempt number for the step, starting at 1 |
| Tool | `tool` | Tool id of a tool step |
| Model | `model` | Identifier of the model that served an `instruction`, when one was used |
| Timing | `started_at`, `ended_at` | UTC ISO 8601 timestamps for the run or step |
| Timing | `duration_ms` | Elapsed milliseconds for the run or step |
| Outcome | `status`, `termination_reason` | From the [run outcome](#run-outcome) table |
| Error | `error.code`, `error.message`, `error.step_id` | Set when a step or the run failed. `code` reuses the tool error code or the `termination_reason`; `message` is short and never contains field values or tool output |

Rules:

- `run_id` is unique per run. Two runs with the same `run_key` still have different `run_id`
  values, because `run_key` only decides whether a second run is started.
- `record_id`, `form_id`, `session_id`, `agent_id`, and `model` are identifiers, not content. The
  [privacy](#privacy) rules apply to `error.message`.
- Step fields appear only on step-level reports. Run-level reports omit them.
- Which of these fields are carried by the callback and by progress events is decided in those
  follow-ups; this table fixes their names and meanings.

## Loops and limits

A loop is a `next`, `on_rejected`, `on_error`, or branch target that points to an earlier step.
Each step may run at most `limits.max_step_visits` times in one run. Exceeding it ends the run as `failed` with `max_visits_exceeded`. The whole run stops after `limits.timeout_seconds` and ends as `cancelled` with `timeout`.

## Idempotency

Data events can fire repeatedly. A run is identified by `workflow_id`, `workflow_version`, the
current record, and `run_key` (empty when omitted). Firing `FLOW()` again with the same
identity while that run is active does not start a second run. A different `run_key` starts an
independent run.

## Nested workflows

Not supported in version 1. A step cannot start another workflow and a workflow cannot be
embedded in a step. A definition that tries to do so fails with `invalid_definition`.

## Privacy

- The definition contains author-written text and step wiring only. It must not contain secrets,
  credentials, or user data. User data enters a run only through [references](#references), including the user's `reply` to a `node` step.
- Reference values are handled the way the chat already handles tool inputs and outputs. This
  contract does not add any new place where user content is stored or transmitted.
- Because the definition is embedded in a form's JavaScript, it is visible to anyone who can
  read the form.

## Validation and errors

The options object is validated when `FLOW()` runs, before any step executes. A failure is
reported through the standard data-event error path, with one of these stable codes:

| Code | Meaning |
| --- | --- |
| `flow_disabled` | The plan attribute that enables `FLOW()` is off |
| `unsupported_schema_version` | `schema_version` is not supported |
| `invalid_definition` | A required field is missing, a value has the wrong type or size, a runtime-assigned field is present, or a step that needs the user is used with `interaction` `"none"` |
| `unknown_step` | A `next`, `default`, `on_*`, case target, or reference step id does not exist |
| `unreachable_step` | A step cannot be reached from the first step |
| `duplicate_step_id` | Two steps share an `id` |
| `limit_exceeded` | Step count, size, or an integer limit value is out of range (`timeout_seconds` 0, negative or above 3600; `max_step_visits` above 50) |

Values are additive within a major version. A consumer that meets an unknown code treats it as an
error of the same class.

## Representative payloads

### Pole inspection

A guided flow: a safety confirmation with follow-up, find the pole, fill fields in a loop, capture
a photo with retry, ask for review, save.

```js
FLOW({
  schema_version: 1,
  workflow_id: 'pole-inspection',
  workflow_version: '1',
  title: 'Pole inspection',
  limits: { timeout_seconds: 1800, max_step_visits: 10 },
  steps: [
    { id: 'safety-check', kind: 'confirmation',
      prompt: 'Are you wearing a hard hat and safety glasses?',
      instruction: 'Accept only if the user confirms both items.',
      retry: { max_attempts: 2 },
      on_rejected: 'stop', next: 'search-pole' },

    { id: 'search-pole', kind: 'tool', tool: 'search_records',
      input: { query: '{{form.pole_number}}' },
      on_error: 'stop', next: 'fill-field' },

    { id: 'fill-field', kind: 'node',
      instruction: 'Ask for the next empty inspection field and enter it.',
      next: 'more-fields' },

    { id: 'more-fields', kind: 'branch',
      cases: [{ when: { ref: 'form.remaining_fields', op: 'gt', value: 0 }, next: 'fill-field' }],
      default: 'capture-photo' },

    { id: 'capture-photo', kind: 'tool', tool: 'photo_capture_tool',
      retry: { max_attempts: 3, on: ['timeout', 'tool_error'] },
      on_error: 'stop', next: 'review' },

    { id: 'review', kind: 'confirmation',
      prompt: 'Does everything look correct?',
      on_rejected: 'fill-field', next: 'save' },

    { id: 'save', kind: 'tool', tool: 'record_update_tool',
      input: { record_id: '{{steps.search-pole.output.record_id}}' },
      on_error: 'stop', next: 'done' },

    { id: 'done', kind: 'end', status: 'completed' },
    { id: 'stop', kind: 'end', status: 'failed' }
  ]
});
```

### Minimal

```js
FLOW({
  schema_version: 1,
  workflow_id: 'say-hello',
  workflow_version: '1',
  steps: [
    { id: 'hello', kind: 'node', prompt: 'Hello. Ready to start?', next: 'done' },
    { id: 'done', kind: 'end', status: 'completed' }
  ]
});
```

### Invalid payloads

| Payload | Error |
| --- | --- |
| `schema_version: 2` | `unsupported_schema_version` |
| A step with `next: 'missing'` | `unknown_step` |
| Two steps with `id: 'save'` | `duplicate_step_id` |
| A step that cannot be reached from the first step | `unreachable_step` |
| 51 steps | `limit_exceeded` |
| A `tool` step with no `tool` | `invalid_definition` |

## Cross-platform acceptance criteria

The [representative payloads](#representative-payloads) are the shared fixtures. Every platform
that implements `FLOW()` must pass the same checks, so a form behaves the same on each.

Conformance criteria, for every platform:

1. Each valid payload (pole inspection and minimal) is accepted and produces the same step graph.
2. Each invalid payload returns the same error code from the [validation table](#validation-and-errors).
3. Optional fields are omitted, and an explicit `null` is treated as absent.
4. The limits (50 steps, 32 KB, `max_step_visits`, `timeout_seconds`) are enforced with the same codes.
5. A runtime-assigned field in the options fails with `invalid_definition`.
6. Every run ends with exactly one outcome from the [run outcome](#run-outcome) table.
7. A payload with an unsupported major `schema_version` returns `unsupported_schema_version`.

| Platform | Acceptance criteria beyond conformance | Status |
| --- | --- | --- |
| KMP (shared) | Schema parser and validator pass the conformance checks with no platform code; the fixtures ship as shared test resources. | Backlog item 1 |
| Android | `FLOW()` is registered as an `Invocation` gated by the plan attribute and returns `flow_disabled` when off; validation runs off the main thread; the runtime replaces the `execute_workflow` stub; the run starts at once, in the chat or, with `interaction: "none"`, with no chat UI. | Backlog items 2, 3, 4 |
| iOS | The same `FLOW()` function name and options pass the conformance checks using the shared validator; the run is hosted by the iOS chat. | Blocked until iOS has a chat surface (`interaction: "none"` does not need one) |
| Web | The same `FLOW()` function name and options pass the conformance checks using the shared validator; the run is hosted by the Web chat. | Blocked until Web has a chat surface (`interaction: "none"` does not need one) |

Blocked platforms keep these criteria so that they can be scheduled without redefining the contract.

## Ticket scope mapping

| Ticket scope item | How this contract handles it |
| --- | --- |
| Event name and versioned schema | `FLOW`, `schema_version`, compatibility rules |
| Identification, start | `workflow_id`, `workflow_version`, the first step in `steps`, `interaction` |
| Step/node transitions | `steps` graph, `next`, `branch`, loops with `max_step_visits` |
| Tool interactions | `tool` steps, `input`, `steps.<id>.output`, and the user's `reply` from `node` steps |
| Confirmations | `confirmation` steps and bounded outcomes |
| Retries | `retry` on tool and confirmation steps |
| Completion, failure, cancellation, termination reasons | `end` step, `abort`, and the [run outcome](#run-outcome) table; delivering it to the form is follow-up |
| Nested workflows | Not supported in version 1 |
| Idempotency | `run_key` |
| Privacy, cardinality | Privacy section, size and count limits |
| Ordering, sampling | Not applicable to the input; they belong to progress reporting (follow-up) |
| Correlation fields (workflow, agent, session, run, step, tool, model, timing, outcome, error) | [Runtime correlation fields](#runtime-correlation-fields); assigned by the runtime, delivered by the callback and progress follow-up |
| Representative payloads and acceptance criteria across KMP, Android, iOS, and Web | [Representative payloads](#representative-payloads) and [cross-platform acceptance criteria](#cross-platform-acceptance-criteria) |

## Out of scope

- Delivering the run outcome to the form through the callback, and progress reporting (step-level
  events). A previous draft of this page described an event
  log for that purpose; it can return as a separate contract.
- The runtime that executes a definition. On Android, `execute_workflow` is currently a stub that
  always returns `workflow_execution_unavailable`.
- iOS and Web implementation, which is blocked until those platforms have a chat surface.
- Creating Jira tickets or changing any client code.

## Evidence and starter backlog

Existing evidence includes:

- [FLCRM-21818](https://fulcrumapp.atlassian.net/browse/FLCRM-21818): shared agent session
  contract.
- [FLCRM-21821](https://fulcrumapp.atlassian.net/browse/FLCRM-21821): Android unified agent
  session integration.
- [FLCRM-21822](https://fulcrumapp.atlassian.net/browse/FLCRM-21822): workflow runtime contract.
- [FLCRM-21808](https://fulcrumapp.atlassian.net/browse/FLCRM-21808) and
  [FLCRM-21820](https://fulcrumapp.atlassian.net/browse/FLCRM-21820): Android lifecycle and
  host-boundary constraints.
- Data event pattern: `app/src/main/java/com/spatialnetworks/fulcrum/model/javascript/expression/invocations/`
  (`Invocation.kt`, `Inference.kt`, `LoadForm.kt`, `LoadRecords.kt`), including the plan-attribute
  gate and the data-event-disabled error in `Inference.kt`.
- Android discovery evidence in
  `app/src/main/java/com/spatialnetworks/fulcrum/app/chat/LocalWorkflowDiscoveryAdapter.kt`.

Follow-up implementation backlog, in dependency order. This page does not create Jira tickets.

| # | Item | Owner | Depends on | Acceptance criteria |
| --- | --- | --- | --- | --- |
| 1 | **Shared schema and validator:** parse and validate the options object and produce the error codes above (evidence: FLCRM-21818, FLCRM-21822) | Cross-platform owners (KMP) | None | Valid payloads parse; every invalid-payload case above returns its code; limits and reference checks are enforced. |
| 2 | **Android `FLOW()` invocation:** an `Invocation` subclass gated by a plan attribute (proposed name `DataEventFlowEnabled`), using the shared validator (evidence: `Inference.kt`) | Android | 1 | The function is registered in the expression engine; a disabled plan returns `flow_disabled`; validation errors use the standard data-event error path; runs off the main thread. |
| 3 | **Workflow runtime:** execute a validated definition through the chat and tools, replacing the `execute_workflow` stub (evidence: FLCRM-21822, FLCRM-21818) | KMP, Android | 1 | Graph traversal, retries, confirmations, references, loops with `max_step_visits`, timeout, and idempotency by `run_key` behave as specified; every run ends with one outcome from the run outcome table. |
| 4 | **Chat start surface:** run the flow in the chat and show the confirmation prompts, including a first-step confirmation that asks the user whether to run (evidence: FLCRM-21821) | Android | 2, 3 | The run starts at once; a first-step `confirmation` asks the user, and with `on_rejected: abort` a rejection ends the run as `cancelled` (`user_rejected`). |
| 4a | **Headless host:** run a definition with `interaction: "none"` with no chat UI and report the outcome | Android | 2, 3 | A valid headless definition runs to one outcome; a definition that needs the user fails with `invalid_definition`. |
| 5 | **Validation tests and authoring docs:** tests for every rule above and a form-author guide (evidence: `Inference.kt` and its tests) | QA, docs | 1, 2, 3 | Each rule and error code has an automated test; the guide has the pole-inspection example. |
| 6 | **Deferred:** callback delivery of the run outcome, and progress reporting; iOS and Web; nested workflows | Product, KMP, iOS, Web | 3 | Create as separate tickets when scheduled. iOS and Web are blocked until those platforms have a chat surface. |

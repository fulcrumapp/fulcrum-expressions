# Workflow data event contract

This document defines the input of the `FLOW()` data event: the options object a form's
JavaScript passes to create a flow. The host runs it, in the chat or with no interface. It is platform-neutral and is
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
  flow_id: 'pole-inspection',
  nodes: [ /* see below */ ]
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
| `flow_id` | No | Identifier of the flow, copied into reports. Lowercase letters, digits, and `-`; at most 64 characters. |
| `interaction` | No | `"chat"` (default) or `"none"`. The run always starts as soon as the data event fires. `"chat"` runs it in the chat. `"none"` runs it with no user interface, so an `agentic` node with a `prompt` is invalid (`invalid_definition`). To ask the user whether to run the flow, make the first node an `agentic` node with a `prompt`. Any other value fails with `invalid_definition` |
| `nodes` | Yes | Array of 1 to 50 [nodes](#nodes) |

There are no flow-level limits. Time and call limits are set on each node (see
[Loops and limits](#loops-and-limits)). The whole options object must serialize to at most 32 KB.
The definition is embedded in the call; it is not referenced by id from a stored definition in
version 1.

## Nodes

Every node has an `id` (unique in the flow, `^[a-z][a-z0-9-]*$`, at most 64 characters, and not
`end` or `abort`) and a `kind`. Nodes form a directed graph. Which node runs next is always named
explicitly, so a definition can branch and loop.

| `kind` | Purpose | Fields |
| --- | --- | --- |
| `agentic` | The LLM does the work, and can talk to the user (`chat` only) | `instruction`; optional `prompt`; optional `model`; optional `output`; optional `timeout_seconds`, `max_calls`; optional `on_error`; `next` |
| `tool` | Call a tool the chat exposes | `tool` (tool id); optional `input`; optional `retry`; optional `timeout_seconds`, `max_calls`; optional `on_error`; `next` |
| `decision` | Choose the next node from data | `cases` (array of `{ when, next }`); `default`; optional `max_calls` |

Shared rules:

- `next`, `on_error`, `default`, and each case's `next` name a node `id` or one of two reserved
  targets. `end` finishes the flow as `completed`. `abort` ends it as `failed` without running
  further nodes (see [Run outcome](#run-outcome)). `next` may be omitted on `agentic` and `tool`
  nodes, which means `end`. `on_error` defaults to `abort`. `default` on a `decision` is required.
- The run starts at the first node in `nodes`. Every node must be reachable from it, and every
  referenced `id` must exist. Later nodes may loop back to the first node.
- `prompt` is fixed text written by the form author and shown to the user, at most 500 characters.
- `instruction` is a short direction for the LLM, at most 500 characters.
- Every node returns a structured response, described under [State](#state).

### Agentic nodes

- `instruction` is required. The LLM follows it, using the chat's tools and the user's replies.
- `prompt` is optional. When present, the chat shows it to the user and lets the LLM use
  `instruction` to interpret the reply. With `interaction` `"none"` a `prompt` is invalid.
- `model` is optional. It is the `name` of a model in the model reference file (the model catalog).
  An empty or absent value uses `fulcrumite-2b`. A name that is not in the reference file fails
  the node with the code `unknown_model` and follows `on_error`; it is not retried.
- `output` is optional. It declares the keys the node returns: an object of
  `{ "<key>": "string" | "number" | "boolean" }`, at most 20 keys. The LLM must answer with an
  object that has those keys and types. When `output` is omitted, the node returns
  `{ "reply": "<text of the LLM's final answer>" }`. A response that does not match `output` fails
  the node with `invalid_output` (not retried) and follows `on_error`.
- Because an `agentic` node is also how a flow asks a question, a confirmation is an agentic node
  with `output: { "confirmed": "boolean" }` followed by a `decision`. The chat decides whether the
  answer is complete and asks for what is missing instead of repeating the whole question. The
  author does not write the follow-up questions.

### Tool nodes

- `tool` is any tool id the chat exposes, including tools added in the future. It is not restricted
  to a fixed list. An unknown tool id is not rejected when the definition is validated, because the
  available tools depend on the device and plan. When the node runs, it fails without retrying
  and follows `on_error`.
- `input` is an object of tool arguments. String values may contain [references](#references).
- The tool's result is the node's structured response. A result that is not an object is returned
  as `{ "result": <value> }`.
- `retry` is `{ "max_attempts": n, "on": [...] }`. `max_attempts` is 1 to 5 and counts the first
  attempt; default `1` (no retry). `on` lists the failure kinds that retry: `tool_error`,
  `timeout`. Default is both. When attempts are exhausted the node fails and control moves to
  `on_error`.

### Decision nodes

Each case is `{ "when": { ... }, "next": "<id>" }`. Cases are tested in order and the first match
wins. If none match, control moves to `default`.

A condition is `{ "ref": "<path>", "op": "<op>", "value": <literal> }`.

| `op` | Meaning |
| --- | --- |
| `eq`, `ne` | Equal, not equal |
| `gt`, `gte`, `lt`, `lte` | Numeric comparison |
| `in` | `ref` value is one of the array `value` |
| `exists`, `not_exists` | `ref` resolves to a value (no `value` field) |

Conditions are data, not JavaScript. `ref` is a bare [reference](#references) path.

## State

A run has one global state: a JSON object that starts empty. Each node returns a structured
response, and the runtime merges it into the state at the top level when the node finishes:

- A key that is not in the state is added.
- A key that is already in the state is overridden by the new value. The last node to write a key
  wins, and this is how a loop updates a value.
- A node that fails does not change the state.
- Keys are not removed in version 1.

The state is the only way data moves between nodes. A node reads it through
[references](#references) and a `decision` reads it in a condition. The state is kept in memory
for the run and is not part of the definition.

## References

A reference reads data from outside the node:

| Path | Resolves to |
| --- | --- |
| `form.<field_data_name>` | Current value of a field in the record being edited |
| `state.<key>` | A key of the global [state](#state) |

In string values (`prompt`, `instruction`, and tool `input` strings) a reference is written
`{{path}}`. In a decision condition, `ref` is the bare path. A reference that cannot be resolved
at run time is treated as absent: `exists` is false, and a tool input that needs it fails the node
(handled by `on_error`). A `state.<key>` reference is not checked when the definition is
validated, because keys are created by nodes at run time.

## Run outcome

Every run ends in exactly one outcome: a `status` and, unless it completed, a `termination_reason`.
The definition never sets the reason directly; the runtime derives it from what ended the run.
A run ends only when nothing routes it onward: a failure that `on_error` sends to another node
does not end the run. Each row below is exclusive of the others. Reporting the outcome back to the
form (the callback) is follow-up work, but the vocabulary is fixed here so it stays consistent.

| `status` | `termination_reason` | What ended the run |
| --- | --- | --- |
| `completed` | Omitted | A node routed to `end`, or a node without `next` finished |
| `failed` | `tool_error` | A tool call that was found and had its inputs resolved returned a failure without retrying (`max_attempts` of 1, or the failure kind is not in `retry.on`) and `on_error` is `abort` |
| `failed` | `retries_exhausted` | A tool node retried, used every attempt, failed, and `on_error` is `abort` |
| `failed` | `unknown_tool` | A tool node names a tool the chat does not expose (not retried) and `on_error` is `abort` |
| `failed` | `unknown_model` | An agentic node names a model that is not in the reference file and `on_error` is `abort` |
| `failed` | `invalid_output` | An agentic node's response did not match its `output` and `on_error` is `abort` |
| `failed` | `input_unresolved` | A tool input reference had no value and `on_error` is `abort` |
| `failed` | `node_timeout` | A node ran longer than its `timeout_seconds` and `on_error` is `abort` |
| `failed` | `max_calls_exceeded` | A node was about to run more than its `max_calls` times |
| `failed` | `aborted` | A node routed to `abort` |
| `failed` | `internal_error` | The runtime failed unexpectedly |
| `cancelled` | `user_cancelled` | The user cancelled the run. A run with `interaction` `"none"` cannot produce it |
| `cancelled` | `host_stopped` | The app or session stopped the run |

A tool-call timeout is a node failure (`timeout` in `retry.on`). If several causes trip together,
the earliest recorded cause wins.

`user_cancelled`, `host_stopped`, and `internal_error` are originated by the runtime or the host,
not by the definition, so no node field produces them.

Values are additive within a major version. A consumer that meets an unknown `termination_reason`
treats it as `unknown` within the same `status`.

## Runtime correlation fields

These fields identify a run and describe what happened in it. The runtime assigns them, except
`flow_id`, which it copies from the options. Any other field in this table that appears at the top
level of the options fails validation with `invalid_definition`. The reservation does not apply
inside nodes, where names such as `tool` and `model` keep their node meaning.
They travel with the run outcome and with the progress reporting that is still follow-up work, so
that every report about a run can be joined to the same identifiers. Optional fields are omitted
when they have no value.

| Group | Field | Description |
| --- | --- | --- |
| Flow | `flow_id` | Copied from the options when provided |
| Run | `run_id` | Unique id of this run, assigned when it starts (at most 64 characters) |
| Run | `record_id`, `form_id` | The record that fired `FLOW()` |
| Agent | `agent_id` | The agent that runs the flow |
| Session | `session_id` | The session that hosts the run. Absent when `interaction` is `"none"` |
| Node | `node_id`, `node_kind` | The node the report refers to |
| Node | `attempt` | Attempt number for the node, starting at 1 |
| Tool | `tool` | Tool id of a tool node |
| Model | `model` | Name of the model that served an agentic node, including the default when it was used |
| Timing | `started_at`, `ended_at` | UTC ISO 8601 timestamps for the run or node |
| Timing | `duration_ms` | Elapsed milliseconds for the run or node |
| Outcome | `status`, `termination_reason` | From the [run outcome](#run-outcome) table |
| Error | `error.code`, `error.message`, `error.node_id` | Set when a node or the run failed. `code` reuses the tool error code or the `termination_reason`; `message` is short and never contains field values or tool output |

Rules:

- `record_id`, `form_id`, `session_id`, `agent_id`, and `model` are identifiers, not content. The
  [privacy](#privacy) rules apply to `error.message`.
- Node fields appear only on node-level reports. Run-level reports omit them.
- Which of these fields are carried by the callback and by progress events is decided in those
  follow-ups; this table fixes their names and meanings.

## Loops and limits

A loop is a `next`, `on_error`, or decision target that points to an earlier node. Limits apply to
each node, not to the whole flow:

| Field | Applies to | Description |
| --- | --- | --- |
| `timeout_seconds` | `agentic`, `tool` | Integer 1 to 3600, default 300. A node that runs longer fails with `timeout` and follows `on_error` (a `tool` node can retry it). |
| `max_calls` | All kinds | Integer 1 to 50, default 10. The most times this node may run in one run. A node about to run more often ends the run as `failed` with `max_calls_exceeded`. |

A non-integer or non-numeric value fails with `invalid_definition`; an integer outside the range
fails with `limit_exceeded`. There is no limit on the total run time.

## Runs are queued

The runtime queues runs internally. The author does not provide an idempotency key and does not
manage duplicate fires. How the queue orders runs and treats a repeated fire is a runtime concern
(see backlog item 3), and the definition has no field for it.

## Nested flows

Not supported in version 1. A node cannot start another flow and a flow cannot be embedded in a
node. A definition that tries to do so fails with `invalid_definition`.

## Privacy

- The definition contains author-written text and node wiring only. It must not contain secrets,
  credentials, or user data. User data enters a run only through [references](#references), including the structured responses the user's replies produce in an `agentic` node.
- Reference values are handled the way the chat already handles tool inputs and outputs. This
  contract does not add any new place where user content is stored or transmitted.
- Because the definition is embedded in a form's JavaScript, it is visible to anyone who can
  read the form.

## Validation and errors

The options object is validated when `FLOW()` runs, before any node executes. A failure is
reported through the standard data-event error path, with one of these stable codes:

| Code | Meaning |
| --- | --- |
| `flow_disabled` | The plan attribute that enables `FLOW()` is off |
| `unsupported_schema_version` | `schema_version` is not supported |
| `invalid_definition` | A required field is missing, a value has the wrong type or size, a runtime-assigned field is present, an `output` declaration is malformed, or a node that needs the user is used with `interaction` `"none"` |
| `unknown_node` | A `next`, `default`, `on_error`, or case target does not exist |
| `unreachable_node` | A node cannot be reached from the first node |
| `duplicate_node_id` | Two nodes share an `id` |
| `limit_exceeded` | Node count, size, or an integer limit value is out of range (`timeout_seconds` 0, negative or above 3600; `max_calls` above 50) |

Values are additive within a major version. A consumer that meets an unknown code treats it as an
error of the same class.

## Representative payloads

### Pole inspection

A guided flow: a safety confirmation, find the pole, fill fields in a loop, capture a photo with
retry, ask for review, save. Each node's structured response is merged into the global state.

```js
FLOW({
  schema_version: 1,
  flow_id: 'pole-inspection',
  nodes: [
    { id: 'safety-check', kind: 'agentic',
      prompt: 'Are you wearing a hard hat and safety glasses?',
      instruction: 'Set confirmed to true only if the user confirms both items.',
      output: { confirmed: 'boolean' },
      max_calls: 3,
      on_error: 'abort', next: 'safety-decision' },

    { id: 'safety-decision', kind: 'decision',
      cases: [{ when: { ref: 'state.confirmed', op: 'eq', value: true }, next: 'search-pole' }],
      default: 'abort' },

    { id: 'search-pole', kind: 'tool', tool: 'search_records',
      input: { query: '{{form.pole_number}}' },
      next: 'fill-field' },

    { id: 'fill-field', kind: 'agentic',
      instruction: 'Ask for the next empty inspection field and enter it.',
      output: { remaining_fields: 'number' },
      model: 'fulcrumite-2b',
      next: 'more-fields' },

    { id: 'more-fields', kind: 'decision',
      cases: [{ when: { ref: 'state.remaining_fields', op: 'gt', value: 0 }, next: 'fill-field' }],
      default: 'capture-photo' },

    { id: 'capture-photo', kind: 'tool', tool: 'photo_capture_tool',
      retry: { max_attempts: 3, on: ['timeout', 'tool_error'] },
      timeout_seconds: 120,
      next: 'review' },

    { id: 'review', kind: 'agentic',
      prompt: 'Does everything look correct?',
      instruction: 'Set approved to true if the user accepts.',
      output: { approved: 'boolean' },
      next: 'review-decision' },

    { id: 'review-decision', kind: 'decision',
      cases: [{ when: { ref: 'state.approved', op: 'eq', value: true }, next: 'save' }],
      default: 'fill-field' },

    { id: 'save', kind: 'tool', tool: 'record_update_tool',
      input: { record_id: '{{state.record_id}}' } }
  ]
});
```

### Minimal

```js
FLOW({
  schema_version: 1,
  nodes: [
    { id: 'hello', kind: 'agentic', prompt: 'Hello. Ready to start?', instruction: 'Greet the user.' }
  ]
});
```

### Invalid payloads

| Payload | Error |
| --- | --- |
| `schema_version: 2` | `unsupported_schema_version` |
| A node with `next: 'missing'` | `unknown_node` |
| Two nodes with `id: 'save'` | `duplicate_node_id` |
| A node that cannot be reached from the first node | `unreachable_node` |
| 51 nodes | `limit_exceeded` |
| A `tool` node with no `tool` | `invalid_definition` |
| An `agentic` node with no `instruction` | `invalid_definition` |
| A node `kind` of `confirmation`, `branch`, or `end` | `invalid_definition` |

## Cross-platform acceptance criteria

The [representative payloads](#representative-payloads) are the shared fixtures. Every platform
that implements `FLOW()` must pass the same checks, so a form behaves the same on each.

Conformance criteria, for every platform:

1. Each valid payload (pole inspection and minimal) is accepted and produces the same node graph.
2. Each invalid payload returns the same error code from the [validation table](#validation-and-errors).
3. Optional fields are omitted, and an explicit `null` is treated as absent.
4. The limits (50 nodes, 32 KB, `max_calls`, `timeout_seconds`) are enforced with the same codes.
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
| Identification, start | `flow_id`, the first node in `nodes`, `interaction` |
| Step/node transitions | `nodes` graph, `next`, `decision`, loops with `max_calls` |
| Tool interactions | `tool` nodes, `input`, and the global `state` |
| Confirmations | An `agentic` node with a boolean `output`, then a `decision` |
| Retries | `retry` on tool nodes |
| Completion, failure, cancellation, termination reasons | `end` and `abort` targets, and the [run outcome](#run-outcome) table; delivering it to the form is follow-up |
| Nested workflows | Not supported in version 1 |
| Idempotency | Not in the definition; the runtime queues runs internally |
| Privacy, cardinality | Privacy section, size and count limits |
| Ordering, sampling | Not applicable to the input; they belong to progress reporting (follow-up) |
| Correlation fields (flow, agent, session, run, node, tool, model, timing, outcome, error) | [Runtime correlation fields](#runtime-correlation-fields); assigned by the runtime, delivered by the callback and progress follow-up |
| Representative payloads and acceptance criteria across KMP, Android, iOS, and Web | [Representative payloads](#representative-payloads) and [cross-platform acceptance criteria](#cross-platform-acceptance-criteria) |

## Out of scope

- Delivering the run outcome to the form through the callback, and progress reporting (node-level
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
| 3 | **Flow runtime:** execute a validated definition through the chat and tools, replacing the `execute_workflow` stub (evidence: FLCRM-21822, FLCRM-21818) | KMP, Android | 1 | Graph traversal, retries, agentic model selection (default `fulcrumite-2b`), structured responses merged into the global state, references, per-node `max_calls` and `timeout_seconds`, and the internal run queue behave as specified; every run ends with one outcome from the run outcome table. |
| 4 | **Chat start surface:** run the flow in the chat and show `agentic` node prompts, including a first-node prompt that asks the user whether to run (evidence: FLCRM-21821) | Android | 2, 3 | The run starts at once; a first `agentic` node with a boolean `output` followed by a `decision` that routes to `abort` ends the run as `failed` (`aborted`) when the user declines. |
| 4a | **Headless host:** run a definition with `interaction: "none"` with no chat UI and report the outcome | Android | 2, 3 | A valid headless definition runs to one outcome; a definition that needs the user fails with `invalid_definition`. |
| 5 | **Validation tests and authoring docs:** tests for every rule above and a form-author guide (evidence: `Inference.kt` and its tests) | QA, docs | 1, 2, 3 | Each rule and error code has an automated test; the guide has the pole-inspection example. |
| 6 | **Deferred:** callback delivery of the run outcome, and progress reporting; iOS and Web; nested workflows | Product, KMP, iOS, Web | 3 | Create as separate tickets when scheduled. iOS and Web are blocked until those platforms have a chat surface. |

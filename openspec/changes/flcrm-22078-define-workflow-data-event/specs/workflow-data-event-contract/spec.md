## ADDED Requirements

### Requirement: Versioned FLOW options contract
The contract SHALL define the `FLOW()` data event options object with `schema_version`, `nodes`,
and the optional `flow_id`, SHALL use `snake_case` keys, and SHALL state
compatibility rules: adding an optional field is compatible within a major version, while removing
or renaming a field, or changing its meaning or type, requires a new major version. It SHALL NOT
define a workflow version, title, idempotency key, or flow-level limits.

#### Scenario: A consumer receives a supported payload
- **WHEN** a form calls `FLOW()` with a supported `schema_version`
- **THEN** the payload is accepted for validation
- **AND** unknown optional fields are ignored, except the reserved runtime-assigned names, which fail with `invalid_definition`
- **AND** optional fields that do not apply are omitted.

#### Scenario: A consumer receives an unsupported version
- **WHEN** `schema_version` is not supported
- **THEN** the call fails with `unsupported_schema_version`.

#### Scenario: A flow runs
- **WHEN** a valid definition is passed
- **THEN** the run starts as soon as the data event fires, always headless with no chat
- **AND** an `agentic` node asks the user through the `ask_user` tool only when its `interactive` is `true`
- **AND** to ask the user first, the definition makes its first node an `interactive` `agentic` node
- **AND** an `interaction` field is not part of the contract and fails with `invalid_definition`.

### Requirement: Node kinds and transitions
The contract SHALL rename steps to nodes and define exactly four node kinds: `agentic` (uses the
LLM), `function` (deterministic: calls a tool the chat exposes, or runs the built-in `js` function), and `decision` (chooses the next node from data). A node of any other
kind, such as `confirmation`, `branch`, or `end`, SHALL fail with `invalid_definition`.

A run SHALL begin at the first node in `nodes`. `next`, `on_error`, `default`, and case targets
SHALL accept a node id or the reserved targets `end` (completes the flow) and `abort` (fails it).
`next` MAY be omitted on `agentic` and `function` nodes, meaning `end`. `on_error` SHALL default to
`abort`. A `decision` SHALL test its cases in order, use the first match, and require a `default`.

#### Scenario: A decision matches no case
- **WHEN** no case of a `decision` node matches
- **THEN** control moves to its `default` target.

#### Scenario: A failure is routed onward
- **WHEN** a node fails and `on_error` names a node
- **THEN** the run continues at that node and does not end
- **AND** when `on_error` is `abort` or omitted the run ends with the outcome in the run outcome table.

#### Scenario: A flow loops
- **WHEN** a `decision` case or `next` targets an earlier node
- **THEN** the flow loops
- **AND** each node runs at most its `max_calls` times.

### Requirement: Agentic nodes and models
The contract SHALL define the `agentic` node with a required `instruction`, an optional boolean `interactive` (default `false`),
an optional `model`, and an optional `output` declaration. `model` SHALL be the `name` of a model
in the model reference file, SHALL be optional, and SHALL default to `fulcrumite-2b` when empty or
absent. A model name that is not in the reference file SHALL fail the node with `unknown_model`
without retrying.

#### Scenario: An agentic node has no model
- **WHEN** `model` is empty or absent
- **THEN** the node uses `fulcrumite-2b`.

#### Scenario: An agentic node names an unknown model
- **WHEN** `model` is not a name in the model reference file
- **THEN** the node fails with `unknown_model` and follows `on_error`.

#### Scenario: A confirmation is expressed with an agentic node
- **WHEN** a flow needs a yes or no answer
- **THEN** an `agentic` node declares `output: { "confirmed": "boolean" }`
- **AND** a following `decision` routes on `state.confirmed`.

### Requirement: Function nodes and retries
The contract SHALL allow a `function` node to name any tool the chat exposes, or the built-in `js`, and SHALL define
`retry.max_attempts` (1 to 5, counting the first attempt, default 1) and `retry.on` (`tool_error`,
`timeout`, default both) on function nodes.

#### Scenario: A function node names an unknown tool
- **WHEN** a `function` node names a tool id the chat does not expose
- **THEN** the definition still passes validation
- **AND** when the node runs it fails without retrying and follows `on_error`.

#### Scenario: A tool fails and is retried
- **WHEN** a function node fails with a retryable kind and attempts remain
- **THEN** the node runs again
- **AND** when attempts are exhausted control moves to `on_error`.

### Requirement: The `js` function
The built-in `js` function SHALL run `input.expression` (JavaScript of at most 4096 characters, an expression or an async function body) in the
`FLOW()` expression engine with read-only `form` and `state` variables and a `tools` object whose calls (for example `search_records` or `take_photo`) count toward `max_calls` and `timeout_seconds`, with no network access. A failed tool call SHALL fail the node with `tool_error`. The wire format SHALL stay a string; authors write a callback in `input.run` (the preferred form), which the expression engine converts with `toString()` into `input.expression`. It SHALL return a plain object that is merged into the state. The validator SHALL
check only that `input.expression` is a non-empty string within the limit.

#### Scenario: A `js` function returns an object
- **WHEN** the expression evaluates to an object
- **THEN** the object is merged into the state and the node's `next` runs.

#### Scenario: A `js` function fails
- **WHEN** the expression throws or has a syntax error
- **THEN** the node fails with `tool_error` without retrying and follows `on_error`
- **AND** when it returns a value that is not an object the node fails with `invalid_output`.

### Requirement: Structured responses and global state
The contract SHALL require every node to return a structured response and SHALL define a single
global state, a JSON object that starts empty. When a node finishes, the runtime SHALL merge its
response into the state at the top level: a new key is added and an existing key is overridden.
A failed node SHALL NOT change the state. An `agentic` node SHALL return the keys declared in
`output`, or `{ "reply": <text> }` when `output` is omitted. A `function` node SHALL return its result,
wrapping a non-object result as `{ "result": <value> }`.

#### Scenario: A node writes a new key
- **WHEN** a node returns a key that is not in the state
- **THEN** the key is added to the state.

#### Scenario: A node writes an existing key
- **WHEN** a later node returns a key already in the state
- **THEN** the new value overrides the old one.

#### Scenario: An agentic response does not match its output
- **WHEN** an `agentic` node's response lacks a declared key or has the wrong type
- **THEN** the node fails with `invalid_output` without retrying, follows `on_error`, and the state is unchanged.

### Requirement: References and conditions
The contract SHALL define references `form.<field>` and `state.<key>`, SHALL write references in
strings as `{{path}}`, and SHALL define decision conditions as structured `{ ref, op, value }`
objects with a bare path, using the operators `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`,
`exists`, and `not_exists`, rather than JavaScript.

#### Scenario: A later node uses state
- **WHEN** a `function` input references `{{state.<key>}}` and an earlier node wrote that key
- **THEN** the value is used as the input value.

#### Scenario: A reference cannot be resolved
- **WHEN** a reference has no value at run time
- **THEN** `exists` is false
- **AND** a tool input that needs it fails the node.

### Requirement: Per-node limits
The contract SHALL define limits on each node and no limits on the whole flow. `timeout_seconds`
(`agentic` and `tool`) SHALL be an integer 1 to 3600 with default 300, and `max_calls` (all kinds)
SHALL be an integer 1 to 50 with default 10. A non-integer value SHALL fail with
`invalid_definition` and an out-of-range integer with `limit_exceeded`.

#### Scenario: A node runs too long
- **WHEN** a node runs longer than its `timeout_seconds`
- **THEN** it fails with `timeout` and follows `on_error`
- **AND** when `on_error` is `abort` the run ends as `failed` with `node_timeout`.

#### Scenario: A node is called too often
- **WHEN** a node is about to run more than its `max_calls` times
- **THEN** the run ends as `failed` with `max_calls_exceeded`.

### Requirement: Run outcome
The contract SHALL define the run outcome as a `status` of `completed`, `failed`, or `cancelled`
and a stable `termination_reason` vocabulary, and SHALL map each way a run can end to exactly one
outcome.

#### Scenario: A tool fails with no retries left
- **WHEN** a function node fails, its attempts are exhausted, and `on_error` is `abort`
- **THEN** the run ends as `failed` with `retries_exhausted` when the node retried and used every attempt
- **AND** with `tool_error` when the tool call itself failed without retrying
- **AND** `unknown_tool` and `input_unresolved` take precedence over `tool_error`.

#### Scenario: A flow is aborted
- **WHEN** a node routes to `abort`
- **THEN** the run ends as `failed` with `aborted`.

#### Scenario: A flow completes
- **WHEN** a node routes to `end`, or a node without `next` finishes
- **THEN** the run ends as `completed`.

#### Scenario: A consumer meets an unknown termination reason
- **WHEN** a consumer receives a `termination_reason` it does not know
- **THEN** it treats it as `unknown` within the same `status`.

### Requirement: Runtime correlation fields
The contract SHALL define the correlation fields for flow, run, agent, session, node, tool, model,
timing, outcome, and error. It SHALL distinguish `flow_id`, which the definition supplies and the
runtime copies into reports, from the remaining fields, which the runtime assigns. It SHALL state
that a definition cannot set a runtime-assigned field.

#### Scenario: A definition supplies a correlation field
- **WHEN** the options contain a runtime-assigned field such as `run_id`
- **THEN** validation fails with `invalid_definition`
- **AND** `flow_id` remains a valid option.

### Requirement: Internal run queue and nesting
The contract SHALL state that the runtime queues runs internally, that the definition has no
idempotency key, and that nested flows are not supported in version 1 and fail with
`invalid_definition`.

#### Scenario: The data event fires twice
- **WHEN** `FLOW()` fires again
- **THEN** the runtime handles the repeat through its internal queue
- **AND** the author supplies no key.

#### Scenario: A definition tries to nest a flow
- **WHEN** a node tries to start or embed another flow
- **THEN** validation fails with `invalid_definition`.

### Requirement: Validation and errors
The contract SHALL define stable error codes for a disabled plan, an unsupported version, an
invalid definition, unknown or unreachable nodes, duplicate node ids, and exceeded limits, and
SHALL state the size and count values: 1 to 50 nodes and 32 KB. A consumer that meets an unknown
code SHALL treat it as an error of the same class.

#### Scenario: A payload exceeds a limit
- **WHEN** a definition has more than 50 nodes, serializes to more than 32 KB, or sets a per-node limit outside its range
- **THEN** the call fails with `limit_exceeded`.

#### Scenario: A node cannot be reached or an id repeats
- **WHEN** a node cannot be reached from the first node
- **THEN** the call fails with `unreachable_node`
- **AND** when two nodes share an `id` it fails with `duplicate_node_id`.

#### Scenario: A payload references a missing node
- **WHEN** a `next` value names a node that does not exist
- **THEN** the call fails with `unknown_node` before any node runs.

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

#### Scenario: A platform has no runtime yet
- **WHEN** iOS or Web has no `ask_user` tool or flow runtime
- **THEN** its criteria are still listed and it is marked blocked.

### Requirement: Evidence and implementation backlog
The contract SHALL link existing tickets and code as evidence and SHALL provide a
dependency-ordered backlog with owners and acceptance criteria and, where it exists, evidence, marking the result callback,
progress reporting, iOS and Web, and nested flows as deferred.

#### Scenario: A platform team starts implementation
- **WHEN** a team reads the backlog
- **THEN** each item lists its dependencies and acceptance criteria
- **AND** lists its evidence where existing tickets or code apply.

### Requirement: Documentation-only scope
The change SHALL NOT add production code, dependencies, or orchestration changes.

#### Scenario: The change is reviewed
- **WHEN** the change is validated
- **THEN** only documentation and OpenSpec files differ from the base branch.

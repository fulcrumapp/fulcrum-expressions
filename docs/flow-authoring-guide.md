# FLOW() form-author guide

This guide is for someone writing `FLOW()` in a form's JavaScript. It shows how to
author a flow. It is not a second copy of the rules.

The normative options contract is
[workflow-data-event-contract.md](workflow-data-event-contract.md). Limits, error
codes, and field meanings live there. Change a rule in that contract, then in the
shared KMP validator that enforces it. Do not add the same checks to the expression
engine.

`FLOW()` is registered in this repository. It converts a `js` callback into the
wire string and sends the options object. It does not validate the definition.

## One validator

When `FLOW()` runs, the host validates the options object once, before any node
executes, and reports a failure on the standard data-event error path. That check
is the shared KMP validator (`FlowParser`, `FlowValidator`, and
`FlowNodeValidator` on the KMP flow implementation). Android, iOS, and Web are
required to use it. They must not keep a parallel copy of the rules.

The expression engine's only authoring job is to turn a `js` callback into the
wire string described below. It does not re-check node ids, reachability, limits,
or error codes.

Definition-time codes are `flow_disabled`, `unsupported_schema_version`,
`invalid_definition`, `unknown_node`, `unreachable_node`, `duplicate_node_id`,
and `limit_exceeded`. Their meanings are in the contract's
[validation table](workflow-data-event-contract.md#validation-and-errors).

## Call shape

`FLOW()` takes an options object, the same way `INFERENCE()` does. The host runs
the flow headless. There is no chat. A node reaches the user only when an
`agentic` node sets `interactive: true`, and then only through `ask_user`.

```js
FLOW({
  schema_version: 1,
  flow_id: 'pole-inspection',
  nodes: [ /* nodes */ ]
});
```

`schema_version` is required and is `1`. `nodes` is required: 1 to 50 nodes.
`flow_id` is optional. If you set it, use lowercase letters, digits, and `-`,
at most 64 characters. It is copied into reports.

The completion callback is optional. On success it receives the global state.
On a run that does not start, or a run whose status is `failed` or `cancelled`,
it receives an error and no state.

```js
FLOW({
  schema_version: 1,
  nodes: [ /* nodes */ ]
}, function(error, state) {
  if (error) {
    return;
  }
});
```

If the plan attribute that enables `FLOW()` is off, the call fails with
`flow_disabled` and nothing is validated further.

## What you write

Each node has an `id` and a `kind`. The id matches `^[a-z][a-z0-9-]*$`, is at
most 64 characters, and is not `end` or `abort`. Ids are unique. The run starts
at the first node. Every other node must be reachable from it.

| `kind` | You use it to | Required fields |
| --- | --- | --- |
| `agentic` | Ask the model to do the work | `instruction` |
| `function` | Call a tool, or run JavaScript, with input you fix | `function` |
| `decision` | Choose the next node from data | `cases`, `default` |

`next`, `on_error`, `default`, and each case's `next` name a node id, or one of
two reserved targets. `end` finishes the run as `completed`. `abort` ends it as
`failed` and runs nothing further. On `agentic` and `function` nodes, omitting
`next` means `end`. `on_error` defaults to `abort`. A `decision` must set
`default`.

Do not use a node `kind` of `confirmation`, `branch`, or `end`. Do not put the
removed `interaction` field on the options object or on a node. Do not put
runtime-assigned names (`run_id`, `model`, and the other names in the contract's
correlation table) on the top-level options object. Unknown other fields are
ignored. An explicit `null` is treated as absent.

There is no nested flow in version 1. A node cannot start another flow.

### Agentic nodes

`instruction` is a short direction, at most 500 characters. `interactive`
defaults to `false`. Set it to `true` only when the model should call `ask_user`.
It must be a boolean.

`model` is optional. Omit it to use `fulcrumite-2b`. A name that is not in the
model catalog is not a definition error. The node fails at run time with
`unknown_model` and follows `on_error`. It is not retried.

`output` is optional. It is an object of at most 20 keys, each
`"string"`, `"number"`, or `"boolean"`. If you omit `output`, the node returns
`{ reply: "<the model's final text>" }`. A response that does not match `output`
fails the node with `invalid_output` and is not retried.

A confirmation is not its own kind. Write an `agentic` node with
`interactive: true` and `output: { confirmed: 'boolean' }`, then a `decision`.

### Function nodes

`function` is a tool id the host exposes, or the built-in `js`. Do not expect
validation to reject an unknown id. The available tools depend on the device and
plan. An unknown id fails at run time with `unknown_tool`, is not retried, and
follows `on_error`.

`input` is an arguments object. String values may contain `{{form.<field>}}` and
`{{state.<key>}}`. A tool result that is not an object is returned as
`{ result: <value> }`.

`retry` is `{ max_attempts, on }`. `max_attempts` is 1 to 5 and counts the first
try. The default is 1, which means no retry. `on` may list `tool_error` and
`timeout`. The default is both. `js` failures are never retried, whatever
`retry` says.

### JavaScript nodes

Prefer a callback in `input.run`. The callback receives `{ form, state, tools }`,
may be `async`, and must return a plain object. That object is merged into the
state.

```js
{ id: 'count-up', kind: 'function', function: 'js',
  input: { run: ({ state }) => ({ attempts: (state.attempts || 0) + 1 }) },
  next: 'check' }
```

The engine sends `input.run.toString()` as `input.expression`. The callback
cannot use variables from outside its own source, because only that source is
sent. At authoring time, set exactly one of `input.run` and `input.expression`.
Both, or neither, is `invalid_definition`.

On the wire, validators see only `input.expression`. They never see `input.run`.
A payload that still carries `run` is `invalid_definition`. The validator checks
that `expression` is a non-empty string of at most 4096 characters. It does not
parse the code or check the `form` and `state` names it uses.

`form` and `state` are read-only. The code has no network access. It cannot
change the record or the state except by returning an object. `tools.<tool_id>(args)`
returns a promise. Use `await`. Each call counts toward the node's `max_calls`
and runs under its `timeout_seconds`. A thrown error, including a syntax error,
fails the node with `tool_error`, except an unknown tool id, which fails with
`unknown_tool`.

### Decision nodes

Cases are tested in order. The first match wins. If none match, control moves to
`default`. A decision returns no data and does not change the state.

```js
{ id: 'safety-decision', kind: 'decision',
  cases: [{ when: { ref: 'state.confirmed', op: 'eq', value: true }, next: 'search-pole' }],
  default: 'abort' }
```

`ref` is a bare path: `form.<field_data_name>` or `state.<key>`. It is not wrapped
in `{{ }}`. `op` is `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `exists`, or
`not_exists`. Conditions are data, not JavaScript. The contract defines which
`value` shape each `op` requires.

In `instruction` and in tool `input` strings, write the same path as `{{path}}`.
A `state.<key>` reference is not checked when the definition is validated,
because nodes create those keys at run time. A reference that cannot be resolved
at run time is treated as absent.

## State, loops, and limits

The run has one JSON object for state. It starts empty. Each successful node
merges its object into that state at the top level. A new key is added. An
existing key is replaced. A failed node does not change the state. Keys are not
removed in version 1.

A loop is a `next`, `on_error`, or decision target that points at an earlier
node. Update a value by writing the same state key again.

Limits are per node, not per flow. `timeout_seconds` is 1 to 3600 and defaults
to 300. `max_calls` is 1 to 50 and defaults to 10. The whole options object must
serialize to at most 32 KB. A non-integer limit is `invalid_definition`. An
integer outside the range is `limit_exceeded`.

The definition must not contain secrets, credentials, or user data. User data
enters a run only through references and through answers an `agentic` node
stores in state. Anyone who can read the form can read the definition.

## Pole inspection

This is the authoring form of the contract's pole-inspection payload. A `js`
node uses `input.run`. The engine converts that callback before validation.

The flow confirms safety gear, looks up the pole, fills empty fields in a loop,
captures a photo with retry, asks for review, and saves.

```js
FLOW({
  schema_version: 1,
  flow_id: 'pole-inspection',
  nodes: [
    { id: 'safety-check', kind: 'agentic',
      interactive: true,
      instruction: 'Ask whether the user is wearing a hard hat and safety glasses. Set confirmed to true only if the user confirms both items.',
      output: { confirmed: 'boolean' },
      max_calls: 3,
      on_error: 'abort', next: 'safety-decision' },

    { id: 'safety-decision', kind: 'decision',
      cases: [{ when: { ref: 'state.confirmed', op: 'eq', value: true }, next: 'search-pole' }],
      default: 'abort' },

    { id: 'search-pole', kind: 'function', function: 'search_records',
      input: { query: '{{form.pole_number}}' },
      next: 'check-duplicates' },

    { id: 'check-duplicates', kind: 'function', function: 'js',
      input: { run: async ({ form, state, tools }) => {
        const others = await tools.search_records({ query: form.pole_number });
        return { duplicate_count: others.length - 1, known_pole: state.result !== undefined };
      } },
      next: 'fill-field' },

    { id: 'fill-field', kind: 'agentic',
      instruction: 'Ask for the next empty inspection field and enter it.',
      output: { remaining_fields: 'number' },
      model: 'fulcrumite-2b',
      next: 'more-fields' },

    { id: 'more-fields', kind: 'decision',
      cases: [{ when: { ref: 'state.remaining_fields', op: 'gt', value: 0 }, next: 'fill-field' }],
      default: 'capture-photo' },

    { id: 'capture-photo', kind: 'function', function: 'photo_capture_tool',
      retry: { max_attempts: 3, on: ['timeout', 'tool_error'] },
      timeout_seconds: 120,
      next: 'review' },

    { id: 'review', kind: 'agentic',
      interactive: true,
      instruction: 'Ask whether everything looks correct. Set approved to true if the user accepts.',
      output: { approved: 'boolean' },
      next: 'review-decision' },

    { id: 'review-decision', kind: 'decision',
      cases: [{ when: { ref: 'state.approved', op: 'eq', value: true }, next: 'save' }],
      default: 'fill-field' },

    { id: 'save', kind: 'function', function: 'record_update_tool',
      input: { approved: '{{state.approved}}' } }
  ]
});
```

A smaller flow is one `agentic` node and no `flow_id`:

```js
FLOW({
  schema_version: 1,
  nodes: [
    { id: 'hello', kind: 'agentic', interactive: true,
      instruction: 'Greet the user and ask if they are ready to start.' }
  ]
});
```

## Authoring mistakes

These fail before any node runs. The code column is the contract code. Do not
treat this list as a second validator.

| Mistake | Code |
| --- | --- |
| `schema_version` is not `1` | `unsupported_schema_version` |
| `next`, `default`, `on_error`, or a case target names a missing node | `unknown_node` |
| Two nodes share an `id` | `duplicate_node_id` |
| A node cannot be reached from the first node | `unreachable_node` |
| More than 50 nodes, or the options object is over 32 KB | `limit_exceeded` |
| A `function` node has no `function` | `invalid_definition` |
| A `js` node has no expression after serialization, or the wire payload still has `input.run` | `invalid_definition` |
| An `agentic` node has no `instruction` | `invalid_definition` |
| `kind` is `confirmation`, `branch`, or `end` | `invalid_definition` |
| The plan attribute is off | `flow_disabled` |

Run-time codes such as `unknown_tool`, `unknown_model`, and `invalid_output` are
not definition errors. They follow the node's `on_error`. The contract's run
outcome table is the list.

## Context

FLCRM-22078 is a spike under the Workflow Data Event Contract epic ("Flows via Data Events"). A
form's JavaScript should be able to create a workflow that the chat runs. The existing data events
in `model/javascript/expression/invocations/` (`Inference.kt`, `LoadForm.kt`, `LoadRecords.kt`) take
an options map and a callback and are gated by plan attributes. `FLOW()` follows that pattern.
On Android, `execute_workflow` is currently a stub, so the runtime is separate follow-up work.

## Goals / Non-Goals

**Goals:**

- Define the `FLOW()` options object, usable by KMP, Android, iOS, and Web.
- Make validation testable with stable error codes.
- Link evidence and split follow-up work into dependency-ordered items.

**Non-Goals:**

- Delivering the run outcome through the callback, and progress reporting (a follow-up).
- The runtime that executes a definition, and any client implementation.
- iOS and Web work (blocked until those platforms have the `ask_user` tool and a flow runtime).
- Nested workflows.

## Decisions

### Follow the existing data event pattern

`FLOW()` takes an options object, is plan-gated, and reports errors through the standard
data-event error path. Option keys are `snake_case`, as in `INFERENCE()`.

### Definition is a graph, embedded in the call

Nodes are `agentic` (uses the LLM), `tool` (calls a tool), `function` (runs deterministic
JavaScript), and `decision` (chooses the next node from data). Every transition names the next node explicitly, which allows branches and loops. A
flow finishes at the reserved target `end` and fails at `abort`. Loops are bounded per node by
`max_calls`. The definition is embedded in the call and not referenced by id, which keeps version 1
self-contained. `flow_id` is optional and only labels reports; there is no workflow version or title.

### Tools are open-ended

A `tool` node names any tool id the chat exposes, including future ones. Unknown tool ids are
reported when the node runs, because the available tools depend on the device and plan.
Nested flows are not supported in version 1; a definition that tries to nest one fails with
`invalid_definition`.

### Agentic nodes pick a model

An `agentic` node has an optional `model`, the `name` of a model in the model reference file, like
the optional catalog id. Empty or absent means `fulcrumite-2b`. An unknown name fails the node at
run time, because the models available depend on the device.

### Structured responses and one global state

Every node returns a structured response, and the runtime merges it into one global JSON state:
new keys are added and existing keys are overridden. This replaces per-step outputs and the user
`reply` reference, and is the only way data moves between nodes. An agentic node declares its keys
with `output`, so the LLM answers in a shape a `decision` can test. A confirmation is therefore an
agentic node with a boolean output followed by a decision, which is why `confirmation`, `branch`
and `end` are no longer kinds.

### Retry is a field, not a node

`retry.max_attempts` is set on tool nodes (1 to 5, counting the first attempt; default 1).

### Limits are per node

`timeout_seconds` and `max_calls` apply to each node, not to the flow, so one slow or looping node
is bounded without capping a long guided flow. The values (timeout 1 to 3600 s, default 300;
`max_calls` 1 to 50, default 10) are proposed and need confirmation.

### Data references, not JavaScript

Nodes read data with `{{form.<field>}}` and `{{state.<key>}}`. Decision conditions are
structured `{ ref, op, value }` objects, so a definition is data that can be validated without
running code.

### Runs are queued internally

There is no idempotency key. The runtime queues runs, so authors do not manage duplicate fires.
The queue behavior is a runtime concern.

### A fixed run outcome vocabulary

Every run ends as `completed`, `failed`, or `cancelled`, with a stable `termination_reason` derived by
the runtime. The vocabulary is defined now so the later callback is consistent.

### Runtime-assigned correlation fields

The runtime assigns `run_id`, agent, session, node, model, timing, and error fields, so a definition
cannot forge them. Which fields the callback and progress events carry is left to those follow-ups.

### Shared fixtures as the conformance test

The representative payloads double as the cross-platform test fixtures. iOS and Web keep their criteria
while blocked on chat, so the contract does not need redefining when they are scheduled.

### The first node is the entry point

There is no `start` field. A run begins at the first node in `nodes`, which removes a field and a way
to point at the wrong node. Nodes may still loop back to it.

### Start behavior

A run always starts immediately and always runs headless, with no chat. When a node needs feedback it asks the user through the `ask_user` tool. An author who wants the user to decide first makes the first node an `agentic` node with a `prompt` and a boolean `output`.

## Risks / Trade-offs

- **[Risk] The definition format grows into a scripting language.** → Keep conditions structured,
  bound node counts and calls, and add capabilities only through new schema versions.
- **[Risk] Definitions in form JavaScript expose their content.** → State that definitions are
  visible to form readers and must hold no secrets or user data.
- **[Risk] The result contract is deferred, so form authors cannot react to the outcome yet.** →
  Track it as an explicit backlog item.
- **[Risk] Numeric limits may need tuning.** → The per-node values are proposed; revisit them when the runtime is measured.
- **[Risk] The spike expands into runtime work.** → Keep implementation in follow-up tickets.

## Migration Plan

1. Review and approve the contract and payloads.
2. Create the follow-up tickets in dependency order.
3. Implement the shared validator first, then the Android invocation and the runtime.
4. Roll back by reverting documentation; the spike has no runtime migration.

## Open Questions

- Confirm the plan attribute name (proposed `DataEventFlowEnabled`) with the owning team. The
  function name `FLOW()`, the default of starting immediately, and the numeric limits (50 nodes,
  32 KB) were confirmed by the requester of this spike.
- Confirm the model reference file and that `fulcrumite-2b` is the catalog name of the default model.
- Confirm whether the callback result and progress reporting are one follow-up or two.
- Confirm whether an epic-level ticket exists for iOS and Web chat support.

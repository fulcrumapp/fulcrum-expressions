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
- iOS and Web work (blocked until those platforms have a chat surface).
- Nested workflows.

## Decisions

### Follow the existing data event pattern

`FLOW()` takes an options object, is plan-gated, and reports errors through the standard
data-event error path. Option keys are `snake_case`, as in `INFERENCE()`.

### Definition is a graph, embedded in the call

Steps are `node`, `tool`, `confirmation`, `branch`, and `end`. Every transition names the next step
explicitly, which allows branches and loops. Loops are bounded by `max_step_visits`. The definition
is embedded in the call and not referenced by id, which keeps version 1 self-contained.

### Tools are open-ended

A `tool` step names any tool id the chat exposes, including future ones. Unknown tool ids are
reported when the step runs, because the available tools depend on the device and plan.
Nested workflows are not supported in version 1; a definition that tries to nest one fails with
`invalid_definition`.

### Retry is a field, not a step

`retry.max_attempts` is set on tool and confirmation steps (1 to 5, counting the first attempt;
default 1 for tools and 2 for confirmations). The chat decides whether a confirmation
answer is complete and asks only for what is missing; each question is one attempt, and
`max_attempts` stays as the ceiling so an unfinished answer cannot keep a run open.

### Data references, not JavaScript

Steps read data with `{{form.<field>}}`, `{{steps.<id>.output.<key>}}`, and
`{{steps.<id>.output.reply}}`. Branch conditions are
structured `{ ref, op, value }` objects, so a definition is data that can be validated without
running code.

### Idempotency by run key

Data events fire repeatedly, so the same workflow for the same record and `run_key` does not start
a second run while one is active.

### A fixed run outcome vocabulary

Every run ends as `completed`, `failed`, or `cancelled`, with a stable `termination_reason` derived by
the runtime. The vocabulary is defined now so the later callback is consistent.

### Runtime-assigned correlation fields

The runtime assigns `run_id`, agent, session, step, model, timing, and error fields, so a definition
cannot forge them. `run_id` is separate from `run_key`: the key decides whether a run starts, the id
names the run. Which fields the callback and progress events carry is left to those follow-ups.

### Shared fixtures as the conformance test

The representative payloads double as the cross-platform test fixtures. iOS and Web keep their criteria
while blocked on chat, so the contract does not need redefining when they are scheduled.

### The user's reply is a reference

A `node` step with a `prompt` exposes the user's reply as `steps.<id>.output.reply`, so a workflow can
ask a question and pass the answer to a tool. Conversation history and environment values are not
exposed; they can be added later as read-only `context.*` values.

### The first step is the entry point

There is no `start` field. A run begins at the first step in `steps`, which removes a field and a way
to point at the wrong step. Steps may still loop back to it.

### `run_key` is kept

`run_key` lets one form run the same workflow several times on one record, for example once per
repeating-section item. It is optional; without it a workflow has one active run per record.

### Start behavior

A run always starts immediately. `interaction` chooses whether it runs in the chat (`chat`, default) or with no user interface (`none`). An author who wants the user to decide first makes the first step a `confirmation`.

## Risks / Trade-offs

- **[Risk] The definition format grows into a scripting language.** → Keep conditions structured,
  bound step counts and visits, and add capabilities only through new schema versions.
- **[Risk] Definitions in form JavaScript expose their content.** → State that definitions are
  visible to form readers and must hold no secrets or user data.
- **[Risk] The result contract is deferred, so form authors cannot react to the outcome yet.** →
  Track it as an explicit backlog item.
- **[Risk] Numeric limits may need tuning.** → The requester confirmed the current values; revisit them when the runtime is measured.
- **[Risk] The spike expands into runtime work.** → Keep implementation in follow-up tickets.

## Migration Plan

1. Review and approve the contract and payloads.
2. Create the follow-up tickets in dependency order.
3. Implement the shared validator first, then the Android invocation and the runtime.
4. Roll back by reverting documentation; the spike has no runtime migration.

## Open Questions

- Confirm the plan attribute name (proposed `DataEventFlowEnabled`) with the owning team. The
  function name `FLOW()`, the default of starting immediately, and the numeric limits (50 steps,
  32 KB, 10 default visits, 1800 s timeout) were confirmed by the requester of this spike.
- Confirm whether the callback result and progress reporting are one follow-up or two.
- Confirm whether an epic-level ticket exists for iOS and Web chat support.

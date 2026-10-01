## Why

Agent workflows are being built across KMP, Android, iOS, and Web, but there is no way for a form
author to create one. Existing data events (`INFERENCE()`, `LOADFORM()`, `LOADRECORDS()`) show the
pattern: a JavaScript function that takes an options object. A `FLOW()` data event needs a
versioned, platform-neutral options contract so the chat can create and run a workflow from it.

## What Changes

- Define the `FLOW()` data event input: identity, versioning, compatibility, and the options
  object.
- Specify the node kinds (`agentic`, `function`, `decision`), retries, decisions and
  loops, structured responses merged into a global state, references to form and state data, per-node limits, privacy, and validation errors.
  Nested workflows are not supported in version 1 and fail with `invalid_definition`.
- Provide representative payloads: a pole-inspection workflow, a minimal workflow, and invalid
  payloads with their error codes.
- Identify completed tickets and code that provide evidence.
- Produce a dependency-ordered starter backlog.
- Define the run outcome statuses and termination reasons.
- Define the runtime correlation fields (flow, run, agent, session, node, tool, model, timing, outcome, error).
- Define conformance and per-platform acceptance criteria for KMP, Android, iOS, and Web.
- **Out of scope:** callback delivery of the outcome, progress reporting, the runtime, iOS and Web
  implementation, and any client code change.

## Capabilities

### New Capabilities

- `workflow-data-event-contract`: The versioned options contract of the `FLOW()` data event
  and its implementation acceptance criteria.

### Modified Capabilities

- None. This spike introduces a contract and documentation; it does not alter existing runtime
  requirements.

## Impact

- **Documentation:** add the contract and starter backlog to the architecture documentation.
- **Android:** existing data event and chat code is used only as evidence; no production code,
  dependency, database, manifest, or orchestration change.
- **Cross-platform consumers:** KMP, Android, iOS, and Web share one options schema. iOS and Web
  are deferred until they have a chat surface.

## 1. Contract and dependency gates

- [ ] 1.1 Confirm the Part 1 Synapse output provides signed, validated,
  per-form offline bundles and its isolation amendment prevents alternate-form
  lookup; verify valid, invalid, and absent bundle fixtures exercise that
  boundary without remote fallback.
- [ ] 1.2 Complete FLCRM-22079 and publish the ratified versioned retrieval
  profile, including final public name, closed schemas, bounds, error mapping,
  cancellation, timeout, privacy/redaction, and fixture criteria; verify the
  profile has no unresolved release-gating inputs from `design.md`.
- [ ] 1.3 Align the future implementation PRs with the existing FLCRM-22082
  children FLCRM-22289, FLCRM-22292, FLCRM-22288, FLCRM-22293, FLCRM-22294,
  FLCRM-22290, and FLCRM-22291; verify each implementation scope references
  the ratified profile and this change without creating a duplicate runtime
  task in this documentation PR.

## 2. Shared local retrieval core

- [ ] 2.1 Implement the KMP local retrieval core in FLCRM-22288 to verify and
  search only the active form's local bundle; verify core tests reject
  alternate-form, aggregate, fallback, invalid-bundle, and remote-retrieval
  paths.
- [ ] 2.2 Implement the ratified bounded ranking, passage, citation/source,
  count, and bundle/version-correlation output in FLCRM-22288; verify the
  shared golden fixtures produce deterministic expected retrieval data.
- [ ] 2.3 Apply the ratified privacy, redaction, cancellation, timeout, and
  exactly-once terminal rules in FLCRM-22288; verify fixtures cover redacted
  data, bound enforcement, cancellation, timeout, and late-result
  suppression.

## 3. Mobile Data Event adapters

- [ ] 3.1 Add the ratified RAG Data Event language wrapper and source
  documentation in `fulcrum-expressions` through FLCRM-22289, using the
  existing asynchronous host-function pattern; verify expression tests reject
  unsupported input and invoke the callback exactly once for every terminal
  outcome.
- [ ] 3.2 Implement the Android native ExpressionEngine adapter in
  FLCRM-22293 to call the shared KMP core for the captured active form; verify
  it passes the shared Data Event golden fixtures without cross-form access.
- [ ] 3.3 Implement the iOS native ExpressionEngine adapter in FLCRM-22294 to
  call the shared KMP core for the captured active form; verify it passes the
  shared Data Event golden fixtures without cross-form access.
- [ ] 3.4 Add the web-host RAG terminal behavior through FLCRM-22289; verify
  it returns the stable `rag_unavailable` error and has no Synapse client or
  request path.
- [ ] 3.5 Add any required `fulcrum` components TypeScript/Monaco declarations
  in FLCRM-22292 from the ratified public profile; verify declarations match
  the published schema and do not define an independent contract.

## 4. Android conversational-agent tool

- [ ] 4.1 Implement a distinct local RAG AgentToolRegistration in Android
  through FLCRM-22290 that invokes the KMP core directly; verify agent
  retrieval executes no Data Event JavaScript and does not expose the public
  RAG callback API.
- [ ] 4.2 Implement the agent tool's ratified allowlist, authorization,
  input/output validation, cancellation, timeout, and error lifecycle in
  FLCRM-22290; verify denied, cancelled, timed-out, and invalid requests
  produce no retrieval payload afterward.
- [ ] 4.3 Validate agent-tool output against the compatible shared retrieval
  profile in FLCRM-22290; verify its golden fixtures cover citations,
  active-form isolation, privacy/redaction, bounds, and no query-time Synapse
  call.

## 5. Cross-surface conformance and release

- [ ] 5.1 Run the versioned non-sensitive golden fixture suite through
  FLCRM-22291 across KMP, iOS, Android Data Event, web-unavailable behavior,
  and the Android agent tool; verify equivalent local retrieval/citation
  outcomes where applicable and the distinct surface lifecycle where required.
- [ ] 5.2 Review the final implementation boundaries through FLCRM-22291
  before release; verify no surface generates answers, invokes an LLM,
  transmits document content, calls Synapse at query time, or introduces
  alternate-form, cross-form, aggregation, or fallback retrieval.
- [ ] 5.3 Define per-surface rollout and rollback behavior through
  FLCRM-22291 that disables an unavailable adapter or tool rather than
  changing form isolation or adding remote fallback; verify rollback preserves
  the stable web `rag_unavailable` behavior.

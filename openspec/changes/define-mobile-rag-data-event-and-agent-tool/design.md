## Context

See `proposal.md` for motivation and the two capability specifications for
observable behavior. The existing `INFERENCE(options, callback)` Data Event
establishes the relevant language pattern: expression code validates input,
uses an asynchronous native host-function bridge, and completes through a
callback. Data Events are Fulcrum's user-authored JavaScript subset. The
existing native inference adapters include Android ExpressionEngine
`$$inference` and iOS `ExpressionEngineInvocation`; future RAG adapters follow
that separation while retaining their internal names as implementation-owned.
This change defines the Phase 2 RAG boundary only; it does not add that
function to `functions.coffee`, `runtime.coffee`, TypeScript declarations, or
generated documentation.

Part 1 in https://github.com/fulcrumapp/synapse/pull/1 produces signed,
validated, per-form offline RAG bundles. Its separately tracked amendment
makes form isolation explicit. Phase 2 consumes those local artifacts only.
FLCRM-22079 is the contract-definition spike that must ratify the public
details before implementation begins.

## Goals / Non-Goals

**Goals:**

- Establish independent public Data Event and Android agent-tool boundaries
  with compatible retrieval and citation semantics.
- Require both consumers to use one KMP local retrieval core and the active
  form's validated bundle.
- Preserve offline and privacy boundaries with no query-time Synapse call.
- Define a ratification and shared-fixture gate that prevents host-specific
  contract drift.

**Non-Goals:**

- Implementing a runtime function, CoffeeScript bridge, TypeScript/Monaco
  declaration, generated help, native code, KMP code, CI, dependency, or
  configuration change in this repository.
- Defining numeric limits, final public field names, final result shape, or
  additional stable error codes beyond web `rag_unavailable`.
- Generating answers, invoking an LLM, allowing a remote retrieval API, or
  transmitting document content during a retrieval request.
- Reusing a Data Event as an Android agent tool, or permitting cross-form
  retrieval, aggregation, or fallback.

## Decisions

### Separate the two consumer contracts

`RAG(options, callback)` is the provisional public Data Event surface. It
uses the existing asynchronous callback model, but only native iOS and Android
hosts will eventually implement it. Android conversational agents instead use
a local RAG AgentToolRegistration with its own authorization, allowlist,
input/output lifecycle, and policy checks. The agent tool never runs Data
Event JavaScript.

This separation keeps user-authored expressions, native host behavior, and
agent authorization independently evolvable. The alternative of making an
agent invoke RAG through an expression engine would couple agent policy to
Data Event validation and callbacks; it is rejected. The alternative of
separate retrieval engines is rejected because it would allow ranking,
isolation, and redaction behavior to diverge.

### Share one local KMP retrieval path

The KMP core is the sole retrieval implementation for both mobile Data Event
hosts and the Android agent tool. At request acceptance, each caller binds
the operation to the current active form and passes the request to the core.
The core retrieves from only the corresponding local signed and validated
bundle, then returns bounded retrieval/citation data to the calling adapter.

The system flow is:

1. A Data Event adapter or authorized Android agent tool accepts a local
   retrieval request.
2. The adapter captures the current active form and validates its
   surface-specific request and policy.
3. The shared KMP core verifies and searches only that form's local bundle.
4. The adapter applies the shared ratified privacy, redaction, and bound
   rules before returning its surface-specific terminal outcome.

Neither path accepts a caller-provided alternative form, performs an
aggregate search, reads a fallback bundle, or contacts Synapse. A remote
Synapse retrieval API is explicitly out of scope.

### Keep host adapters thin and aligned with existing async behavior

Future `fulcrum-expressions` work owns the language wrapper and source
documentation for the provisional RAG function. Android and iOS own their
native ExpressionEngine adapters, following the existing inference-style
asynchronous host bridge while retaining platform-specific bridge symbols and
invocation details as implementation-owned internals. Web owns a terminal
`rag_unavailable` behavior that makes no Synapse interaction.

`fulcrum` components may add editor TypeScript/Monaco declarations in its
own implementation work. Those declarations must consume the ratified public
contract rather than define a parallel API.

### Define a ratified shared retrieval profile before implementation

FLCRM-22079 must publish one versioned profile consumed by the KMP core,
mobile Data Event adapters, Android agent tool, and future editor/docs work.
That profile is the source of truth for:

- final public function naming and version compatibility;
- closed options, result, citation/source, bundle-correlation, and error
  schemas;
- maximum query, result-count, passage, metadata, and execution bounds;
- availability conditions and error mapping, including the fixed web
  `rag_unavailable` behavior;
- cancellation trigger, terminal callback/tool outcome, timeout behavior,
  and late-result handling;
- privacy/redaction rules for passage text and source metadata; and
- versioned golden fixtures, ranking expectations, and parity criteria.

This OpenSpec change intentionally records the ratification gate rather than
fabricating values. No public implementation may substitute local defaults
for an unratified profile value.

### Use shared non-sensitive golden fixtures

The shared retrieval profile includes a non-sensitive fixture corpus with
expected passages, ordering, citations, counts, bundle/version correlation,
redactions, bounds, and terminal errors. KMP validates the core behavior;
iOS, Android Data Event, web-unavailable behavior, and the Android agent
tool validate their adapters against the relevant shared expectations. Agent
fixtures additionally verify policy denial and that no Data Event JavaScript
is executed.

This choice provides a common contract without requiring the two consumer
surfaces to share an API or authorization model.

### Preserve explicit ownership boundaries

| Owner | Future responsibility |
| --- | --- |
| `fulcrum-expressions` | Data Event language function and source documentation |
| `fulcrum` components | Editor TypeScript/Monaco types, when applicable |
| Android | Native ExpressionEngine adapter and separate local RAG agent tool |
| iOS | Native ExpressionEngine invocation adapter |
| KMP | Shared local retrieval core and contract-fixture behavior |
| Synapse / Part 1 | Signed, validated, per-form offline bundle production |

Implementation is separately tracked by Epic FLCRM-22082 children
FLCRM-22289, FLCRM-22292, FLCRM-22288, FLCRM-22293, FLCRM-22294,
FLCRM-22290, and FLCRM-22291. This documentation change neither reassigns
those items nor authorizes implementation in this repository.

## Risks / Trade-offs

- **Part 1 bundle isolation or validation is incomplete** → Depend on the
  Synapse foundation amendment and reject absent or invalid bundles instead
  of falling back.
- **Host implementations interpret a provisional contract differently** →
  Block public implementation on the FLCRM-22079 versioned profile and shared
  fixtures.
- **Agent authorization is accidentally coupled to Data Event permissions** →
  Require an independent Android allowlist/policy before tool retrieval.
- **Sensitive content escapes through passages or citations** → Apply the
  ratified redaction and bound rules before either consumer receives output.
- **Cancellation or timeout emits duplicate or late output** → Require one
  terminal outcome and fixture coverage for cancellation, timeout, and
  late-result suppression.
- **Local retrieval is mistaken for an answer-generation feature** → Keep the
  output retrieval-only and forbid LLM, answer, document-transmission, and
  query-time Synapse behavior in both contracts.

## Migration Plan

This change has no deployed migration because it adds documentation only.
Implementation sequencing is:

1. Confirm the Part 1 signed, validated, per-form bundle output and its
   form-isolation amendment.
2. Ratify the release-gating profile in FLCRM-22079.
3. Implement and fixture-test the KMP local core.
4. Implement iOS and Android Data Event adapters and the distinct Android
   agent registration against the shared profile.
5. Add the language source docs and any editor declarations in their owning
   repositories, then validate every surface with the golden fixtures.

If a future implementation must be rolled back, it disables the relevant
native adapter or agent registration rather than introducing remote fallback
or changing form isolation. The web behavior remains the stable
`rag_unavailable` terminal error.

## Release-Gating Ratification Inputs

These are required decisions for FLCRM-22079, not deferrable open questions:

1. Final public RAG name, version signaling, and backward-compatibility
   policy.
2. Complete closed options, result, citation/source, count, and
   bundle/version-correlation field definitions.
3. Numeric bounds for query input, results, passages, metadata, time, and
   any resource budget.
4. Full stable error taxonomy and mapping for invalid input, unavailable or
   invalid bundle, cancellation, timeout, and privacy/bound enforcement;
   only web `rag_unavailable` is fixed by this change.
5. Caller-visible cancellation trigger, timeout duration, queueing behavior,
   and exactly-once terminal semantics.
6. Privacy classification and redaction rules, including which citation and
   source metadata can leave the local core.
7. Golden-fixture corpus, deterministic ranking/tie behavior, and cross-host
   conformance acceptance criteria.

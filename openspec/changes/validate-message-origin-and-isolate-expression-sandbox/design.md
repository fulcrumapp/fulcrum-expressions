## Context

The original, legacy and hybrid sandbox pages share one proxy. The proxy
currently accepts messages before authenticating the sender, dynamically
dispatches methods and stores the destination for later replies in shared
state. The runtime evaluates both calculations and supported Data Events
scripts with JavaScript. These are separate inputs: filtering a calculation
does not make the accompanying Data Events script or a loaded JavaScript file
safe.

The main Fulcrum engine uses string identifiers and a hybrid-to-legacy
fallback; external contributions uses numeric identifiers; the expression
tester uses no identifier and consumes responses in order. The root runtime
object is a frozen comparison asset, while the proxy is deployed separately.
Existing expression syntax includes property calls such as `.map` and
conditional statements that use `SETRESULT`.

## Goals / Non-Goals

**Goals:**

- Reject unauthorized and malformed messages before dispatch or state changes.
- Prevent untrusted calculations from invoking arbitrary JavaScript without
  relying on the sender's origin as proof that the content is safe.
- Preserve supported Data Events, host interactions and the three known
  consumer contracts.
- Apply and verify appropriate framing and execution restrictions across
  published sandbox endpoints.

**Non-Goals:**

- Requiring server-signed expression provenance as an acceptance criterion.
- Replacing all supported Data Events scripts with a new language.
- Claiming production protection based only on local tests or publication of
  a proxy bundle.

## Decisions

### Authenticate and validate before dispatch

Accept JSON messages only from the direct parent and an explicitly configured
origin. The policy must be controlled by the deployment, use full origins and
fail closed when unavailable. Remote origins must use HTTPS; HTTP is limited
to the loopback hosts `localhost`, `127.0.0.1` and `[::1]` for local
development. Production manifests identify four regional
Fulcrum web hosts and four regional external-contributions hosts as candidates;
actual message origins and any additional consumers still need verification.
Preview and local origins require explicit environment-specific configuration.
Neither a query parameter nor a message from an unknown parent is an authority
for selecting the trusted origin.

The deployment injects its explicitly configured JSON array of canonical
origins at the start of the shared proxy bundle, before publishing any assets.
The deployment and proxy use the same origin validator. An absent or invalid
policy aborts the deploy before any upload, and the frozen comparison page
does not change. The production environment supplies this array as the
`EXPRESSION_SANDBOX_ALLOWED_ORIGINS` configuration variable; local deployments
supply it as an environment variable. Concurrent preview origins must all be
explicitly included in the policy for the shared asset deployment. Updating
the list requires publishing that shared proxy again.

**Alternative rejected:** adding a configuration script to each sandbox page
would change the frozen comparison page and still require an authoritative
source for the shared preview origin list.

Dispatch only the supported `prepare`, `expressions`, `values`, `globals`,
`evaluate`, `triggerDataEvent`, `finishAsyncCallback` and `httpRequest`
commands, validating each command's actual payload before state mutation.
Preserve string, numeric and absent identifiers, and bind asynchronous replies
to the originating authorized request. The runtime is shared state, so
concurrent evaluation and host callbacks also need explicit coordination.

**Alternative rejected:** accepting a broad preview-domain wildcard or
deriving trust from the sender itself would authorize contexts without a
deployment-controlled trust decision.

### Separate calculation evaluation from Data Events

Treat every incoming calculation expression as untrusted even when the parent
origin is trusted. Evaluate it through a restricted expression implementation
with explicit callable and property capabilities, controlled data values and
no fallback to `eval` for unsupported syntax. Preserve
documented calculation semantics, including dependent values, `SETRESULT`,
errors and supported array operations. The exact evaluator and its compatible
syntax remain to be verified against the existing tests and documented
language before implementation can be approved.

Keep supported Data Events as a distinct JavaScript execution path. Its
capabilities, including `LOADFILE` of JavaScript and host functions, must not
give an untrusted calculation access to arbitrary JavaScript. Because a Data
Events script executes before calculations in the current shared realm, merely
replacing a runtime method is not sufficient proof: the selected design must
prevent scripts and mutable globals from bypassing the calculation boundary.

**Alternative rejected:** filtering strings, relying on the iframe alone, or
relying only on a trusted parent does not establish a JavaScript execution
boundary. Disabling all Data Events would break supported functionality.

The existing documentation test corpus contains 278 examples, including
`.map(CHOICEVALUE)` and an `if` statement using `SETRESULT`. These examples
currently run through `eval` in the documentation test rather than through the
runtime evaluation path, so they require an adapter before they can establish
evaluator parity.

The investigated `expr-eval` package implements a mathematical expression
grammar whose `^` operator means exponentiation, unlike JavaScript's XOR.
GitHub advisories GHSA-q9v2-7m5w-4693, GHSA-8gw3-rxh4-v6jx and
GHSA-jc85-fpwf-qm7x affect versions through 2.0.2 with no patched version
listed, so this package is not an acceptable security boundary.
JS-Interpreter supports isolated ES5 execution, but its own
documentation describes execution of arbitrary JavaScript and requires
explicit resource and regular-expression controls for bounded execution. The `js-interpreter` npm
package is an unofficial repackaging. A local probe of version 6.0.2
successfully evaluated both `Function('return 7')()` and `eval('7')` inside
its interpreter. This does not demonstrate access to the host environment, but
it does show that the default interpreter alone does not reject dynamic
JavaScript. Neither candidate has yet been shown to satisfy the ticket and
compatibility requirements.

A separate scratch prototype combined an AST allowlist with JS-Interpreter.
It evaluated representative conditional/`SETRESULT` and array-map examples,
and rejected direct `eval`, `Function`, constructor-chain and aliased-`eval`
examples. Extending its property, constructor and object-literal allowlists
allowed a syntax-only check to accept all 278 documented examples while
rejecting the tested dynamic-execution cases. A separate experimental host
bridge reproduced 277 of their expected results; the `VALUE` example also
fails when the existing documentation test is run in isolation. This is
feasibility evidence only: the prototype is not integrated into the runtime,
its host-function allowlist has not been security-reviewed, and safe host
bridges, limits and protection from mutations by Data Events remain
unverified. An interpreter step limit alone does not bound native host
functions: `SUBSTITUTE` constructs and executes a regular expression inside
one host call. The resource strategy must also cover such calls.

An additional local probe using the current proxy and runtime confirmed that a
Data Events script can replace `$$runtime.evaluateExpression` before
calculations run. The next calculation then executes the replacement instead
of the expected expression. Replacing that method alone, without protecting
the evaluator from the script's realm, is therefore insufficient.

SES compartments are another candidate for capability isolation. Their
lockdown changes shared JavaScript intrinsics, and compartments still permit
dynamic `Function` and `eval` within their own authority. An exploratory
Node.js probe loaded the existing runtime before lockdown and reproduced
270 of the 278 documented expression examples; loading the runtime after
lockdown failed in its dependencies. The probe endowed existing host
functions directly and did not verify their authority, browser compatibility,
Data Events or the frozen runtime. SES also does not provide execution time
or memory limits, so the probe is not a production security boundary.

### Cover the frozen comparison endpoint

The root `expressions.js` object cannot be overwritten under the existing
release contract. Both the local runtime and a read-only inspection of the
published frozen object show dynamic `evaluateExpression` dispatch and a
replaceable prototype method. Proxy-side interposition is therefore a
candidate, but it must be tested in a browser against that object and remain
protected from mutation by scripts.
If that cannot be established, the endpoint requires a coordinated migration
or a separately approved change to the frozen comparison contract; securing
only the legacy and hybrid bundles is not sufficient.

### Enforce framing at the response boundary

The deployed response must supply an appropriate framing policy that accounts
for all ancestors, not just the direct messaging parent. CDN ownership and
effective production headers need verification. CSP in an HTML meta element
is not a substitute for an effective `frame-ancestors` response header.
Framing and iframe sandbox restrictions are defense in depth, not a
replacement for calculation or message validation.

### Preserve asynchronous host interactions

The existing `postMessage` contract identifies a parent window proxy and
origin, not an individual document. Native asynchronous callbacks also need
an authorized response context. Protecting against replacement by a different
document at the same origin and introducing a new session protocol are not
explicit ticket requirements. They are not implementation prerequisites
unless needed to fix a demonstrated security or compatibility problem. Do not
silently route a callback to an unrelated request.

## Risks / Trade-offs

- Unknown expression syntax could be rejected by a restricted evaluator.
  Measure against documented examples and existing tests; do not silently
  introduce an unsafe fallback.
- All three endpoints share a proxy. Validate the original frozen object and
  each consumer contract before deployment.
- The shared production proxy also serves dynamic previews. A single mutable
  per-preview policy is insufficient for concurrent previews; configuration
  ownership and deployment must support explicit independent origins.
- Existing scripts and host capabilities can mutate shared JavaScript state.
  An isolated or otherwise protected boundary must be demonstrated, not
  inferred from an allowlist.
- CDN framing configuration and production consumer inventories are outside
  the evidence available in this checkout; release verification remains
  dependent on those controls.

## Migration Plan

1. Establish failing security and compatibility tests for messages,
   calculations, scripts and all three correlation contracts.
2. Verify an evaluator and a protected boundary against supported syntax and
   the frozen runtime; implement only once the boundary is demonstrable.
3. Configure trusted origins and framing policies for each deployment, then
   validate all three endpoints and the actual consumer integrations.
4. Roll back only to a compatible secure version, or disable affected
   integrations if no such version exists.

## Open Questions

- Which restricted evaluator can preserve the documented calculation syntax
  and mediate host capabilities without allowing JavaScript escape?
- How can the calculation boundary remain protected from supported Data Events
  scripts executing in the same JavaScript realm?
- Does the frozen runtime permit safe interposition, and who can configure
  and verify production framing headers and concurrent preview origins?

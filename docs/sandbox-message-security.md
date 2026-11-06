# Sandbox message validation

The deployment prepends a trusted origin policy to the shared proxy, which
reads `window.EXPRESSION_SANDBOX_ALLOWED_ORIGINS` once at startup. Set the
`EXPRESSION_SANDBOX_ALLOWED_ORIGINS` environment variable to a JSON array of
canonical, exact HTTPS origins before running `script/deploy`, for example
`["https://web.example.com", "https://submit.example.com"]`. Paths, trailing
slashes, credentials, wildcards, opaque origins and noncanonical ports are
invalid. HTTP is accepted only for local development on `localhost`,
`127.0.0.1` or `[::1]`. Any invalid entry invalidates the entire policy. Missing or invalid
configuration aborts deployment before any assets are uploaded; an unconfigured
proxy also rejects all messages and logs an error at startup. Production GitHub
Actions reads the variable from the `production` environment configuration.
Never construct this policy from the message, query string, referrer or
observed parent origin.

The proxy requires a browser-dispatched message (`isTrusted`), a JSON string
from its direct parent and an exact configured origin. Rejecting synthetic
events is defense in depth, not isolation from scripts in the sandbox. The
first valid request pins that origin for the lifetime of the proxy;
a parent navigating to another configured origin must create a new sandbox.
Supported commands are `prepare`, `expressions`, `values`, `globals`,
`evaluate`, `triggerDataEvent`, `finishAsyncCallback` and `httpRequest`.
IDs may be strings, numbers (including zero), or absent. Runtime configuration
keys accepted by `globals` and `featureVariables` are enumerated in
`expressions-proxy.coffee`; additional consumer keys need a coordinated
contract update. Callback IDs must correspond to a host call emitted by this
proxy. While a callback runs, nested host calls and the callback response use
the ID of the `finishAsyncCallback` request, as in the original proxy. Outbound
HTTP responses retain the request's original ID and target.

Form indexes reject prototype-sensitive keys. Date values that would cause the
legacy runtime's date conversion to call `replace` on a non-string with a short
`length` are rejected before evaluation or a Data Event, when the runtime's
actual field indexes are known. The `values` command accepts an object without
applying the previous form's field types, so values and `prepare` can arrive in
either order. The legacy runtime retains indexes for removed fields; those
fields may still be checked because the runtime can still use them. This narrow
check is not a complete schema for every field or nested repeatable. HTTP
`form` and object `qs` values with their own `hasOwnProperty`
field are rejected because browser-request cannot serialize them.
For example, a numeric field can accept an object that subsequently throws
during evaluation, leaving the request without a response. Handling this
specific malformed numeric value and introducing a general protocol-level
error response are deferred from this ticket. The known consumers do not
handle a shared protocol-level error for these commands, so an explicit error
response would require a coordinated consumer contract.

The proxy accepts negative numeric `groupingSize` values. A configured value of
`-1` can make `FIXED` exhaust memory or hang; this behavior predates the
origin-validation change. Validating `groupingSize` is deferred from this
ticket.

## Deployment and security gaps

**This is not a deploy-ready security policy.** Production origin candidates
are not a verified consumer inventory. Previews sharing the same asset proxy
must all appear in its configured list; adding or removing a preview requires
updating the list and republishing the shared proxy. Operators must verify that
the list covers all consumers and that updates do not omit concurrent previews.
Test the original, legacy and hybrid endpoints before rollout. The deployment
does not modify the frozen comparison HTML or add a sandbox script.

The proxy cannot distinguish a same-origin replacement of a parent document
using `WindowProxy` and `postMessage` alone. Exact target origins prevent
cross-origin delivery, but a pending response may reach a replacement document
at the same origin. A separate document/session binding protocol and consumer
changes are needed to close that gap. Deferred host calls use the first
authorized request's context and ID when no request is currently being
dispatched; nested calls use the active request's context. The session ID is
not the ID of the request that created the deferred task. Tests with the
Fulcrum and External Contributions engines exercised interleaved calls and
callbacks, but full application and expression tester compatibility remain to
be verified.

The local runtime removes its own callback and timer wrapper when a host call
throws; the proxy registers a callback only after sending its notification.
If a nested host call cannot be sent during `finishAsyncCallback`, that request
can still fail without a response. An interval can also retain an entry after
a failed reschedule.
The deployed frozen comparison runtime does not include those runtime changes,
so its failure cleanup still needs verification.

This change does **not** restrict JavaScript evaluation or isolate Data Events,
scripts or mutable globals. It does not configure effective framing headers.
The restricted evaluator, isolation, framing, real browser integration,
frozen runtime and verified deployment configuration remain separate work; origin checks
alone do not establish the complete sandbox security boundary.

## Why

The expression sandbox processes cross-document messages without validating
their sender and evaluates expression text as JavaScript. Untrusted pages or
expression content can therefore reach capabilities outside the intended
expression contract.

## What Changes

- Accept messages only from explicitly trusted embedding contexts and validate
  their source, command and payload before dispatch.
- Prevent untrusted expressions from invoking arbitrary JavaScript while
  preserving supported expression evaluation and Data Events behavior.
- Apply appropriate sandbox and framing restrictions and preserve the
  supported message and asynchronous callback contracts.
- Add security and compatibility regression coverage for trusted and
  untrusted requests and the published sandbox channels.

## Capabilities

### New Capabilities

- `expression-sandbox-security`: trusted message handling, restricted
  expression execution, browser isolation and integration compatibility.

### Modified Capabilities

None.

## Impact

The shared sandbox proxy, runtime, browser-facing assets, deployment
configuration and tests may be affected. Existing embedding applications,
dynamic preview origins and the frozen comparison runtime must be considered
before release.

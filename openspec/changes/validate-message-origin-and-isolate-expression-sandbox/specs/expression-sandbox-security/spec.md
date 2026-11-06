## ADDED Requirements

### Requirement: Sandbox requests originate from trusted embedding contexts
The sandbox MUST validate the request's origin and expected parent window
against a deployment-controlled policy before changing state or processing
the request. Missing or invalid trust configuration MUST fail closed.

#### Scenario: An untrusted origin sends a request
- **WHEN** a window from an origin outside the trusted policy sends a sandbox request
- **THEN** the sandbox MUST reject it without executing a handler or sending a response

#### Scenario: A trusted origin sends from an unexpected window
- **WHEN** a window other than the expected parent sends a request from a trusted origin
- **THEN** the sandbox MUST reject it without changing runtime state

#### Scenario: A configured parent sends a valid request
- **WHEN** the expected parent from a configured trusted origin sends a supported request
- **THEN** the sandbox MUST process the request according to the supported consumer contract

### Requirement: Sandbox message schemas are validated before dispatch
The sandbox MUST validate message encoding, supported commands and their
payloads before dispatch or state changes. Invalid input MUST NOT invoke
arbitrary handlers or overwrite runtime internals.

#### Scenario: A request is malformed or unsupported
- **WHEN** a parent sends invalid JSON, an invalid payload or an unsupported command
- **THEN** the sandbox MUST reject the request without dispatching it or changing runtime state

#### Scenario: A request attempts to overwrite runtime internals
- **WHEN** a request contains a payload field prohibited by its command contract
- **THEN** the sandbox MUST reject it without overwriting runtime internals

### Requirement: Replies remain bound to the authorized request context
The sandbox MUST address replies and asynchronous host interactions to their
authorized embedding context and preserve the supported consumer correlation
contracts. Rejected messages MUST NOT change the destination of pending replies.

#### Scenario: Rejected input arrives during asynchronous work
- **WHEN** an unauthorized or malformed request arrives while an authorized request is pending
- **THEN** the pending response MUST remain addressed to the authorized context
- **AND** the response MUST preserve the consumer's correlation contract

### Requirement: Untrusted expressions cannot execute arbitrary JavaScript
The sandbox MUST prevent untrusted expressions from invoking JavaScript outside
the supported expression contract. Authentication of an embedding origin or
iframe isolation alone MUST NOT be treated as satisfying this requirement.

#### Scenario: An expression attempts an arbitrary JavaScript operation
- **WHEN** an untrusted expression attempts to invoke JavaScript outside the supported expression contract
- **THEN** that operation MUST NOT execute
- **AND** the failure MUST be observable to the authorized consumer

#### Scenario: A trusted sender supplies untrusted expression content
- **WHEN** a trusted embedding application sends an untrusted expression
- **THEN** the expression MUST remain subject to the same execution boundary

### Requirement: Browser execution and framing use appropriate restrictions
The sandbox MUST apply appropriate execution and framing restrictions while
preserving supported evaluation and host capabilities.

#### Scenario: An unauthorized page attempts to frame the sandbox
- **WHEN** an unauthorized embedding context attempts to frame a deployed sandbox
- **THEN** the effective framing policy MUST reject that embedding

### Requirement: Supported integrations continue to operate
The sandbox MUST preserve supported calculation, Data Events, host-call,
callback and fallback behavior for trusted integrations. Existing string,
numeric and absent message identifiers MUST remain supported unless an
explicitly coordinated migration replaces them.

#### Scenario: A trusted integration evaluates supported behavior
- **WHEN** an authorized consumer evaluates supported calculations or Data Events
- **THEN** results, errors and supported host interactions MUST remain compatible

#### Scenario: A supported consumer sends a request
- **WHEN** a supported consumer uses a string, numeric or absent request identifier
- **THEN** the response MUST preserve that consumer's correlation contract

#### Scenario: Hybrid startup fails
- **WHEN** an authorized application falls back from the hybrid endpoint to the legacy endpoint
- **THEN** the fallback MUST preserve the same security and compatibility requirements

## 1. Establish The Security Boundary

- [ ] 1.1 Inventory documented calculation syntax, existing tests and host capabilities that must remain supported.
- [ ] 1.2 Select and verify a restricted evaluator against arbitrary JavaScript and prototype and constructor access, preserving supported behavior.
- [ ] 1.3 Demonstrate that Data Events and loaded scripts cannot mutate or bypass the untrusted-calculation boundary while supported behavior continues to work.
- [ ] 1.4 Test the proposed boundary against the published frozen runtime and all three sandbox channels.
- [ ] 1.5 Define deployment-controlled origin and framing configuration for production, concurrent previews and local development.

## 2. Add Regression Coverage

- [ ] 2.1 Test trusted origin and parent acceptance, untrusted origin and source rejection, missing policy and malformed requests without state mutation.
- [ ] 2.2 Cover the supported commands and payloads, protected runtime keys, string and numeric IDs, and requests without IDs.
- [ ] 2.3 Exercise concurrent requests and asynchronous host functions without redirecting responses.
- [ ] 2.4 Test malicious calculations and supported syntax, including array operations, `SETRESULT`, dependent fields and error behavior.
- [ ] 2.5 Exercise Data Events, loaded files, host functions and legacy fallback without allowing a calculation to bypass its execution boundary.

## 3. Implement Security Controls

- [ ] 3.1 Validate origins, parent window, command names and payload schemas before dispatch or runtime state changes.
- [ ] 3.2 Bind replies and asynchronous callbacks to the authorized request context and preserve all supported correlation contracts.
- [ ] 3.3 Integrate the verified restricted evaluator across applicable channels without falling back to arbitrary JavaScript.
- [ ] 3.4 Apply the verified isolation and effective response framing policy, preserving supported integrations and frozen assets.

## 4. Verify Delivery

- [ ] 4.1 Run applicable focused tests, existing runtime and migration gates, and build checks.
- [ ] 4.2 Exercise trusted and untrusted requests against all three sandbox endpoints and known consumer contracts.
- [ ] 4.3 Verify deployed framing headers, environment-specific trusted origins, scripts and fallback with the responsible infrastructure and application owners.
- [ ] 4.4 Document the security boundary, configuration, migration dependencies and secure rollback behavior.

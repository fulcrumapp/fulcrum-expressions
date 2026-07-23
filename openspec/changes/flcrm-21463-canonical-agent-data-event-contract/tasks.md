## 1. Evidence and baseline

- [x] 1.1 Pin the current `fulcrum-expressions` baseline and record the exact
      `INFERENCE()` validation, normalization, callback, and output-flattening
      symbols as evidence.
- [x] 1.2 Record KMP resolver/parser/error evidence with repository, branch or
      commit, file, and merged/provisional status; explicitly preserve the
      observed-versus-normative distinction.
- [x] 1.3 Record Android and iOS resolver, model-selection, AGENT bridge,
      threading, gating, tool, and error evidence from accessible branches/PRs.
- [x] 1.4 Resolve or document every conflict between expressions, KMP,
      Android, and iOS, including model aliases, model fallback, reference
      placement, labels defaults, and tool-round limits.

## 2. Canonical contract

- [x] 2.1 Lock the v1 payload field names and location of `references` after
      user design review; include schema version, model, mode, generation,
      task inputs/outputs, references, and allow-listed tools.
- [x] 2.2 Define supported scalar/structured field types, requiredness,
      ordering, duplicate-name handling, strict output behavior, and
      compatibility aliases.
- [x] 2.3 Define model/reference resolution precedence, form context,
      path validation, encoding, byte/line/context limits, ordering,
      missing/unavailable semantics, and safe error categories.
- [x] 2.4 Define prompt/context segment ordering and prove reference content
      cannot alter system policy, task contract, tool registration, or
      allow-lists.
- [x] 2.5 Define tool descriptor ownership, runtime allow-list enforcement,
      argument validation, unknown-tool behavior, bounded rounds/calls,
      event ordering, and cancellation propagation.

## 3. Fixtures and conformance plan

- [x] 3.1 Add sanitized passive fixtures for model/reference precedence,
      UTF-8 and CRLF/LF/CR labels, trimming/order, empty/missing/unreadable
      files, size boundaries, and concurrent unavailability.
- [x] 3.2 Add passive fixtures for legacy/modern ML, text/multimodal LLM,
      model aliases, task validation, output envelopes, tool allow-lists,
      prompt injection, errors, and cancellation.
- [x] 3.3 Define the portable fixture schema and the per-repository
      conformance assertions without adding model binaries, customer data,
      secrets, URLs, or executable source.
- [x] 3.4 Specify the expression, KMP, Android, and iOS CI commands and
      minimum evidence required for contract approval. [CI Handled]

## 4. Release and follow-up sequencing

- [x] 4.1 Record the approved review decision for PR #107: close as a
      non-normative side path and carry only reviewed non-conflicting
      expression-only content into the canonical contract change.
- [x] 4.2 Publish the approved contract and fixture version in the canonical
      expression documentation, then link it from consumer repositories
      without duplicating normative requirements.
- [x] 4.3 Open dependent implementation/conformance work in the order
      expressions, KMP, Android, and iOS, each pinned to the approved
      contract and baseline.
- [x] 4.4 Do not perform staging deployment or manual production verification;
      these capabilities are absent in `.agents/state.json`. [Skipped
      (unsupported capability)]

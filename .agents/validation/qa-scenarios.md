# FLCRM-22122 — QA Scenarios

These scenarios are the QA acceptance record for the headless Data Event and
calculation checker. The pure-validator portion is approved by FLCRM-22116
comment 205727 and implemented in `checker/index.js`; HTTP/auth/worker
integration, publication, and deployment remain separate gates. Code names below
are now implemented v1 diagnostic families rather than placeholders.

## A. Contract, versions, and outcomes

1. **Valid Data Event:** A deployable JavaScript Data Event with a literal supported
   hook, known field, valid callback, and permitted API completes all requested
   checks and returns `valid` only when coverage is complete.
2. **Invalid artifact:** A syntax, signature, hook, callback, field, or calculation
   restriction error returns `invalid`, with stable diagnostic severity and a source
   range/path.
3. **Incomplete coverage:** A computed field/event/API reference is reported as
   unverified/skipped coverage and cannot silently produce unqualified `valid`.
4. **Unavailable dependency:** Compiler/declaration/runtime mismatch, missing
   approved context, cancellation, or checker outage is distinct from invalid
   source and returns the approved `incomplete`/`unavailable` outcome.
5. **Version honesty:** Every result identifies the exact checker, TypeScript
   compiler, declaration, expression-runtime, profile, and contract versions
   required by the approved envelope.
6. **Bounded output:** Diagnostic count and serialized response limits are enforced
   without echoing the complete input source.

## B. JavaScript and TypeScript syntax

7. **TypeScript-only rejection:** `interface`, type annotations, `as` assertions,
   enums, namespaces, decorators, and other approved TS-only constructs are
   rejected as non-deployable input.
8. **Deployable JavaScript acceptance:** Ordinary ES/JavaScript syntax supported by
   the declared runtime is accepted without requiring Monaco or a browser.
9. **Module/dependency rejection:** `import`, `export`, arbitrary `require`, dynamic
   imports, and dependency metadata are rejected or marked unsupported according
   to the approved deployability policy.
10. **Parser range stability:** A malformed source reports bounded, deterministic
    ranges and does not crash or emit generated code.

## C. Data Event profile

11. **Hook overload success:** Each approved literal form/field/repeatable/media/
    geometry hook overload accepts its correct callback shape.
12. **Invalid hook name:** A literal unknown event name is diagnosed.
13. **Invalid hook target:** A literal field target with the wrong form type (for
    example, a media hook on a non-media field) is diagnosed.
14. **Callback mismatch:** Wrong callback arity or incompatible event value/field
    use is diagnosed using the pinned declarations.
15. **Field reference success:** Literal `$data_name`, `FIELD`, `VALUE`, hook
    target, and setter references resolve against a supplied form.
16. **Unknown literal field:** A literal field name absent from the supplied form is
    diagnosed even though the base declaration aliases field names to `string`.
17. **Nullable declaration:** A field whose runtime value may be null/undefined
    requires appropriate narrowing; the checker does not invent a non-null value.
18. **Dynamic field coverage:** A computed field name is marked unverified rather
    than guessed valid or invalid.
19. **Async callback shapes:** `REQUEST`, `LOADFORM`, `LOADRECORDS`, and other
    approved callback signatures are checked statically; no callback runs.

## D. Calculation profile

20. **Pure calculation success:** A pure permitted function and literal field
    dependency pass under the calculation profile.
21. **Forbidden hook/mutation:** `ON`, `OFF`, `SETVALUE`, form/record mutation,
    UI/result operations, or timer/storage calls that the runtime forbids in a
    calculation produce errors.
22. **Forbidden host I/O:** `REQUEST`, `LOADFILE`, `LOADFORM`, `LOADRECORDS`,
    inference/recognition, or other approved host operations are rejected when
    statically detectable.
23. **Profile separation:** The same source is not treated as equally valid merely
    because a Data Event profile permits an API that the calculation profile
    forbids.
24. **Dynamic forbidden call:** Computed function/property names are reported as
    unverified coverage, not executed and not treated as safe.
25. **Literal dependency graph:** Direct calculation field dependencies are
    reported with the approved location/path model.
26. **Repeatable scope success:** A calculation using repeatable helpers in a
    supplied repeatable context passes when the references are valid.
27. **Repeatable scope error:** A provably invalid parent/child repeatable
    reference, unavailable repeatable context, or invalid repeatable helper use is
    diagnosed.

## E. Non-execution and isolation

28. **Throwing canary:** Source that would throw immediately if evaluated produces
    static diagnostics/results without throwing in the checker process.
29. **Mutation canary:** Source attempts to mutate a sentinel object or global;
    the sentinel and process globals remain unchanged.
30. **Filesystem/import canary:** Source attempts `require`, imports, or path
    traversal; no filesystem/module resolution occurs.
31. **Network canary:** Source contains URL/request code; no network client is
    called and no URL is fetched.
32. **Runtime isolation:** The checker does not initialize `runtime.coffee`,
    browser globals, host callbacks, or production expression state.
33. **Repeatability:** Repeated analyses with identical input/version/context are
    deterministic and do not share declarations, hooks, diagnostics, or mutable
    compiler state.
34. **Secret redaction:** Secret-like source is not copied into logs, telemetry,
    thrown errors, or diagnostic excerpts. Coordinate FLCRM-21371 rather than
    implementing a duplicate scanner or logging candidate values.

## F. Limits and boundary failures

35. **Oversized source/form:** Inputs over the approved byte or declaration limits
    return a bounded limit result without allocation runaway.
36. **Deep/complex source:** Deep nesting, large arrays, and diagnostic floods are
    bounded by the approved compiler/work/output limits.
37. **Timeout/cancellation:** A timed-out or cancelled run terminates cleanly,
    returns the approved unavailable/incomplete reason, and does not leak state.
38. **Concurrency:** Concurrent requests cannot observe one another's form fields,
    declarations, versions, or diagnostics.
39. **Unsupported runtime:** An unsupported declared runtime/declaration pairing
    is explicit and never reported as a successful validation.
40. **Malformed request context:** Missing profile, source, form context required
    for a requested check, or invalid version metadata is a structured request
    failure and does not invoke analysis side effects.

## G. Packaging and regression checks

41. **Deployable `.js`:** The approved build emits a Node/worker-compatible
    checker artifact without requiring Monaco, `window`, or the CoffeeScript
    expression bundle.
42. **Runtime preservation:** Existing `yarn build`, CoffeeScript bundle behavior,
    and test fixtures remain unchanged; the checker does not replace
    `dist/expressions.js`.
43. **Declaration provenance:** The checker consumes the pinned declaration output
    and reports its generator/compiler/runtime identity.
44. **Package distinction:** The scoped web package and unscoped report-generator
    legacy package remain separate; no accidental alias or entry-point collision
    is introduced.
45. **Clean installation:** The approved package/worker artifact works from a
    clean install using the repository's Node/Yarn toolchain and does not install
    user-supplied dependencies.
46. **Existing quality commands:** Run and record `yarn build`, `yarn test`, and
    `make types` where applicable, plus any repository lint command if one is
    added/approved. The current repository has no dedicated lint script; this is
    an evidence limitation, not a skipped requirement.

## Implementation evidence

* Scenarios 1–3, 5–8, 10–18, 20–26, 28–36, 38, 39, 42–44, and the no-source-
  logging portions of 34 are covered by `test/checker.coffee` and the targeted
  smoke checks recorded in `test-results.log`.
* Scenario 4 and the unavailable branch of 37 are represented by version,
  cancellation, compiler-exception, and bounded-limit result paths. A worker
  still owns hard wall-clock/memory/concurrency enforcement.
* Scenarios 9, 19, 22, 24, 30, and 31 are enforced by the fixed virtual host and
  AST policy; no submitted module, filesystem path, or URL is resolved.
* Scenario 41 is satisfied by the deployable CommonJS `./checker` entry point
  and bundled declaration/standard-library modules; it does not replace
  `dist/expressions.js`.
* Scenario 40 (unsupported runtime), 45 (clean consumer installation), and the
  Ruby-gated completion of 46 remain evidence limitations. `make types` reached
  dts-generator but could not run `script/build.rb` because Ruby 3.2.0 is not
  installed in asdf; no publication or deployment was attempted.

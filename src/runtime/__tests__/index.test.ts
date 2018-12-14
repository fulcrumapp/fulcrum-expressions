import form from "../../test/fixtures/form"
import Runtime from "../index"

test("the runtime can be prepared with a form schema", () => {
  const runtime = new Runtime()
  runtime.form = form

  runtime.prepare()

  expect(runtime.statusesByValue).toEqual({ approved: "Approved" })

  expect(runtime.elements).toHaveLength(7)
  expect(runtime.elementsByKey["97ab"].type).toEqual("TextField")
  expect(runtime.elementsByDataName.name.type).toEqual("TextField")
  expect(runtime.dataNames["97ab"]).toEqual("name")
})

test("using invokeAsync and finishAsync, it can start the process of a host long running process", () => {
  const runtime = new Runtime()
  runtime.hooksInitialized = true

  const func = jest.fn()
  const callback = jest.fn()
  const callbackID = 1

  runtime.invokeAsync(func, ["abc"], callback)

  expect(runtime.asyncCount).toEqual(callbackID)
  expect(runtime.asyncCallbacks[callbackID]).toBe(callback)
  expect(func).toHaveBeenCalledWith("abc", callbackID)

  const callbackArguments = ["foo"]

  runtime.results = [{ type: "message" }]
  runtime.callbackID = 1
  runtime.callbackArguments = callbackArguments

  expect(runtime.finishAsync()).toEqual([])
  expect(runtime.asyncCallbacks[1]).toBeUndefined()
  expect(callback).toHaveBeenCalledWith(...callbackArguments)
  expect(runtime.isCalculation).toBeFalsy()
})

test("Adding a callback without an event generates an array of callbacks", () => {
  const runtime = new Runtime()
  const callback = jest.fn()

  runtime.addHook("new-record", null, callback)

  expect(runtime.events["new-record"].__no_param).toEqual([callback])

  runtime.removeHook("new-record", null, callback)
})

test("Adding one with an event generates an object of callbacks", () => {
  const runtime = new Runtime()
  const callback = jest.fn()

  runtime.addHook("blur", "my_label", callback)

  expect(runtime.events.blur.my_label).toEqual([callback])

  runtime.removeHook("blur", "my_label", callback)

  expect(runtime.events.blur.my_label).toEqual([])
})

test("initializes script if necessary", () => {
  const runtime = new Runtime()
  runtime.script = "$$runtime.foo = 'bar'"

  expect(runtime.initializeScriptIfNecessary()).toBeUndefined()
  expect(runtime.scriptInitialized).toEqual(true)
  expect(runtime.foo).toEqual("bar")
})

test("clearValues function clears values without resetting previous variable", () => {
  const runtime = new Runtime()
  runtime.variables = { foo: "bar", fizz: "buzz" }
  runtime.clearValues()
  expect(runtime.variables).toEqual({})
})

test("setupValues populates the variables object", () => {
  const runtime = new Runtime()
  runtime.form = form
  runtime.values = {
    "97ab": "Test Record",
    // tslint:disable-next-line:object-literal-sort-keys
    "1338": 1,
    "362a": {
      choice_values: [ "widget" ],
      other_values: [],
    },
  }
  // object in extraVariableNames array, values injected by host during setup
  runtime.locale = "en-US"
  runtime.customVariables = { foo: "bar", fizz: "buzz" }
  runtime.prepare()

  runtime.setupValues()

  expect(runtime.variables.$name).toEqual("Test Record")
  expect(runtime.variables.$cost).toEqual(1)
  expect(runtime.variables.$choice_value).toEqual({ choice_values: [ "widget" ], other_values: [] })
  expect(runtime.variables.$child_item_cost).toBeUndefined()
  expect(runtime.variables.$$locale).toEqual("en-US")
  expect(runtime.variables.$$decimalSeparator).toBeUndefined()
  expect(runtime.variables.foo).toEqual("bar")
  expect(runtime.variables.fizz).toEqual("buzz")
})

// TODO jirles: Not clear if these tests are needed. Evaluate how $$HOST interacts (if at all)
// with the new `addHook` method and then either delete or uncomment
//
// test("hookName returns a formatted hook name or null if it receives not parameters", () => {
//   const runtime = new Runtime()

//   expect(runtime.hookName("blur")).toEqual("hook_blur")
//   // @ts-ignore No parameters to get null result
//   expect(runtime.hookName()).toBeNull()
// })

// test("hooksByName returns a event grouping object according to the name passed in", () => {
//   const runtime = new Runtime()
//   runtime.events = {
//     hook_blur: {
//       hook_test: [
//         () => true,
//         () => false,
//       ],
//     },
//   }

//   expect(runtime.hooksByName("blur")).toEqual(runtime.events.hook_blur)
//   expect(runtime.hooksByName("click")).toEqual([])
//   // @ts-ignore No parameters to ensure it doesn't break
//   expect(runtime.hooksByName()).toEqual([])
// })

// test("hooksByParams returns an array of event Functions when passed an event name and parameter", () => {
//   const runtime = new Runtime()
//   runtime.events = {
//     hook_blur: {
//       "hook_edit-record": [
//         () => true,
//         () => false,
//       ],
//     },
//   }
//   expect(runtime.hooksByParams("blur", "edit-record")).toEqual(runtime.events.hook_blur["hook_edit-record"])
//   expect(runtime.hooksByParams("click", "edit-record")).toEqual([])
//   // @ts-ignore passed in incorrect record event on purpose
//   expect(runtime.hooksByParams("blur", "nonexistant")).toEqual([])
//   // @ts-ignore No parameters to ensure it doesn't break
//   expect(runtime.hooksByParams()).toEqual([])
// })

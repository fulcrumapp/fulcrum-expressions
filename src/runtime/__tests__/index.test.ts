import ABS from "../../functions/ABS"
import ACOS from "../../functions/ACOS"
import ISLOGICAL from "../../functions/ISLOGICAL"
import NUM from "../../functions/NUM"
import form from "../../test/fixtures/form"
import Runtime, { WindowWithRuntime } from "../index"

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

test("it sets up the data-events functions on initialization", () => {
  const runtime = new Runtime()
  expect(runtime.functions.ABS).toEqual(ABS)
  expect(runtime.functions.ACOS).toEqual(ACOS)
  expect(runtime.functions.NUM).toEqual(NUM)
  expect(runtime.functions.ISLOGICAL).toEqual(ISLOGICAL)
  // 172 functions + NO_VALUE = 173 items expected
  expect(Object.keys(runtime.functions).length).toEqual(173)
  // @ts-ignore ABS will exist once runtime is initialized
  expect(runtime.global.ABS(-4)).toEqual(4)
  // @ts-ignore NUM will exist once runtime is initialized
  expect(runtime.global.NUM("test")).toBeNaN()
  // @ts-ignore NO_VALUE will exist once runtime is initialized
  expect(runtime.global.NO_VALUE()).toBeUndefined()
})

test("it doesn't allow special functions to run during a calculation", () => {
  const runtime = new Runtime()
  runtime.isCalculation = true
  const expectErrorWrapper = () => {
    // @ts-ignore ALERT will exist once runtime is initialized
    runtime.global.ALERT("Fail") 
  }
  expect(expectErrorWrapper).toThrow("ALERT cannot be used in a calculation")
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

test("without a callbackId finishAsync returns an empty array", () => {
  const runtime = new Runtime()
  expect(runtime.finishAsync()).toEqual([])
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
  runtime.script = "this.foo = 'bar'"
  // initializeScriptIfNecessary will set foo and fizz as properties of runtime
  runtime.variables = {
    foo: "not bar",
    fizz: "buzz"
  }
  expect(runtime.initializeScriptIfNecessary()).toBeUndefined()
  expect(runtime.scriptInitialized).toEqual(true)
  // @ts-ignore foo will exists on runtime after script runs
  expect(runtime.foo).toEqual("bar")
  // @ts-ignore fizz will exists on runtime after function runs
  expect(runtime.fizz).toEqual("buzz")
})

test("does not initialize a script if one has already been run", () => {
  const runtime = new Runtime()
  runtime.script = "this.foo = 'bar'"
  // once initializeScriptIfNecessary is run it sets scriptInitialized to true
  runtime.initializeScriptIfNecessary()
  // @ts-ignore foo will exists on runtime after script runs  
  expect(runtime.foo).toEqual("bar")
  runtime.script = "this.foo = null"
  // once initializeScriptIfNecessary is run it sets scriptInitialized to true
  expect(runtime.scriptInitialized).toBe(true)
  // so a script won't run a second time
  runtime.initializeScriptIfNecessary()
  // @ts-ignore 
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

test("evaluates an expression and formats the value if needed", () => {
  const context = { dataName: "cost", key: "1338", expression: "9 * 2" }
  const expectedResult = { type: "calculation", key: "1338", error: null, value: 18 }
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
  runtime.prepare()
  runtime.setupValues()
  const actualResult = runtime.evaluateExpression(context)
  expect(actualResult).toEqual(expectedResult)
  expect(runtime.variables.$cost).toEqual(18)
})

test("evaluateExpression returns a calculation result", () => {
  const context = {
    dataName: "name",
    key: "97ab",
    // tslint:disable-next-line:object-literal-sort-keys
    expression: "if (this.variables.$name === 'Test Record') { 'It worked' } else { 'nope' }",
  }
  const expectedResult = { type: "calculation", key: "97ab", error: null, value: "It worked" }
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
  runtime.prepare()
  runtime.setupValues()
  const actualResult = runtime.evaluateExpression(context)
  expect(actualResult).toEqual(expectedResult)
  expect(runtime.variables.$name).toEqual("It worked")
})

test("evaluteExpression throws an error to the console and adds the error message to the result", () => {
  let outputData = ""
  const storeLog = (inputs: string) => (outputData += inputs)
  // tslint:disable-next-line:no-console
  console.log = jest.fn(storeLog)
  const context = {
    dataName: "name",
    key: "97ab",
    // tslint:disable-next-line:object-literal-sort-keys
    expression: "return 'this is an illegal return statment'",
  }
  const expectedResult = {
    type: "calculation",
    // tslint:disable-next-line:object-literal-sort-keys
    key: "97ab",
    error: "SyntaxError: Illegal return statement",
    value: null }
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
  runtime.prepare()
  runtime.setupValues()
  const actualResult = runtime.evaluateExpression(context)
  expect(actualResult).toEqual(expectedResult)
  expect(runtime.variables.$name).toBeUndefined()
  expect(outputData).toEqual("JS ERROR : name : SyntaxError: Illegal return statement")
})

test("it evaluates an array of expressions and pushes results to runtime", () => {
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
  runtime.expressions = [
    {
      dataName: "name",
      key: "97ab",
      // tslint:disable-next-line:object-literal-sort-keys
      expression: "if (this.variables.$name === 'Test Record') { 'It worked' } else { 'nope' }",
    },
    {
      dataName: "cost",
      key: "1338",
      // tslint:disable-next-line:object-literal-sort-keys
      expression: "9 * 2",
    },
  ]
  runtime.prepare()
  runtime.evaluate()

  expect(runtime.results.length).toBe(2)
  expect(runtime.results[1]).toEqual({ type: "calculation", key: "1338", error: null, value: 18 })
  expect(runtime.results[0]).toEqual({ type: "calculation", key: "97ab", error: null, value: "It worked" })
})

test("triggers a series of callbacks when a form-level event occurs", () => {
  const setResult = () => $$runtime.results.push({ type: "calculation", key: "1338", error: null, value: 18 })
  const runtime = new Runtime()
  const callback = jest.fn(setResult)

  runtime.addHook("blur", "my_label", callback)
  runtime.addHook("blur", "my_label", callback)
  runtime.form = form
  runtime.prepare()
  runtime.event = { name: "blur", field: "my_label" }

  runtime.trigger()
  expect(callback).toHaveBeenCalledTimes(2)
  expect(runtime.isCalculation).toBe(false)
  expect(runtime.results.length).toBe(2)
  expect(runtime.results[1]).toEqual({ type: "calculation", key: "1338", error: null, value: 18 })
})

test("event property has optional field key", () => {
  const setResult = () => $$runtime.results.push({ type: "calculation", key: "1338", error: null, value: 18 })
  const runtime = new Runtime()
  const callback = jest.fn(setResult)

  runtime.addHook("blur", null, callback)
  runtime.event = { name: "blur" }
  runtime.trigger()

  expect(callback).toHaveBeenCalled()
  expect(runtime.results[0]).toEqual({ type: "calculation", key: "1338", error: null, value: 18 })
})

test("returns results if a callback is not triggered based on the events table", () => {
  const setResult = () => $$runtime.results.push({ type: "calculation", key: "1338", error: null, value: 18 })
  const runtime = new Runtime()
  const callback = jest.fn(setResult)

  runtime.addHook("blur", "my_label", callback)
  runtime.addHook("blur", "my_label", callback)
  runtime.form = form
  runtime.prepare()
  runtime.results = [{ type: "calculation", key: "97ab", error: null, value: "test" }]
  runtime.event = { name: "change", field: "my_label" }

  const results = runtime.trigger()
  expect(callback).not.toHaveBeenCalled()
  expect(runtime.results.length).toBe(1)
  expect(results[0]).toEqual({ type: "calculation", key: "97ab", error: null, value: "test" })
})

test("defaults to window on initialization if it cannot get direct access to the global scope", () => {
  const spy = jest.spyOn(global, "Function")
  spy.mockReturnValue(undefined)
  const firstRuntime = new Runtime()
  expect(spy).toHaveBeenCalled()
  expect(firstRuntime.global).toEqual(window as WindowWithRuntime)
  expect(firstRuntime.global.navigator).toBeDefined()

  spy.mockRestore()
  // checking that spy restored original implementation of Function and reset mock values
  new Runtime()
  expect(spy).not.toHaveBeenCalled()
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

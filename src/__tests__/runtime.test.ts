import Runtime from "../runtime"

test("using invokeAsync and finishAsync, it can start the process of a host long running process", () => {
  const runtime = new Runtime

  const func = jest.fn()
  const callback = jest.fn()
  const callbackID = 1

  runtime.invokeAsync(func, ['abc'], callback)

  expect(runtime.asyncCount).toEqual(callbackID)
  expect(runtime.asyncCallbacks[callbackID]).toBe(callback)
  expect(func).toHaveBeenCalledWith('abc', callbackID)

  const callbackArguments = ['foo']

  runtime.callbackID = 1
  runtime.callbackArguments = callbackArguments
  runtime.isCalculation = true

  runtime.finishAsync()

  expect(runtime.asyncCallbacks[1]).toBeUndefined()
  expect(callback).toHaveBeenCalledWith(...callbackArguments)
  expect(runtime.isCalculation).toBeFalsy()
})

test("Adding a callback without an event generates an array of callbacks", () => {
  const runtime = new Runtime
  const callback = jest.fn()

  runtime.addHook("new-record", null, callback)

  expect(runtime.events["new-record"]["__no_param"]).toEqual([callback])

  runtime.removeHook("new-record", null, callback)
})

test("Adding one with an event generates an object of callbacks", () => {
  const runtime = new Runtime
  const callback = jest.fn()

  runtime.addHook("blur", "my_label", callback)

  expect(runtime.events.blur.my_label).toEqual([callback])

  runtime.removeHook("blur", "my_label", callback)

  expect(runtime.events.blur.my_label).toEqual([])
})

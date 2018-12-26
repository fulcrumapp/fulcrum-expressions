import { prepareRuntime } from "../../test/helpers"
import hostSetTimeout from "../set-timeout"
import { resetState, state } from "../state"

beforeEach(() => {
  prepareRuntime()
  resetState()
})

test("sets a function to be called after a certain duration", () => {
  const duration = 100
  const callback = jest.fn()
  const mock = $$runtime.$$setTimeout = jest.fn()

  hostSetTimeout(callback, duration)

  const hostState = state()

  expect(hostState.nextTimeoutID).toEqual(1)
  expect(hostState.timeouts[1]).not.toBeUndefined()
  expect(mock).toHaveBeenCalledWith(duration, 1)
})

test("if setTimeout is not available on host it returns immediately", () => {
  const duration = 100
  const callback = jest.fn()
  $$runtime.$$setTimeout = undefined

  const hostState = state()

  expect(hostSetTimeout(callback, duration)).toBeUndefined()
  expect(hostState.nextTimeoutID).toEqual(0)
  expect(hostState.timeouts[1]).toBeUndefined()
})


test("it wraps the callback and adds the wrapper to updates state timeouts by id", () => {
  const duration = 100
  const callback = jest.fn()
  $$runtime.$$setTimeout = jest.fn()

  hostSetTimeout(callback, duration)

  const hostState = state()
  // immediately call the wrapper function returned from state().timeouts object
  hostState.timeouts[1]()

  expect(callback).toHaveBeenCalled()
  // wrapper deletes function from state().timeouts object 
  expect(hostState.timeouts[1]).toBeUndefined()
})
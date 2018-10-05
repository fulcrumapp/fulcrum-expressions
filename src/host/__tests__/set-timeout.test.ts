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

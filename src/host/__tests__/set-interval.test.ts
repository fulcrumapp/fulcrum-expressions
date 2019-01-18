import { prepareRuntime } from "../../test/helpers"
import hostSetInterval from "../set-interval"
import { resetState, state } from "../state"

beforeEach(() => {
  prepareRuntime()
  resetState()
})

test("sets a function to be called after a certain duration", () => {
  const duration = 100
  const callback = jest.fn()
  const mockedAsync = $$runtime.invokeAsync = jest.fn()
  const hostState = state()

  expect(hostSetInterval(callback, duration)).toBe(1)
  expect(hostState.nextIntervalID).toEqual(1)
  expect(hostState.intervals[1]).toBeDefined()

  hostState.intervals[1]()
  expect(mockedAsync).toHaveBeenCalled()
})

test("if setTimeout is not available on host it returns immediately", () => {
  const duration = 100
  const callback = jest.fn()
  $$runtime.$$setTimeout = undefined

  const hostState = state()

  expect(hostSetInterval(callback, duration)).toBeUndefined()
  expect(hostState.nextIntervalID).toEqual(0)
  expect(hostState.intervals[1]).toBeUndefined()
})
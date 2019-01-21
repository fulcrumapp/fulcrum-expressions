import { prepareRuntime } from "../../test/helpers"
import hostClearInterval from "../clear-interval"
import { resetState, state } from "../state"

beforeEach(() => {
  prepareRuntime()
  resetState()
})

test("it clears the timeout from the state", () => {
  const hostState = state()

  hostState.intervals[1] = 1
  hostState.timeouts[1] = jest.fn()

  hostClearInterval(1)

  expect(hostState.intervals[1]).toBeUndefined()
  expect(hostState.timeouts[1]).toBeUndefined()
})
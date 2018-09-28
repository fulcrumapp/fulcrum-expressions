import { prepareRuntime } from "../../test/helpers"
import { state, resetState } from "../state"
import hostClearTimeout from "../clear-timeout"

beforeEach(() => {
  prepareRuntime()
  resetState()
})

test("it clears the timeout from the state", () => {
  const hostState = state()

  hostState.timeouts[1] = jest.fn()

  hostClearTimeout(1)

  expect(hostState.timeouts[1]).toBeUndefined()
})

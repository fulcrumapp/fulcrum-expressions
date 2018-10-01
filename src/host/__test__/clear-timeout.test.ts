import { prepareRuntime } from "../../test/helpers"
import hostClearTimeout from "../clear-timeout"
import { resetState, state } from "../state"

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

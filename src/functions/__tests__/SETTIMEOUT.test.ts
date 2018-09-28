import { prepareRuntime } from "../../test-helpers"
import SETTIMEOUT from "../SETTIMEOUT"

beforeEach(prepareRuntime)

test("it dispatches an a settimeout to the host", () => {
  const callback = jest.fn()
  const timeout = 1000

  const mock = $$runtime.$$setTimeout = jest.fn()

  SETTIMEOUT(callback, timeout)

  expect(mock).toHaveBeenCalledWith(timeout, 1)
})

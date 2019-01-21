import { prepareRuntime } from "../../test/helpers"
import SETINTERVAL from "../SETINTERVAL"

beforeEach(prepareRuntime)

test("it sets an interval timer and dispatches a setTimeout to hosts", () => {
  const callback = jest.fn()
  const timeout = 1000

  const mock = $$runtime.$$setTimeout = jest.fn()

  SETINTERVAL(callback, timeout)

  expect(mock).toHaveBeenCalledWith(timeout, 1)
})

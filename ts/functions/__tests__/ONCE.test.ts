import { prepareRuntime } from "../../test/helpers"
import ONCE from "../ONCE"
import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import PLATFORMINFO from "../PLATFORMINFO"

beforeEach(() => {
  prepareRuntime()
  RESETCONFIG()
})

test("it returns the value given the current value on runtime", () => {
  CONFIGURE({ platform: "iOS", platformVersion: "2.0" })
  expect(ONCE(PLATFORMINFO())).toBe("iOS, 2.0")

  // but if $$runtime.currentValue is present, it returns that value
  $$runtime.currentValue = "something else"
  expect(ONCE(PLATFORMINFO())).toBe("something else")
})
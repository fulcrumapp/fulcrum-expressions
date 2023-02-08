import EVEN from "../EVEN"
import ISERR from "../ISERR"

test("tests for an error", () => {
  expect(ISERR(EVEN(null))).toBe(true)
  expect(ISERR(EVEN(7))).toBe(false)
  expect(ISERR(new Error())).toBe(true)
})

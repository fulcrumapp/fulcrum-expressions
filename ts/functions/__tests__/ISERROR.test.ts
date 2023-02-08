import ISERR from "../ISERR"
import ISERROR from "../ISERROR"
import EVEN from "../EVEN"

test("is an alias for ISERR", () => {
  expect(ISERROR(EVEN(null))).toBe(ISERR(EVEN(null)))
  expect(ISERROR(EVEN(7))).toBe(ISERR(EVEN(7)))
  expect(ISERROR(new Error())).toBe(ISERR(new Error()))
})

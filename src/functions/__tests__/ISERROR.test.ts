import ISERR from "../ISERR"
import ISERROR from "../ISERROR"

test("is an alias for ISERR", () => {
  expect(ISERROR).toBe(ISERR)
})

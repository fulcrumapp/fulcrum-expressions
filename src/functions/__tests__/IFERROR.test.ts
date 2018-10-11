import EVEN from "../EVEN"
import IFERROR from "../IFERROR"

test("evaluates an error", () => {
  expect(IFERROR(EVEN(null), "ERR")).toEqual("ERR")
  expect(IFERROR(EVEN(7), "ERR")).toEqual(8)
})

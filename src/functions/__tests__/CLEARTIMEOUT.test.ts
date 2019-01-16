import CLEARTIMEOUT from "../CLEARTIMEOUT"
import clearTimeout from "../../host/clear-timeout"

test("is alias of clearTimeout host function", () => {
  expect(CLEARTIMEOUT).toBe(clearTimeout)
})
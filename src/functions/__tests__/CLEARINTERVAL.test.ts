import CLEARINTERVAL from "../CLEARINTERVAL"
import clearInterval from "../../host/clear-interval"

test("is alias of clearInterval host function", () => {
  expect(CLEARINTERVAL).toBe(clearInterval)
})
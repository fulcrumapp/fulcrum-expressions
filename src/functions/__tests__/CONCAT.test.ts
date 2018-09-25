import CONCAT from "../CONCAT"
import CONCATENATE from "../CONCATENATE"

test("the CONCAT function is aliased", () => {
  expect(CONCAT).toBe(CONCATENATE)
})

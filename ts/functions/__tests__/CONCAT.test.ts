import CONCAT from "../CONCAT"
import CONCATENATE from "../CONCATENATE"

test("the CONCAT function is an alias for CONCATENATE", () => {
  expect(CONCAT()).toBe(CONCATENATE())
  expect(CONCAT("hi", " ", "there")).toBe(CONCATENATE("hi", " ", "there"))
})
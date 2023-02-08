import FLOOR from "../FLOOR"
import INT from "../INT"

test("the INT function is aliased", () => {
  expect(INT(3.99)).toBe(FLOOR(3.99))
})

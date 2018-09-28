import FLOOR from "../FLOOR"
import INT from "../INT"

test("the INT function is aliased", () => {
  expect(INT).toBe(FLOOR)
})

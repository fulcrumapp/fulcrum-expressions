import SETDISABLED from "../SETDISABLED"
import SETREADONLY from "../SETREADONLY"

test("SETDISABLED is an alias for SETREADONLY", () => {
  expect(SETDISABLED).toBe(SETREADONLY)
})
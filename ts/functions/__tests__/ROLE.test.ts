import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import ROLE from "../ROLE"

beforeEach(RESETCONFIG)

test("it returns the current user role from the configuration object", () => {
  CONFIGURE({ userRoleName: "Standard User" })
  expect(ROLE()).toBe("Standard User")
})

test("it returns undefined if the user role is not set yet", () => {
  expect(ROLE()).toBeUndefined()
})

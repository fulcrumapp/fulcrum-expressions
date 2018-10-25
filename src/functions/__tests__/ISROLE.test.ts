import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import ISROLE from "../ISROLE"

beforeEach(RESETCONFIG)

test("checks to see if the current users role among the params", () => {
  CONFIGURE({ userRoleName: "Standard" })

  expect(ISROLE("Admin")).toBe(false)
  expect(ISROLE("Admin", "Standard")).toBe(true)
  expect(ISROLE(1, 2, 3)).toBe(false)
  expect(ISROLE(null)).toBe(false)
})

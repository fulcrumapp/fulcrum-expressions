import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import EMAIL from "../EMAIL"

beforeEach(RESETCONFIG)

test("returns the current user's email if present", () => {
  CONFIGURE({ userEmail: "test@example.com" })
  expect(EMAIL()).toBe("test@example.com")
})

test("it returns undefined if the userEmail is not set", () => {
  // default is that userEmail does not exist
  expect(EMAIL()).toBeUndefined()
})

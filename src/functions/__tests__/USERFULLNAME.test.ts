import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import USERFULLNAME from "../USERFULLNAME"

beforeEach(RESETCONFIG)

test("returns the current user's full name if present", () => {
  CONFIGURE({ userFullName: "Jane Doe" })
  expect(USERFULLNAME()).toBe("Jane Doe")
})

test("it returns undefined if the userFullName is not set", () => {
  // default is that userFullName does not exist
  expect(USERFULLNAME()).toBeUndefined()
})

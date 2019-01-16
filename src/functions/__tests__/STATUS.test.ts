import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import STATUS from "../STATUS"

beforeEach(RESETCONFIG)

test("returns the record status from the configuration object", () => {
  // defaults to undefined
  expect(STATUS()).toBeUndefined()

  CONFIGURE({ recordStatus: "pending" })
  expect(STATUS()).toBe("pending")
})
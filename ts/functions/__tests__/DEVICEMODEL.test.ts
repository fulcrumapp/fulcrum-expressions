import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import DEVICEMODEL from "../DEVICEMODEL"

beforeEach(RESETCONFIG)

test("returns the device model from the configuration object", () => {
  // defaults to ""
  expect(DEVICEMODEL()).toBe("")

  CONFIGURE({ deviceModel: "MQCK2ll/A" })
  expect(DEVICEMODEL()).toBe("MQCK2ll/A")
})

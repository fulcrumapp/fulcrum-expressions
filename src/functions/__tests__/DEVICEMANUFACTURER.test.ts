import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import DEVICEMANUFACTURER from "../DEVICEMANUFACTURER"

beforeEach(RESETCONFIG)

test("returns device manufacturer or an empty string", () => {
  // returns an empty string if device manufacturer is not set
  expect(DEVICEMANUFACTURER()).toBe("")

  CONFIGURE({ deviceManufacturer: "Apple" })
  expect(DEVICEMANUFACTURER()).toBe("Apple")
})

import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import PLATFORMVERSION from "../PLATFORMVERSION"

beforeEach(RESETCONFIG)

test("it returns the platform version name from the configuration object", () => {
  // default set to US
  expect(PLATFORMVERSION()).toBe("")

  CONFIGURE({ platformVersion: "1.0.2" })
  expect(PLATFORMVERSION()).toBe("1.0.2")
})

test("it returns the default platformVersion name if it is not present on configuration obejct", () => {
  CONFIGURE({ platformVersion: "1.0.2" })
  expect(PLATFORMVERSION()).toBe("1.0.2")

  // passing in false overwrites the entire config object so the key
  // platformVersion no longer exists
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(PLATFORMVERSION()).toBe("")
})

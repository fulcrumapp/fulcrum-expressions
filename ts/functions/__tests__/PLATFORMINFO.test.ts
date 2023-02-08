import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import PLATFORMINFO from "../PLATFORMINFO"

beforeEach(RESETCONFIG)

test("it returns the platform info from the configuration object", () => {
  // default set to US
  expect(PLATFORMINFO()).toBe("")

  CONFIGURE({ platform: "iOS", platformVersion: "2.0" })
  expect(PLATFORMINFO()).toBe("iOS, 2.0")
})

test("it returns the default platform name if it is not present on configuration obejct", () => {
  CONFIGURE({ platform: "Android", platformVersion: "2.0.1" })
  expect(PLATFORMINFO()).toBe("Android, 2.0.1")

  // passing in false overwrites the entire config object so the key
  // platformInfo no longer exists
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(PLATFORMINFO()).toBe("")
})

test("allows user to choose a separator", () => {
  CONFIGURE({ platform: "Android", platformVersion: "2.0.1" })
  expect(PLATFORMINFO(" - ")).toBe("Android - 2.0.1")
})

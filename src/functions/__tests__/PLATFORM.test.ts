import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import PLATFORM from "../PLATFORM"

beforeEach(RESETCONFIG)

test("it returns the platform name from the configuration object", () => {
  // default set to US
  expect(PLATFORM()).toBe("")

  CONFIGURE({ platform: "iOS" })
  expect(PLATFORM()).toBe("iOS")
})

test("it returns the default platform name if it is not present on configuration obejct", () => {
  CONFIGURE({ platform: "Android" })
  expect(PLATFORM()).toBe("Android")

  // passing in false overwrites the entire config object so the key
  // platform no longer exists
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(PLATFORM()).toBe("")
})

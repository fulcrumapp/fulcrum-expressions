import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import TIMEZONE from "../TIMEZONE"

beforeEach(RESETCONFIG)

test("it returns the timezone from the configuration object", () => {
  // default set to UTC
  expect(TIMEZONE()).toBe("UTC")

  CONFIGURE({timeZone: "ECT"})
  expect(TIMEZONE()).toBe("ECT")
})

test("it returns the default timezone if timeZone is not present on configuration obejct", () => {
  CONFIGURE({timeZone: "ECT"})
  expect(TIMEZONE()).toBe("ECT")

  // passing in false overwrites the entire config object so the key
  // timeZone no longer exists
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(TIMEZONE()).toBe("UTC")
})

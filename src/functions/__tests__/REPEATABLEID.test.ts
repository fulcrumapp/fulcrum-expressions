import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import REPEATABLEID from "../REPEATABLEID"

beforeEach(RESETCONFIG)

test("it returns the REPEATABLE ID from the configuration object", () => {
  // default set to undefined
  expect(REPEATABLEID()).toBeUndefined()

  CONFIGURE({ featureID: "9829" })
  expect(REPEATABLEID()).toBe("9829")
})

test("it returns the default REPEATABLE ID if it is not present on configuration obejct", () => {
  CONFIGURE({ featureID: "9829" })
  expect(REPEATABLEID()).toBe("9829")

  // passing in false overwrites the entire config object so the key
  // featureID no longer exists
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(REPEATABLEID()).toBeUndefined()
})

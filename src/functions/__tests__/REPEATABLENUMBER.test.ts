import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import REPEATABLENUMBER from "../REPEATABLENUMBER"

beforeEach(RESETCONFIG)

test("it returns the current repeatable field's index from the configuration object", () => {
  // default set to undefined
  expect(REPEATABLENUMBER()).toBeUndefined()

  CONFIGURE({ featureIndex: 1 })
  expect(REPEATABLENUMBER()).toBe(2)
})

test("it returns the undefined if it is not present on configuration obejct", () => {
  CONFIGURE({ featureIndex: 1 })
  expect(REPEATABLENUMBER()).toBe(2)

  // passing in false overwrites the entire config object so the key
  // featureID no longer exists
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(REPEATABLENUMBER()).toBeUndefined()
})

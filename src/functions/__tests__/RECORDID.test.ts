import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import RECORDID from "../RECORDID"

beforeEach(RESETCONFIG)

test("it returns the recordID from the configuration object", () => {
  // default set to undefined
  expect(RECORDID()).toBeUndefined()

  CONFIGURE({ recordID: "9829" })
  expect(RECORDID()).toBe("9829")
})

test("it returns the default recordID if it is not present on configuration obejct", () => {
  CONFIGURE({ recordID: "9829" })
  expect(RECORDID()).toBe("9829")

  // passing in false overwrites the entire config object so the key
  // recordID no longer exists
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(RECORDID()).toBeUndefined()
})

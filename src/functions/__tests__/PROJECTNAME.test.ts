import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import PROJECTNAME from "../PROJECTNAME"

beforeEach(RESETCONFIG)

test("it returns the project name from the configuration object", () => {
  // default set to undefined
  expect(PROJECTNAME()).toBeUndefined()

  CONFIGURE({ recordProjectName: "NAS" })
  expect(PROJECTNAME()).toBe("NAS")
})

test("it returns undefined if it is not present on configuration obejct", () => {
  CONFIGURE({ recordProjectName: "NAS" })
  expect(PROJECTNAME()).toBe("NAS")

  // passing in false overwrites the entire config object so the key
  // recordProjectName no longer exists
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(PROJECTNAME()).toBeUndefined()
})

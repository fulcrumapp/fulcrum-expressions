import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import PROJECTID from "../PROJECTID"

beforeEach(RESETCONFIG)

test("it returns the project id from the configuration object", () => {
  // default set to undefined
  expect(PROJECTID()).toBeUndefined()

  CONFIGURE({ recordProject: "89773" })
  expect(PROJECTID()).toBe("89773")
})

test("it returns the default project id if it is not present on configuration obejct", () => {
  CONFIGURE({ recordProject: "89773" })
  expect(PROJECTID()).toBe("89773")

  // passing in false overwrites the entire config object so the key
  // projectId no longer exists
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(PROJECTID()).toBeUndefined()
})

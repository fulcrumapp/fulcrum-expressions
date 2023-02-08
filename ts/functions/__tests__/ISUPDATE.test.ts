import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import ISUPDATE from "../ISUPDATE"

beforeEach(RESETCONFIG)

test("returns a boolean indicating whether the feature is an update", () => {
  CONFIGURE({ featureIsNew: true })

  expect(ISUPDATE()).toBe(false)

  CONFIGURE({ featureIsNew: false })

  expect(ISUPDATE()).toBe(true)

  CONFIGURE({ featureIsNew: undefined })

  expect(ISUPDATE()).toBe(true)
})

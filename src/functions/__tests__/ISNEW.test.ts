import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import ISNEW from "../ISNEW"

beforeEach(RESETCONFIG)

test("returns a boolean indicating whether the feature is new or an update", () => {
  CONFIGURE({ featureIsNew: true })

  expect(ISNEW()).toBe(true)

  CONFIGURE({ featureIsNew: false })

  expect(ISNEW()).toBe(false)

  CONFIGURE({ featureIsNew: undefined })

  expect(ISNEW()).toBe(false)
})

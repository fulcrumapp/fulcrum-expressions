import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import GROUPINGSIZE from "../GROUPINGSIZE"

beforeEach(RESETCONFIG)

test("it returns the grouping size from the configuration object", () => {
  // default set to '3'
  expect(GROUPINGSIZE()).toBe(3)

  CONFIGURE({ groupingSize: 2 })
  expect(GROUPINGSIZE()).toBe(2)
})

test("it returns the default grouping size if it is not present on configuration obejct", () => {
  CONFIGURE({ groupingSize: 2 })
  expect(GROUPINGSIZE()).toBe(2)

  // passing in false overwrites the entire config object so the key
  // groupingSeparator no longer exists
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(GROUPINGSIZE()).toBe(3)
})

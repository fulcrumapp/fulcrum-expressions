import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import GROUPINGSEPARATOR from "../GROUPINGSEPARATOR"

beforeEach(RESETCONFIG)

test("it returns the grouping separator from the configuration object", () => {
  // default set to ','
  expect(GROUPINGSEPARATOR()).toBe(",")

  CONFIGURE({ groupingSeparator: "." })
  expect(GROUPINGSEPARATOR()).toBe(".")
})

test("it returns the default grouping separator if it is not present on configuration obejct", () => {
  CONFIGURE({ groupingSeparator: "." })
  expect(GROUPINGSEPARATOR()).toBe(".")

  // passing in false overwrites the entire config object so the key
  // groupingSeparator no longer exists
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(GROUPINGSEPARATOR()).toBe(",")
})

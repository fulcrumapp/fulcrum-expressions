import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import LOCALE from "../LOCALE"

beforeEach(RESETCONFIG)

test("it returns the locale from the configuration object", () => {
  // default set to en_US
  expect(LOCALE()).toBe("en_US")

  CONFIGURE({ locale: "de_DE" })
  expect(LOCALE()).toBe("de_DE")
})

test("it returns the default locale if it is not present on configuration obejct", () => {
  CONFIGURE({ locale: "de_DE" })
  expect(LOCALE()).toBe("de_DE")

  // passing in false overwrites the entire config object so the key
  // locale returns to the default
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(LOCALE()).toBe("en_US")
})

import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import COUNTRY from "../COUNTRY"

beforeEach(RESETCONFIG)

test("it returns the country from the configuration object", () => {
  // default set to US
  expect(COUNTRY()).toBe("US")

  CONFIGURE({country: "DE"})
  expect(COUNTRY()).toBe("DE")
})

test("it returns the default country if country is not present on configuration obejct", () => {
  CONFIGURE({country: "DE"})
  expect(COUNTRY()).toBe("DE")

  // passing in false overwrites the entire config object so the key
  // currencyCode no longer exists
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(COUNTRY()).toBe("US")
})

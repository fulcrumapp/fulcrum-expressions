import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import CURRENCYCODE from "../CURRENCYCODE"

beforeEach(RESETCONFIG)

test("it returns the currency code from the configuration object", () => {
  // default set to USD
  expect(CURRENCYCODE()).toBe("USD")

  CONFIGURE({currencyCode: "ZAR"})
  expect(CURRENCYCODE()).toBe("ZAR")
})

test("it returns the default country code if country code is not present on configuration obejct", () => {
  CONFIGURE({currencyCode: "ZAR"})
  expect(CURRENCYCODE()).toBe("ZAR")

  // passing in false overwrites the entire config object so the key
  // currencyCode no longer exists
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(CURRENCYCODE()).toBe("USD")
})

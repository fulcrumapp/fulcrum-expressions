import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import CURRENCYSYMBOL from "../CURRENCYSYMBOL"

beforeEach(RESETCONFIG)

test("it returns the currency symbol from the configuration object", () => {
  // default set to $
  expect(CURRENCYSYMBOL()).toBe("$")

  CONFIGURE({currencySymbol: "¥"})
  expect(CURRENCYSYMBOL()).toBe("¥")
})

test("it returns the default currency symbol if symbol is not present on configuration obejct", () => {
  CONFIGURE({currencySymbol: "¥"})
  expect(CURRENCYSYMBOL()).toBe("¥")

  // passing in false overwrites the entire config object so the key
  // currencySymbol no longer exists
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(CURRENCYSYMBOL()).toBe("$")
})

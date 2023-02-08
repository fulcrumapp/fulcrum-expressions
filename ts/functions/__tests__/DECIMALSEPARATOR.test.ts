import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import DECIMALSEPARATOR from "../DECIMALSEPARATOR"

beforeEach(RESETCONFIG)

test("it returns the decimal separator from the configuration object", () => {
  // default set to US
  expect(DECIMALSEPARATOR()).toBe(".")

  CONFIGURE({ decimalSeparator: "," })
  expect(DECIMALSEPARATOR()).toBe(",")
})

test("it returns the default decimal separator if it is not present on configuration obejct", () => {
  CONFIGURE({ decimalSeparator: "," })
  expect(DECIMALSEPARATOR()).toBe(",")

  // passing in false overwrites the entire config object so the key
  // currencyCode no longer exists
  CONFIGURE({ recordAltitude: 456 }, false)
  expect(DECIMALSEPARATOR()).toBe(".")
})

import { CONFIG, OVERWRITECONFIG, RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"

beforeEach(RESETCONFIG)

describe("CONFIG", () => {
  test("returns the config object", () => {
    const defaults = {
      country: "US",
      currencyCode: "USD",
      currencySymbol: "$",
      decimalSeparator: ".",
      groupingSeparator: ",",
      groupingSize: 3,
      language: "en-US",
      locale: "en_US",
      timeZone: "UTC",
    }
    const updatedConfig = { applicationVersion: "2.3.565.0", ...defaults }
    expect(CONFIG()).toEqual(defaults)

    CONFIGURE({ applicationVersion: "2.3.565.0" })
    expect(CONFIG()).toEqual(updatedConfig)
  })
})

describe("RESETCONFIG", () => {
  test("resets the config object", () => {
    const defaults = {
      country: "US",
      currencyCode: "USD",
      currencySymbol: "$",
      decimalSeparator: ".",
      groupingSeparator: ",",
      groupingSize: 3,
      language: "en-US",
      locale: "en_US",
      timeZone: "UTC",
    }
    const newConfig = CONFIGURE({ recordAltitude: 90 })

    expect(CONFIG()).toEqual(newConfig)
    RESETCONFIG()
    expect(CONFIG()).toEqual(defaults)
  })
})

describe("OVERWRITECONFIG", () => {
  test("it overwrites the config object with the value passed in", () => {
    const defaults = {
      country: "US",
      currencyCode: "USD",
      currencySymbol: "$",
      decimalSeparator: ".",
      groupingSeparator: ",",
      groupingSize: 3,
      language: "en-US",
      locale: "en_US",
      timeZone: "UTC",
    }

    const newConfig = {
      test: 123,
      testAgain: "testing",
    }
    expect(CONFIG()).toEqual(defaults)
    OVERWRITECONFIG(newConfig)
    expect(CONFIG()).toEqual(newConfig)
  })
})

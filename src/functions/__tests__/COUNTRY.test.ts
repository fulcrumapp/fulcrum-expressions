import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import COUNTRY from "../COUNTRY"

beforeEach(RESETCONFIG)

test("it returns the country from the configuration object", () => {
  expect(COUNTRY()).toBe("US")

  CONFIGURE({country: "DE"})
  expect(COUNTRY()).toBe("DE")
})

test("it returns the default country if country is not present on configuration obejct", () => {
  CONFIGURE({country: "DE"})

  CONFIGURE({ recordAltitude: 456 }, false)
  expect(COUNTRY()).toBe("US")
})

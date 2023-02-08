import { CONFIG, RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"

beforeEach(RESETCONFIG)

test("it updates the Config object", () => {
  const newConfig = CONFIG()
  newConfig.recordAltitude = 45
  CONFIGURE(newConfig)
  expect(CONFIG()).toEqual(newConfig)
})

test("passing in a false merge value replaces the Config object", () => {
  const newConfig = { recordAltitude: 87 }
  const resetValue = CONFIGURE(newConfig, false)
  expect(resetValue).toEqual(newConfig)
  expect(CONFIG()).toEqual(newConfig)
})

test("calling CONFIGURE without args returns the current Config object", () => {
  expect(CONFIGURE()).toEqual(CONFIG())
})

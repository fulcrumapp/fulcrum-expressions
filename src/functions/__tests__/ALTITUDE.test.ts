import ALTITUDE from "../ALTITUDE"
import { CONFIG, RESETCONFIG } from "../CONFIG"

beforeEach(RESETCONFIG)

test("Returns the altitude value stored in the config", () => {
  CONFIG().recordAltitude = 50
  expect(ALTITUDE()).toEqual(50)
})

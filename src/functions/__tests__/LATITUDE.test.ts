import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import LATITUDE from "../LATITUDE"

beforeEach(RESETCONFIG)

test("returns the latitude of a record if it's present", () => {
  // when it doesn't exist it returns undefined
  expect(LATITUDE()).toBeNaN()

  CONFIGURE({featureGeometry: { coordinates: ["35.9940", "78.8986"] } })

  expect(LATITUDE()).toEqual(78.8986)
})

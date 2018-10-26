import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import LONGITUDE from "../LONGITUDE"

beforeEach(RESETCONFIG)

test("returns the longitude of a record if it's present", () => {
  // when it doesn't exist it returns undefined
  expect(LONGITUDE()).toBeNaN()

  CONFIGURE({featureGeometry: { coordinates: ["35.9940", "78.8986"] } })

  expect(LONGITUDE()).toEqual(35.994)
})

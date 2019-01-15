import { prepareRuntime } from "../../test/helpers"
import SETLOCATION from "../SETLOCATION"

beforeEach(prepareRuntime)

test("sets location geometry if valid longitutde and latitude values are passed in", () => {
  const expectedResult = {
    key: "@geometry",
    type: "set-value",
    value: JSON.stringify({ type: "Point", coordinates: [5678, 1234]})
  }
  SETLOCATION(1234, 5678)
  expect($$runtime.results[0]).toEqual(expectedResult)
})

test("sets location geometry to null if longitutde and latitude values are not passed in", () => {
  SETLOCATION(1234)
  SETLOCATION()

  // @ts-ignore value attribute will exists when check is performed
  expect($$runtime.results[0].value).toEqual("null")
  // @ts-ignore value attribute will exists when check is performed
  expect($$runtime.results[1].value).toEqual("null")
})

test("throws an error if an invalid geometry is generated from parameters", () => {
  expect(() => SETLOCATION("testLat", "testLong")).toThrow("Invalid latitude/longitude. SETLOCATION(testLat, testLong).")
  expect(() => SETLOCATION("123", "456")).toThrow("Invalid latitude/longitude. SETLOCATION(123, 456).")
  expect(() => SETLOCATION(true, false)).toThrow("Invalid latitude/longitude. SETLOCATION(true, false).")
  expect(() => SETLOCATION(NaN, NaN)).toThrow("Invalid latitude/longitude. SETLOCATION(NaN, NaN).")
})
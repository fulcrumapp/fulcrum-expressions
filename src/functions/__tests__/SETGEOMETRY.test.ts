import SETGEOMETRY from "../SETGEOMETRY"
import { prepareRuntime } from "../../test/helpers";

test("sets geometry value if valid coordinates are passed in", () => {
  prepareRuntime()
  const expectedResult = {
    key: "@geometry",
    type: "set-value",
    value: JSON.stringify({ type: "Point", coordinates: [0, 0]})
  }

  SETGEOMETRY({ type: "Point", coordinates: [0, 0] })
  expect($$runtime.results[0]).toEqual(expectedResult)
})

test("raises error if invalid GeoJSON value is passed in", () => {
  expect(() => SETGEOMETRY({ type: "Polygon", coordinates: [0, 0] })).toThrow("Geometry must be a valid GeoJSON value.")
  expect(() => SETGEOMETRY({ type: "Point", coordinates: 1234 })).toThrow("Geometry must be a valid GeoJSON value.")
  expect(() => SETGEOMETRY([0, 0])).toThrow("Geometry must be a valid GeoJSON value.")
})
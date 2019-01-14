import isValidGeometry from "../is-valid-geometry"

test("returns true if a valid GeoJSON value is passed in", () => {
  expect(isValidGeometry({ type: "Point", coordinates: [234, 567] })).toBe(true)
})

test("returns false if an invalid GeoJSON value is passed in", () => {
  expect(isValidGeometry([123, 456])).toBe(false)
  expect(isValidGeometry({ type: "Polygon", coordinates: [234, 567] })).toBe(false)
  expect(isValidGeometry({ type: "Point", coordinates: 567 })).toBe(false)
  expect(isValidGeometry({ type: "Point", coordinates: [234] })).toBe(false)
  expect(isValidGeometry({ type: "Point", coordinates: [234, NaN] })).toBe(false)
  expect(isValidGeometry({ type: "Polygon", coordinates: ["234", 567] })).toBe(false)  
})

test("returns true for no value or a null value", () => {
  expect(isValidGeometry()).toBe(true)
  expect(isValidGeometry(null)).toBe(true)
})
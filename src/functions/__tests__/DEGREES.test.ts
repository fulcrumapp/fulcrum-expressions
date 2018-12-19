import DEGREES from "../DEGREES"

test("converts radians to degrees", () => {
  expect(DEGREES(Math.PI)).toBe(180)
  expect(DEGREES(Math.PI + "")).toBe(180)
  expect(DEGREES(Math.PI / 4)).toBe(45)
  expect(DEGREES("0.3")).toBe(17.188733853924695)
})

test("returns NaN for invalid input", () => {
  expect(DEGREES("test")).toBeNaN()
  expect(DEGREES([])).toBeNaN()
  expect(DEGREES(undefined)).toBeNaN()
  expect(DEGREES(null)).toBeNaN()
  expect(DEGREES(NaN)).toBeNaN()
  expect(DEGREES(true)).toBeNaN()
})

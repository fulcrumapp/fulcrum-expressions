import DEGREES from "../DEGREES"

test("converts radians to degrees", () => {
  expect(DEGREES(Math.PI)).toBe(180)
  expect(DEGREES(Math.PI + "")).toBe(180)
  expect(DEGREES(Math.PI / 4)).toBe(45)
  expect(DEGREES("0.3")).toBe(17.188733853924695)
})

test("returns NaN for invalid input", () => {
  // @ts-ignore Bad input to get NaN
  expect(DEGREES([])).toBe(NaN)
  expect(DEGREES(undefined)).toBe(NaN)
  expect(DEGREES(null)).toBe(NaN)
  expect(DEGREES(NaN)).toBe(NaN)
  // @ts-ignore Bad input to get NaN
  expect(DEGREES(true)).toBe(NaN)
})

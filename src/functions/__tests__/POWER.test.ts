import POWER from "../POWER"

test("returns the result of a number raised to a power", () => {
  expect(POWER(2, 3)).toBe(8)
  expect(POWER(-2, 3)).toBe(-8)
  expect(POWER("-2", "3")).toBe(-8)
  expect(POWER(1, 0)).toBe(1)
})

test("returns NaN for invalid input", () => {
  expect(POWER(-2, 3.1)).toBeNaN()
  expect(POWER(NaN)).toBeNaN()
  expect(POWER(undefined)).toBeNaN()
  expect(POWER(null)).toBeNaN()
  expect(POWER(true)).toBeNaN()
  expect(POWER(new Date())).toBeNaN()
  expect(POWER()).toBeNaN()
})

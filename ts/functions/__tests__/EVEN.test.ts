import EVEN from "../EVEN"

test("returns number rounded up to the nearest even integer", () => {
  expect(EVEN(0)).toBe(0)
  expect(EVEN(1)).toBe(2)
  expect(EVEN(2)).toBe(2)
  expect(EVEN(-1)).toBe(0)
  expect(EVEN(-1.5)).toBe(0)
  expect(EVEN(-2.5)).toBe(-2)
  expect(EVEN(1.5)).toBe(2)
  expect(EVEN(11.5)).toBe(12)
  expect(EVEN(1 / 3)).toBe(2)
})

test("returns NaN for invalid input", () => {
  expect(EVEN(undefined)).toBeNaN()
  expect(EVEN(null)).toBeNaN()
  expect(EVEN([])).toBeNaN()
  expect(EVEN({})).toBeNaN()
  expect(EVEN(true)).toBeNaN()
})

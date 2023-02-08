import SQRTPI from "../SQRTPI"

test('return the square root of a number times PI', () => {
  expect(SQRTPI(4)).toBe(3.5449077018110318)
  expect(SQRTPI(9)).toBe(5.317361552716548)
  expect(SQRTPI('9')).toBe(5.317361552716548)
})

test("returns NaN for invalid input", () => {
  expect(SQRTPI(-1)).toBeNaN()
  expect(SQRTPI(NaN)).toBeNaN()
  expect(SQRTPI(undefined)).toBeNaN()
  expect(SQRTPI(null)).toBeNaN()
  expect(SQRTPI(new Date)).toBeNaN()
  expect(SQRTPI([])).toBeNaN()
  expect(SQRTPI({})).toBeNaN()
})
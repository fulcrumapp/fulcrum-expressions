import SQRT from "../SQRT"

test('return the square root of a number', () => {
  expect(SQRT(4)).toBe(2)
  expect(SQRT(9)).toBe(3)
  expect(SQRT('9')).toBe(3)
})

test("returns NaN if it receives invalid input", () => {
  expect(SQRT(-1)).toBeNaN()
  expect(SQRT(NaN)).toBeNaN()
  expect(SQRT(null)).toBeNaN()
  expect(SQRT([])).toBeNaN()
  expect(SQRT(undefined)).toBeNaN()
  expect(SQRT(new Date())).toBeNaN()
  expect(SQRT({})).toBeNaN()
})
import SIGN from "../SIGN"

test('returns the sign of a number', () => {
  expect(SIGN(0)).toBe(0)
  expect(SIGN(1)).toBe(1)
  expect(SIGN(1.5)).toBe(1)
  expect(SIGN(-1.5)).toBe(-1)
  expect(SIGN('2.5')).toBe(1)
})

test("returns NaN when passed invalid input", () => {
  expect(SIGN('test')).toBeNaN()
  expect(SIGN(NaN)).toBeNaN()
  expect(SIGN(undefined)).toBeNaN()
  expect(SIGN(null)).toBeNaN()
  expect(SIGN(new Date)).toBeNaN()
  expect(SIGN([])).toBeNaN()
  expect(SIGN({})).toBeNaN()
})

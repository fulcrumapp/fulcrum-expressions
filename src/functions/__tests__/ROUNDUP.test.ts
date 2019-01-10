import ROUNDUP from "../ROUNDUP"

test('round up the given number to the specified number of digits', () => {
  expect(ROUNDUP(1)).toBe(1)
  expect(ROUNDUP(1.5)).toBe(2)
  expect(ROUNDUP(2.5)).toBe(3)
  expect(ROUNDUP('2.5')).toBe(3)
  expect(ROUNDUP(2.6666666, 4)).toBe(2.6667)
  expect(ROUNDUP(-2.6666666, 4)).toBe(-2.6667)
  expect(ROUNDUP(2.6666666, 7)).toBe(2.6666666)
  expect(ROUNDUP(2.6666666, 8)).toBe(2.6666666)
  expect(ROUNDUP(1 / 3, 7)).toBe(0.3333334)
})

test("returns NaN if passed in invalid input", () => {
  expect(ROUNDUP('test')).toBeNaN()
  expect(ROUNDUP(NaN)).toBeNaN()
  expect(ROUNDUP(undefined)).toBeNaN()
  expect(ROUNDUP(null)).toBeNaN()
  expect(ROUNDUP(new Date)).toBeNaN()
  expect(ROUNDUP([])).toBeNaN()
  expect(ROUNDUP({})).toBeNaN()
})
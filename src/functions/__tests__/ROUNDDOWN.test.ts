import ROUNDDOWN from "../ROUNDDOWN"

test('round down the given number to the specified number of digits', () => {
  expect(ROUNDDOWN(1)).toBe(1)
  expect(ROUNDDOWN(1.5)).toBe(1)
  expect(ROUNDDOWN(2.5)).toBe(2)
  expect(ROUNDDOWN('2.5')).toBe(2)
  expect(ROUNDDOWN(2.6666666, 4)).toBe(2.6666)
  expect(ROUNDDOWN(-2.6666666, 4)).toBe(-2.6666)
  expect(ROUNDDOWN(2.6666666, 7)).toBe(2.6666666)
  expect(ROUNDDOWN(2.6666666, 8)).toBe(2.6666666)
  expect(ROUNDDOWN(1 / 3, 7)).toBe(0.3333333)
})

test("returns NaN for invalid input", () => {
  expect(ROUNDDOWN('test')).toBeNaN()
  expect(ROUNDDOWN(NaN)).toBeNaN()
  expect(ROUNDDOWN(undefined)).toBeNaN()
  expect(ROUNDDOWN(null)).toBeNaN()
  expect(ROUNDDOWN(new Date)).toBeNaN()
  expect(ROUNDDOWN([])).toBeNaN()
  expect(ROUNDDOWN({})).toBeNaN()
})

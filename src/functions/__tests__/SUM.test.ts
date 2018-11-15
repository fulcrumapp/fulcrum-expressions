import SUM from "../SUM"

test("sum all the numbers given as arguments", () => {
  expect(SUM(2, 3, 4)).toBe(9)
  expect(SUM(-2, 3, 4)).toBe(5)
  expect(SUM(-2, 3.1, 1.7)).toBe(2.8)
  expect(SUM(-2, [3.1], 1.7)).toBe(2.8)
  expect(SUM([-2, 3.1, 1.7])).toBe(2.8)
  expect(SUM([-2, 3.1, [1.7]])).toBe(2.8)
  expect(SUM("-2", "3")).toBe(1)
  expect(SUM(1, 0)).toBe(1)
})

test("returns NaN for invalid input", () => {
  expect(SUM(1, NaN)).toBeNaN()
  expect(SUM(undefined)).toBeNaN()
  expect(SUM(null)).toBeNaN()
  expect(SUM(true)).toBeNaN()
  expect(SUM(new Date)).toBeNaN()
  expect(SUM()).toBeNaN()
})

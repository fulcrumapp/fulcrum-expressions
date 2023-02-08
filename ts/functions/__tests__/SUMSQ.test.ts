import SUMSQ from "../SUMSQ"

test("sum all the squares of numbers given as arguments", () => {
  expect(SUMSQ(2, 3, 4)).toBe(29)
  expect(SUMSQ(-2, 3, 4)).toBe(29)
  expect(SUMSQ(-2, 3.1, 1.7)).toBe(16.5)
  expect(SUMSQ(-2, [3.1, [1.7]])).toBe(16.5)
  expect(SUMSQ("-2", "3")).toBe(13)
  expect(SUMSQ(1, 0)).toBe(1)
})

test("returns NaN if it receives invalid input", () => {
  expect(SUMSQ(1, NaN)).toBeNaN()
  expect(SUMSQ(undefined)).toBeNaN()
  expect(SUMSQ(null)).toBeNaN()
  expect(SUMSQ(true)).toBeNaN()
  expect(SUMSQ(new Date())).toBeNaN()
  expect(SUMSQ()).toBeNaN()
})

import QUOTIENT from "../QUOTIENT"

test("returns the quotient", () => {
  expect(QUOTIENT(10, 2)).toBe(5)
  expect(QUOTIENT(11, 2)).toBe(5)
  expect(QUOTIENT(12.5, 2)).toBe(6)
  expect(QUOTIENT(11 / 3, 2)).toBe(1)
  expect(QUOTIENT("11", "2")).toBe(5)
})

test("returns NaN for invalid input", () => {
  expect(QUOTIENT(1, 0)).toBeNaN()
  expect(QUOTIENT(NaN)).toBeNaN()
  expect(QUOTIENT(undefined)).toBeNaN()
  expect(QUOTIENT(null)).toBeNaN()
  expect(QUOTIENT(true)).toBeNaN()
  expect(QUOTIENT(new Date())).toBeNaN()
  expect(QUOTIENT()).toBeNaN()
})

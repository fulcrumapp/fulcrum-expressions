import PRODUCT from "../PRODUCT"

test("multiplies all the numbers given as arguments", () => {
  expect(PRODUCT(2, 3, 4)).toBe(24)
  expect(PRODUCT(-2, 3, 4)).toBe(-24)
  expect(PRODUCT(-2, 3.1, 1.7)).toBe(-10.54)
  expect(PRODUCT("-2", "3")).toBe(-6)
  expect(PRODUCT(1, 0)).toBe(0)
})

test("returns NaN for invalid input", () => {
  expect(PRODUCT(1, NaN)).toBeNaN()
  expect(PRODUCT(undefined)).toBeNaN()
  expect(PRODUCT(null)).toBeNaN()
  expect(PRODUCT(true)).toBeNaN()
  expect(PRODUCT(new Date())).toBeNaN()
  expect(PRODUCT()).toBeNaN()
})

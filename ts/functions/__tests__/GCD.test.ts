import GCD from "../GCD"

test("returns the greatest common divisor of two or more integers", () => {
  expect(GCD(1, 2, 3)).toEqual(1)
  expect(GCD(2, 4, 6)).toEqual(2)
  expect(GCD(3, 6, 9)).toEqual(3)
  expect(GCD(4, 6, 10)).toEqual(2)
  expect(GCD("4", "6", "10")).toEqual(2)
})

test("it returns NaN for invalid input", () => {
  expect(GCD(-1, -2, -3)).toBeNaN()
  expect(GCD(1, 2, -3)).toBeNaN()
  expect(GCD()).toBeNaN()
  expect(GCD(undefined)).toBeNaN()
  expect(GCD(null)).toBeNaN()
  expect(GCD({})).toBeNaN()
  expect(GCD([])).toBeNaN()
  expect(GCD(true)).toBeNaN()
})

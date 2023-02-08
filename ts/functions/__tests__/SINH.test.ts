import SINH from "../SINH"

test("it returns the hyperbolic sine of a number", () => {
  expect(SINH(1)).toBe(1.1752011936438014)
  expect(SINH(0)).toBe(0)
  expect(SINH(-0.5)).toBe(-0.5210953054937474)
})

test("it accepts a stringed number", () => {
  expect(SINH("1")).toBe(1.1752011936438014)
  expect(SINH("0")).toBe(0)
  expect(SINH("-0.5")).toBe(-0.5210953054937474)
})

test("it returns NaN if an invalid input is provided", () => {
  expect(SINH("howdy")).toBeNaN()
  // @ts-ignore Need bad input to get NaN
  expect(SINH(false)).toBeNaN()
})
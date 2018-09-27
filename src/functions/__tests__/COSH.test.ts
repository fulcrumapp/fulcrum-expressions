import COSH from "../COSH"

test("it returns the hyperbolic cosine of a number", () => {
  expect(COSH(1)).toBe(1.5430806348152437)
  expect(COSH(0)).toBe(1)
  expect(COSH(-0.5)).toBe(1.1276259652063807)
})

test("it accepts a stringed number", () => {
  expect(COSH("1")).toBe(1.5430806348152437)
  expect(COSH("0")).toBe(1)
  expect(COSH("-0.5")).toBe(1.1276259652063807)
})

test("it returns NaN if an invalid input is provided", () => {
  expect(COSH("howdy")).toBeNaN()
  // @ts-ignore Need bad input to get NaN
  expect(COSH(false)).toBeNaN()
})

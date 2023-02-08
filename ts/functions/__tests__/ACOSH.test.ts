import ACOSH from "../ACOSH"

test("returns the hyperbolic arc-cosine of a number", () => {
  expect(ACOSH(7)).toBe(2.6339157938496336)
  expect(ACOSH(20)).toBe(3.6882538673612966)
  expect(ACOSH("20")).toBe(3.6882538673612966)
  expect(ACOSH("45")).toBe(4.499686190671499)
})

test("returns NaN when passed in bad input", () => {
  expect(ACOSH(-1)).toBeNaN()
  expect(ACOSH("-1")).toBeNaN()
  expect(ACOSH("test")).toBeNaN()
})
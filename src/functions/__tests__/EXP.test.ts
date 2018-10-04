import EXP from "../EXP"

test("it return Euler's number raised to a designated power", () => {
  expect(EXP()).toBe(2.718281828459045)
  expect(EXP(2)).toBe(7.38905609893065)
  expect(EXP(4)).toBe(54.598150033144236)
})

test("it accepts numbers as strings", () => {
  expect(EXP("2")).toBe(7.38905609893065)
  expect(EXP("4")).toBe(54.598150033144236)
})

test("it returns NaN for invalid input", () => {
  expect(EXP("test")).toBeNaN()
})

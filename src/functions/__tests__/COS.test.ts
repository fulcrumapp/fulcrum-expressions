import COS from "../COS"

test("accepts a number value and returns the correct cosine", () => {
  expect(COS(12)).toBe(0.8438539587324921)
  expect(COS(90)).toBe(-0.4480736161291702)
  expect(COS(86)).toBe(-0.38369844494974187)
  expect(COS(-15)).toBe(-0.7596879128588213)
})

test("accepts a stringed number value and returns the correct cosine", () => {
  expect(COS("12")).toBe(0.8438539587324921)
  expect(COS("90")).toBe(-0.4480736161291702)
  expect(COS("86")).toBe(-0.38369844494974187)
  expect(COS("-15")).toBe(-0.7596879128588213)
})

test("returns NaN for a bad input", () => {
  expect(COS("hi")).toBeNaN()
  // @ts-ignore Need to pass in bad input to get NaN
  expect(COS(true)).toBeNaN()
})

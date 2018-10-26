import LN from "../LN"

test("returns the natural logarithm of a number", () => {
  expect(LN(0)).toBe(-Infinity)
  expect(LN(1)).toBe(0)
  expect(LN(100)).toBe(4.605170185988092)
  expect(LN("100")).toBe(4.605170185988092)
})

test("returns NaN for invalid input", () => {
  expect(LN("abc")).toBeNaN()
  expect(LN(-100)).toBeNaN()
  expect(LN("")).toBeNaN()
  expect(LN([])).toBeNaN()
  expect(LN({})).toBeNaN()
  expect(LN(true)).toBeNaN()
  expect(LN(undefined)).toBeNaN()
  expect(LN(null)).toBeNaN()
  expect(LN(new Date())).toBeNaN()
})

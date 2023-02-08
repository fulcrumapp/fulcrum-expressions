import N from "../N"

test("returns a numeric value", () => {
  expect(N(89)).toBe(89)
  expect(N(2 / 4)).toBe(0.5)
  expect(N("89")).toBe(0)
  expect(N([])).toBe(0)
  expect(N(new Date())).toBe(0)
  expect(N(null)).toBe(0)
  expect(N(true)).toBe(1)
  expect(N()).toBe(0)
  expect(N(false)).toBe(0)
})

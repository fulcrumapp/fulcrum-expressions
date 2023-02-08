import ISEVEN from "../ISEVEN"

test("tests for an even number", () => {
  expect(ISEVEN(0)).toBe(true)
  expect(ISEVEN(1)).toBe(false)
  expect(ISEVEN(2)).toBe(true)
  expect(ISEVEN("2")).toBe(true)
  expect(ISEVEN(true)).toBe(false)
  expect(ISEVEN(false)).toBe(false)
  expect(ISEVEN(undefined)).toBe(false)
  expect(ISEVEN(null)).toBe(false)
})

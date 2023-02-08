import NOT from "../NOT"

test("returns the negation of a value", () => {
  expect(NOT(false)).toBe(true)
  expect(NOT(true)).toBe(false)
  expect(NOT(1)).toBe(false)
  expect(NOT(NaN)).toBe(true)
  expect(NOT(undefined)).toBe(true)
  expect(NOT(null)).toBe(true)
  expect(NOT(new Date())).toBe(false)
  expect(NOT()).toBe(true)
})

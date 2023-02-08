import EXACT from "../EXACT"
test("checks to see if two text values are identical", () => {
  // returns true
  expect(EXACT("", "")).toBe(true)
  expect(EXACT("test", "test")).toBe(true)
  expect(EXACT(1, 1)).toBe(true)
  expect(EXACT([1, 2, 3], [1, 2, 3])).toBe(true)
  expect(EXACT({}, {})).toBe(true)
  expect(EXACT(undefined, undefined)).toBe(true)
  expect(EXACT(NaN, NaN)).toBe(true)

  // returns false
  expect(EXACT(1, undefined)).toBe(false)
  expect(EXACT({test: "testy"}, {test: "very testy"})).toBe(false)
  expect(EXACT(1, NaN)).toBe(false)
})

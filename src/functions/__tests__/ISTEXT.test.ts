import ISTEXT from "../ISTEXT"

test("tests for a text value", () => {
  expect(ISTEXT(true)).toBe(false)
  expect(ISTEXT(false)).toBe(false)
  expect(ISTEXT([])).toBe(false)
  expect(ISTEXT("")).toBe(true)
  expect(ISTEXT("something")).toBe(true)
})

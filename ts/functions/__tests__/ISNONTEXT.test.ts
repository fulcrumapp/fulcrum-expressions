import ISNONTEXT from "../ISNONTEXT"

test("tests for a non-text value", () => {
  expect(ISNONTEXT(true)).toBe(true)
  expect(ISNONTEXT(false)).toBe(true)
  expect(ISNONTEXT("something")).toBe(false)
  expect(ISNONTEXT(["something"])).toBe(true)
})

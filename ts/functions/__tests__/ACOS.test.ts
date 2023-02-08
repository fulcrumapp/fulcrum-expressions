import ACOS from "../ACOS"

test("it returns the inverse cosine of a value", () => {
  expect(ACOS(55)).toBe(Math.acos(55))
  expect(ACOS("82.5")).toBe(Math.acos(82.5))
})

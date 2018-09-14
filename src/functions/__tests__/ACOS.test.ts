import ACOS from "../ACOS"

test("it returns the absolute value of a given number", () => {
  expect(ACOS(55)).toBe(Math.acos(55))
  expect(ACOS("82.5")).toBe(Math.acos(82.5))
})

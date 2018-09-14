import ABS from "../ABS"

test("it returns the absolute value of a given number", () => {
  expect(ABS(25)).toBe(Math.abs(25))
  expect(ABS(-1)).toBe(Math.abs(-1))
  expect(ABS("255")).toBe(Math.abs(255))
})

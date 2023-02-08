import ISODD from "../ISODD"

test("tests for an odd number", () => {
  expect(ISODD(0)).toBe(false)
  expect(ISODD(1)).toBe(true)
  expect(ISODD(2)).toBe(false)
  expect(ISODD("1")).toBe(true)
  expect(ISODD("2")).toBe(false)
  expect(ISODD(true)).toBe(false)
  expect(ISODD(false)).toBe(false)
  expect(ISODD(undefined)).toBe(false)
  expect(ISODD(null)).toBe(false)
})

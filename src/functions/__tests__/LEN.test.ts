import LEN from "../LEN"

test("returns the length of a string", () => {
  expect(LEN("abc")).toBe(3)
  expect(LEN("")).toBe(0)
  expect(LEN(true)).toBe(4)
  expect(LEN(false)).toBe(5)
  expect(LEN(800)).toBe(3)
  expect(LEN(-800)).toBe(4)
  expect(LEN(-1 / 3)).toBe(19)
  expect(LEN(undefined)).toBe(0)
  expect(LEN(null)).toBe(0)
  expect(LEN(NaN)).toBe(0)
  expect(LEN([])).toBe(0)
  expect(LEN([1])).toBe(1)
  expect(LEN([1, 2, 3])).toBe(3)
  expect(LEN([1, 2, 3, null])).toBe(4)
  expect(LEN({})).toBe(0)
  expect(LEN({key1: 1})).toBe(1)
  expect(LEN({key1: 1, key2: 2})).toBe(2)
  expect(LEN(new Date())).toBe(39)
  expect(LEN(/test/)).toBe(6)
})
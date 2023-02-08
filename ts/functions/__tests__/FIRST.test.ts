import FIRST from "../FIRST"

test("returns the first N items of an array", () => {
  expect(FIRST([1])).toBe(1)
  expect(FIRST([1, 2, 3])).toBe(1)
  expect(FIRST("1234")).toBe("1")
  expect(FIRST([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3])
  expect(FIRST("123456", 3)).toEqual(["1", "2", "3"])
})

test("returns undefined unless passed an array or string", () => {
  expect(FIRST("")).toBeUndefined()
  expect(FIRST([])).toBeUndefined()
  expect(FIRST(1)).toBeUndefined()
  expect(FIRST(1.337)).toBeUndefined()
  expect(FIRST(new Date())).toBeUndefined()
  expect(FIRST(true)).toBeUndefined()
  expect(FIRST(NaN)).toBeUndefined()
  expect(FIRST({})).toBeUndefined()
  expect(FIRST(null)).toBeUndefined()
  expect(FIRST(undefined)).toBeUndefined()
})

import LAST from "../LAST"
test("returns the last N items of an array", () => {
  expect(LAST([1])).toEqual(1)
  expect(LAST([1, 2, 3])).toEqual(3)
  expect(LAST([1, 2, 3], 2)).toEqual([2, 3])
  expect(LAST("1234")).toEqual("4")
  expect(LAST("1234", 3)).toEqual(["2", "3", "4"])

  expect(LAST("")).toBeUndefined()
  expect(LAST([])).toBeUndefined()
  expect(LAST(1)).toBeUndefined()
  expect(LAST(1.337)).toBeUndefined()
  expect(LAST(new Date())).toBeUndefined()
  expect(LAST(true)).toBeUndefined()
  expect(LAST(NaN)).toBeUndefined()
  expect(LAST({})).toBeUndefined()
  expect(LAST(null)).toBeUndefined()
  expect(LAST(undefined)).toBeUndefined()
})

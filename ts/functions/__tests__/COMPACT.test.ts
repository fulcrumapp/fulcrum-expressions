import COMPACT from "../COMPACT"

test("it returns a compacted array", () => {
  expect(COMPACT([1, 2, 3])).toEqual([1, 2, 3])
  expect(COMPACT([])).toEqual([])
  expect(COMPACT([undefined])).toEqual([])
  expect(COMPACT([null])).toEqual([])
  expect(COMPACT([0])).toEqual([0])
  expect(COMPACT(["", 0, 1])).toEqual(["", 0, 1])
  expect(COMPACT(["a", "b", null, "c", undefined, NaN])).toEqual(["a", "b", "c", NaN])
})

test("it only accepts an array as an argument", () => {
  expect(COMPACT(null)).toBeUndefined()
  expect(COMPACT(undefined)).toBeUndefined()
  expect(COMPACT({})).toBeUndefined()
  expect(COMPACT()).toBeUndefined()
  expect(COMPACT(new Date())).toBeUndefined()
})

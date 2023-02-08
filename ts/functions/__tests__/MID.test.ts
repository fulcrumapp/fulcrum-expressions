import MID from "../MID"

test("returns a specific number of characters from a text string", () => {
  expect(MID("abc", 3, 1)).toEqual("c")
  expect(MID("abc", 2, 2)).toEqual("bc")
  expect(MID("abc", 1, 3)).toEqual("abc")
  expect(MID("abc", 1, 2)).toEqual("ab")
  expect(MID("abc", 4, 2)).toEqual("")
  expect(MID("abc", 2, 9)).toEqual("bc")
  expect(MID("abc", "1", "3")).toEqual("abc")
  expect(MID(777, "1", "1")).toEqual("7")
  expect(MID(true, "1", "1")).toEqual("t")
})

test("returns undefined if passed in invalid input", () => {
  expect(MID("abc", 1, -1)).toBeUndefined()
  expect(MID("abc", -1, 1)).toBeUndefined()
  expect(MID("abc")).toBeUndefined()
  expect(MID([])).toBeUndefined()
  expect(MID({})).toBeUndefined()
  expect(MID(undefined)).toBeUndefined()
  expect(MID(null)).toBeUndefined()
  expect(MID(new Date())).toBeUndefined()
  expect(MID(NaN)).toBeUndefined()
  expect(MID()).toBeUndefined()
})

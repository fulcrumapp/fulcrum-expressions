import LEFT from "../LEFT"

test("returns the left characters of a string", () => {
  expect(LEFT("abc", 1)).toEqual("a")
  expect(LEFT("abc", 1.9)).toEqual("a")
  expect(LEFT("abc", "1")).toEqual("a")
  expect(LEFT("abc")).toEqual("a")
  expect(LEFT("abc", 2)).toEqual("ab")
  expect(LEFT("abc", 1000)).toEqual("abc")
  expect(LEFT("", 1000)).toEqual("")
  expect(LEFT(7000, 2)).toEqual("70")
  expect(LEFT(true, 4)).toEqual("true")
})

test("returns undefined for invalid input", () => {
  expect(LEFT("abc", -1)).toBeUndefined()
  expect(LEFT("abc", "-1")).toBeUndefined()
  expect(LEFT({}, 4)).toBeUndefined()
  expect(LEFT({})).toBeUndefined()
  expect(LEFT(undefined)).toBeUndefined()
  expect(LEFT(null)).toBeUndefined()
  expect(LEFT(new Date())).toBeUndefined()
})

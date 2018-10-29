import LOWER from "../LOWER"

test("returns the string as lower case", () => {
  expect(LOWER("ABC")).toEqual("abc")
  expect(LOWER("abc")).toEqual("abc")
  expect(LOWER("1A")).toEqual("1a")
  expect(LOWER(100)).toEqual("100")
  expect(LOWER("")).toEqual("")
  expect(LOWER(true)).toEqual("true")
})

test("returns undefined for invalid input", () => {
  expect(LOWER([])).toBeUndefined()
  expect(LOWER({})).toBeUndefined()
  expect(LOWER(undefined)).toBeUndefined()
  expect(LOWER(null)).toBeUndefined()
  expect(LOWER(new Date())).toBeUndefined()
})

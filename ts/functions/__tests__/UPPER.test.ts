import UPPER from "../UPPER"

test("returns the string as upper case", () => {
  expect(UPPER("ABC")).toEqual("ABC")
  expect(UPPER("abc")).toEqual("ABC")
  expect(UPPER("1a")).toEqual("1A")
  expect(UPPER(100)).toEqual("100")
  expect(UPPER("")).toEqual("")
  expect(UPPER(true)).toEqual("TRUE")
})

test("returns undefined for invalid input", () => {
  expect(UPPER([])).toBeUndefined()
  expect(UPPER({})).toBeUndefined()
  expect(UPPER(undefined)).toBeUndefined()
  expect(UPPER(null)).toBeUndefined()
  expect(UPPER(new Date())).toBeUndefined()
})

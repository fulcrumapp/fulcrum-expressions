import PROPER from "../PROPER"

test("capitalizes the first letter in a text string", () => {
  expect(PROPER("ABC")).toEqual("Abc")
  expect(PROPER("Abc")).toEqual("Abc")
  expect(PROPER("abc")).toEqual("Abc")
  expect(PROPER("test test")).toEqual("Test Test")
  expect(PROPER("TEST TEST")).toEqual("Test Test")
  expect(PROPER("Test Test")).toEqual("Test Test")
  expect(PROPER("1A")).toEqual("1a")
  expect(PROPER(100)).toEqual("100")
  expect(PROPER("")).toEqual("")
  expect(PROPER(true)).toEqual("True")
})

test("returns undefined for invalid input", () => {
  expect(PROPER([])).toBeUndefined()
  expect(PROPER({})).toBeUndefined()
  expect(PROPER(undefined)).toBeUndefined()
  expect(PROPER(null)).toBeUndefined()
  expect(PROPER(new Date())).toBeUndefined()
})

import CONCATENATE from "../CONCATENATE"

test("it returns a concatenated string", () => {
  expect(CONCATENATE("1", "2", "3")).toEqual("123")
  expect(CONCATENATE("1", 2, "3")).toEqual("123")
  expect(CONCATENATE("1", {}, "3")).toEqual("13")
  expect(CONCATENATE("1", null, "3")).toEqual("13")
  expect(CONCATENATE("1", null, undefined)).toEqual("1")
  expect(CONCATENATE("1", [2], "3")).toEqual("123")
  expect(CONCATENATE("1", [2], "3", [4, 5])).toEqual("12345")
})

test("it returns an empty string if no/null values are passed", () => {
  expect(CONCATENATE([], null, undefined)).toEqual("")
  expect(CONCATENATE("")).toEqual("")
  expect(CONCATENATE()).toEqual("")
  expect(CONCATENATE(null)).toEqual("")
  expect(CONCATENATE(undefined)).toEqual("")
})

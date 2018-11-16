import T from "../T"

test("converts argument to text", () => {
  expect(T("test")).toEqual("test")
  expect(T(undefined)).toEqual("")
  expect(T(null)).toEqual("")
})

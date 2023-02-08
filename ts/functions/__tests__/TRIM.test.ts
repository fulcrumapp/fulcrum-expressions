import TRIM from "../TRIM"

test("trim whitespace from a string", () => {
  expect(TRIM("test")).toEqual("test")
  expect(TRIM(" test ")).toEqual("test")
  expect(TRIM(undefined)).toEqual("")
  expect(TRIM(null)).toEqual("")
})

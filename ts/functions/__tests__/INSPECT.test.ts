import INSPECT from "../INSPECT"

test("returns the string representation of a value", () => {
  expect(INSPECT({ test: "yes" })).toEqual("{ test: 'yes' }")
  expect(INSPECT(null)).toEqual("null")
  expect(INSPECT(undefined)).toEqual("undefined")
})

import ISLOGICAL from "../ISLOGICAL"

test("tests for a logical value", () => {
  expect(ISLOGICAL(true)).toEqual(true)
  expect(ISLOGICAL(false)).toEqual(true)
  expect(ISLOGICAL("")).toEqual(false)
})

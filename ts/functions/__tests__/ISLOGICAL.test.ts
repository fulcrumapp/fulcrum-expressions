import ISLOGICAL from "../ISLOGICAL"

test("tests for a logical value", () => {
  expect(ISLOGICAL(true)).toEqual(true)
  expect(ISLOGICAL(false)).toEqual(true)
  expect(ISLOGICAL(3 > 2)).toEqual(true)
  expect(ISLOGICAL([ true, false ])).toBe(false)
  expect(ISLOGICAL("")).toEqual(false)
})

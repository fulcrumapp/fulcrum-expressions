import DATEADD from "../DATEADD"

test("adds given number of days to a date", () => {
  expect(DATEADD("2012-03-04", 5)).toEqual(new Date("2012-03-09"))
  expect(DATEADD("2012-03-04", 10)).toEqual(new Date("2012-03-14"))
  expect(DATEADD("03/04/2012", 9)).toEqual(new Date("2012-03-13"))
})

test("returns undefined when given invalid values", () => {
  expect(DATEADD("", 9)).toBeUndefined()
  // @ts-ignore bad input
  expect(DATEADD("2012-03-04", "fail")).toBeUndefined()
  expect(DATEADD(null, 8)).toBeUndefined()  
  expect(DATEADD(undefined, 4)).toBeUndefined()
  // @ts-ignore bad input
  expect(DATEADD([], 8)).toBeUndefined()
  // @ts-ignore bad input
  expect(DATEADD({}, 4)).toBeUndefined()
  // @ts-ignore bad input
  expect(DATEADD("2012-03-04", [])).toBeUndefined()
  // @ts-ignore bad input
  expect(DATEADD("2012-03-04", {})).toBeUndefined()
  expect(DATEADD("2012-03-04", NaN)).toBeUndefined()
})

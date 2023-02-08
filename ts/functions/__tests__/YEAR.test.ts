import YEAR from "../YEAR"

test("returns a year given a date string", () => {
  expect(YEAR("2015/12/16")).toBe(2015)
  expect(YEAR("2015-12-16")).toBe(2015)
  expect(YEAR("2015.12.16")).toBe(2015)
  expect(YEAR("2015 12 16")).toBe(2015)
  expect(YEAR("12/16/2015")).toBe(2015)
  expect(YEAR("12-16-2015")).toBe(2015)
  expect(YEAR("12.16.2015")).toBe(2015)
  expect(YEAR("12 16 2015")).toBe(2015)
  expect(YEAR("5/1/2015")).toBe(2015)
})

test("returns a year given a date object", () => {
  expect(YEAR(new Date("2015/12/16 00:00:00"))).toBe(2015)
  expect(YEAR(new Date("2015-12-16 00:00:00"))).toBe(2015)
  expect(YEAR(new Date("2015 12 16 00:00:00"))).toBe(2015)
  expect(YEAR(new Date("2015/5/1 00:00:00"))).toBe(2015)
})

test("returns undefined given an invalid input", () => {
  expect(YEAR("not a date")).toBeUndefined()
})

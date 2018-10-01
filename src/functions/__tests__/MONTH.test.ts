import MONTH from "../MONTH"

test("returns a month given a date string", () => {
  expect(MONTH("2015/12/16")).toBe(12)
  expect(MONTH("2015-12-16")).toBe(12)
  expect(MONTH("2015.12.16")).toBe(12)
  expect(MONTH("2015 12 16")).toBe(12)
  expect(MONTH("12/16/2015")).toBe(12)
  expect(MONTH("12-16-2015")).toBe(12)
  expect(MONTH("12.16.2015")).toBe(12)
  expect(MONTH("12 16 2015")).toBe(12)
  expect(MONTH("5/1/2015")).toBe(5)
})

test("returns a month given a date object", () => {
  expect(MONTH(new Date("2015/12/16 00:00:00"))).toBe(12)
  expect(MONTH(new Date("2015-12-16 00:00:00"))).toBe(12)
  expect(MONTH(new Date("2015 12 16 00:00:00"))).toBe(12)
  expect(MONTH(new Date("2015/5/1 00:00:00"))).toBe(5)
})

test("returns undefined given an invalid input", () => {
  expect(MONTH("not a date")).toBeUndefined()
})

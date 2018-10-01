import DAY from "../DAY"

test("returns a day given a date string", () => {
  expect(DAY("2015/12/16")).toBe(16)
  expect(DAY("2015-12-16")).toBe(16)
  expect(DAY("2015.12.16")).toBe(16)
  expect(DAY("2015 12 16")).toBe(16)
  expect(DAY("12/16/2015")).toBe(16)
  expect(DAY("12-16-2015")).toBe(16)
  expect(DAY("12.16.2015")).toBe(16)
  expect(DAY("12 16 2015")).toBe(16)
  expect(DAY("5/1/2015")).toBe(1)
})

test("returns a day given a date object", () => {
  expect(DAY(new Date("2015/12/16 00:00:00"))).toBe(16)
  expect(DAY(new Date("2015-12-16 00:00:00"))).toBe(16)
  expect(DAY(new Date("2015 12 16 00:00:00"))).toBe(16)
  expect(DAY(new Date("2015/5/1 00:00:00"))).toBe(1)
})

test("returns undefined given an invalid input", () => {
  expect(DAY("not a date")).toBeUndefined()
})

import dateValue from "../date-value"

test("returns a Date value when given a valid date string", () => {
  const date: Date = new Date("2018-10-7")
  expect(dateValue("2018-10-7")).toEqual(date)
  expect(dateValue("2018/10/7")).toEqual(date)
})

test("returns value parameter if imvalid input", () => {
  expect(dateValue("2018-10-07T00:00:00.000Z")).toBe("2018-10-07T00:00:00.000Z")
  expect(dateValue(undefined)).toBeUndefined()
  expect(dateValue(null)).toBeNull()
})

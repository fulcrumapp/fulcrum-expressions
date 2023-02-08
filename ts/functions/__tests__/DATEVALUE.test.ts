import DATE from "../DATE"
import DATEVALUE from "../DATEVALUE"

test("returns a date given a date string or date object", () => {
  const dateObject: Date = DATE(2015, 1, 14)

  const stringDate: Date = DATEVALUE(dateObject.toString())
  expect(stringDate.getFullYear()).toBe(2015)
  expect(stringDate.getMonth()).toBe(0)
  expect(stringDate.getDate()).toBe(14)

  const dateDate: Date = DATEVALUE(dateObject)
  expect(dateDate.getFullYear()).toBe(2015)
  expect(dateDate.getMonth()).toBe(0)
  expect(dateDate.getDate()).toBe(14)
})

test("returns undefined given invalid input", () => {
  expect(DATEVALUE("a", "b")).toBeUndefined()
})

test("returns a date value given a date and optional time string", () => {
  const localDate = new Date("2018-02-07")
  const timezone = localDate.getTimezoneOffset() / 60

  const firstDate: Date = DATEVALUE("2018-02-07")
  expect(firstDate.getFullYear()).toBe(2018)
  expect(firstDate.getMonth()).toBe(1)
  expect(firstDate.getDate()).toBe(7)
})

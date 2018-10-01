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
  expect(DATEVALUE("a", "b", "c")).toBeUndefined()
})

test("returns a date value given a date and optional time string", () => {
  const firstDate: Date = DATEVALUE("2018-02-07")
  expect(firstDate.getFullYear()).toBe(2018)
  expect(firstDate.getMonth()).toBe(1)
  expect(firstDate.getDate()).toBe(7)

  // parse as UTC, read back as local
  const secondDate: Date = DATEVALUE("2018-02-07T01:01:01Z")
  expect(secondDate.getFullYear()).toBe(2018)
  expect(secondDate.getMonth()).toBe(1)
  expect(secondDate.getDate()).toBe(7)

  // parse as UTC, read back as local
  const thirdDate: Date = DATEVALUE("2018-02-07", "06:01")
  expect(thirdDate.getFullYear()).toBe(2018)
  expect(thirdDate.getMonth()).toBe(1)
  expect(thirdDate.getDate()).toBe(7)
  expect(thirdDate.toISOString()).toBe("2018-02-07T06:01:00.000Z")

  const fourthDate: Date = DATEVALUE(new Date("2018-02-07T05:00:00.000Z"), "01:01")
  expect(fourthDate.getFullYear()).toBe(2018)
  expect(fourthDate.getMonth()).toBe(1)
  expect(fourthDate.getDate()).toBe(7)
  expect(fourthDate.toISOString()).toBe("2018-02-07T01:01:00.000Z")
})

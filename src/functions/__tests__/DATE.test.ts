import DATE from "../DATE"

test("returns a Date given a year, month, and day", () => {
  const date = DATE(2015, 1, 14)
  expect(date.getFullYear()).toBe(2015)
  expect(date.getMonth()).toBe(0)
  expect(date.getDate()).toBe(14)
})

test("it returns undefined if improper input is provided", () => {
  const newDate = new Date()
  expect((DATE("a", "b", "c"))).toBeUndefined()
  expect(DATE(newDate)).toBeUndefined()
  expect(DATE(true)).toBeUndefined()
})

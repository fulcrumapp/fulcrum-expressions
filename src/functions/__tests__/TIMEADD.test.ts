import TIMEADD from "../TIMEADD"

test("adds time to a time string", () => {
  expect(TIMEADD("12:30", 2, "hours")).toEqual("14:30")
  expect(TIMEADD("12:30", 2, "minutes")).toEqual("12:32")
  expect(TIMEADD("12:30", 3)).toEqual("15:30")
  expect(TIMEADD("03:45", 20, "minutes")).toEqual("04:05")
})

test("returns undefined for invalid input", () => {
  expect(TIMEADD(345, 20, "minutes")).toBeUndefined()
  expect(TIMEADD([ "03:45" ], 20, "minutes")).toBeUndefined()
  expect(TIMEADD("3:45", 15)).toBeUndefined()
  expect(TIMEADD("0345", 20, "minutes")).toBeUndefined()
  expect(TIMEADD(345, 20, "minutes")).toBeUndefined()
  expect(TIMEADD("03:45", "test", "minutes")).toBeUndefined()
  expect(TIMEADD("03:45", 20, "seconds")).toBeUndefined()
  expect(TIMEADD(345, 20, "minutes")).toBeUndefined()
  expect(TIMEADD("24:45", 20)).toBeUndefined()
  expect(TIMEADD("03:66", 20, "seconds")).toBeUndefined()
  expect(TIMEADD("-3:45", 20, "seconds")).toBeUndefined()
})

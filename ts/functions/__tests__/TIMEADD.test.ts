import TIMEADD from "../TIMEADD"

test("adds time to a time string", () => {
  expect(TIMEADD("00:00", 1)).toEqual("01:00")
  expect(TIMEADD("00:00", 23)).toEqual("23:00")
  expect(TIMEADD("00:00", -1)).toEqual("23:00")
  expect(TIMEADD("00:00", -48)).toEqual("00:00")
  expect(TIMEADD("00:00", 48)).toEqual("00:00")
  expect(TIMEADD("00:00", 24)).toEqual("00:00")
  expect(TIMEADD("16:00", 4)).toEqual("20:00")
  expect(TIMEADD("16:00", 1.5)).toEqual("17:30")
  expect(TIMEADD("16:00", -1.5)).toEqual("14:30")
  expect(TIMEADD("16:00", 30, "minutes")).toEqual("16:30")
  expect(TIMEADD("16:00", 100, "minutes")).toEqual("17:40")
  expect(TIMEADD("16:00", -30, "minutes")).toEqual("15:30")
  expect(TIMEADD("16:00", -100, "minutes")).toEqual("14:20")
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

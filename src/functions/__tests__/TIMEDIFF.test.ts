import TIMEDIFF from "../TIMEDIFF"

test("returns the number of minutes between 2 times", () => {
  expect(TIMEDIFF("00:00", "00:01")).toEqual(1 / 60)
  expect(TIMEDIFF("14:00", "18:00")).toEqual(4)
  expect(TIMEDIFF("02:00", "01:00")).toEqual(23)
  expect(TIMEDIFF("02:00", "02:00")).toEqual(24)
  expect(TIMEDIFF("22:00", "06:00")).toEqual(8)
  expect(TIMEDIFF("12:00", "19:00")).toEqual(7)
  expect(TIMEDIFF("23:59", "00:00")).toEqual(1 / 60)
  expect(TIMEDIFF("23:59", "00:01")).toEqual(2 / 60)
  expect(TIMEDIFF("00:00", "23:59")).toEqual(1439 / 60)
})

test("accepts an optinal third argument format to specify the unit of time to be compared", () => {
  expect(TIMEDIFF("00:00", "00:01", "minutes")).toEqual(1)
  expect(TIMEDIFF("14:00", "18:00", "minutes")).toEqual(4 * 60)
  expect(TIMEDIFF("02:00", "01:00", "minutes")).toEqual(23 * 60)
})

test("returns undefined for invalid input", () => {
  expect(TIMEDIFF(1, 2)).toBeUndefined()
  expect(TIMEDIFF("0000", "0001")).toBeUndefined()
  expect(TIMEDIFF("02:00", "0230")).toBeUndefined()
  expect(TIMEDIFF("2:00", "6:00")).toBeUndefined()
  expect(TIMEDIFF("02:00", "6:00")).toBeUndefined()
  expect(TIMEDIFF("24:00", "13:00")).toBeUndefined()
  expect(TIMEDIFF("13:00", "24:00")).toBeUndefined()
  expect(TIMEDIFF("13:69", "13:00")).toBeUndefined()
  expect(TIMEDIFF("13:00", "13:69")).toBeUndefined()
  expect(TIMEDIFF("00:00", "00:01", "seconds")).toBeUndefined()
  expect(TIMEDIFF(new Date(), null)).toBeUndefined()
  expect(TIMEDIFF("2:00", undefined)).toBeUndefined()
})

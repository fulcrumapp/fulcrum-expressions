import LCM from "../LCM"

test("returns the least common multiple", () => {
  expect(LCM(-50, 25, -45, -18, 90, 447)).toEqual(67050)
  expect(LCM("-50", 25, -45, -18, 90, "447")).toEqual(67050)
  expect(LCM(1.3, 2.5)).toEqual(2)
  expect(LCM("1.3", "2.5")).toEqual(2)
})

test("returns NaN if it receives bad input", () => {
  expect(LCM(-50, 25, -45, -18, 90, null)).toBeNaN()
  expect(LCM(-50, 25, -45, -18, 90, NaN)).toBeNaN()
  expect(LCM(undefined)).toBeNaN()
  expect(LCM(null)).toBeNaN()
  expect(LCM(true)).toBeNaN()
  expect(LCM("")).toBeNaN()
  expect(LCM(new Date())).toBeNaN()
})

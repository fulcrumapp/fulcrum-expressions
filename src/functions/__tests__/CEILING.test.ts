import CEILING from "../CEILING"

test("returns number rounded up, away from zero, to the nearest multiple", () => {
  expect(CEILING(1)).toEqual(1)
  expect(CEILING(1.5)).toEqual(2)
  expect(CEILING(2.5)).toEqual(3)
  expect(CEILING(-3.78)).toEqual(-3)
  expect(CEILING(0)).toEqual(0)
})

test("accepts numbers as strings", () => {
  expect(CEILING("2.5")).toEqual(3)
  expect(CEILING("4.3")).toEqual(5)
  expect(CEILING("-0.8")).toEqual(0)
})

test("returns NaN if it doesn't receive a number", () => {
  expect(CEILING("test")).toBeNaN()
  expect(CEILING()).toBeNaN()
})

test("accepts a second argument, multiple", () => {
  expect(CEILING(2.3333333, 4)).toEqual(4)
  expect(CEILING(0.13, 0.25)).toEqual(0.25)
  expect(CEILING(0.31, 0.25)).toEqual(0.5)
  expect(CEILING(-0.13, 0.25)).toEqual(0)
  expect(CEILING(-0.31, 0.25)).toEqual(-0.25)
})

test("returns 0 if multiple is 0", () => {
  expect(CEILING(3.13, 0)).toEqual(0)
  expect(CEILING(0.31, 0)).toEqual(0)
  expect(CEILING(2.3333333, 0)).toEqual(0)
})

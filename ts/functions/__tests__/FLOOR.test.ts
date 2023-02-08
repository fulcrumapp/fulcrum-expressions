import FLOOR from "../FLOOR"

test("returns number rounded down, towards zero, to the nearest multiple", () => {
  expect(FLOOR(1)).toBe(1)
  expect(FLOOR(1.5)).toBe(1)
  expect(FLOOR(2.5)).toBe(2)
  expect(FLOOR(-45)).toBe(-45)
  expect(FLOOR(2.3333333, 4)).toBe(0)
  expect(FLOOR(0.13, 0.25)).toBe(0)
  expect(FLOOR(0.31, 0.25)).toBe(0.25)
  expect(FLOOR(-0.13, 0.25)).toBe(-0.25)
  expect(FLOOR(-0.31, 0.25)).toBe(-0.5)
  expect(FLOOR(0.31, 0)).toBe(0)
})

test("it accepts a number as a string", () => {
  expect(FLOOR("2.5")).toBe(2)
  expect(FLOOR("-34.6")).toBe(-35)
})

test("it returns NaN if an invalid input is passed", () => {
  expect(FLOOR("test")).toBeNaN()
  expect(FLOOR()).toBeNaN()
  // @ts-ignore Bad input on purpose
  expect(FLOOR(true)).toBeNaN()
})

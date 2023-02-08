import RADIANS from "../RADIANS"

test("converts degrees to radians", () => {
  expect(RADIANS(45)).toEqual(Math.PI / 4)
  expect(RADIANS(90)).toEqual(Math.PI / 2)
  expect(RADIANS(180)).toEqual(Math.PI)
  expect(RADIANS(360)).toEqual(Math.PI * 2)
  expect(RADIANS(-45)).toEqual(-Math.PI / 4)
})

test("returns NaN for invalid input", () => {
  expect(RADIANS([])).toBeNaN()
  expect(RADIANS(undefined)).toBeNaN()
  expect(RADIANS(null)).toBeNaN()
  expect(RADIANS(NaN)).toBeNaN()
  expect(RADIANS(true)).toBeNaN()
})

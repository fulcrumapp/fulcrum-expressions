import MOD from "../MOD"

test("returns the modulus", () => {
  expect(MOD(10, 2)).toEqual(0)
  expect(MOD(11, 2)).toEqual(1)
  expect(MOD(12.5, 2)).toEqual(0.5)
  expect(MOD(11 / 3, 2)).toEqual(1.6666666666666665)
  expect(MOD("11", "2")).toEqual(1)
})

test("returns NaN if it receives invalid input", () => {
  expect(MOD(1, 0)).toBeNaN()
  expect(MOD(NaN)).toBeNaN()
  expect(MOD(undefined)).toBeNaN()
  expect(MOD(null)).toBeNaN()
  expect(MOD(true)).toBeNaN()
  expect(MOD(new Date())).toBeNaN()
  expect(MOD()).toBeNaN()
})

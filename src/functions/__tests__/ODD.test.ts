import ODD from "../ODD"

test("returns the next odd number", () => {
  expect(ODD(0)).toBe(1)
  expect(ODD(1)).toBe(1)
  expect(ODD(2)).toBe(3)
  expect(ODD(-1)).toBe(-1)
  expect(ODD(-2)).toBe(-3)
  expect(ODD(-3)).toBe(-3)
})

test("returns NaN if it receives invalid input", () => {
  expect(ODD(true)).toBeNaN()
  expect(ODD([])).toBeNaN()
  expect(ODD({})).toBeNaN()
  expect(ODD(NaN)).toBeNaN()
  expect(ODD(undefined)).toBeNaN()
  expect(ODD(null)).toBeNaN()
  expect(ODD(new Date())).toBeNaN()
  expect(ODD()).toBeNaN()
})

import LOG10 from "../LOG10"

test("returns the logarithm of a number with 10 as the base", () => {
  expect(LOG10(0)).toEqual(-Infinity)
  expect(LOG10(1)).toEqual(0)
  expect(LOG10(100)).toEqual(2)
  expect(LOG10(1 / 3)).toEqual(-0.47712125471966244)
  expect(LOG10("100")).toEqual(2)
})

test("returns NaN for invalid input", () => {
  expect(LOG10("abc")).toBeNaN()
  expect(LOG10(-100)).toBeNaN()
  expect(LOG10("")).toBeNaN()
  expect(LOG10([])).toBeNaN()
  expect(LOG10({})).toBeNaN()
  expect(LOG10(true)).toBeNaN()
  expect(LOG10(undefined)).toBeNaN()
  expect(LOG10(null)).toBeNaN()
  expect(LOG10(new Date())).toBeNaN()
})

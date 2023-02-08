import LOG from "../LOG"

test("returns the logarithm of a number with the given base", () => {
  expect(LOG(0)).toEqual(-Infinity)
  expect(LOG(1)).toEqual(0)
  expect(LOG(100)).toEqual(2)
  expect(LOG(1 / 3)).toEqual(-0.47712125471966244)
  expect(LOG("100")).toEqual(2)
})

test("returns NaN for invalid input", () => {
  expect(LOG("abc")).toBeNaN()
  expect(LOG(-100)).toBeNaN()
  expect(LOG("")).toBeNaN()
  expect(LOG([])).toBeNaN()
  expect(LOG({})).toBeNaN()
  expect(LOG(true)).toBeNaN()
  expect(LOG(undefined)).toBeNaN()
  expect(LOG(null)).toBeNaN()
  expect(LOG(new Date())).toBeNaN()
})

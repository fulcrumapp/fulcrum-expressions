import MEDIAN from "../MEDIAN"

test("returns the median number in a list of numbers", () => {
  expect(MEDIAN(1, 2, 3)).toEqual(2)
  expect(MEDIAN(2, 3, 3, 5, 7, 10)).toEqual(4)
  expect(MEDIAN(2, 3, [3, 5], 7, 10)).toEqual(4)
  expect(MEDIAN(10, 3, 7, 5, 3, 2)).toEqual(4)
  expect(MEDIAN(10, 3, 5, 3, 2)).toEqual(3)
  expect(MEDIAN("1.11", "2.22", "3.33")).toEqual(2.22)
  expect(MEDIAN(-1, -2, -3)).toEqual(-2)
})

test("returns undefined for invaid input", () => {
  expect(MEDIAN([])).toBeUndefined()
  expect(MEDIAN({})).toBeUndefined()
  expect(MEDIAN(undefined)).toBeUndefined()
  expect(MEDIAN(null)).toBeUndefined()
  expect(MEDIAN(new Date())).toBeUndefined()
  expect(MEDIAN(NaN, -2, -3)).toBeUndefined()
  expect(MEDIAN()).toBeUndefined()
})

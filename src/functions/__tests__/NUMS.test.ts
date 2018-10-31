import NUMS from "../NUMS"

test("returns an array of numbers", () => {
  expect(NUMS("2", "3", "4", "5")).toEqual([2, 3, 4, 5])
  expect(NUMS("2", 3, 4, "5")).toEqual([2, 3, 4, 5])
  expect(NUMS("2", 3, 4, "test")).toEqual([2, 3, 4, NaN])
  expect(NUMS({})).toEqual([NaN])
  expect(NUMS(false)).toEqual([NaN])
  expect(NUMS()).toEqual([])
})

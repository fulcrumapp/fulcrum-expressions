import SHUFFLE from "../SHUFFLE"

test("returns an array of shuffled values", () => {
  expect(SHUFFLE([1, 2, 3, 4])).not.toEqual([1, 2, 3, 4])
  expect(SHUFFLE()).toEqual([])
  expect(SHUFFLE(1, "test", 34, "test")).not.toEqual([1, "test", 34, "test"])
})
import UNIQUE from "../UNIQUE"

test("returns the unique values of the parameters", () => {
  expect(UNIQUE(1, 2, 3)).toEqual([1, 2, 3])
  expect(UNIQUE(1, 2, 3, 3, 3)).toEqual([1, 2, 3])
  expect(UNIQUE(1, 2, "a")).toEqual([1, 2, "a"])
  expect(UNIQUE(1, 2, "a", "a")).toEqual([1, 2, "a"])
  expect(UNIQUE("c", "c", "b", "a")).toEqual(["c", "b", "a"])
  expect(UNIQUE(1)).toEqual([1])
  expect(UNIQUE(1, 1.5, 3.75)).toEqual([1, 1.5, 3.75])
  expect(UNIQUE(1, [1.5, 3.75])).toEqual([1, 1.5, 3.75])
  expect(UNIQUE({test: 1}, {test: 1}, {test: 2}, (a: any) => a.test)).toEqual([{test: 1}, {test: 2}])
  expect(UNIQUE([{test: 1}, {test: 1}, {test: 2}], (a: any) => a.test)).toEqual([{test: 1}, {test: 2}])
})

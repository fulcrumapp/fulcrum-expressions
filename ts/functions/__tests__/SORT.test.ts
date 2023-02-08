import SORT from "../SORT"

test('returns the sorted values from the parameters', () => {
  expect(SORT(1, 2, 3)).toEqual([1, 2, 3])
  expect(SORT(3, 2, 1, 3, 3, 3)).toEqual([1, 2, 3, 3, 3, 3])
  expect(SORT(1, 2, 'a')).toEqual([1, 2, 'a'])
  expect(SORT(1, 2, 'a', 'a')).toEqual([1, 2, 'a', 'a'])
  expect(SORT('a', 'c', 'c', 'b', 'a')).toEqual(['a', 'a', 'b', 'c', 'c'])
  expect(SORT(1)).toEqual([1])
  expect(SORT(1, 1.5, 3.75)).toEqual([1, 1.5, 3.75])
  expect(SORT(1, [1.5, 3.75])).toEqual([1, 1.5, 3.75])
  expect(SORT({test: 2}, {test: 1}, {test: 1}, (a: any, b: any) => a.test)).toEqual([{test: 1}, {test: 1}, {test: 2}])
  expect(SORT([{test: 2}, {test: 1}, {test: 1}], (a: any, b: any) => a.test)).toEqual([{test: 1}, {test: 1}, {test: 2}])
})

test("returns undefined if no arguments are passed in", () => {
  expect(SORT()).toBeUndefined()
})

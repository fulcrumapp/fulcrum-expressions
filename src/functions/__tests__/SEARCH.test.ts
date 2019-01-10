import SEARCH from "../SEARCH"

test('locate one text string within a second text string', () => {
  expect(SEARCH('t', 'test')).toBe(1)
  expect(SEARCH('te', 'test')).toBe(1)
  expect(SEARCH('test', 'test')).toBe(1)
  expect(SEARCH('st', 'test')).toBe(3)
  expect(SEARCH('4', '1234')).toBe(4)
  expect(SEARCH(4, '1234')).toBe(4)
  expect(SEARCH('', 'test')).toBe(1)
  expect(SEARCH('t', 'test', 2)).toBe(4)
  expect(SEARCH("t", "test", "2")).toBe(4)
  // startPosition will default to 1
  expect(SEARCH("t", "test", "test")).toBe(1)
})

test("returns undefined if invalid data is passed in", () => {
  expect(SEARCH('abc', 'def')).toBeUndefined()
  expect(SEARCH('abc', undefined)).toBeUndefined()
  expect(SEARCH('abc', null)).toBeUndefined()
  expect(SEARCH('abc', NaN)).toBeUndefined()
  expect(SEARCH('abc', true)).toBeUndefined()
  expect(SEARCH('abc', [])).toBeUndefined()
  expect(SEARCH(null, 'abc')).toBeUndefined()
  expect(SEARCH(undefined, 'abc')).toBeUndefined()
  expect(SEARCH(NaN, 'abc')).toBeUndefined()
  expect(SEARCH([], 'abc')).toBeUndefined()
  expect(SEARCH({}, 'abc')).toBeUndefined()
  expect(SEARCH('t', 'test', 1000)).toBeUndefined()
})

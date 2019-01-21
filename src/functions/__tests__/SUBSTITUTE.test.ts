import SUBSTITUTE from "../SUBSTITUTE"

test('substitutes text in a text string', () => {
  expect(SUBSTITUTE('abc abc abc', 'abc', 'def')).toEqual('def def def')
  expect(SUBSTITUTE('abc abc abc', 'xyz', 'def')).toEqual('abc abc abc')
  expect(SUBSTITUTE('abc abc ghi', 'abc', 'def')).toEqual('def def ghi')
  expect(SUBSTITUTE('ABC abc ghi', 'abc', 'def')).toEqual('ABC def ghi')
  expect(SUBSTITUTE('abc abc abc', 'abc', 'def', 1)).toEqual('def abc abc')
  expect(SUBSTITUTE('abc abc abc', 'abc', 'def', 2)).toEqual('abc def abc')
  expect(SUBSTITUTE('abc abc abc', 'abc', 'def', 3)).toEqual('abc abc def')
  expect(SUBSTITUTE('abc abc abc', 'abc', 'def', 4)).toEqual('abc abc abc')
  expect(SUBSTITUTE('def def def', 'abc', 'def', 2)).toEqual('def def def')
  expect(SUBSTITUTE('7777', '7', '8', 2)).toEqual('7877')
})

test("returns the text parameter if an array is passed in for it", () => {
  expect(SUBSTITUTE(['abc abc abc'], 'abc', 'def')).toEqual(['abc abc abc'])
})

test("returns undefined for invalid input", () => {
  expect(SUBSTITUTE('abc abc abc', 'abc', 'def', -1)).toBeUndefined()
  expect(SUBSTITUTE(null, 'abc', 'def', 1)).toBeUndefined()
  expect(SUBSTITUTE('abc', null, 'def', 1)).toBeUndefined()
  expect(SUBSTITUTE('abc', null, null, 1)).toBeUndefined()
  expect(SUBSTITUTE(undefined)).toBeUndefined()
  expect(SUBSTITUTE(null)).toBeUndefined()
  expect(SUBSTITUTE(new Date)).toBeUndefined()
  expect(SUBSTITUTE([])).toBeUndefined()
  expect(SUBSTITUTE({})).toBeUndefined()
  expect(SUBSTITUTE(NaN)).toBeUndefined()
  expect(SUBSTITUTE()).toBeUndefined()
})
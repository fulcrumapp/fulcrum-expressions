import RPAD from "../RPAD"

test('pads a string on the right', () => {
  expect(RPAD('test', 5)).toEqual('test ')
  expect(RPAD('t', 5)).toEqual('t    ')
  expect(RPAD('test', 10)).toEqual('test      ')
  expect(RPAD('1', 2, '0')).toEqual('10')
  expect(RPAD('1', 4, '0')).toEqual('1000')
  expect(RPAD('1', "4", "0")).toEqual("1000")
  expect(RPAD(undefined, 4, "0")).toEqual('000')
})

test('returns undefined for invalid input', () => {
  expect(RPAD('test', "test", "0")).toBeUndefined()
  expect(RPAD('t', 5, 0)).toBeUndefined()
  // @ts-ignore Bad call on purpose
  expect(RPAD({ value: "test", count: 4, padding: "0"})).toBeUndefined()
})

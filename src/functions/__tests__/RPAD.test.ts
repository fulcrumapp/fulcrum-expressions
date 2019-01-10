import RPAD from "../RPAD"

test('pads a string on the right', () => {
  expect(RPAD('test', 5)).toEqual('test ')
  expect(RPAD('t', 5)).toEqual('t    ')
  expect(RPAD('test', 10)).toEqual('test      ')
  expect(RPAD('1', 2, '0')).toEqual('10')
  expect(RPAD('1', 4, '0')).toEqual('1000')
})

import CLEAN from '../CLEAN';

test('removes non-printable characters from a string', () => {
  expect(CLEAN('test')).toEqual('test');
  expect(CLEAN('test test')).toEqual('test test');
  expect(CLEAN('testԹ test')).toEqual('testԹ test');
  expect(CLEAN('test\x00\x1D\x1Etest')).toEqual('testtest');
});
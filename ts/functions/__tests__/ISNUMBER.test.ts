import ISNUMBER from '../ISNUMBER';

test('it tests for a number value', () => {
  expect(ISNUMBER(1)).toEqual(true);
  expect(ISNUMBER('1')).toEqual(false);
  expect(ISNUMBER(true)).toEqual(false);
});
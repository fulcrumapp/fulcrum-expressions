import ISNAN from '../ISNAN';

test('it tests whether the input is not a number', () => {
  expect(ISNAN(1)).toEqual(false);
  expect(ISNAN('1')).toEqual(true);
  expect(ISNAN('a7')).toEqual(true);
  expect(ISNAN({})).toEqual(true);
});
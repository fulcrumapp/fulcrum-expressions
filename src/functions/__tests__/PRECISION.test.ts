import PRECISION from '../PRECISION';

test('returns the precision of a number', () => {
  expect(PRECISION(1.11)).toEqual(2);
  expect(PRECISION('1')).toEqual(0);
  expect(PRECISION('aaa')).toEqual(NaN);
  expect(PRECISION(1 / 3)).toEqual(16);
});
  
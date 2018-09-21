import CEILING from '../CEILING';

test('returns number rounded up, away from zero, to the nearest multiple', () => {
  expect(CEILING(1)).toEqual(1);
  expect(CEILING(1.5)).toEqual(2);
  expect(CEILING(2.5)).toEqual(3);
  expect(CEILING('2.5')).toEqual(3);
  expect(CEILING('test')).toEqual(NaN);
  expect(CEILING(2.3333333, 4)).toEqual(4);
  expect(CEILING(0.13, 0.25)).toEqual(0.25);
  expect(CEILING(0.31, 0.25)).toEqual(0.5);
  expect(CEILING(-0.13, 0.25)).toEqual(0);
  expect(CEILING(-0.31, 0.25)).toEqual(-0.25);
});
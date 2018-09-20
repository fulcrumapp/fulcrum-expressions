import ROUND from '../ROUND';

test('round the given number to the specified number of digits', () => {
  expect(ROUND(1)).toEqual(1);
  expect(ROUND(1.5)).toEqual(2);
  expect(ROUND(2.5)).toEqual(3);
  expect(ROUND('2.5')).toEqual(3);
  expect(ROUND('test')).toEqual(NaN);
  expect(ROUND(2.3333333, 4)).toEqual(2.3333);
  expect(ROUND(-2.3333333, 4)).toEqual(-2.3333);
  expect(ROUND(2.3333333, 7)).toEqual(2.3333333);
  expect(ROUND(2.3333333, 8)).toEqual(2.3333333);
  expect(ROUND(1 / 3, 7)).toEqual(0.3333333);
});
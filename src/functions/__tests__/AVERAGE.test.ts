import AVERAGE from '../AVERAGE';

test('it returns the average of its arguments', () => {
  expect(AVERAGE(1, 2, 3)).toEqual(2);
  expect(AVERAGE(1)).toEqual(1);
  expect(AVERAGE(1, 1.5, 3.75)).toEqual(2.0833333333333335);
});

test('it will return NaN if a string is passed or no arguments are passed', () => {
  expect(AVERAGE(1, 2, 'a')).toEqual(NaN);
  expect(AVERAGE()).toEqual(NaN);
});

test('it will determine the average of numbers if passed multiple arrays', () => {
  expect(AVERAGE(1, [1.5, 3.75])).toEqual(2.0833333333333335);
  expect(AVERAGE([1, 1.5, 3.75])).toEqual(2.0833333333333335);
  expect(AVERAGE([[1], [1.5, 3.75]])).toEqual(2.0833333333333335);
});
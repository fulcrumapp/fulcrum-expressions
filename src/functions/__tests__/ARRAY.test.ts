import ARRAY from '../ARRAY';


test('it returns an array from the arguments', () => {
  expect(ARRAY()).toEqual([]);
  expect(ARRAY(1, 2, 3, 4)).toEqual([1, 2, 3, 4]);
  expect(ARRAY(undefined, null)).toEqual([undefined, null]);
  expect(ARRAY(NaN, NaN)).toEqual([NaN, NaN]);
  expect(ARRAY(1, 2, 3)).toEqual([1, 2, 3]);
  expect(ARRAY([])).toEqual([]);
  expect(ARRAY(undefined)).toEqual([undefined]);
  expect(ARRAY(undefined, undefined)).toEqual([undefined, undefined]);
});

test('it returns a flattened array', () => {
  expect(ARRAY([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
  expect(ARRAY([1, 2], [3, 4], [5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
  expect(ARRAY([1, 2], [3, 4], [5, [6, [7, 8]]])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  expect(ARRAY([], [], [])).toEqual([]);
  expect(ARRAY(ARRAY([], ARRAY([]), [], ARRAY()))).toEqual([]);
  expect(ARRAY(ARRAY(ARRAY(ARRAY([1, 2], [3, 4]))))).toEqual([1, 2, 3, 4]);
});

test('it accepts arguements of mixed types', () => {
  expect(ARRAY(1, '2', 3)).toEqual([1, '2', 3]);
  expect(ARRAY({}, '2', 'a7')).toEqual([{}, '2', 'a7']);
});
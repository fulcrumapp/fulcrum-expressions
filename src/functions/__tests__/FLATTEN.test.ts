import FLATTEN from '../FLATTEN';

test('it accepts a nested array of numbers and returns a flattened array', () => {
  const testArray : any[] = [1, 2, [3, [4]]];

  expect(FLATTEN(testArray)).toEqual([1, 2, 3, 4]);
});

test('it accepts a nested array of strings and returns a flattened array', () => {
  const testArray : any[] = ['Hello', 'World', ['foo', ['bar']]];

  expect(FLATTEN(testArray)).toEqual(['Hello', 'World', 'foo', 'bar']);
});

test('it accepts a nested array of mixed primitive types', () => {
  const mixedArray : any[] = ['Hello', [2, 5, ['World']]];

  expect(FLATTEN(mixedArray)).toEqual(['Hello', 2, 5, 'World']);
});

test('it returns an empty array unless it is passed an array', () => {
  expect(FLATTEN(3)).toEqual([]);
  expect(FLATTEN('Howdy')).toEqual([]);
});
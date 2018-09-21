import ISBLANK from '../ISBLANK';

test('tests if a value is blank', () => {
  expect(ISBLANK('')).toEqual(true)
  expect(ISBLANK(null)).toEqual(true)
  expect(ISBLANK(undefined)).toEqual(true)
  expect(ISBLANK(NaN)).toEqual(true)
  expect(ISBLANK([])).toEqual(true)
  expect(ISBLANK({})).toEqual(true)
  expect(ISBLANK({ test: 1 })).toEqual(false)
  expect(ISBLANK(7)).toEqual(false)
  expect(ISBLANK(true)).toEqual(false)
  expect(ISBLANK('test')).toEqual(false)
  expect(ISBLANK(new Date)).toEqual(false)
});

test('accepts an object with keys "choice_values" and "other_values"', () => {
  expect(ISBLANK({choice_values: null})).toEqual(true)
  expect(ISBLANK({choice_values: []})).toEqual(true)
  expect(ISBLANK({choice_values: [], other_values: []})).toEqual(true)
  expect(ISBLANK({choice_values: [], other_values: null})).toEqual(true)
  expect(ISBLANK({choice_values: null, other_values: null})).toEqual(true)
  expect(ISBLANK({choice_values: null, other_values: []})).toEqual(true)
  expect(ISBLANK({other_values: null})).toEqual(true)
  expect(ISBLANK({choice_values: ['a'], other_values: []})).toEqual(false)
  expect(ISBLANK({choice_values: ['a'], other_values: ['b']})).toEqual(false)
  expect(ISBLANK({choice_values: [], other_values: ['b']})).toEqual(false)
  expect(ISBLANK({choice_values: null, other_values: ['b']})).toEqual(false)
});

test('returns true if no argument is passed in', () => {
  expect(ISBLANK()).toEqual(true);
});
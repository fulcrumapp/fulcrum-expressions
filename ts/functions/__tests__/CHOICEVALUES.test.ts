import CHOICEVALUES from '../CHOICEVALUES';
test('returns the choice values of a choice field', () => {
  expect(CHOICEVALUES({choice_values: []})).toEqual([]);
  expect(CHOICEVALUES({choice_values: [], other_values: []})).toEqual([]);
  expect(CHOICEVALUES({choice_values: [], other_values: null})).toEqual([]);
  expect(CHOICEVALUES({choice_values: null, other_values: []})).toEqual([]);
  expect(CHOICEVALUES({choice_values: null})).toEqual([]);
  expect(CHOICEVALUES({choice_values: null, other_values: null})).toEqual([]);
  expect(CHOICEVALUES({other_values: null})).toEqual([]);
  expect(CHOICEVALUES({choice_values: ['a'], other_values: []})).toEqual(['a']);
  expect(CHOICEVALUES({choice_values: ['a'], other_values: ['b']})).toEqual(['a', 'b']);
  expect(CHOICEVALUES({choice_values: ['a', 'b'], other_values: ['c']})).toEqual(['a', 'b', 'c']);
  expect(CHOICEVALUES({choice_values: [], other_values: ['b']})).toEqual(['b']);
  expect(CHOICEVALUES({choice_values: null, other_values: ['b']})).toEqual(['b']);
});

test('returns an empty array if not given a choice field value', () => {
  expect(CHOICEVALUES('')).toEqual([]);
  expect(CHOICEVALUES(null)).toEqual([]);
  expect(CHOICEVALUES(NaN)).toEqual([]);
  expect(CHOICEVALUES([])).toEqual([]);
  expect(CHOICEVALUES({})).toEqual([]);
  expect(CHOICEVALUES({ test: 1 })).toEqual([]);
  expect(CHOICEVALUES(7)).toEqual([]);
  expect(CHOICEVALUES(true)).toEqual([]);
  expect(CHOICEVALUES('test')).toEqual([]);
  expect(CHOICEVALUES(new Date)).toEqual([]);
});

test('returns undefined if no argument is passed', () => {
  expect(CHOICEVALUES(undefined)).toBeUndefined();
  expect(CHOICEVALUES()).toBeUndefined();
})
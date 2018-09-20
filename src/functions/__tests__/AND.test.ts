import AND from '../AND';

test('it evaluates expressions and returns a boolean value', () => {
  expect(AND(5 > 2, 'hi' === 'howdy')).toEqual(false);
  expect(AND(5 > 2, 'hi' === 'hi')).toEqual(true);
});

test('it accepts more than two expressions', () => {
  expect(AND(3 < 6, 4 % 2 === 0, 5 < 9)).toEqual(true);
});

test('it accepts one expression', () => {
  expect(AND('this' === 'that')).toEqual(false);
});

test('it returns null if no arguments are passed', () => {
  expect(AND()).toBe(null);
});
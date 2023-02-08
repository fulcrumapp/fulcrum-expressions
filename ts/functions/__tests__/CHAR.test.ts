import CHAR from '../CHAR';

test('returns the character given the char code', () => {
  expect(CHAR(65)).toEqual('A');
  expect(CHAR(90)).toEqual('Z');
  expect(CHAR(1337)).toEqual('Թ');
});

test('it accepts numbers as strings', () => {
  expect(CHAR('65')).toEqual('A');
  expect(CHAR('90')).toEqual('Z');
  expect(CHAR('1337')).toEqual('Թ');
});

test('it returns a null character value given a non-number', () => {
  expect(CHAR('A')).toEqual("\u0000");
  expect(CHAR('a2')).toEqual("\u0000");
});
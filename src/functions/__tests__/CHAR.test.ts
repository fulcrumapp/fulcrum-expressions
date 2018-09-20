import CHAR from '../CHAR';

test('returns the character given the char code', () => {
  expect(CHAR(65)).toEqual('A');
  expect(CHAR(90)).toEqual('Z');
  expect(CHAR(1337)).toEqual('Թ');
});
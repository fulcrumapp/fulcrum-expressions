import NUM from './NUM';

/**
 * Returns the character of a given char code
 * @param number integer (character code)
 * @returns a character as a string
 * @example 
 * CHAR(65) // returns 'A'
*/

export default function CHAR(number : number | string) : string {
  const parsedNum = NUM(number);
  return String.fromCharCode(parsedNum);
}
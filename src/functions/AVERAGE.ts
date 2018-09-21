import ARRAY from './ARRAY';

/**
 * Accepts a list of numbers and returns their average (mean)
 * @param multiple integers or floats
 * @returns integer or float
 * @example
 * AVERAGE(3, 5) // returns 4
 * AVERAGE(1, 1.5, 3.75) // returns 2.0833333333333335
 */

export default function AVERAGE(...args : any[]) : number {
  const argArray : any[] = ARRAY(args);
  if (argArray.length === 0) return NaN;

  return argArray.reduce((memo: number , arg: number) => memo + arg, 0) / argArray.length
}
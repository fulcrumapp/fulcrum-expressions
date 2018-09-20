import ISNUMBER from './ISNUMBER';

/**
 * Returns a boolean value indicating if the passed in value is not a number
 * @param value numberic value
 * @returns boolean value
 * @example
 * ISNAN(9) // returns false
 * ISNAN('a7') // returns true
 */

export default function ISNAN(value: any) : boolean {
  return !ISNUMBER(value);
}
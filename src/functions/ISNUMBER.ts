import { isFinite } from 'lodash';

/**
 * Returns a boolean value indicating if value passed in is a numeric value
 * @param value any type
 * @returns boolean
 * @example
 * ISNUMBER(8) // returns true
 * ISNUMBER(3.78) // returns true
 * ISNUMBER('3.67') // returns false
 */
export default function ISNUMBER(value: any): boolean {
  return isFinite(value);
}

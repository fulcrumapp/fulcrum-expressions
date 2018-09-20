import NUM from './NUM';
import ISNAN from './ISNAN';

/**
 * Returns the number of digits to the right of the decimal point
 * @param number a numeric type
 * @returns numberic value
 * @example 
 * PRECISION(9.034) // returns 3
 * PRECISION(9) // returns 0
 */
export default function PRECISION(number: number) : number {
  const num : number = NUM(number);
  if (ISNAN(num)) return NaN;

  // convert num to string and split at decimal point, if present
  const parts : string[] = num.toString().split('.');
  
  if (parts.length < 2) return 0;

  return parts[1].length;
}
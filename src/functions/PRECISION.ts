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
export default function PRECISION(number: number) : number
export default function PRECISION(number: string) : number
export default function PRECISION(number: any) : number {
  number = NUM(number);

  if (ISNAN(number)) return NaN;

  // convert number to string and split at decimal point, if present
  const parts : string[] = number.toString().split('.');

  if (parts.length < 2) return 0;

  return parts[1].length;
}

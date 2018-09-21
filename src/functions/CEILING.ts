import NUM from './NUM';
import ABS from './ABS';
import ISNAN from './ISNAN';
import PRECISION from './PRECISION';
import ROUND from './ROUND';

/**
 * Returns number rounded up, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next highest integer (multiple of 1)
 * @param number numeric value to be rounded
 * @param multiple optional, multiple to which a number will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * CEILING(3.45) // returns 4
 * CEILING(2.3333333, 4) // returns 4
 */

export default function CEILING(number: number, multiple?: number) : number
export default function CEILING(number: string, multiple?: number) : number
export default function CEILING(number: any, multiple = 1) : number {
  const significance : number = ABS(multiple);
  const num : number = NUM(number);
  const precision : number = PRECISION(significance);

  if (ISNAN(num)) return NaN;
  if (significance === 0) return 0;

  return ROUND(Math.ceil(num / significance) * significance, precision);
}

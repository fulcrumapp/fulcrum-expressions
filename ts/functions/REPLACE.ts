/**
 * Replace characters in a string
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/replace/
 */

import FLOOR from "./FLOOR";
import ISNAN from "./ISNAN";

const NO_VALUE = null; // Define NO_VALUE locally

export default function REPLACE(
  value: any, 
  startPosition: number, 
  numberOfCharacters: number, 
  replacement: string
): string | null {
  const start = FLOOR(startPosition);
  const numChars = FLOOR(numberOfCharacters);

  if (value == null) return NO_VALUE;
  if (arguments.length < 4) return NO_VALUE;
  if (typeof value === 'object') return NO_VALUE;
  if (start < 1) return NO_VALUE;
  if (ISNAN(start)) return NO_VALUE;
  if (numChars < 0) return NO_VALUE;
  if (ISNAN(numChars)) return NO_VALUE;

  const str = String(value);
  const before = str.substring(0, start - 1);
  const after = str.substring(start - 1 + numChars);
  
  return before + replacement + after;
}
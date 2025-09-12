/**
 * Find the position of a string in another string
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/find/
 */

import NUM from "./NUM";
import ISNAN from "./ISNAN";

const NO_VALUE = null; // Define NO_VALUE locally

export default function FIND(needle: any, haystack: any, position?: number): number | null {
  const pos = NUM(position || 0);
  const startPos = ISNAN(pos) ? 0 : pos;

  if (!haystack || typeof haystack.indexOf !== 'function') {
    return NO_VALUE;
  }
  
  if (Array.isArray(needle)) {
    return NO_VALUE;
  }

  const index = haystack.indexOf(needle, startPos - 1);

  if (index < 0) {
    return NO_VALUE;
  }

  return index + 1; // Return 1-based position
}
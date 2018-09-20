import FLATTEN from './FLATTEN';
import { toArray } from 'lodash';

/**
 * Accepts any number of arguments and returns them as an array
 * @param args list of items of any type
 * @returns an array flattened to on level deep
 * @example
 * ARRAY(1, 2, 3) // returns [1, 2, 3]
 * ARRAY([1, 2], '3', [4, 5]) // returns [1, 2, '3', 4, 5]
 */

export default function ARRAY(...args: any[]) : any[] {
  return FLATTEN(toArray(args));
}
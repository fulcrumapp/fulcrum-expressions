import { toArray, find } from 'lodash';


/**
 * Accepts an array of expressions and returns true if both are true, and false if both or one is false
 * @returns boolean value
 * @example 
 * AND('this' === 'that', 4 > 2) // returns false
 * AND('this' === 'this', 4 > 2) // returns true
 */

export default function AND(...args : any[]) : boolean | null {
  if (args.length === 0) return null;

  return find(args, (item: any) => !item) === undefined;
}
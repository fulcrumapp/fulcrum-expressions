import _ from 'underscore';

/**
 * Accepts a nested array and returns an array flattened to one level deep
 * @returns a flattened array
 * @example
 * FLATTEN([1, [2, [3]]]) // returns [1, 2, 3]
 */

export default function FLATTEN(value: any[]) : any[] {
  // return null if value is not an array, otherwise return a flattened array
  return _.isArray(value) ? _.flatten(value) : [];
}
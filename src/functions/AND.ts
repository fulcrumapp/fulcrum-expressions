import _ from 'underscore';

/**
 * Accepts two expressions and returns true if both are true, and false if both or one is false
 * @returns boolean value
 * @example 
 * AND('this' === 'that', 4 > 2) // returns false
 * AND('this' === 'this', 4 > 2) // returns true
 */

export default function AND() : boolean {
  return _.find(_.toArray(arguments), (item: any) => !item) === undefined;
}
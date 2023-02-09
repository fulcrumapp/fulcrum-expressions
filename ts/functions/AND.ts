import { find } from "lodash"

/**
 * Accepts an array of expressions and returns true if both are true, and false if both or one is false
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/and/
 * @param args (Any|Array required): array/list of items of any type
 * @returns boolean value
 * @example
 * AND('this' === 'that', 4 > 2) // returns false
 */

export default function AND(...args: any[]): boolean | null {
  if (args.length === 0) { return null }

  return find(args, (item: any) => !item) === undefined
}

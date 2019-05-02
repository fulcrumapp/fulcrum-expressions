import { isEqual } from "lodash"

/**
 * Returns whether two items are deeply equal
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/exact/
 * @param value1 (Any, required): item of any type
 * @param value2 (Any, required): item of any type
 * @returns boolean
 * @example
 * EXACT([1, 2, 3], [1, 2, 3]) // returns true
 */

export default function EXACT(value1: any, value2: any): boolean {
  return isEqual(value1, value2)
}

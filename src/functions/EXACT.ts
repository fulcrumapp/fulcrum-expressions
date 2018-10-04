import { isEqual } from "lodash"

/**
 * Returns whether two items are deeply equal
 * @param value1 item of any type
 * @param value2 item of any type
 * @returns boolean
 * @example
 * EXACT([1, 2, 3], [1, 2, 3]) // returns true
 * EXACT([1, 2, 3], [2, 1, 3]) // returns false
 */

export default function EXACT(value1: any, value2: any): boolean {
  return isEqual(value1, value2)
}

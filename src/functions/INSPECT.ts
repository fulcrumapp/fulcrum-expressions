import { inspect } from "util"
/**
 * Returns a string representation of the passed in parameter
 * @param VALUE Number (required); value to inspect
 * @returns stringified value
 * @example
 * [INSPECT documentation]{`https://learn.fulcrumapp.com/dev/expressions/reference/inspect\/`}
 */
export default function INSPECT(value: any): string {
  return inspect(value)
}

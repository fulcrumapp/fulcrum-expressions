import { toArray } from "lodash"

/**
 * Returns TRUE if any argument is TRUE.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/or/
 * @param args values to evaluate
 * @returns true if any argument is truthy
 */
export default function OR(...args: any[]): boolean {
  return args.find((item) => item) !== undefined
}

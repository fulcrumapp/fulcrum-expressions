import { inspect } from "util"
/**
 * Returns a string representation of the passed in parameter
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/inspect/
 * @param value (Number, required): value to inspect
 * @returns stringified value
 */
export default function INSPECT(value: any): string {
  return inspect(value)
}

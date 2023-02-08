import { isNull, isUndefined } from "lodash"

/**
 * Returns a numeric value for the value passed in.
 * @param value required; any value, preferrably a number or a number in string form
 * @returns number
 */

export default function numberValue(value?: any): number|undefined {
  if (isNull(value) || isUndefined(value)) {
    return undefined
  } else {
    return Number(value)
  }
}

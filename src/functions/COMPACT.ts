import { filter, isArray, isNull, isUndefined } from "lodash"

/**
 * Returns a compacted array without null or undefined values.
 * @param value array of values
 * @returns a compacted array with null and undefined values removed
 * @example
 * COMPACT(['a', 'b', null, 'c']) // returns ['a', 'b', 'c']
 */

export default function COMPACT(value: any[]): any[]|undefined
export default function COMPACT(value: any): undefined
export default function COMPACT(): undefined
export default function COMPACT(value?: any[]): any[]|undefined {
  if (!isArray(value)) { return undefined }
  // allows falsey value like '', 0, and NaN to pass through
  return filter(value, (item) => !isNull(item) && !isUndefined(item))
}

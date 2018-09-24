import { filter, isArray } from "lodash"

export default function COMPACT(value: any[]): any[]|undefined {
  if (!isArray(value)) { return undefined }
  // allows falsey value like '', 0, and NaN to pass through
  return filter(value, (item) => item !== null && item !== undefined)
}

import { isArray, isFinite, isObject, isNull, isUndefined, some } from "lodash"

export interface ValidGeometry {
  type: "Point",
  coordinates: number[]
}

/**
 * Checks to see if a valid GeoJSON object was passed in.
 * @param geometry geometry object to be tested
 * @returns boolean value
 */

export default function isValidGeometry(geometry: ValidGeometry): boolean
export default function isValidGeometry(geometry: any): boolean
export default function isValidGeometry(): boolean
export default function isValidGeometry(geometry?: any): boolean {
  return false;
}
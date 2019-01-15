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
  if (isUndefined(geometry) || isNull(geometry)) { return true }

  if (!isObject(geometry) || 
      geometry.type !== "Point" ||
      !isArray(geometry.coordinates) ||
      geometry.coordinates.length !== 2 ||
      some(geometry.coordinates, (coord) => !isFinite(coord))
      ) { return false }

  return true
}
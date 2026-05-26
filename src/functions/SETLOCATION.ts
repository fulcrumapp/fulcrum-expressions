import { isNull, isUndefined } from "lodash"
import isValidGeometry, { ValidGeometry } from "../util/is-valid-geometry"
import ERROR from "./ERROR"
import FORMAT from "./FORMAT"
import SETVALUE from "./SETVALUE"

/**
 * Sets location geometry given a latitude and longitude value.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setlocation/
 * @param latitude (Number, required): latitude coordinate
 * @param longitude (Numner, required): longitude coordinate
 */

export default function SETLOCATION(latitude: number, longitude: number): void
export default function SETLOCATION(latitude: string, longitude: string): void
export default function SETLOCATION(latitude?: any, longitude?: any): void
export default function SETLOCATION(latitude?: any, longitude?: any): void {
  if  (isUndefined(latitude) || isUndefined(longitude)) {
    latitude = null
    longitude = null
  }

  const geometry: ValidGeometry|null = isNull(latitude) || isNull(longitude) ? null : { type: 'Point', coordinates: [ +longitude, +latitude ] }

  if (!isValidGeometry(geometry)) {
    ERROR(FORMAT('Invalid latitude/longitude. SETLOCATION(%s, %s).', latitude, longitude))
  }

  SETVALUE('@geometry', geometry)
}
import { isNull, isUndefined } from "lodash"
import isValidGeometry, { ValidGeometry } from "../util/is-valid-geometry"
import ERROR from "./ERROR"
import FORMAT from "./FORMAT"
import SETVALUE from "./SETVALUE"

/**
 * Sets location geometry given a latitude and longitude value.
 * @param latitude numeric value fo latitude coordinate
 * @param longitude number value for longitude coordinate
 */

export default function SETLOCATION(latitude: number, longitude: number): void
export default function SETLOCATION(latitude: number|null, longitude: number|null): void
export default function SETLOCATION(latitude?: any, longitude?: any): void
export default function SETLOCATION(latitude?: any, longitude?: any): void {
  if  (isUndefined(latitude) || isUndefined(longitude)) {
    latitude = null
    longitude = null
  }

  const geometry: ValidGeometry|null = isNull(latitude) || isNull(longitude) ? null : { type: 'Point', coordinates: [ longitude, latitude ] }

  if (!isValidGeometry(geometry)) {
    ERROR(FORMAT('Invalid latitude/longitude. SETLOCATION(%s, %s).', latitude, longitude))
  }

  SETVALUE('@geometry', geometry)
}
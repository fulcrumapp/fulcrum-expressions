import isValidGeometry, { ValidGeometry } from "../util/is-valid-geometry"

/**
 * Sets geometry values if a valid GeoJSON object is passed in.
 * @param geometry GeoJSON object containing geometry `type` and lat-long `coordinates`
 * @example
 * SETGEOMETRY({ type: "Point", coordinates: [ 0, 0 ]}) // sets geometry to Null Island
 */

export default function SETGEOMETRY(geometry: ValidGeometry): void
export default function SETGEOMETRY(geometry: any): void
export default function SETGEOMETRY(geometry?: any): void {
  if (!isValidGeometry(geometry)) {
    ERROR('Geometry must be a valid GeoJSON value.')
  }
  SETVALUE('@geometry', geometry)
}


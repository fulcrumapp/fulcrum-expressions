import isValidGeometry, { ValidGeometry } from "../util/is-valid-geometry"

/**
 * Sets geometry values
 * @param geometry (GeoJSON, required): object containing geometry `type` and lat-long `coordinates`
 * @example
 * // set geometry to Null Island
 * SETGEOMETRY({ type: "Point", coordinates: [ 0, 0 ]})
 */

export default function SETGEOMETRY(geometry: ValidGeometry): void
export default function SETGEOMETRY(geometry: any): void
export default function SETGEOMETRY(geometry?: any): void {
  if (!isValidGeometry(geometry)) {
    ERROR('Geometry must be a valid GeoJSON value.')
  }
  SETVALUE('@geometry', geometry)
}


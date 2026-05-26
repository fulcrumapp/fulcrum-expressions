import type { GeoJSONGeometry } from "../types/geometry"

/**
 * Sets geometry values
 * @param geometry (GeoJSON, required): object containing geometry `type` and lat-long `coordinates`
 * @example
 * // set geometry to Null Island
 * SETGEOMETRY({ type: "Point", coordinates: [ 0, 0 ]})
 */

export default function SETGEOMETRY(geometry: GeoJSONGeometry | null): void {}
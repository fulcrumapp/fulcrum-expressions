/**
 * Creates a LineString Feature from an Array of Positions.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometrylinestring/
 */

import type { GeoJsonProperties, Position, BBox, Feature, LineString } from "../types/geojson"
import type { Id } from "../types/geometry"

export default function GEOMETRYLINESTRING<P extends GeoJsonProperties = GeoJsonProperties>(
  coordinates: Position[],
  properties?: P,
  options: { bbox?: BBox; id?: Id } = {}
): Feature<LineString, P>
{}
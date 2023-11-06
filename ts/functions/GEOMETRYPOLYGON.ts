/**
 * Creates a Polygon Feature from an Array of LinearRings.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometrypolygon/
 */

import type { GeoJsonProperties, Position, BBox, Feature, Polygon } from "../types/geojson"
import type { Id } from "../types/geometry"

export default function GEOMETRYPOLYGON<P extends GeoJsonProperties = GeoJsonProperties>(
  coordinates: Position[][],
  properties?: P,
  options: { bbox?: BBox; id?: Id } = {}
): Feature<Polygon, P>
{}
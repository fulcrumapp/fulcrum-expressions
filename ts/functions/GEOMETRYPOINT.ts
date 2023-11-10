/**
 * Creates a Point Feature from a Position.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometrypoint/
 */

import type { GeoJsonProperties, Position, BBox, Feature, Point } from "../types/geojson"
import type { Id } from "../types/geometry"

export default function GEOMETRYPOINT<P extends GeoJsonProperties = GeoJsonProperties>(
  coordinates: Position,
  properties?: P,
  options: { bbox?: BBox; id?: Id } = {}
): Feature<Point, P>
{}
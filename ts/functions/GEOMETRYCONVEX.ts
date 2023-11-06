/**
 * Takes a Feature or a FeatureCollection and returns a convex hull Polygon.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometryconvex/
 */

import type { Feature, GeoJsonProperties, GeoJSON, Polygon } from "../types/geojson"

export default function GEOMETRYCONVEX<P extends GeoJsonProperties = GeoJsonProperties>(
  geojson: GeoJSON,
  options: {
    concavity?: number;
    properties?: P;
  } = {}
): Feature<Polygon, P> | null
{}
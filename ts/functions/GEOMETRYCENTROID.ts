/**
 * Takes one or more features and calculates the centroid using the mean of all vertices. This lessens the effect of small islands and artifacts when calculating the centroid of a set of polygons.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometrycentroid/
 */

import type { Feature, GeoJsonProperties, GeoJSON, Point } from "../types/geojson"

export default function GEOMETRYCENTROID<P extends GeoJsonProperties = GeoJsonProperties>(
  geojson: GeoJSON,
  options: {
    properties?: P;
  } = {}
): Feature<Point, P>
{}
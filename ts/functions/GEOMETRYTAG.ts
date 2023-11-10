/**
 * Takes a set of points and a set of polygons and/or multi-polygons and performs a spatial join.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometrytag/
 */

import type { FeatureCollection, Point, Polygon, MultiPolygon } from "../types/geojson"

export default function GEOMETRYTAG(
  points: FeatureCollection<Point>,
  polygons: FeatureCollection<Polygon | MultiPolygon>,
  field: string,
  outField: string
): FeatureCollection<Point>
{}
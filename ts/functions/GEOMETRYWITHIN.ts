/**
 * Takes a set of points and a set of polygons and/or multi-polygons and performs a spatial join.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometrytag/
 */

import type { Feature, Geometry } from "../types/geojson"

export default function GEOMETRYWITHIN(
  feature1: Feature<any> | Geometry,
  feature2: Feature<any> | Geometry
): boolean
{}
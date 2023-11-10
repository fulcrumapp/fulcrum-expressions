/**
 * Returns true if two geometries intersect.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometryintersects/
 */

import type { Feature, Geometry } from "../types/geojson"

export default function GEOMETRYINTERSECTS(
  feature1: Feature<any> | Geometry,
  feature2: Feature<any> | Geometry
): boolean
{}
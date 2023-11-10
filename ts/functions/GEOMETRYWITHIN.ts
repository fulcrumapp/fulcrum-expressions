/**
 * Boolean-within returns true if the first geometry is completely within the second geometry. The interiors of both geometries must intersect and, the interior and boundary of the primary (geometry a) must not intersect the exterior of the secondary (geometry b).
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometrytag/
 */

import type { Feature, Geometry } from "../types/geojson"

export default function GEOMETRYWITHIN(
  feature1: Feature<any> | Geometry,
  feature2: Feature<any> | Geometry
): boolean
{}
/**
 * Takes one or more features and returns their area in square meters.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometryarea/
 * @returns number, area
 */

import along from "@turf/along"
import type { Feature, LineString, Point } from "../types/geojson"
import type { Units } from "../types/geometry"

export default function GEOMETRYALONG(
  line: Feature<LineString> | LineString,
  distance: number,
  options: { units?: Units } = {}
): Feature<Point>
{
  return along(line, distance, options as any)
}
/**
 * Calculates the distance between two points in degrees, radians, miles, or kilometers. This uses the Haversine formula to account for global curvature.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometrydistance/
 */

import type { Point } from "../types/geojson"
import type { Coord } from "../types/geometry"
import type { Units } from "@turf/helpers";

export default function GEOMETRYDISTANCE(
  from: Coord | Point,
  to: Coord | Point,
  options: {
    units?: Units;
  } = {}
): number
{}
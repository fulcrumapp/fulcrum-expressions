/**
 * Takes two points and finds the geographic bearing between them, i.e. the angle measured in degrees from the north line (0 degrees)
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometrybearing/
 * @returns number, bearing in decimal degrees
 */

import type { Coord } from "../types/geometry"

export default function GEOMETRYBEARING(
  start: Coord,
  end: Coord
): number
{}
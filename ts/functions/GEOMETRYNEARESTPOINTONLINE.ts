/**
 * Takes a Point and a LineString and calculates the closest Point on the (Multi)LineString.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometrynearestpointonline/
 */

import type { LineString, MultiLineString, Feature, Point } from "../types/geojson"
import type { Coord, Units } from "../types/geometry"

export default function GEOMETRYNEARESTPOINTONLINE<G extends LineString | MultiLineString>(
  lines: Feature<G> | G,
  pt: Coord,
  options: { units?: Units } = {}
): Feature<
  Point,
  {
    dist: number;
    index: number;
    location: number;
    [key: string]: any;
  }
>
{}
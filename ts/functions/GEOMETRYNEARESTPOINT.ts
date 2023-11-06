/**
 * Takes a reference point and a FeatureCollection of Features with Point geometries and returns the point from the FeatureCollection closest to the reference. This calculation is geodesic.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometrynearestpoint/
 */

import type { Feature, Point, FeatureCollection } from "../types/geojson"
import type { Coord } from "../types/geometry"
import type { Units } from "@turf/helpers"

export interface NearestPoint extends Feature<Point> {
  properties: {
    featureIndex: number;
    distanceToPoint: number;
    [key: string]: any;
  };
}

export default function GEOMETRYNEARESTPOINT(
  targetPoint: Coord,
  points: FeatureCollection<Point>,
  options: {
    units?: Units;
  } = {}
): NearestPoint
{}
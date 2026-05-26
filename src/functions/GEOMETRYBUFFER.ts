/**
 * Calculates a buffer for input features for a given radius. Units supported are miles, kilometers, and degrees.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometrybuffer/
 */

import buffer from "@turf/buffer"
import type {
  Point,
  LineString,
  Polygon,
  MultiPoint,
  MultiLineString,
  MultiPolygon,
  GeometryObject,
  GeometryCollection,
  Feature,
  FeatureCollection,
} from "geojson";
import type { GeoJSONGeometry } from "../types/geometry"
import type { Units } from "../types/geometry"

interface Options {
  units?: Units;
  steps?: number;
}

export default function GEOMETRYBUFFER(
  feature:
    | Feature<GeoJSONGeometry>
    | Point
    | LineString
    | Polygon
    | MultiPoint
    | MultiLineString
    | MultiPolygon
    | FeatureCollection<GeometryObject>
    | GeometryCollection,
  radius?: number,
  options?: Options
): any
{
  return buffer(feature as any, radius, options as any)
}
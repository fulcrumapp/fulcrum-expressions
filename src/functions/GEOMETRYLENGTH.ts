/**
 * Takes a GeoJSON and measures its length in the specified units.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometrylength/
 */

import length from "@turf/length"
import type { Feature, FeatureCollection, GeometryCollection } from "../types/geojson"
import type { Units } from "../types/geometry"

export default function GEOMETRYLENGTH(
  geojson: Feature<any> | FeatureCollection<any> | GeometryCollection,
  options: {
    units?: Units;
  } = {}
): number
{
  return length(geojson, options as any)
}
/**
 * Takes a GeoJSON and measures its length in the specified units.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometrylength/
 */

import type { Feature, FeatureCollection, GeometryCollection } from "../types/geojson"

import type { Units } from "@turf/helpers"

export default function GEOMETRYLENGTH(
  geojson: Feature<any> | FeatureCollection<any> | GeometryCollection,
  options: {
    units?: Units;
  } = {}
): number
{}
/**
 * Takes one or more features and returns their area in square meters.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometryarea/
 * @returns number, area
 */

import type { Feature, FeatureCollection } from "../types/geojson"
import type { GeoJSONGeometry } from "../types/geometry"

export default function GEOMETRYAREA(geojson: Feature<any> | FeatureCollection<any> | GeoJSONGeometry): number
{}
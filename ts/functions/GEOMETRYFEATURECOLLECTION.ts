/**
 * Takes one or more Features and creates a FeatureCollection.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometryfeaturecollection/
 */

import type { GeoJsonProperties, BBox, Feature, FeatureCollection } from "../types/geojson"
import type { Id } from "../types/geometry"
import type { GeoJSONGeometry, Id } from "../types/geometry"

export default function GEOMETRYFEATURECOLLECTION<
  G extends GeoJSONGeometry = GeoJSONGeometry,
  P extends GeoJsonProperties = GeoJsonProperties,
>(
  features: Array<Feature<G, P>>,
  options: { bbox?: BBox; id?: Id } = {}
): FeatureCollection<G, P>
{}
/**
 * Wraps a GeoJSON Geometry in a GeoJSON Feature.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/geometryfeature/
 */

import type { GeoJsonProperties, BBox, Feature } from "../types/geojson"
import type { GeoJSONGeometry, Id } from "../types/geometry"

export default function GEOMETRYFEATURE<
  G extends GeoJSONGeometry = GeoJSONGeometry,
  P extends GeoJsonProperties = GeoJsonProperties,
  >(
  geom: G | null,
  properties?: P,
  options: { bbox?: BBox; id?: Id } = {}
  ): Feature<G, P>
{}
import { isUndefined } from "lodash"
import { CONFIG, FeatureGeometry } from "./CONFIG"
import NUM from "./NUM"

/**
 * Returns the latitude of the record if it exists.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/latitude/
 * @returns numeric value
 */

export default function LATITUDE(): number {
  const featureGeometry: FeatureGeometry|undefined = CONFIG().featureGeometry
  if (isUndefined(featureGeometry)) { return NaN }
  return NUM(featureGeometry.coordinates[1])
}

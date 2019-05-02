import { isUndefined } from "lodash"
import { CONFIG, FeatureGeometry } from "./CONFIG"
import NUM from "./NUM"

/**
 * Returns a record's longitude if it exists.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/longitude/
 * @returns number
 */

export default function LONGITUDE(): number {
  const featureGeometry: FeatureGeometry|undefined = CONFIG().featureGeometry
  if (isUndefined(featureGeometry)) { return NaN }
  return NUM(featureGeometry.coordinates[0])
}

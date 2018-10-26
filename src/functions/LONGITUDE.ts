import { isUndefined } from "lodash"
import { CONFIG, FeatureGeometry } from "./CONFIG"
import NUM from "./NUM"

/**
 * Returns a record's longitude if it exists.
 */

export default function LONGITUDE(): number {
  const featureGeometry: FeatureGeometry|undefined = CONFIG().featureGeometry
  if (isUndefined(featureGeometry)) { return NaN }
  return NUM(featureGeometry.coordinates[0])
}

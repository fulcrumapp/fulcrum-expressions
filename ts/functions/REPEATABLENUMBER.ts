import { isUndefined } from "lodash"
import { CONFIG } from "./CONFIG"

/**
 * Returns human-readable index of current repeatable field. Subtract 1 from returned value for computer index.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/repeatablenumber/
 */

export default function REPEATABLENUMBER(): number|undefined {
  if (isUndefined(CONFIG().featureIndex)) { return }

  // @ts-ignore Already checked for undefined values in above condition
  return CONFIG().featureIndex + 1
}

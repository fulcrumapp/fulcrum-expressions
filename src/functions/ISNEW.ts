import { CONFIG } from "./CONFIG"

/**
 * Returns a boolean indicating whether the feature is new or an update.
 */

export default function ISNEW(): boolean {
  return CONFIG().featureIsNew === true
}

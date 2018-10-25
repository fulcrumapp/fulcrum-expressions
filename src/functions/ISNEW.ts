import { CONFIG } from "./CONFIG"

/**
 * Indicates whether the feature currently being edited is new.
 */

export default function ISNEW(): boolean {
  return CONFIG().featureIsNew === true
}

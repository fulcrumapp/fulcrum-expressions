import { CONFIG } from "./CONFIG"

/**
 * Returns a boolean indicating whether the feature is new or an update.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isnew/
 * @returns boolean
 */

export default function ISNEW(): boolean {
  return CONFIG().featureIsNew === true
}

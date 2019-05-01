import { CurrentLocation } from "../types/values"

/**
 *  Returns the current device location as an object. This can be used for Q/A purposes or
 *  other custom processing logic. This is not always the same as the record location.
 *  For example, if editing an imported record or previously created record, the current
 *  location will be different.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/currentlocation/
 */

export default function CURRENTLOCATION(): CurrentLocation | null {
  return $$runtime.currentLocation || null
}

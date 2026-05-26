import { isUndefined } from "lodash"
import ISPORTRAIT, { MediaObject } from "./ISPORTRAIT"

/**
 * Checks whether the media is in landscape mode.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/islandscape/
 * @param media (MediaObject, required): height and width attributes must be present
 * @returns boolean
 * @example
 * const mediaObject = { width: 200, height: 100 }
 * ISLANDSCAPE(mediaObject) // returns true
 */

export default function ISLANDSCAPE(media: MediaObject): boolean
export default function ISLANDSCAPE(media: any): boolean|undefined
export default function ISLANDSCAPE(): undefined
export default function ISLANDSCAPE(media?: MediaObject|any): boolean|undefined {
  if (isUndefined(media) || isUndefined(media.width) || isUndefined(media.height) ) { return undefined }

  return !ISPORTRAIT(media)
}

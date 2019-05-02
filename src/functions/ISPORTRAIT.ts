import { isUndefined } from "lodash"

export interface MediaObject {
  height: number,
  width: number,
  orientation?: number
}

/**
 * Checks whether the media is in portrait mode.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/isportrait/
 * @param media (MediaObject, required): media object, height and width attributes must be present
 * @returns boolean
 * @example
 * const mediaObject = { width: 100, height: 200 }
 * ISPORTRAIT(mediaObject) // returns true
 */
export default function ISPORTRAIT(media: MediaObject): boolean
export default function ISPORTRAIT(media: any): boolean|undefined
export default function ISPORTRAIT(): undefined
export default function ISPORTRAIT(media?: MediaObject|any): boolean|undefined {
  if (isUndefined(media) || isUndefined(media.width) || isUndefined(media.height) ) { return undefined }
  let width: number = media.width
  let height: number = media.height

  // photos
  if (media.orientation === 6 || media.orientation === 8) {
    width = media.height
    height = media.width
  }

  // videos
  if (media.orientation === 90 || media.orientation === 270) {
    width = media.height
    height = media.width
  }

  return width <= height
}

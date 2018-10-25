import ISNEW from "./ISNEW"

/**
 * Returns a boolean indicating if the feature being edited is an update
 */

export default function ISUPDATE(): boolean {
  return !ISNEW()
}

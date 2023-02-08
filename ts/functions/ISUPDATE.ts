import ISNEW from "./ISNEW"

/**
 * Returns a boolean indicating if the feature being edited is an update
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isupdate/
 * @returns boolean
 */

export default function ISUPDATE(): boolean {
  return !ISNEW()
}

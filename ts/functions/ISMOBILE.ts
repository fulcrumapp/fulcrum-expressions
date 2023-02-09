import CONTAINS from "./CONTAINS"
import PLATFORM from "./PLATFORM"

/**
 * Returns true if the record is being edited from the mobile app
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/ismobile/
 * @returns boolean value
 */

export default function ISMOBILE(): boolean {
  return CONTAINS(["iOS", "Android"], PLATFORM())
}

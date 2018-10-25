import ARRAY from "./ARRAY"
import CONTAINS from "./CONTAINS"
import ROLE from "./ROLE"

/**
 * Determines whether arguments passed in contain the role of the current user
 * by comparing it to  userRoleName on the configuration object
 * @param args required; role(s) to be checked as strings
 * @returns boolean
 * @example
 * // userRoleName = Standard User
 * ISROLE("Admin") // returns false
 * ISROLE("Admin", "ReadOnly", "Standard User") // returns true
 */
export default function ISROLE(...args: string[]): boolean
export default function ISROLE(...args: any[]): boolean
export default function ISROLE(...args: any[]): boolean {
  return CONTAINS(ARRAY(args), ROLE())
}

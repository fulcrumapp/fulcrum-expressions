import ARRAY from "./ARRAY"
import CONTAINS from "./CONTAINS"
import ROLE from "./ROLE"

/**
 * Determines whether arguments passed in contain the role of the current user
 * by comparing it to  userRoleName on the configuration object
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isrole/
 * @param args (String|Array, required): role(s) to be checked
 * @returns boolean
 */
export default function ISROLE(...args: string[]): boolean
export default function ISROLE(...args: any[]): boolean
export default function ISROLE(...args: any[]): boolean {
  return CONTAINS(ARRAY(args), ROLE())
}

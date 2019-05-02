import { isNull, isString, isUndefined } from "lodash"
import ERROR from "./ERROR"
import SETVALUE from "./SETVALUE"

/**
 * Assign a user to a record.
 * @param user (String, required): user's name
 */

export default function SETASSIGNMENT(user: string): void {
  // if user exists and is not a string, throw error
  if (!(isUndefined(user) || isNull(user)) && !isString(user)) {
    ERROR('user must be a string')
  }
  
  SETVALUE('@assignment', user)
}

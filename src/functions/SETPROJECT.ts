import { isNull, isString, isUndefined } from "lodash"
import ERROR from "./ERROR"
import SETVALUE from "./SETVALUE"

/**
 * Sets project for a record.
 * @param project project name, string
 */

export default function SETPROJECT(project: string): void
export default function SETPROJECT(project: any): void
export default function SETPROJECT(project: any): void {
  if (!(isUndefined(project) || isNull(project)) && !isString(project)) { 
    ERROR('project must be a string')
  }
  SETVALUE('@project', project)
}
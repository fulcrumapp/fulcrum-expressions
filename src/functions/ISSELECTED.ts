import { isArray, isNull, isUndefined } from "lodash"
import { ChoiceFieldValue } from "../types/values"
import CONTAINS from "./CONTAINS"
import ISBLANK from "./ISBLANK"

/**
 * Checks to see if a choice is selected
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isselected/
 * @param value (ChoiceFieldValue, required): field object containing possible choices to check against
 * @param choice (Any|Array, required): choice or array of choices to check if they are selected
 * @returns boolean
 */

export default function ISSELECTED(value: ChoiceFieldValue, choice: string|string[]): boolean
export default function ISSELECTED(value: ChoiceFieldValue, choice?: string|string[]): boolean
export default function ISSELECTED(value?: any, choice?: any): boolean
export default function ISSELECTED(value: any, choice?: any): boolean {
  if (ISBLANK(value)) { return false }
  if (isUndefined(choice) || isNull(choice)) { return false }

  if (isArray(choice)) {
    return choice.filter((item) => !ISSELECTED(value, item)).length === 0
  }

  if (value && value.choice_values) {
    if (CONTAINS(value.choice_values, choice)) { return true }
  }

  if (value && value.other_values) {
    if (CONTAINS(value.other_values, choice)) { return true }
  }

  return false
}

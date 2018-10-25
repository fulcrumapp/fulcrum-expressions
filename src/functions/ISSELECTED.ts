import { isArray, isNull, isUndefined } from "lodash"
import { ChoiceFieldValue } from "../types/values"
import CONTAINS from "./CONTAINS"
import ISBLANK from "./ISBLANK"

/**
 * Checks to see if a choice is selected
 * @param value required; ChoiceFieldValues containing possible choices to check against
 * @param choice required; choice or array of choices to check if they are selected
 * @returns boolean
 * @example
 * ISELECTED({choice_values: ["test", "not test"]}, "test")) // returns true
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

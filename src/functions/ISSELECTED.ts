import { isArray, isNull, isUndefined } from "lodash"
import { ChoiceFieldValue } from "../types/values"
import CONTAINS from "./CONTAINS"
import ISBLANK from "./ISBLANK"

export default function ISSELECTED(value: ChoiceFieldValue, choice: string): boolean {
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

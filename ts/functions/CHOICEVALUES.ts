import { compact, concat, isUndefined } from "lodash"
import { FormFieldValues as ChoiceFieldValue} from "../types/values"
import ISBLANK from "./ISBLANK"

/**
 * Converts a choicefield object to an array with null values and blank strings removed
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/choicevalues/
 * @param field (ChoiceFieldValue, required)
 * @returns array of choice values
 * @example
 * CHOICEVALUES($choice_field) // returns [ 'a', 'b', 'c', 'd' ]
 */
export default function CHOICEVALUES(field: ChoiceFieldValue): string[]
export default function CHOICEVALUES(field: any): any[]
export default function CHOICEVALUES(): undefined
export default function CHOICEVALUES(field?: ChoiceFieldValue | any): string[] | undefined {
  if (isUndefined(field)) { return undefined }
  if (ISBLANK(field)) { return [] }

  const choices = field as ChoiceFieldValue
  const choiceValues = choices.choice_values || []
  const otherValues = choices.other_values || []

  return compact(concat(choiceValues, otherValues))
}

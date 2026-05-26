import { compact, concat, isUndefined } from "lodash"
import { ChoiceFieldValue } from "../types/values"
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
export default function CHOICEVALUES(value: ChoiceFieldValue): string[]
export default function CHOICEVALUES(value: any): any[]
export default function CHOICEVALUES(): undefined
export default function CHOICEVALUES(value?: ChoiceFieldValue | any): string[] | undefined {
  if (isUndefined(value)) { return undefined }
  if (ISBLANK(value)) { return [] }

  const choiceValues = value.choice_values || []
  const otherValues = value.other_values || []

  return compact(concat(choiceValues, otherValues))
}

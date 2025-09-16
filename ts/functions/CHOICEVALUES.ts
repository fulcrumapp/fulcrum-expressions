import { compact, concat, isUndefined } from "lodash"
import { ChoiceFieldValue } from "../types/values"
import ISBLANK from "./ISBLANK"

declare const NO_VALUE: any;

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
  if (isUndefined(value)) { return NO_VALUE }
  
  // Check if it's a valid choice field object first
  if (typeof value !== 'object' || value === null) { 
    if (ISBLANK(value)) { return NO_VALUE }
    return NO_VALUE
  }
  
  // If it has choice_values or other_values properties, it's a potential choice field
  if ('choice_values' in value || 'other_values' in value) {
    // If both properties are null/undefined, treat as NO_VALUE
    if (!value.choice_values && !value.other_values) {
      return NO_VALUE
    }
    
    const choiceValues = value.choice_values || []
    const otherValues = value.other_values || []
    return compact(concat(choiceValues, otherValues))
  }
  
  // Otherwise, check if it's blank and return NO_VALUE
  if (ISBLANK(value)) { return NO_VALUE }
  return NO_VALUE
}

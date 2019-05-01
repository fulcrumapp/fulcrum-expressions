import { isArray } from "lodash"
import { MaybeString } from "../types/primitives"
import { ChoiceFieldValue } from "../types/values"
import CHOICEVALUES from "./CHOICEVALUES"

/**
 * Returns the first choice value in the choice field value passed to the function
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/choicevalue/
 * @param field (ChoiceField value, required): `{choice_values: ['a', 'b'], other_values" ['c', 'd']}`
 * @returns string, first choice in a list of choice field values
 * @example
 * CHOICEVALUE($choice_field) // returns "Red"
 */

export default function CHOICEVALUE(field: ChoiceFieldValue): MaybeString
export default function CHOICEVALUE(field: any): MaybeString
export default function CHOICEVALUE(field: any): MaybeString {
  const values = CHOICEVALUES(field)

  if (!isArray(values)) { return undefined }
  if (values.length === 0) { return undefined }

  return values[0]
}

import { isArray } from "lodash"
import { MaybeString } from "../primitives"
import { ChoiceFieldValue } from "../values"
import CHOICEVALUES from "./CHOICEVALUES"

/**
 * Returns the first choice value in the choice field value passed to the function
 * @param field Choice field value, e.g. `{choice_values: ['a', 'b'], other_values" ['c', 'd']}`
 * @returns string value, first choice in a list of choice field values
 * @example
 * CHOICEVALUE({choice_values: ['a', 'b'], other_values: ['c', 'd']}) // returns 'a'
 */

export default function CHOICEVALUE(field: ChoiceFieldValue): MaybeString
export default function CHOICEVALUE(field: any): MaybeString
export default function CHOICEVALUE(field: any): MaybeString {
  const values = CHOICEVALUES(field)

  if (!isArray(values)) { return undefined }
  if (values.length === 0) { return undefined }

  return values[0]
}

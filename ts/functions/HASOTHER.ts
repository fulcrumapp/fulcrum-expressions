import { isArray } from "lodash"
import { ChoiceFieldValue } from "../types/values"

/**
 * Returns where or not a ChoiceFieldValue has an `other_values` key
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/hasother/
 * @param value (ChoiceFieldValue, required): `{ choice_values?: string[ ], other_values?: string[ ] }`
 * @returns boolean value
 */

export default function HASOTHER(value: ChoiceFieldValue): boolean
export default function HASOTHER(value?: any): boolean
export default function HASOTHER(): boolean
export default function HASOTHER(value?: any): boolean {
  return !!(value &&
     value.other_values &&
     isArray(value.other_values) &&
     value.other_values.length > 0)
}

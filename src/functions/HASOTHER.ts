import { isArray } from "lodash"
import { ChoiceFieldValue } from "../types/values"

/**
 * Returns where or not a ChoiceFieldValue has an `other_values` key
 * @param value ChoiceFieldValue { choice_values?: string[ ], other_values?: string[ ] }
 * @returns boolean value
 * @example
 * const choiceField1 = { choice_values: ["yes", "no"], other_values: ["maybe"] }
 * const choiceField2 = { choice_values: ["yes", "no"] }
 * HASOTHER(choiceField1) // returns true
 * HASOTHER(choiceField2) // returns false
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

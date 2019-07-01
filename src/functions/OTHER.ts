import HASOTHER from "./HASOTHER"
import ISBLANK from "./ISBLANK"

/**
 * Returns the current 'Other' value for a choice field or classification field
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/other/
 * 
 * @param (ChoiceFieldValue, required): The choice field or classification field variable
 * @returns string - current 'Other' value
 */

export default function OTHER(value: ChoiceFieldValue): string|undefined
export default function OTHER(value: Object): string|undefined
export default function OTHER(value: any): string|undefined
export default function OTHER(value: any): string|undefined {
  if (!HASOTHER(value) || ISBLANK(value.other_values)) {
    return
  }

  return value.other_values[0]
}
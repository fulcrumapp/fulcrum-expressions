import { isUndefined } from "lodash"
import { FormFields as FormField } from "../types/fields"
import { MaybeString } from "../types/primitives"
import FIELD from "./FIELD"

/**
 * Returns a field's description.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/description/
 * @param dataName (String, required): data name of desired field
 * @returns string, the field's description
 */

export default function DESCRIPTION(dataName: MaybeString): string | undefined
export default function DESCRIPTION(): undefined
export default function DESCRIPTION(dataName?: MaybeString): string | undefined {
  const field: FormField|undefined = FIELD(dataName)

  if (isUndefined(field)) { return }

  return field.description
}

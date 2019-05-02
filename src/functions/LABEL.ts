import { isUndefined } from "lodash"
import { FormField, FieldName } from "../types/fields"
import FIELD from "./FIELD"

/**
 * Returns the label of a field
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/label/
 * @param dataName (String, required): data name of desired field
 * @returns form label, string
 * @example
 * LABEL("business_name") // returns "Business Name"
 */

export default function LABEL(dataName: FieldName): string|undefined {
  const field: FormField|undefined = FIELD(dataName)

  if (isUndefined(field)) { return }

  return field.label
}

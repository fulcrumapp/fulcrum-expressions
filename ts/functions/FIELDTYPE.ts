import { isUndefined } from "lodash"
import { FormFields, FieldName } from "../types/fields"
import FIELD from "./FIELD"

/**
 * Returns a field's type.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/fieldtype/
 * @param dataName (String, required): data name of desired field
 * @returns the field's type
 * @example
 * FIELDTYPE("operating_hours") // returns "TimeField"
 */

export default function FIELDTYPE(dataName: FieldName): string|undefined {
  const field: FormFields|undefined = FIELD(dataName)

  if (isUndefined(field)) { return undefined }

  return field.type
}

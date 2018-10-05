import { isUndefined } from "lodash"
import { FormFields } from "../types/fields"
import FIELD from "./FIELD"

export default function FIELDTYPE(dataName: string): string|undefined {
  const field: FormFields|undefined = FIELD(dataName)

  if (isUndefined(field)) { return undefined }

  return field.type
}

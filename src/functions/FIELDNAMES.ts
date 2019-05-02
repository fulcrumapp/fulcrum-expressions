import { isUndefined, map } from "lodash"
import FIELDS, { FieldsOptions } from "./FIELDS"
import { ContainerFieldName, FieldName } from "../types/fields"

/**
 * Returns child field names when passed in a parent's dataname
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/fieldnames/
 * @param dataName (String, required): parent field's data name
 * @param options (Object, optional); object indicating if result should be flattened recursively,
 * e.g. `{ repeatables: boolean, sections: boolean }`
 * @returns array of child field names
 */

export default function FIELDNAMES(dataName: ContainerFieldName, options?: FieldsOptions ): FieldName[] | undefined
export default function FIELDNAMES(dataName: ContainerFieldName): FieldName[] | undefined
export default function FIELDNAMES(dataName: ContainerFieldName, options = {}): FieldName[] | undefined {
  const fields: FormFields[] | undefined = FIELDS(dataName, options)

  if (isUndefined(fields)) { return undefined }

  return map(fields, (o) => o.data_name)
}

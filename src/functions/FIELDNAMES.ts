import { isUndefined, map } from "lodash"
import FIELDS, { FieldsOptions } from "./FIELDS"
import { ContainerFieldName, FieldName } from "../types/fields"

/**
 * Returns child field names when passed in a parent's dataname
 * @param dataName required; string
 * @param options optional; object indicating if result should be flattened recursively,
 * e.g. `{ repeatables: boolean, sections: boolean }`
 * @returns array of child field names
 * @example
 * FIELDNAMES('items')
 * // returns ['cost', 'choice_value', 'child_items', 'child_item_cost']
 *
 * // do not recursively look for child records of repeatable children
 * FIELDNAMES('items', { repeatables: false })
 * // returns ['cost', 'choice_value', 'child_items']
 */

export default function FIELDNAMES(dataName: ContainerFieldName, options?: FieldsOptions ): FieldName[] | undefined
export default function FIELDNAMES(dataName: ContainerFieldName): FieldName[] | undefined
export default function FIELDNAMES(dataName: ContainerFieldName, options = {}): FieldName[] | undefined {
  const fields: FormFields[] | undefined = FIELDS(dataName, options)

  if (isUndefined(fields)) { return undefined }

  return map(fields, (o) => o.data_name)
}

import { isEmpty, isUndefined } from "lodash"
import { FormField, FormFields } from "../types/fields"
import flattenElements from "../util/flatten-elements"
import FIELD from "./FIELD"

interface FieldsOptions {
  repeatables?: boolean,
  sections?: boolean,
}

/**
 * Returns child fields associated with a given data name
 * @param dataName required; string
 * @param options optional; object: `{ repeatables: boolean, sections: boolean }`
 * @returns array of child fields
 *
 */

export default function FIELDS(dataName: string): FormFields[]
export default function FIELDS(dataName: string, options: FieldsOptions): FormFields[]
export default function FIELDS(): undefined
export default function FIELDS(dataName?: string, options?: FieldsOptions): FormFields[]|undefined {
  const element: FormFields|undefined = FIELD(dataName)
  if (isUndefined(options)) { options = {} }
  if (isUndefined(options.repeatables)) { options.repeatables = true }
  if (isUndefined(options.sections)) { options.sections = true }

  if (isUndefined(element)) { return undefined }
  if (isEmpty(element)) { return undefined }

  return flattenElements([ element ], options.repeatables, false, undefined, options.sections)
}

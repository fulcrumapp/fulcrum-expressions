import { isNull, isUndefined } from "lodash"
import { AddressFieldValue, ChoiceFieldValue } from "../types/values"
import { FormFields } from "../types/fields"
import { converters, RecordLinkIds } from "./converters"

/**
 * Converts value to proper format for $$HOST depending on element type.
 * @param element required; single element of type FormFields
 * @param value required; value to be converted
 * @returns converted value as `string|ChoiceFieldValue|AddressFieldValue|RecordLinkIds[]|null`
 */

export default function makeValue(element: FormFields,
                                  value?: string|ChoiceFieldValue|AddressFieldValue|string[]|number[]|null,
                                  ): string|ChoiceFieldValue|AddressFieldValue|RecordLinkIds[]|null {
  if (isUndefined(value) || isNull(value)) { return null }

  const converter: Function = converters[element.type]

  return !isUndefined(converter) ? converter(value) : null
}

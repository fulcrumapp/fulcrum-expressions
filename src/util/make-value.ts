import { isNull, isUndefined } from "lodash"
import { AddressFieldValue, ChoiceFieldValue } from "../types/values"
import { converters, RecordLinkIds } from "./converters"

export default function makeValue(element: FormFields,
                                  value?: string|ChoiceFieldValue|AddressFieldValue|string[]|number[]|null,
                                  ): string|ChoiceFieldValue|AddressFieldValue|RecordLinkIds[]|null {
  if (isUndefined(value) || isNull(value)) { return null }

  const converter: Function = converters[element.type]

  return (!isUndefined(converter) && !isNull(converter)) ? converter(value) : null
}

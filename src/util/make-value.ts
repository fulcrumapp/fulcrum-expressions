import EXISTS from "../functions/EXISTS"
import { AddressFieldValue, ChoiceFieldValue } from "../types/values"
import { converters, RecordLinkIds } from "./converters"

export default function makeValue(element: FormFields,
                                  value: string|ChoiceFieldValue|AddressFieldValue|string[]|number[],
                                  ): string|ChoiceFieldValue|AddressFieldValue|RecordLinkIds[]|null {
  if (!EXISTS(value)) { return null }

  const converter: Function = converters[element.type]

  return EXISTS(converter) ? converter(value) : null
}

import { isNull, isUndefined } from "lodash"
import { FormFields } from "../types/fields"
import { AddressFieldValue, ChoiceFieldValue } from "../types/values"
import { RecordLinkIds } from "../util/converters"
import isSetValueSupported from "../util/is-set-value-supported"
import makeValue from "../util/make-value"
import ERROR from "./ERROR"
import FIELD from "./FIELD"
import FORMAT from "./FORMAT"

export interface SetValueResult {
  type: "set-value",
  key: FormField|string,
  value: string
}

export default function SETVALUE(dataName: string, value: string): void {
  const element: FormFields|undefined = FIELD(dataName)
  if (!isUndefined(element)) {
  // don't let the user accidentally blow out data in unsupported fields
    let containerElements: FormFields[]
    if (!isNull($$runtime.repeatable)) {
      // @ts-ignore if-statement checks that $$runtime.repeatable will not be null so it can be used as an index here
      containerElements = $$runtime.elementsByKey[$$runtime.repeatable].elements
    }  else {
      containerElements = $$runtime.form.elements
    }

    const supported: boolean = isSetValueSupported(containerElements, element, element.type)

    if (!supported) {
      ERROR(FORMAT("Setting the value of '%s' is not supported.", dataName))
    }
  }
  let convertedValue: string|ChoiceFieldValue|AddressFieldValue|RecordLinkIds[]|null
  convertedValue = !isUndefined(value) ? makeValue(element, value) : null
  // TODO(zhm) guard well-known supported values in the else case
  // @project, @status, @geometry, etc
  // Force the types to be correct so we don't pass back an array for
  // the project or a number for the status, etc. The native apps
  // should never be handed back data with the wrong JS types.

  const result: SetValueResult = {
    key: element.key || dataName,
    type: "set-value",
    value: JSON.stringify(convertedValue),
  }

  $$runtime.results.push(result)
}

import { compact,
        filter,
        isArray,
        isNull,
        isNumber,
        isObject,
        isString,
        isUndefined,
        map,
        toString } from "lodash"
import DATEVALUE from "../functions/DATEVALUE"
import FORMAT from "../functions/FORMAT"
import LPAD from "../functions/LPAD"
import NUM from "../functions/NUM"
import { AddressFieldValue, ChoiceFieldValue } from "../types/values"
import makeChoiceValue from "./make-choice-value"

const UUID_REGEX: RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i

interface Converter {
  [FormField: string]: Function
}

export interface RecordLinkIds {
  record_id: string
}

/** Object containing functions to convert values to appropriate format for $$HOST.
 * Functions are accessed according to FieldType.
 * @example
 * converters["CalculatedField"]
 */

export const converters: Converter = {
    TextField: (value: string): string|null => {
      if (isUndefined(value) || isNull(value)) { return null }
      return value.toString()
    },

  CalculatedField: (value: string): string|null => {
    return converters.TextField(value)
  },

  HyperlinkField: (value: string): string|null => {
    return converters.TextField(value)
  },

  YesNoField: (value: string): string|null => {
    return converters.TextField(value)
  },

  BarcodeField: (value: string): string|null => {
    return converters.TextField(value)
  },

  DateTimeField: (value: string): string|null => {
    if (isUndefined(value) || isNull(value)) { return null }

    const date: Date = DATEVALUE(value)

    if (isUndefined(date) || isNull(date)) { return null }

    return FORMAT("%s-%s-%s",
      date.getFullYear(),
      LPAD(date.getMonth() + 1, 2, "0"),
      LPAD(date.getDate(), 2, "0"))
  },

  DateField: (value: string): string|null => {
    return converters.DateTimeField(value)
  },

  TimeField: (value: string): string|null => {
    if (!isString(value)) { return null }
    if (value.length !== 5) { return null }
    if (value[2] !== ":") { return null }

    const parts: string[] = value.split(":")

    const hour: number = NUM(parts[0])
    const minute: number = NUM(parts[1])

    if (hour > 23 || hour < 0) { return null }
    if (minute > 59 || minute < 0) { return null }

    return FORMAT("%s:%s",
      LPAD(hour, 2, "0"),
      LPAD(minute, 2, "0"))
  },

  ChoiceField: (value: ChoiceFieldValue): ChoiceFieldValue|null => {
    let choices: null|string[] = null

    if (isArray(value)) {
      choices = map(compact(value), (v) => v.toString())
     } else if (isString(value) && value.length !== 0) {
      choices = [ value ]
     } else if (isNumber(value)) {
      choices = [ value.toString() ]
     } else if (isObject(value) && isArray(value.choice_values)) {
      choices = map(compact(value.choice_values), (v) => v.toString())
     }

    if (!isArray(choices)) { return null }

    return makeChoiceValue(choices, [])
  },

  ClassificationField: (value: ChoiceFieldValue): ChoiceFieldValue|null => {
    return converters.ChoiceField(value)
  },

  AddressField: (value: AddressFieldValue): AddressFieldValue|null => {
    if (!isObject(value)) { return null }

    const address: AddressFieldValue = {
      sub_thoroughfare: (!isUndefined(value.sub_thoroughfare) && !isNull(value.sub_thoroughfare)) ?
        toString(value.sub_thoroughfare) : null,
      thoroughfare: (!isUndefined(value.thoroughfare) && !isNull(value.thoroughfare)) ?
        toString(value.thoroughfare) : null,
      // tslint:disable-next-line:object-literal-sort-keys to follow standard address format
      suite: (!isUndefined(value.suite) && !isNull(value.suite)) ? toString(value.suite) : null,
      locality: (!isUndefined(value.locality) && !isNull(value.locality)) ? toString(value.locality) : null,
      sub_admin_area: (!isUndefined(value.sub_admin_area) && !isNull(value.sub_admin_area)) ?
        toString(value.sub_admin_area) : null,
      admin_area: (!isUndefined(value.admin_area) && !isNull(value.admin_area)) ? toString(value.admin_area) : null,
      postal_code: (!isUndefined(value.postal_code) && !isNull(value.postal_code)) ? toString(value.postal_code) : null,
      country: (!isUndefined(value.country) && !isNull(value.country)) ? toString(value.country) : null,
    }

    return address
  },

  RecordLinkField: (value: string[]|number[]): RecordLinkIds[]|null => {
    if (!isArray(value)) { return null }

    let ids: string[] = map(value, (id) => "" + id)
    ids = filter(ids, (id: string) => UUID_REGEX.test(id))
    return map(ids, (id) => ({ record_id: id }) )
  },
}

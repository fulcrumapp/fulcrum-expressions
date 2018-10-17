import { compact,
        filter,
        isArray,
        isNumber,
        isObject,
        isString,
        map } from "lodash"
import DATEVALUE from "../functions/DATEVALUE"
import EXISTS from "../functions/EXISTS"
import FORMAT from "../functions/FORMAT"
import LPAD from "../functions/LPAD"
import NUM from "../functions/NUM"
import makeChoiceValue from "./make-choice-value"

const UUID_REGEX: RegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i

interface Converter {
  TextField: Function,
  CalculatedField: Function,
  HyperlinkField: Function,
  YesNoField: Function,
  BarcodeField: Function,
  DateTimeField: Function,
  DateField: Function,
  TimeField: Function,
  ChoiceField: Function,
  ClassificationField: Function,
  AddressField: Function,
  RecordLinkField: Function
}

export const converters: Converter = {
    TextField: (value: string) => {
      if (!EXISTS(value)) { return null }
      value.toString()
    },

  CalculatedField: (value: string) => {
    converters.TextField(value)
  },

  HyperlinkField: (value: string) => {
    converters.TextField(value)
  },

  YesNoField: (value: string) => {
    converters.TextField(value)
  },

  BarcodeField: (value: string) => {
    converters.TextField(value)
  },

  DateTimeField: (value: string) => {
    if (!EXISTS(value)) { return null }

    const date: Date = DATEVALUE(value)

    if (!EXISTS(date)) { return null }

    FORMAT("%s-%s-%s",
      date.getFullYear(),
      LPAD(date.getMonth() + 1, 2, "0"),
      LPAD(date.getDate(), 2, "0"))
  },

  DateField: (value: string) => {
    converters.DateTimeField(value)
  },

  TimeField: (value: string) => {
    if (!isString(value)) { return null }
    if (value.length !== 5) { return null }
    if (value[2] !== ":") { return null }

    const parts: string[] = value.split(":")

    const hour: number = NUM(parts[0])
    const minute: number = NUM(parts[1])

    if (hour > 23 || hour < 0) { return null }
    if (minute > 59 || minute < 0) { return null }

    FORMAT("%s:%s",
      LPAD(hour, 2, "0"),
      LPAD(minute, 2, "0"))
  },

  ChoiceField: (value: string) => {
    let choices: null|string[] = null

    switch (true) {
      case isArray(value):
        choices = map(compact(value), (v) => v.toString())
        break
      case isString(value) && value.length !== 0:
        choices = [ value ]
        break
      case isNumber(value):
        choices = [ value.toString() ]
        break
      case isObject(value) && isArray(value.choice_values):
        choices = map(compact(value.choice_values), (v) => v.toString())
        break
    }

    if (!isArray(choices)) { return null }

    makeChoiceValue(choices, [])
  },

  ClassificationField: (value: string) => {
    converters.ChoiceField(value)
  },

  AddressField: (value: {}) => {
    if (!isObject(value)) { return null }

    const address: {} = {
      sub_thoroughfare: EXISTS(value.sub_thoroughfare) ? value.sub_thoroughfare.toString() : null,
      thoroughfare: EXISTS(value.thoroughfare) ? value.thoroughfare.toString() : null,
      suite: EXISTS(value.suite) ? value.suite.toString() : null,
      locality: EXISTS(value.locality) value.locality.toString() : null,
      sub_admin_area: EXISTS(value.sub_admin_area) ? value.sub_admin_area.toString() : null,
      admin_area: EXISTS(value.admin_area) ? value.admin_area.toString() : null,
      postal_code: EXISTS(value.postal_code) ? value.postal_code.toString() : null,
      country: EXISTS(value.country) ? value.country.toString() : null,
    }

    return address
  },

  RecordLinkField: (value: string[]) => {
    if (!isArray(value)) { return null }

    let ids: string[] = value.map((id) => "" + id)
    ids = filter(ids, (id: string) => UUID_REGEX.test(id))
    return ids.map((id) => { record_id: id })
  },
}

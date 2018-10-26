import { isArray,
          isDate,
          isNaN,
          isNull,
          isObject,
          isRegExp,
          isString,
          isUndefined } from "lodash"

export default function LEN(value: any): number {
  if (isUndefined(value) || isNull(value) || isNaN(value)) { return 0 }

  let result: any

  if (isArray(value) || isString(value)) {
    result = value.length
  } else if (isDate(value)) {
    result = value.toString().length
  } else if (isRegExp(value)) {
    result = value.toString().length
  } else if (isObject(value)) {
    result = Object.keys(value).length
  } else {
    result = value.toString().length
  }

  return result || 0
}

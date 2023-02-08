import { isNumber, isString, map } from "lodash"
import ARRAY from "./ARRAY"

/**
 * Returns a concatenated string
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/concatenate/
 * @param strings (String|Array, required): strings to be concatenated
 * @returns a single concatenated string
 * @example
 * CONCATENATE('hello', 'world') // returns 'helloworld'
 */

export default function CONCATENATE(...strings: any[]): string
export default function CONCATENATE(): string
export default function CONCATENATE(...strings: any[]) {
  return map(ARRAY(strings), (arg) => {
    switch (true) {
      case isString(arg):
        return arg
      case isNumber(arg):
        return `${arg}`
      default:
        return ""
    }
  }).join("")
}

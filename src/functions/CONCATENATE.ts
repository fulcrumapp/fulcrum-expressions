import { isNumber, isString, map } from "lodash"
import ARRAY from "./ARRAY"

/**
 * Returns a concatenated string
 * @param strings strings to be concatenated
 * @returns a single concatenated string
 * @example
 * CONCATENATE('hello', 'world') // returns 'helloworld'
 * CONCATENATE(['a', 'b', null, 'c']) // returns 'abc'
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

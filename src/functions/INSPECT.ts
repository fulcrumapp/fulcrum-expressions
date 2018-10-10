import { inspect } from "util"
/**
 * Returns a string representation of the passed in parameter
 * @param value value to be inspected
 * @returns stringified value
 * @example
 * INSPECT({ test: "test_test"}) // returns "{ test: 'test_test' }"
 */
export default function INSPECT(value: any): string {
  return inspect(value)
}

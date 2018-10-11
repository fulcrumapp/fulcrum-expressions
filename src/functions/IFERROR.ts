import ISERR from "./ISERR"

/**
 * Evaluates whether a passed in value is an error.
 * @param value required; value to be evaluated
 * @param errorValue required; value to be returned in event `value` is an error
 * @returns `errorValue` in case `value` is an error, otherwise `value`
 * @example
 * IFERROR(EVEN(null), "ERR") // returns "ERR"
 */

export default function IFERROR(value: any, errorValue: any) {
  return ISERR(value) ? errorValue : value
}

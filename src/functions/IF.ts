
/**
 * Evaluates a conditional expression
 * @param test required; conditional expression that evaluates to true or false
 * @param trueValue required; value to be returned in case of true
 * @param falseValue required; vaue to be returned in case of false
 * @returns boolean or `trueValue`/`falseValue` if supplied
 * @example
 * IF(1 > 0, 10, 20) // returns 10
 */

export default function IF(test: any, trueValue: any, falseValue: any): any
export default function IF(test: any, trueValue: any, falseValue: any): any {
  return test ? trueValue : falseValue
}


/**
 * Evaluates a conditional expression and returns a designated `trueValue` or `falseValue`
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/if/
 * @param test (Expression, required): conditional expression that evaluates to true or false
 * @param trueValue (Any,required): value to be returned in case of true
 * @param falseValue (Any, required): vaue to be returned in case of false
 * @returns`trueValue`/`falseValue` if supplied, else boolean
 * @example
 * IF(1 > 0, 10, 20) // returns 10
 */

export default function IF(test: any, trueValue: any, falseValue: any): any
export default function IF(test: any, trueValue: any, falseValue: any): any {
  return test ? trueValue : falseValue
}

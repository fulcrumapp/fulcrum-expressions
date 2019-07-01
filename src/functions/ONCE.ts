/**
 * Returns a value once, given the current value. 
 * This is useful to perform a calculation only once, the first time it's evaluated.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/once/
 * @param (Any, required): expression/function/value to be evaluated
 * @returns a value given the current value
 */

export default function ONCE(value: any): any {
  return $$runtime.currentValue || value
}

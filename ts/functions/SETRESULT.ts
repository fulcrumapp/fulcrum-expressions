/**
 * Sets result variable on runtime.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/setresult/
 * @param result (Any, required): desired result
 */

export default function SETRESULT(result: any): void {
  $$runtime.result = result
}
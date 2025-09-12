/**
 * Returns true if any argument is truthy
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/or/
 */

export default function OR(...args: any[]): boolean {
  return args.some(item => !!item);
}
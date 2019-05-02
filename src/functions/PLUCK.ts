import { map } from "lodash"

/**
 * Maps over a collection and returns the items based on a property (key).
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/pluck/
 * @param object (Array, required): Array-like object to be iterated over
 * @param property (String, required): string or key being targeted
 * @returns an array of items that match the `property` param
 */

export default function PLUCK(object: any[], property: string): any[] {
  return map(object, property)
}

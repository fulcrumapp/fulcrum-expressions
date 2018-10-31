import { map } from "lodash"

/**
 * Maps over a collection and returns the items based on a property (key).
 * @param object required; Array-like object to be iterated over\
 * @param property required; key name being targeted
 * @returns an array of items that match the `property` param
 * @example
 * const users = [ { name: "Daniel" }, { name: "Susie" } ]
 *
 * PLUCK(users, "name") // returns [ "Daniel", "Susie" ]
 */

export default function PLUCK(object: any[], property: string): any[] {
  return map(object, property)
}

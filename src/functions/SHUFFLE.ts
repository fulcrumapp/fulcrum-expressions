import { shuffle, toArray } from "lodash"

/**
 * Randomly shuffles values passed in and returns them as an array.
 * @param values set of values to be shuffled
 * @returns a shuffled array
 * @example
 * 
 * SHUFFLE([1, 2, 3], 4) // returns [4, 2, 3, 1]
 */

export default function SHUFFLE(...values: any[]): any[] {
  return shuffle(toArray(values))
}

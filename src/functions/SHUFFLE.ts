import { shuffle } from "lodash"
import ARRAY from "./ARRAY"

/**
 * Randomly shuffles values passed in and returns them as an array.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/shuffle/
 * @param values (Array|Any, required): set of values to be shuffled
 * @returns a shuffled array
 */

export default function SHUFFLE(...values: any[]): any[] {
  return shuffle(ARRAY(values))
}

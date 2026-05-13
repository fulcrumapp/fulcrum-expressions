import ARRAY from "./ARRAY"
import INT from "./INT"
import ISNAN from "./ISNAN"

/**
 * Returns the least common multiple of the arguments passed in
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/lcm/
 * @param args (Number|Array) list of numbers to be evaluated
 * @returns number, least common multiple
 * @example
 * LCM(-50, 25, -45, -18, 90, 447) // returns 67050
 */

export default function LCM(...args: number[]): number
export default function LCM(...args: string[]): number
export default function LCM(...args: any[]): number
export default function LCM(...args: any[]): number {
  const numbers: number[] = ARRAY((args)).map((num) => INT(num))

  const count: number = numbers.length

  let a: number = Math.abs(numbers[0])

  for (let i: number = 1; i < count; i++) {
    let b: number = Math.abs(numbers[i])
    const c: number = a

    if (ISNAN(b)) { return NaN }

    while (a && b) {
      if (a > b) {
        a %= b
      } else {
        b %= a
      }
    }
    a = Math.abs(c * numbers[i]) / (a + b)
  }
  return a
}

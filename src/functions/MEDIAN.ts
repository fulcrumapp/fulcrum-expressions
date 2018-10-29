import { isArray, isNaN, map, some } from "lodash"
import ARRAY from "./ARRAY"
import NUM from "./NUM"

export default function MEDIAN(...args: number[]): number
export default function MEDIAN(...args: any[]): number|undefined
export default function MEDIAN(...args: any[]): number|undefined {
  const numbers: number[] = map(ARRAY(args), NUM)

  if (!isArray(numbers) || numbers.length === 0) { return }

  const hasNaN: boolean = some(numbers, isNaN)

  if (hasNaN) { return }

  numbers.sort((a, b) => a - b)

  const half: number = Math.floor(numbers.length / 2)

  if (numbers.length % 2) {
    return numbers[half]
  } else {
    return (numbers[half - 1] + numbers[half]) / 2.0
  }
}

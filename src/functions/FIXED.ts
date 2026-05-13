import DECIMALSEPARATOR from "./DECIMALSEPARATOR"
import GROUPINGSEPARATOR from "./GROUPINGSEPARATOR"
import GROUPINGSIZE from "./GROUPINGSIZE"
import ISNAN from "./ISNAN"
import MAX from "./MAX"
import MIN from "./MIN"
import NUM from "./NUM"
import RIGHT from "./RIGHT"

/**
 * Returns fixed represention of a number
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/fixed/
 * @param num (Number, required): value to be converted
 * @param decimals  (Number, optional): integer between 0 - 20 indicating total fractional digits, defaults to 2
 * @param suppressGroupingSeparator (Boolean, optional): whether to separate numbers with
 * groupingSeparator character, defaults to false
 * @returns fixed representation of a number as a string
 * @example
 * FIXED(12345678901 / 3, 3) // returns "4,115,226,300.333"
 */

export default function FIXED(num: number, decimals?: number, suppressGroupingSeparator?: boolean): string|undefined
export default function FIXED(num: number, decimals?: number): string|undefined
export default function FIXED(num: any): string|undefined
export default function FIXED(num: any, decimals = 2, suppressGroupingSeparator = false): string|undefined {
  num = NUM(num)
  decimals = NUM(decimals)

  if (ISNAN(decimals)) { decimals = 2 }
  // @ts-ignore IF statement will ensure that a number value is always passed to the line below
  decimals = MIN(MAX(decimals, 0), 20)

  if (ISNAN(num) || ISNAN(decimals)) { return undefined }

  suppressGroupingSeparator = !!suppressGroupingSeparator

  const machineValue: string = num.toFixed(decimals)
  const isNegative: boolean = machineValue[0] === '-'

  const index: number = machineValue.indexOf(".")

  if (index <= -1) { return machineValue }

  let integerPart: number = parseInt(machineValue.substring(0, index), 10)
  const fractionPart: string = machineValue.substring(index + 1, machineValue.length)

  let integerString: string = ""

  const groupingSize: number = GROUPINGSIZE()
  const groupingMax: number = Math.pow(10, groupingSize)
  let groupingSeparator: string

  if (suppressGroupingSeparator || integerPart < groupingMax) {
    integerString = integerPart.toString()
  } else {
    groupingSeparator = GROUPINGSEPARATOR()

    const parts: any[] = []

    while (integerPart >= groupingMax) {
      const thisIntegerPart: number = Math.floor(integerPart % groupingMax)

      const zeroPadding: string = new Array(groupingSize + 1).join("0")

      parts.push(RIGHT(zeroPadding + thisIntegerPart.toString(), groupingSize))

      integerPart = Math.floor(integerPart / groupingMax)
    }

    if (integerPart > 0) {
      parts.push(integerPart.toString())
    }

    integerString = parts.reverse().join(groupingSeparator)
  }

if (isNegative && integerString[0] !== '-') {
    // the integer parts of small, negative decimals, 0 > x > -1, will lose their negative sign
    // when converted to a string; re-add it here to maintain its true value
    integerString = '-' + integerString
  }

  return integerString + DECIMALSEPARATOR() + fractionPart.toString()
}

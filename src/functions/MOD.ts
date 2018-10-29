import { isNaN } from "lodash"
import NUM from "./NUM"

export default function MOD(num: number, divisor: number): number {
  num = NUM(num)
  divisor = NUM(divisor)

  if (isNaN(num) || isNaN(divisor) || divisor === 0) { return NaN }

  const modulus: number = Math.abs(num % divisor)

  return divisor > 0 ? modulus : -modulus
}

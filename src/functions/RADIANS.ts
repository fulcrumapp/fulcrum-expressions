import { isNaN } from "lodash"
import NUM from "./NUM"

/**
 * Converts degress into radians.
 * @param degress required; number of degrees
 * @returns number of radians
 * @example
 * RADIANS(45) // returns 0.7853981633974483
 */

export default function RADIANS(degrees: number): number
export default function RADIANS(degrees: any): number
export default function RADIANS(degrees: any): number {
  degrees = NUM(degrees)

  if (isNaN(degrees)) { return NaN }

  return (degrees / 180.0) * Math.PI
}

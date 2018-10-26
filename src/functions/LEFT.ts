import { isNull, isObject, isUndefined } from "lodash"
import FLOOR from "./FLOOR"
import ISNAN from "./ISNAN"

export default function LEFT(value: string, numberOfCharacters?: number): string|undefined
export default function LEFT(value: any, numberOfCharacters?: string): string|undefined
export default function LEFT(value: string): string|undefined
export default function LEFT(value: any, numberOfCharacters?: any): string|undefined
export default function LEFT(value: any, numberOfCharacters?: any): string|undefined {

  if (isUndefined(numberOfCharacters)) { numberOfCharacters = 1}
  numberOfCharacters = FLOOR(numberOfCharacters)

  if (isUndefined(value) ||
      isNull(value) ||
      isObject(value) ||
      numberOfCharacters < 0 ||
      ISNAN(numberOfCharacters)
      ) { return }

  value = value.toString()

  return value.substring(0, numberOfCharacters)
}

import { find } from "lodash"
import ARRAY from "./ARRAY"
import ISBLANK from "./ISBLANK"

export default function COALESCE(...args: any[]): string|number|undefined
export default function COALESCE(): undefined
export default function COALESCE(...args: any[]): string|number|undefined {
  return find(ARRAY(args), (value) => !(ISBLANK(value)))
}

import { filter, isUndefined, map } from "lodash"

export default function DATANAMES(): any[]
export default function DATANAMES(type: string): any[]
export default function DATANAMES(type?: string): any[] {
  let elements: any[]
  if (!isUndefined(type)) {
      elements = filter($$runtime.elements, (e) => e.type === type)
  } else {
      elements = $$runtime.elements
  }
  return map(elements, (e) => e.data_name)

}

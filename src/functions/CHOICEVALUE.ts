import { isArray } from "lodash"
import { MaybeString } from "../primitives"
import { ChoiceFieldValue } from "../values"
import CHOICEVALUES from "./CHOICEVALUES"

export default function CHOICEVALUE(field: ChoiceFieldValue): MaybeString
export default function CHOICEVALUE(field: any): MaybeString
export default function CHOICEVALUE(field: any): MaybeString {
  const values: any[] = CHOICEVALUES(field)

  if (!isArray(values)) { return undefined }
  if (values.length === 0) { return undefined }

  return values[0]
}

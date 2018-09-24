import { isArray } from "lodash"
import { ChoiceFieldValue } from "../values"
import CHOICEVALUES from "./CHOICEVALUES"

export default function CHOICEVALUE(field: ChoiceFieldValue): string|undefined {
  const values: any[] = CHOICEVALUES(field)

  if (!isArray(values)) { return undefined }
  if (values.length === 0) { return undefined }

  return values[0]
}

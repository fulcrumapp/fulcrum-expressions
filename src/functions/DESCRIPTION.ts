import { isUndefined } from "lodash"
import { FormFields as FormField } from "../types/fields"
import { MaybeString } from "../types/primitives"
import FIELD from "./FIELD"

export default function DESCRIPTION(dataName: MaybeString): string | undefined
export default function DESCRIPTION(): undefined
export default function DESCRIPTION(dataName?: MaybeString): string | undefined {
  const field: FormField|undefined = FIELD(dataName)

  if (isUndefined(field)) { return }

  return field.description
}

import SETREADONLY from "./SETREADONLY"
import { FieldName } from "../types/fields"

export default function SETDISABLED(dataName: FieldName, value: boolean): void
export default function SETDISABLED(dataName: FieldName, value?: boolean): void
export default function SETDISABLED(dataName: FieldName, value?: boolean): void {
  SETREADONLY(dataName, value)
}
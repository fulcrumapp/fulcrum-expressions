import { FormField } from "../types/fields"
import { InvalidResult } from "../types/results"
import FIELD from "./FIELD"

/**
 * Displays an alert and stops a record from being saved
 * @description
 * The INVALID function is designed for the sole purpose of doing custom validations when saving records.
 * It’s a special purpose function that’s intended to only be used within the `validate-record` and
 * `validate-repeatable` events. It’s different from `ALERT` in a couple of ways. First, it instructs
 * the editor to halt saving the record. And second, messages passed to `INVALID` are combined and displayed
 * alongside the rest of the built-in validations like required fields, pattern validations, and min/max constraints.
 * Thus, custom validation logic can be displayed in a natural way to the end user as if it were a built-in validation.
 * @param message required; string detailing the reason for invalidating a record
 * @param dataName optional; string, data_name of field to be validated
 * @returns void
 */

export default function INVALID(message: string, dataName?: string): void
export default function INVALID(message: string, dataName?: string): void
export default function INVALID(message: string): void
export default function INVALID(message: any, dataName?: any): void {
  const element: FormField|undefined = FIELD(dataName)

  const key: string|null = element ? element.key : null

  const result: InvalidResult = { key, message, type: "validation" }

  $$runtime.results.push(result)
}

import { FormField } from "../types/fields"
import { InvalidResult } from "../types/results"
import FIELD from "./FIELD"

/**
 * Displays an alert and stops a record from being saved
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/invalid/
 * @param message (String, required): reason for invalidating a record
 * @param dataName (String, optional): data name of field to be validated
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

import STATUS from "./STATUS"

/**
 * Returns the status label of a record.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/statuslabel/
 */

export default function STATUSLABEL(): string|undefined {
  const status: string|undefined = STATUS()

  if (status) {
    return $$runtime.statusesByValue[status]
  } else {
    return undefined
  }
}

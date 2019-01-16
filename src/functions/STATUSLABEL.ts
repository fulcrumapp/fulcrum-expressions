import STATUS from "./STATUS"

/**
 * Returns the status value of a record.
 */

export default function STATUSLABEL(): string|undefined {
  const status: string|undefined = STATUS()

  if (status) {
    return $$runtime.statusesByValue[status]
  } else {
    return undefined
  }
}

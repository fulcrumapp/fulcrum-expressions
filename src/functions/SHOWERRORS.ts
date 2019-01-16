/**
 * Can toggle between settings to either show errors or not.
 * @param showErrors optional; boolean value indiciating whether to show errors or not. Defaults to true.
 * @example
 * SHOWERRORS() // errors will be shown
 * SHOWERRORS(false) // errors will not be shown
 */

export default function SHOWERRORS(showErrors?: boolean): void
export default function SHOWERRORS(showErrors = true): void {
  $$runtime.showErrors = showErrors
}
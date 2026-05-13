/**
 * Can toggle between settings to either show errors or not.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/showerrors/
 * @param showErrors (Boolean, required): whether to show errors or not
 */

export default function SHOWERRORS(showErrors?: boolean): void
export default function SHOWERRORS(showErrors = true): void {
  $$runtime.showErrors = showErrors
}
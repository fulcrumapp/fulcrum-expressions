/**
 * Formats a string using %s and %d placeholders.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/format/
 * @param template (String, required): desired format, `%s` for strings and `%d` for numbers.
 * @param variables (String|Number, required), values to substitute into the format string
 * @returns formatted string
 */
export default function FORMAT(template: string, ...variables: any[]): string {
  let i = 0
  return String(template).replace(/%[sd]/g, (match) => {
    if (i >= variables.length) return match
    const val = variables[i++]
    return match === "%d" ? Number(val).toString() : String(val)
  })
}

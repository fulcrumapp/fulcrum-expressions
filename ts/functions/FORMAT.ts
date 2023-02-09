import { format } from "util"

/**
 * Formats a string
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/format/
 * @param template (String, required): desired format, `%s` for strings and `%d` for numbers.
 * @param variables (String|Number, required), values to substitute into the format string
 * @returns formatted string
 */
export default function FORMAT(template: string, ...variables: any[]): string {
  return format(template, ...variables)
}

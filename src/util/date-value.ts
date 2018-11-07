/**
 * Returns a date value given an appropriate date string in ISO 8601 format, i.e. YYYY-MM-DD
 * @param value required; string value of a date
 * @returns date value
 */
export default function dateValue(value: string): Date
export default function dateValue(value: any): any
export default function dateValue(value: any): any {
    if (value && value.length <= 10) {
      return new Date(`${value.replace(/-/g, "/")} 00:00:00`)
    } else {
      return value
    }
}

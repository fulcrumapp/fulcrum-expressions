/**
 * Allows throwing of errors for validation, etc.
 * @param message (String, required): error message to display
 * @throws Error entered by the user
 */
export default function ERROR(message: string) {
  throw new Error(message)
}

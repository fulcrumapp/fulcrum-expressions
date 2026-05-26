/**
 * Returns the mode of the current runtime.
 *
 * @returns the current mode string
 */
export default function MODE(): any {
  return ($$runtime as any).mode
}

/**
 * Prevents the default behavior of the current event.
 */
export default function PREVENTDEFAULT(): void {
  $$runtime.results.push({ type: "prevent-default" } as any)
}

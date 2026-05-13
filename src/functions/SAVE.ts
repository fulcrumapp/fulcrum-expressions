/**
 * Triggers a save of the current record.
 */
export default function SAVE(): void {
  $$runtime.results.push({ type: "save" } as any)
}

import SETCHOICEFILTER from "./SETCHOICEFILTER"

/**
 * Set status filter values.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setstatusfilter/
 * @param value (Array|String, required): array of statuses (strings) or a single status to filter by
 */

export default function SETSTATUSFILTER(value: string[]|string): void {
  SETCHOICEFILTER("@status", value)
}
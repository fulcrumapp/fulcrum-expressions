import SETCHOICEFILTER from "./SETCHOICEFILTER"

/**
 * Set status filter values.
 * @param value required; array of statuses (strings) or a single status to filter by
 */

export default function SETSTATUSFILTER(value: string[]|string): void {
  SETCHOICEFILTER("@status", value)
}
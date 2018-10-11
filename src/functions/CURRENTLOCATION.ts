/**
 * Returns current location from runtime if available, otherwise returns null.
 */

export default function CURRENTLOCATION(): string|null {
  return $$runtime.currentLocation || null
}

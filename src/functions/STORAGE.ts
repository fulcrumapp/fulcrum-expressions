import storage from "../host/storage"

/**
 * Returns a storage object for setting and getting local storage items.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/storage/
 */
export default function STORAGE(): typeof storage {
  const g = globalThis as any
  if (typeof g.window !== "undefined" && g.window.localStorage) {
    return g.window.localStorage as unknown as typeof storage
  }
  return storage
}

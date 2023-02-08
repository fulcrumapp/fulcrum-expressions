import storage from "../host/storage"

/**
 * Returns a storage object for setting and getting local storage items.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/storage/
 */
export default function STORAGE(): typeof storage | Storage {
  // In the context of the browser, we'll just use the LocalStorage APIs.
  return window.localStorage ? window.localStorage : storage
}

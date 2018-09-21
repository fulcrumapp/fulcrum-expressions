import storage from "../host/storage"

/**
 * Returns a storage object for setting and getting local storage items.
 * @example
 * storage = STORAGE();
 * KEY = 'item_key';
 * storage.setItem(KEY, 'hello world');
 *
 * // Sets an item in local storage, must be a string
 * @example
 * item = storage.getItem(KEY);
 *
 * // Gets an item from storage if it exists, otherwise returns null
 * @example
 * geom = { type: 'Point', coordinates: [-100, 40] };
 * storage.setItem('geometry', JSON.stringify(geom));
 *
 * anotherGeom = JSON.parse(storage.getItem('geometry'));
 *
 * // Use JSON.stringify and JSON.parse to serialize and deserialize objects in local storage
 * @example
 * storage.removeItem(KEY);
 *
 * // Removes an item from storage
 * @example
 * storage.clear();
 *
 * // Removes all items from storage
 */
export default function STORAGE(): typeof storage | Storage {
  // In the context of the browser, we'll just use the LocalStorage APIs.
  return window.localStorage ? window.localStorage : storage
}

class HostStorage {
  scope: string

  // I have no idea what the point of the scope is. It doesn't seem to be respected by the mobile apps
  // and the web app uses the browser LocalStorage.
  constructor(scope = "default") {
    this.scope = scope
  }

  /**
   * Gets the number of keys stored in the local storage
   */
  get length() {
    if (!$$runtime.$$storageLength) { return }
    return $$runtime.$$storageLength(this.scope)
  }

  /**
   * Fetches the key from the storage engine
   * @param index index of the key
   */
  key(index: number) {
    if (!index) { return }
    if (!$$runtime.$$storageKey) { return }
    return $$runtime.$$storageKey(this.scope, index)
  }

  /**
   * Fetches the value from the store.
   */
  getItem(key: string) {
    if (!key) { return }
    if (!$$runtime.$$storageGetItem) { return }
    return $$runtime.$$storageGetItem(this.scope, key)
  }

  /**
   * Stores a string value in the local storage for the given key
   * @param key key to store the value as
   * @param value stringified value to store
   */
  setItem(key: string, value: string) {
    if (!key) { return }
    if (!$$runtime.$$storageSetItem) { return }
    $$runtime.$$storageSetItem(this.scope, key, value)
  }

  /**
   * Remove the selected key from the store
   * @param key key to remove from the store
   */
  removeItem(key: string) {
    if (!key) { return }
    if (!$$runtime.$$storageRemoveItem) { return }
    $$runtime.$$storageRemoveItem(this.scope, key)
  }

  /**
   * Reset the state of the local store.
   */
  clear() {
    if (!$$runtime.$$storageClear) { return }
    $$runtime.$$storageClear(this.scope)
  }
}

export default new HostStorage()

export type HostHTTPClient = (json: string, callbackID: number) => void
export type HostSetTimeout = (timeout: number, callbackID: number) => (number | undefined)
export type HostStorageLength = (scope: string) => number
export type HostStorageKey = (scope: string, index: number) => any
export type HostStorageGetItem = (scope: string, key: string) => any
export type HostStorageSetItem = (scope: string, key: string, value: string) => void
export type HostStorageRemoveItem = (scope: string, key: string) => void
export type HostStorageClear = (scope: string) => void
export type HostMessageBox = (json: string, callbackID: number) => void

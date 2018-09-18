export type HostHTTPClient = (json: string, callbackID: number) => void
export type HostSetTimeout = (timeout: number, callbackID: number) => (number | undefined)

import httpRequest from "./http-request"
import setTimeout from "./set-timeout"
import clearTimeout from "./clear-timeout"

export default {
  httpRequest,
  clearTimeout,
  setTimeout,
}

import encodeUrl from "encodeurl"
import { isEmpty, isFunction, isObject, isString } from "lodash"
import { stringify } from "query-string"
import HostHTTPRequest from "../host/http-request"
import { HTTPRequestCallback } from "../types/host"
import ERROR from "./ERROR"

// TODO: This string fallback breaks auto-complete.
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS"

interface RequestOptions {
  /** The url for the request */
  url?: string
  /**
   * The HTTP method for the request (POST, PUT, DELETE, etc.)
   * @default "GET"
   */
  method?: HTTPMethod
  /**
   * Should the request follow any redirects
   * @default true
   */
  followRedirect?: boolean
  /**
   * An object containing keys and values for additional header items
   * @default {}
   */
  headers?: { [key: string]: string }
  /** An object containing query string parameters (url parameters) */
  qs?: object,
  /** An object to be passed in the request body, must be `JSON.stringify`able */
  json?: object | string,
  /** The request body */
  body?: string
}

const DEFAULT_OPTIONS = {
  followRedirect: true,
  headers: {},
  method: "GET" as HTTPMethod,
}

/**
 * Performs an HTTP request and executes the callback on completion.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/request/
 * @param options (String|Object, required): the url or options to pass for the request
 * @param callback (Function, required): callback to invoke when the request is complete - The function is
 * passed `error`, `response`, and `body` parameters
 */

export default function REQUEST(options: RequestOptions, callback: HTTPRequestCallback): void
export default function REQUEST(url: string, callback: HTTPRequestCallback): void
export default function REQUEST(options: any, callback: HTTPRequestCallback) {
}

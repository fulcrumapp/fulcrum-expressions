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
  if (!callback || !isFunction(callback)) {
    ERROR("A callback must be provided to REQUEST")
  }

  let config: RequestOptions = {
    ...DEFAULT_OPTIONS,
  }

  if (isString(options)) {
    config.url = options as HTTPMethod
  } else {
    config = { ...config, ...options }
  }

  if (isEmpty(config.url)) {
    ERROR("A url must be provided to REQUEST")
  }

  if (isObject(config.qs)) {
    const url = config.url!
    let queryString = stringify(config.qs!)

    if (url.indexOf("?") < 0) {
      queryString = `?${queryString}`
    } else if (url.substr(url.length - 1) !== "&") {
      queryString = `&${queryString}`
    }

    config.url += queryString

    delete config.qs
  }

  if (config.json) {
    config.headers!["Content-Type"] = "application/json"

    if (!isString(config.json)) {
      config.body = JSON.stringify(config.json)
    }

    delete config.json
  }

  config.url = encodeUrl(config.url!)

  HostHTTPRequest(JSON.stringify(config), callback)
}

import encodeUrl from "encodeurl"
import { isFunction, isObject, isString } from "lodash"
import queryString from "query-string"
import HostHTTPRequest from "../host/http-request"
import { HTTPRequestCallback } from "../types/host"
import ERROR from "./ERROR"

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
  body?: string | null
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
  if (!isFunction(callback)) {
    return ERROR("A callback must be provided to REQUEST")
  }

  if (isString(options)) {
    options = { url: options }
  }

  options.method = options.method ?? "GET"
  options.headers = options.headers ?? {}
  options.followRedirect = options.followRedirect ?? true

  if (!isString(options.url)) {
    return ERROR("A url must be provided to REQUEST")
  }

  if (isObject(options.qs)) {
    let qs = queryString.stringify(options.qs as Record<string, any>)

    if (options.url.indexOf("?") < 0) {
      qs = "?" + qs
    }

    options.url += qs
    delete options.qs
  }

  if (options.json != null) {
    options.headers["Content-Type"] = "application/json"

    if (!isString(options.json)) {
      options.body = JSON.stringify(options.json)
    }
  }

  options.method = isString(options.method) ? options.method : "GET"
  options.headers = isObject(options.headers) ? options.headers : {}
  options.body = isString(options.body) ? options.body : null
  options.followRedirect = !!options.followRedirect

  // Encode the entire URL. This allows sloppy inputs with partially encoded params
  // and prevents double encoding.
  options.url = encodeUrl(options.url)

  HostHTTPRequest(JSON.stringify(options), callback)
}

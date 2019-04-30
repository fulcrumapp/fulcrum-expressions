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
 * The REQUEST function is for making external HTTP requests. It's one of the most powerful data
 * event functions and enables you to retrieve external data while filling out a form. It can be
 * combined with the other functions to create very dynamic forms that populate information on-demand
 * from external sources. It contains the necessary options to perform any HTTP request, including
 * support for PUT, POST, etc and custom headers.
 *
 * ### CORS and Web Browser Support
 *
 * To work in the web browser, URLs fetched using REQUEST *require* HTTPS &
 * [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing). This is not a limitation of
 * Fulcrum - it's just the way modern web browsers work. Since Fulcrum is hosted on a secure website,
 * all requests made from the site must also be secure and respond with the proper headers required by
 * the browser. If you encounter CORS errors when trying to use an API with the REQUEST function, we
 * recommend contacting the API provider and asking them to
 * [add CORS support to their API](http://enable-cors.org). As a last resort, you can use a CORS
 * proxy to proxy requests to URLs that don't support it.
 *
 * http://cors-anywhere.herokuapp.com/, http://cors-proxy.htmldriven.com/, and https://crossorigin.me
 *  are various CORS proxies. Note that these are not Fulcrum services.
 * Please also note, when using CORS proxies you are effectively exposing everything about a network
 * request to an unknown host. This should be especially considered if sending information like
 * passwords, tokens, etc.
 *
 * @param options The url or options to pass for the request
 * @param callback The function to call when the request is complete - The function is
 * passed `error`, `response`, and `body` parameters
 * @example
 * // This example looks up the place name from OpenStreetMap when the location changes and fills in a text
 * // field with the place name. Replace 'place_name' below with a text field on your form.
 *
 * ON('change-geometry', function(event) {
 *   var options = {
 *     url: 'https://nominatim.openstreetmap.org/search/' + LATITUDE() + ',' +
 *          LONGITUDE() + '?format=json&polygon=1&addressdetails=1'
 *   };
 *
 *   REQUEST(options, function(error, response, body) {
 *     if (error) {
 *       ALERT('Error with request: ' + INSPECT(error));
 *     } else {
 *       var data = JSON.parse(body);
 *
 *       if (data.length) {
 *         SETVALUE('place_name', data[0].display_name);
 *       }
 *     }
 *   });
 * });
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

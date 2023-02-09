import { HTTPRequestCallback } from "../types/host"

/**
 * Dispatch a HTTP request on the host if it exists
 * @param body the JSON body to send
 * @param callback the callback after the HTTP request has completed
 */
const httpRequest = (body: string, callback: HTTPRequestCallback) => {
  const request = $$runtime.$$httpRequest

  if (request) {
    $$runtime.invokeAsync(request, [body], callback)
  } else {
    callback(new Error("Not supported"), null, null)
  }
}

export default httpRequest

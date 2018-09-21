/**
 * @param error error object
 * @param request HTTP request object
 * @param body the response body
 */
export interface HTTPRequestCallback {
  (error: Error, response?: null, body?: null): void
  (error: null, response: object, body: string): void
}

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

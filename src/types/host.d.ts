export interface Console {
  log(message?: any, ...optionalParams: any[]): void
}

export declare var console: Console

/**
 * @param error error object
 * @param request HTTP request object
 * @param body the response body
 */
export interface HTTPRequestCallback {
  (error: Error, response?: null, body?: null): void
  (error: null, response: object, body: string): void
}
export interface Console {
  log(message?: any, ...optionalParams: any[]): void
}

export declare var console: Console
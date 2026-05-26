import Runtime from "../runtime"

declare global {
  var $$runtime: Runtime
  // eslint-disable-next-line no-var
  var console: {
    log(message?: any, ...optionalParams: any[]): void
    warn(message?: any, ...optionalParams: any[]): void
    error(message?: any, ...optionalParams: any[]): void
  }
}

declare var $$runtime: Runtime

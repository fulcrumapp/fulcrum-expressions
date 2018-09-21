import Runtime from "./runtime"

/**
 * Hack to get global working without TS complaining.
 */
const globalAny: any = global

/**
 * Setup a new instance of the $$runtime global.
 */
export const prepareRuntime = () => {
  globalAny.$$runtime = new Runtime()
}

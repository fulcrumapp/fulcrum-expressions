import { isFunction } from "lodash"

const hostFn = (name: string) : Function =>
  // @ts-ignore This dynamic lookup is not remotely type friendly
  $$runtime[`$$${name}`]

/**
 * Determine if the host function exists
 * @param name The host function name
 */
export const exists = (name: string) =>
  isFunction(hostFn(name))

/**
 * Execute the function on the host
 * @param name host function name
 * @param args argument list for the function call
 */
export const call = (name: string, args: any[]) =>
  hostFn(name).apply($$runtime, args)

/**
 * Execute the function asynchronously on the host
 * @param name host function name
 * @param args argument list for the function call
 * @param callback callback to invoke after the function has completed
 */
export const callAsync = (name: string, args: any[], callback: Function) =>
  $$runtime.invokeAsync(hostFn(name), args, callback)

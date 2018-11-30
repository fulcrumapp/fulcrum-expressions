/** Returns result from $$HOST */
export default function GETRESULT(): any {
  // @ts-ignore $$result is provided by $$HOST, not runtime
  return $$runtime.$$result
}

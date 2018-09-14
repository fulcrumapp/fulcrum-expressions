import Runtime from "./runtime"

export const prepareRuntime = () => {
  global.$$runtime = new Runtime
}

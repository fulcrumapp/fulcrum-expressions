declare module "object-inspect" {
  function objectInspect(value: any, options?: object): string
  export default objectInspect
}

declare module "encodeurl" {
  function encodeUrl(url: string): string
  export default encodeUrl
}

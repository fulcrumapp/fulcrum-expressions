export default function messageBox(json: string, wrapper: Function) {
  if ($$runtime.$$messageBox) {
    $$runtime.invokeAsync($$runtime.$$messageBox, [json], wrapper)
  }
}

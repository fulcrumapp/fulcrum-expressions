import { isString } from "lodash"
/**
 * Open a URL for a website or mobile app.
 * @param url (String, required): url to open
 * @example
 * OPENURL documentation: https://learn.fulcrumapp.com/dev/data-events/reference/openurl/
 */
export default function OPENURL(url: string): void {
  if (!isString(url)) { return }

  $$runtime.results.push({ type:"open", value: JSON.stringify(url) })
}

import { isString } from "lodash"
/**
 * Open a URL for a website or mobile app.
 * {@link https://learn.fulcrumapp.com/dev/data-events/reference/openurl/ | View Documentation}
 * @param url (String, required): url to open
 */
export default function OPENURL(url: string): void {
  if (!isString(url)) { return }

  $$runtime.results.push({ type:"open", value: JSON.stringify(url) })
}

import { MaybeString } from "../types/primitives"

export interface OpenExtensionMessage {
  source: string
  data: any
}

export interface OpenExtensionParams {
  url: string
  title?: MaybeString
  data?: any
  width?: number
  height?: number
  onMessage?: (message: OpenExtensionMessage) => void
}

/**
 * Open an app extension
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/openextension/
 * @param url (String, required): url to open
 */
/* tslint:disable:no-empty */
export default function OPENEXTENSION(params: OpenExtensionParams): void {
}

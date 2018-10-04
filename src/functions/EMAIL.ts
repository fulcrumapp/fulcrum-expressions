import { CONFIG } from "./CONFIG"

export default function EMAIL(): string|undefined {
  return CONFIG().userEmail || undefined
}

import { CONFIG } from "./CONFIG"

export default function PLATFORM(): string {
  return CONFIG().platform || ""
}

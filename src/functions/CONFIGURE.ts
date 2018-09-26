import { extend } from "lodash"
import { CONFIG, Config } from "./CONFIG"

export default function CONFIGURE(config: Config, merge = true): Config {
  let configuration = CONFIG()
  if (merge) {
    // extend mutates configuration object, no need to reassign
    extend(configuration, config)
  } else {
    configuration = config
  }

  return configuration
}

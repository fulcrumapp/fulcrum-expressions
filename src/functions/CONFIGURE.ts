import { extend, isUndefined } from "lodash"
import { CONFIG, Config, OVERWRITECONFIG } from "./CONFIG"

export default function CONFIGURE(config: Config): Config
export default function CONFIGURE(config: Config, merge: boolean): Config
export default function CONFIGURE(): Config
export default function CONFIGURE(config?: Config, merge = true): Config {
  let configuration = CONFIG()
  if (merge && !isUndefined(config)) {
    // extend mutates configuration object, no need to reassign
    extend(configuration, config)
  } else if (!merge && !isUndefined(config)) {
    // TODO: this action seems dangerous; unsure what benefits are
    //       gained from letting the user completely reset the Config object.
    //       should consider removing the merge variable so the config
    //       param is always merged with the current Config object, that way
    //       the general shape of the Config object is maintained
    configuration = OVERWRITECONFIG(config)
  }

  return configuration
}

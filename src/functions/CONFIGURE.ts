import { extend, isUndefined } from "lodash"
import { CONFIG, Config, OVERWRITECONFIG } from "./CONFIG"

/**
 * CONFIGURE allows the user to update the configuration of the Form.
 * Calling CONFIGURE without arguments will return the current configuration of the Form.
 * @param config object, will be merged with current configuration
 * @returns a config object representing the current app configuration
 * @example
 * CONFIGURE({ recordAltitude: 87})
 * // returns
 * { recordAltitude: 87
 * country: "US",
 * currencyCode: "USD",
 * currencySymbol: "$",
 * decimalSeparator: ".",
 * groupingSeparator: ",",
 * groupingSize: 3,
 * language: "en-US",
 * locale: "en_US",
 * timeZone: "UTC" }
 */

export default function CONFIGURE(config: Config|any): Config
export default function CONFIGURE(config: Config|any, merge: boolean): Config
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

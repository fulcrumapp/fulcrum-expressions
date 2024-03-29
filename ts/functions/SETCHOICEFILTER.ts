import { chain, isUndefined, isNull } from "lodash"
import SETFORMATTRIBUTES from "./SETFORMATTRIBUTES"
import { ChoiceFieldName } from "../types/fields"

/**
 * Sets a choice filter for a form.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setchoicefilter/
 * @param dataName (String, required): data name of field to be updated
 * @param value (Any, required): a value or an array of values on which to filter
 */

export default function SETCHOICEFILTER(dataName: ChoiceFieldName, value: any[]): void
export default function SETCHOICEFILTER(dataName: ChoiceFieldName, value: any): void
export default function SETCHOICEFILTER(dataName: ChoiceFieldName, value: any): void {
  const filterValue = isUndefined(value) || isNull(value) ? null : chain([value]).flatten().compact().map(String).value()

  SETFORMATTRIBUTES(dataName, { choice_filter: filterValue })
}
import { isArray, isNull, isNumber, isObject, isString } from "lodash"
import SETFORMATTRIBUTES from "./SETFORMATTRIBUTES"
import { isUndefined } from "util";
import { ChoiceFieldName } from "../types/fields"

interface ChoicesInterface {
  label: string,
  value: string,
}

/**
 * Updates the form choices attribute.
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setchoices/
 * @param dataName (String, required): data name of form field to be updated
 * @param value (Array|Null, required) an array of values or `null`
 */
export default function SETCHOICES(dataName: ChoiceFieldName, value: any): void {
  // TODO(zhm) throw some kind of error here if the param is wrong
  if (!(isNull(value) || isArray(value))) { return }

  let choices: ChoicesInterface[]|null = null

  if (!isNull(value)) {
    choices = []

    for (const choice of value) {
      switch (true) {
        case (isString(choice)):
          choices.push({ label: choice, value: choice })
          break
        case (isNumber(choice)): 
          choices.push({ label: choice.toString(), value: choice.toString() })
          break
        case (isArray(choice)):
          if (choice.length > 1) {
            choices.push({ label: choice[0], value: choice[1] })
          }
          else if (choice.length === 1) {
            choices.push({ label: choice[0], value: choice[0] })
          }
          break
        case (isObject(choice)):
          choices.push({ label: choice.label, value: choice.value || choice.label })
          break
      }
    }

    for (const choice of choices) {
      if (!isUndefined(choice.label)) {
        choice.label = !isUndefined(choice.label) ? choice.label.toString() : choice.label
        choice.value = !isUndefined(choice.value) ? choice.value.toString() : choice.value
      }
    }
  }

  SETFORMATTRIBUTES(dataName, { choices })
}

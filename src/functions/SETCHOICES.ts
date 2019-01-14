import { isArray, isNull, isNumber, isObject, isString } from "lodash"
import SETFORMATTRIBUTES from "./SETFORMATTRIBUTES"
import { isUndefined } from "util";

interface ChoicesInterface {
  label: string,
  value: string,
}

/**
 * Updates the form choices attribute.
 * @param dataName required; data name of form field to be updated
 * @param value required; an array of values; can be `null`
 */
export default function SETCHOICES(dataName: string, value: any): void {
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

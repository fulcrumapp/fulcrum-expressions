import { isString, isFunction, isArray, isObject } from "lodash"
import ERROR from "./ERROR"
import FIELD from "./FIELD"
import FIELDTYPE from "./FIELDTYPE"
import CHOICEVALUES from "./CHOICEVALUES"
import SETVALUE from "./SETVALUE"
import VALUE from "./VALUE"
import ON from "./ON"

const evaluateChoiceValueEquals = (choiceValues: any, matchValues: any): boolean => {
  return Array.isArray(choiceValues) &&
    Array.isArray(matchValues) &&
    choiceValues.length === matchValues.length &&
    choiceValues.every((element: any) => matchValues.includes(element))
}

const evaluateEquals = (field: string, value: any): boolean => {
  const fieldType = FIELDTYPE(field)
  switch (fieldType) {
    case "ChoiceField":
    case "ClassificationField":
      return evaluateChoiceValueEquals(CHOICEVALUES(VALUE(field)), value)
    default:
      return VALUE(field) === value
  }
}

const evaluateCondition = ({ field, operator, value }: { field: string, operator: string, value: any }): boolean => {
  if (!field || !operator) return false
  switch (operator) {
    case "equals":
      return evaluateEquals(field, value)
    default:
      return false
  }
}

const performAction = (action: any): void => {
  if (!action) return
  switch (action.type) {
    case "setvalue":
      SETVALUE(action.field, action.value)
      break
  }
}

const applyEffect = ({ actions, conditions }: { actions: any[], conditions: any[] }): void => {
  if (!Array.isArray(actions) || !Array.isArray(conditions)) return
  if (conditions.every(evaluateCondition)) {
    actions.forEach(performAction)
  }
}

const createApplyEffectCallback = (effect: any): void => {
  if (!effect || !effect.event || !effect.event.name) return
  if (effect.event.field) {
    ON(effect.event.name, effect.event.field, () => applyEffect(effect))
  } else {
    ON(effect.event.name, () => applyEffect(effect))
  }
}

/**
 * Applies field effects to the form based on conditions and actions.
 * @param fieldEffects object containing an array of effects to apply
 */
export default function APPLYFIELDEFFECTS(fieldEffects: any): void {
  if (!fieldEffects || !Array.isArray(fieldEffects.effects)) return
  for (const effect of fieldEffects.effects) {
    createApplyEffectCallback(effect)
  }
}

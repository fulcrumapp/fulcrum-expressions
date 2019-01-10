import form from "../../test/fixtures/form"
import { prepareRuntime } from "../../test/helpers"
import { SetValueResult } from "../../types/results"
import SETVALUE from "../SETVALUE"

beforeEach(() => {
  prepareRuntime()
  $$runtime.form = form
  const repeatable: RepeatableField = $$runtime.form.elements[1]
  const text: FormTextField = $$runtime.form.elements[0]
  // add elementsByKey (used in isSetValueSupported)
  $$runtime.elementsByKey[repeatable.key] = repeatable
  $$runtime.elementsByKey[text.key] = text
  // add elementsByDataName (used in FIELD)
  $$runtime.elementsByDataName.name = text
  $$runtime.elementsByDataName.items = repeatable
})

test("it pushes a SetValueResponse to runtime", () => {
  SETVALUE("name", "John Jacob Jingleheimer Schmidt")
  const resultValue = $$runtime.results[0]
  const expectedValue: SetValueResult = {
    key: "97ab",
    type: "set-value",
    value: "\"John Jacob Jingleheimer Schmidt\"",
  }

  expect(resultValue).toEqual(expectedValue)
})

test("passing in null as a value will push stringified null to runtime", () => {
  SETVALUE("name", null)
  const resultValue = $$runtime.results[0]
  const expectedValue: SetValueResult = {
    key: "97ab",
    type: "set-value",
    value: "null",
  }
  expect(resultValue).toEqual(expectedValue)
})

test("reverts to dataName and value in response if the dataName field is not found on the form", () => {
  const favoriteIceCreams: string[] = ["Neapolitan", "Mint Chocolate Chip", "Butter Pecan"]
  SETVALUE("fav_ice_creams", favoriteIceCreams)
  const resultValue = $$runtime.results[0]

  const expectedValue: SetValueResult = {
    // dataName
    key: "fav_ice_creams",
    type: "set-value",
    // stringified array
    value: JSON.stringify(favoriteIceCreams),
  }

  expect(resultValue).toEqual(expectedValue)
})

test("throws an error if SETVALUE parameters is not in the current editing scope", () => {
  // set runtime repeatable variable indicates one is editing fields within a repeatable section
  $$runtime.repeatable = "1337"
  const notInRepeatableSection: Function = () => {
    // sits outside of the repeatable section of the form so an error should be thrown
    SETVALUE("name", "John Jacob Jingleheimer Schmidt")
  }

  expect(notInRepeatableSection).toThrow("Setting the value of 'name' is not supported.")
})

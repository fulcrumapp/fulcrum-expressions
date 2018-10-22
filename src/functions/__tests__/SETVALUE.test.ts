import form from "../../test/fixtures/form"
import { prepareRuntime } from "../../test/helpers"
import SETVALUE, { SetValueResult } from "../SETVALUE"

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

test("throws an error if SETVALUE is not supported for a field", () => {
  const badCall: Function = () => {
    SETVALUE("not_real", "FailField")
  }

  expect(badCall).toThrow("Setting the value of 'not_real' is not supported")
})

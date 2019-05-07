import IF from "../IF"
import SETVALUE from "../SETVALUE"
import form from "../../test/fixtures/form"
import { prepareRuntime } from "../../test/helpers"
import { SetValueResult } from "../../types/results"

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

test("evaluates a condition", () => {
  expect(IF(1 > 0, 10, 20)).toEqual(10)
  expect(IF(1 < 0, 10, 20)).toEqual(20)
})

test("handles functions as true and false values", () => {
  const expectedValue: SetValueResult = {
    key: "97ab",
    type: "set-value",
    value: "\"John Jacob Jingleheimer Schmidt\"",
  }

  IF(1 > 0,
    () => SETVALUE("name", "John Jacob Jingleheimer Schmidt"),
    () => SETVALUE("name", "Not John Jacob Jingleheimer Schmidt"))

  expect($$runtime.results[0]).toEqual(expectedValue)
})

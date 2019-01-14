import { prepareRuntime } from "../../test/helpers"
import form from "../../test/fixtures/form"
import SETCHOICEFILTER from "../SETCHOICEFILTER"

beforeEach(() => {
  prepareRuntime()
  // @ts-ignore FormFields type checking for tests
  $$runtime.elementsByDataName.choice_value = form.elements[1].elements[1]
})

test("accepts an array of objects and converts them to strings", () => {
  SETCHOICEFILTER('choice_value', [1])
  expect($$runtime.results[0].value).toEqual('["1"]')
})

test("removes falsey values from the collection passed in", () => {
  SETCHOICEFILTER('choice_value', [1, null])
  expect($$runtime.results[0].value).toEqual('["1"]')
})

test("accepts a bare nonnull object and converts it to an array of strings with one item", () => {
  SETCHOICEFILTER('choice_value', 1)
  expect($$runtime.results[0].value).toEqual('["1"]')
})

test("accepts null and does not return an array", () => {
  SETCHOICEFILTER('choice_value', null)
  expect($$runtime.results[0].value).toBeNull()
})

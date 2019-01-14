import { prepareRuntime } from "../../test/helpers"
import form from "../../test/fixtures/form"
import SETFORMATTRIBUTES from "../SETFORMATTRIBUTES"

beforeEach(prepareRuntime)

test("pushes an update message to $$runtime.results", () => {
  const expectedResult = {
    type: "update-element",
    key: "@form",
    attribute: "choices",
    value: JSON.stringify({ yes: "yes", no: "no" }),
  }
  SETFORMATTRIBUTES({ choices: { yes: "yes", no: "no" } })
  
  expect($$runtime.results[0]).toEqual(expectedResult)
})

test("will update multiple attributes at once", () => {
  const toBeUpdated = { 
    choices: { yes: "yes", no: "no" },
    label: "My Form",
    description: "The best form ever made",
  }
  const expectedResults = [
    {
      type: "update-element",
      key: "@form",
      attribute: "choices",
      value: JSON.stringify({ yes: "yes", no: "no" }),
    },
    {
      type: "update-element",
      key: "@form",
      attribute: "label",
      value: JSON.stringify("My Form"),
    },
    {
      type: "update-element",
      key: "@form",
      attribute: "description",
      value: JSON.stringify("The best form ever made"),
    }
  ]

  SETFORMATTRIBUTES(toBeUpdated)

  expect($$runtime.results.length).toBe(3)
  expect($$runtime.results[0]).toEqual(expectedResults[0])
  expect($$runtime.results[2]).toEqual(expectedResults[2])
})

test("accepts @status as a dataName to update the status", () => {
  const expectedResult = {
    type: "update-element",
    key: "@status",
    attribute: "disabled",
    value: JSON.stringify(true),
  }

  SETFORMATTRIBUTES("@status", { disabled: true})
  expect($$runtime.results[0]).toEqual(expectedResult)
})

test("sets a form-level attribute for a field", () => {
  const expectedResult = {
    type: "update-element",
    key: "97ab",
    attribute: "required",
    value: JSON.stringify(true),
  }
  // @ts-ignore Ignore FormFields type check for test
  $$runtime.elementsByDataName = { name: form.elements[0] }

  SETFORMATTRIBUTES("name", { required: true })
  expect($$runtime.results[0]).toEqual(expectedResult)
})

test("attribute defaults to null if it is undefined or null", () => {
  const expectedResult = {
    type: "update-element",
    key: "97ab",
    attribute: "required",
    value: null,
  }
  // @ts-ignore Ignore FormFields type check for test
  $$runtime.elementsByDataName = { name: form.elements[0] }

  SETFORMATTRIBUTES("name", { required: undefined })
  SETFORMATTRIBUTES("name", { required: null })

  expect($$runtime.results[0]).toEqual(expectedResult)
  expect($$runtime.results[1]).toEqual(expectedResult)  
})

test("will not update if field does not exist and data name isn't @form or @status", () => {
  expect(SETFORMATTRIBUTES("bad_field", { required: true })).toBeUndefined()
})

test("will not update if attribute is not among allowable FORM_ATTRIBUTES", () => {
  // @ts-ignore Ignore FormFields type check for test
  $$runtime.elementsByDataName = { name: form.elements[0] }

  expect(SETFORMATTRIBUTES("name", { geography_required: true })).toBeUndefined()
})
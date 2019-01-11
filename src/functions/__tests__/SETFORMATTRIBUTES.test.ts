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
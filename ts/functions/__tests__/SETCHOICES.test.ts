import { prepareRuntime } from "../../test/helpers"
import { form } from "../../../../__test-fixtures__"
import SETCHOICES from "../SETCHOICES"

beforeEach(() => {
  prepareRuntime()
  // @ts-ignore FormFields type checking for tests
  $$runtime.elementsByDataName.choice_value = form.elements[1].elements[1]
})

test("accepts an array of strings and converts them to an array of objects", () => {
  const expectedResult = [
    {
      label: "choice_1",
      value: "choice_1"
    },
    {
      label: "choice_2",
      value: "choice_2"
    }
  ]

  SETCHOICES("choice_value", [ "choice_1", "choice_2"])
  // @ts-ignore value will exist after SETCHOICES is called
  expect($$runtime.results[0].value).toEqual(JSON.stringify(expectedResult))
})

test("accepts an array of numbers and converts them to an array of objects", () => {
  const expectedResult1 = [
    {
      label: "1",
      value: "1"
    },
    {
      label: "2",
      value: "2"
    }
  ]

  const expectedResult2 = [
    {
      label: "3",
      value: "3",
    }
  ]

  SETCHOICES("choice_value", [ 1, 2 ])
  SETCHOICES("choice_value", [[3]])
  // @ts-ignore value will exist after SETCHOICES is called
  expect($$runtime.results[0].value).toEqual(JSON.stringify(expectedResult1))
  // @ts-ignore value will exist after SETCHOICES is called
  expect($$runtime.results[1].value).toEqual(JSON.stringify(expectedResult2))
})

test("accepts an array of arrays and converts them to an array of objects", () => {
  const expectedResult = [
    {
      label: "choice_1",
      value: "1"
    },
    {
      label: "choice_2",
      value: "2"
    }
  ]

  SETCHOICES("choice_value", [ ["choice_1", 1],["choice_2", 2] ])
  // @ts-ignore value will exist after SETCHOICES is called
  expect($$runtime.results[0].value).toEqual(JSON.stringify(expectedResult))
})

test("accepts an array of objects and converts them to the appropriate shape", () => {
  const expectedResult = [
    {
      label: "choice_1",
      value: "choice_1"
    },
    {
      label: "choice_2",
      value: "2"
    }
  ]

  SETCHOICES("choice_value", [ { label: "choice_1" }, { label: "choice_2", value: 2 } ])
  // @ts-ignore value will exist after SETCHOICES is called
  expect($$runtime.results[0].value).toEqual(JSON.stringify(expectedResult))
})

test("accepts null as a value", () => {
  SETCHOICES("choice_value", null)
  // @ts-ignore value will exist after SETCHOICES is called
  expect($$runtime.results[0].value).toBeNull()
})

test("returns undefined if a value other than null or an array is passed in", () => {
  expect(SETCHOICES("choice_value", { label: "choice_2", value: 2 })).toBeUndefined()
  expect(SETCHOICES("choice_value", 1)).toBeUndefined()
  expect(SETCHOICES("choice_value", "choice_1")).toBeUndefined()
  expect(SETCHOICES("choice_value", true)).toBeUndefined()
  expect(SETCHOICES("choice_value", new Date())).toBeUndefined()
  expect(SETCHOICES("choice_value", undefined)).toBeUndefined()
})


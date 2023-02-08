import { form } from "../../../../__test-fixtures__"
import { prepareRuntime } from "../../test/helpers"
import INVALID, { InvalidResult } from "../INVALID"

beforeEach(() => {
  const runtime = prepareRuntime()
  // @ts-ignore Does not like adding things to elementsByDataName
  runtime.elementsByDataName.name = form.elements[0]
})

test("pushes an InvalidResult to runtime", () => {
  INVALID("You must enter a name", "name")

  const expectedPayload: InvalidResult = {
    key: "97ab",
    message: "You must enter a name",
    type: "validation",
  }

  expect($$runtime.results[0]).toEqual(expectedPayload)
})

test("it accepts one argument and pushes a result to runtime", () => {
  INVALID("You must enter a name")

  const expectedPayload: InvalidResult = {
    key: null,
    message: "You must enter a name",
    type: "validation",
  }

  expect($$runtime.results[0]).toEqual(expectedPayload)
})

import { form } from "../../../../__test-fixtures__"
import { prepareRuntime } from "../../test/helpers"
import LABEL from "../LABEL"

beforeEach(() => {
  prepareRuntime()
  // @ts-ignore definitely a text field even if ts-lint says it isn't
  $$runtime.elementsByDataName.name = form.elements[0]
})

test("returns the label of a field", () => {
  expect(LABEL("name")).toEqual("Name")
  expect(LABEL("invalid_field")).toBeUndefined()
})

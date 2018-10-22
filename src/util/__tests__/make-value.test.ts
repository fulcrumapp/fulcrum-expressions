import FIELD from "../../functions/FIELD"
import form from "../../test/fixtures/form"
import { prepareRuntime } from "../../test/helpers"
import { converters } from "../converters"
import makeValue from "../make-value"

beforeEach(() => {
  const runtime = prepareRuntime()
  runtime.form = form
})

test("does what its supposed to do", () => {
  const element = FIELD("name")
  // const textFieldFunc = converters["TextField"] = jest.fn()
  const result = makeValue(element, "Testy McTesterson")
  expect(result).toEqual("Testy McTesterson")
  // expect(textFieldFunc).toHaveBeenCalled()
})

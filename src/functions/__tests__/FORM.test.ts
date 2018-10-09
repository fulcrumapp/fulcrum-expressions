import form from "../../test/fixtures/form"
import { prepareRuntime } from "../../test/helpers"
import FORM from "../FORM"

beforeEach(() => {
  const runtime = prepareRuntime()
  runtime.form = form
})

test("returns the form object", () => {
  expect(FORM()).toEqual(form)
})

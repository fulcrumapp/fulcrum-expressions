import form from "../../test/fixtures/form"
import { prepareRuntime } from "../../test/helpers"
import DESCRIPTION from "../DESCRIPTION"

beforeAll(() => {
  const runtime = prepareRuntime()
  runtime.form = form
  runtime.prepare()
})

test("returns the description of a field", () => {
  expect(DESCRIPTION("name")).toBe("Enter the name")
  // a form field without a description will return null
  expect(DESCRIPTION("items")).toBeNull()
})

test("returns undefined for an invalid dataName", () => {
  expect(DESCRIPTION("invalid_field")).toBeUndefined()
  // @ts-ignore Invalid input type [] needed to return test the function doesn't break
  expect(DESCRIPTION(["invalid_field"])).toBeUndefined()
})

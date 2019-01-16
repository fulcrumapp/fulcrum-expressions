import { prepareRuntime } from "../../test/helpers"
import SHOWERRORS from "../SHOWERRORS"

test("sets showErrors property of runtime to true or false", () => {
  prepareRuntime()

  SHOWERRORS()
  expect($$runtime.showErrors).toBe(true)

  SHOWERRORS(false)
  expect($$runtime.showErrors).toBe(false)
})

import { prepareRuntime } from "../../test/helpers"
import SETCONFIGURATION, { ConfigurationResult } from "../SETCONFIGURATION"

beforeEach(prepareRuntime)

test("It passes each key as a runtime result", () => {
  SETCONFIGURATION({ auto_populate_location: true })
  expect($$runtime.results[0]).toEqual({
    attribute: "auto_populate_location",
    type: "configure",
    value: "true",
  })
})

test("it ignores invalid keys and does not dispatch a runtime command", () => {
  // @ts-ignore: This is a known invalid key
  SETCONFIGURATION({ something_invalid: false })
  expect($$runtime.results).toHaveLength(0)
})

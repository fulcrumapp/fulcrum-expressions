import { prepareRuntime } from "../../test-helpers"
import ON from "../ON"

beforeEach(prepareRuntime)

test("binds an global to the no param runtime", () => {
  const callback = jest.fn()
  ON("load-record", callback)
  expect($$runtime.events["load-record"].__no_param).toContain(callback)
})

test("it binds a selector based event", () => {
  const callback = jest.fn()

  $$runtime.elementsByDataName["my-field"] = {
    data_name: "my-field",
    disabled: false,
    hidden: false,
    key: "abcd",
    label: "My Hyperlink Field",
    required: false,
    type: "HyperlinkField",
  }

  ON("click", "my-field", callback)
  expect($$runtime.events.click["my-field"]).toContain(callback)
})

test("it raises an error if invalid params are passed", () => {
  // @ts-ignore: Checking for no callback
  expect(() => ON("load-record")).toThrow()
  // @ts-ignore: Checking for non-string being used
  expect(() => ON({})).toThrow()
  // @ts-ignore: Checking for non-string being used for target
  expect(() => ON("click", {}, jest.fn())).toThrow()
})

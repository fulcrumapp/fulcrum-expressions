import { prepareRuntime } from "../../test/helpers"
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

test("it validates event params", () => {
  $$runtime.elementsByDataName = {
    "my_field": {
      data_name: "my_field",
      disabled: false,
      hidden: false,
      key: "abcd",
      label: "My Hyperlink Field",
      required: false,
      type: "HyperlinkField",
    },
    "repeatable": {
      data_name: "repeatable",
      disabled: false,
      hidden: false,
      key: "abcd",
      label: "My Repeatable Field",
      required: false,
      type: "Repeatable",
      elements: [
        { data_name: "child_photo_field",
          key: "98ui",
          type: "PhotoField",
          required: false,
          disabled: false,
          hidden: false,
          label: "My Photo Field",
        }
      ]
    },
    "child_photo_field": { 
      data_name: "child_photo_field",
      key: "98ui",
      type: "PhotoField",
      required: false,
      disabled: false,
      hidden: false,
      label: "My Photo Field",
    },
  }

  expect(() => ON("click", "child_photo_field", jest.fn())).toThrow("Invalid usage of ON(): \"child_photo_field\" is not a valid field for the \"click\" event")
  expect(() => ON("validate-repeatable", "my_field", jest.fn())).toThrow()
  expect(() => ON("change-geometry", "child_photo_field", jest.fn())).toThrow()
  expect(() => ON("remove-photo", "repeatable", jest.fn())).toThrow()
  expect(() => ON("remove-audio", "my_field", jest.fn())).toThrow()
  expect(() => ON("remove-video", "child_photo_field", jest.fn())).toThrow()
  expect(() => ON("change", "@project", jest.fn())).not.toThrow()
})

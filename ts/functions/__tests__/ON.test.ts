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
  $$runtime.elementsByDataName["name"] = {
    data_name: "name",
    disabled: false,
    hidden: false,
    key: "3456",
    label: "Name",
    required: false,
    type: "TextField",
  }

  ON("click", "my-field", callback)
  ON("change", "name", callback)
  expect($$runtime.events.click["my-field"]).toContain(callback)
  expect($$runtime.events.change["name"]).toContain(callback)
})

test("it raises an error if invalid params are passed", () => {
  // @ts-ignore: Checking for no callback
  expect(() => ON("load-record")).toThrow()
  // @ts-ignore: Checking for non-string being used
  expect(() => ON({})).toThrow()
  // @ts-ignore: Checking for non-string being used for target
  expect(() => ON("click", {}, jest.fn())).toThrow()
})

test("it validates event params to check if ON can be called", () => {
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
    "audio_field": { 
      data_name: "audio_field",
      key: "98ui",
      type: "AudioField",
      required: false,
      disabled: false,
      hidden: false,
      label: "My Audio Field",
    },
    "video_field": { 
      data_name: "video_field",
      key: "98ui",
      type: "VideoField",
      required: false,
      disabled: false,
      hidden: false,
      label: "My Video Field",
    }
  }

  expect(() => ON("click", "child_photo_field", jest.fn())).toThrow("Invalid usage of ON(): \"child_photo_field\" is not a valid field for the \"click\" event")
  expect(() => ON("validate-repeatable", "my_field", jest.fn())).toThrow()
  // checking change-geometry event validations
  expect(() => ON("change-geometry", "child_photo_field", jest.fn())).toThrow()
  expect(() => ON("change-geometry", "repeatable", jest.fn())).not.toThrow()
  // checking change event validations
  expect(() => ON("change", "@project", jest.fn())).not.toThrow()
  expect(() => ON("change", "fake_field", jest.fn())).toThrow()
  // checking PhotoField validations
  // @ts-ignore 
  expect(() => ON("remove-photo", "repeatable", jest.fn())).toThrow()
  // @ts-ignore 
  expect(() => ON("remove-photo", "child_photo_field", jest.fn())).not.toThrow()
  // checking AudioField validations
  // @ts-ignore
  expect(() => ON("remove-audio", "my_field", jest.fn())).toThrow()
  // @ts-ignore 
  expect(() => ON("remove-audio", "audio_field", jest.fn())).not.toThrow()
  // checking VideoField validations
  // @ts-ignore
  expect(() => ON("remove-video", "child_photo_field", jest.fn())).toThrow()
  // @ts-ignore 
  expect(() => ON("remove-video", "video_field", jest.fn())).not.toThrow()
})

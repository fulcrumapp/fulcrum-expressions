import FIELD from "../FIELD"
import { FormFields } from "../../fields"
import { prepareRuntime } from "../../test-helpers"

beforeEach(prepareRuntime)

test("It fetches the field from the runtime schema", () => {
  const field: FormFields = {
    type: "HyperlinkField",
    key: "abcd",
    label: "My Hyperlink Field",
    data_name: "my-field",
    required: false,
    disabled: false,
    hidden: false
  }

  $$runtime.elementsByDataName["my-field"] = field

  expect(FIELD("my-field")).toBe(field)
})

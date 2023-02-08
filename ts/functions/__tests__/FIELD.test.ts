import { prepareRuntime } from "../../test/helpers"
import { FormFields } from "../../types/fields"
import FIELD from "../FIELD"

beforeEach(prepareRuntime)

test("It fetches the field from the runtime schema", () => {
  const field: FormFields = {
    data_name: "my-field",
    disabled: false,
    hidden: false,
    key: "abcd",
    label: "My Hyperlink Field",
    required: false,
    type: "HyperlinkField",
  }

  $$runtime.elementsByDataName["my-field"] = field

  expect(FIELD("my-field")).toBe(field)
})

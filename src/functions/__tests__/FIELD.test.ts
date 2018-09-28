import { prepareRuntime } from "../../test/helpers"
import { FormFields } from "../../types/fields"
import FIELD from "../FIELD"

beforeEach(prepareRuntime)

test("It fetches the field from the runtime schema", () => {
  const field: FormFields = {
    type: "HyperlinkField",
    key: "abcd",
    label: "My Hyperlink Field",
    data_name: "my-field",
    required: false,
    disabled: false,
    hidden: false,
  }

  $$runtime.elementsByDataName["my-field"] = field

  expect(FIELD("my-field")).toBe(field)
})

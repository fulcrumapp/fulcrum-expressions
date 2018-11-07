import { CalculatedField, FormTextField } from "../../types/fields"
import isNumericElement from "../is-numeric-element"

test("tests to see if an element is numeric", () => {
  const numericElement: CalculatedField = {
    type: "CalculatedField",
    // tslint:disable-next-line:object-literal-sort-keys
    display: { style: "currency", currency: "us-EN" },
    key: "8ui0",
    label: "My Calculated Field",
    data_name: "my_calculated_field",
    required: false,
    disabled: false,
    hidden: false,
  }

  const alsoNumeric: FormTextField = {
    type: "TextField",
    // tslint:disable-next-line:object-literal-sort-keys
    key: "8ui0",
    numeric: true,
    format: "decimal",
    label: "My Number Text Field",
    data_name: "my_number_text_field",
    required: false,
    disabled: false,
    hidden: false,
  }

  expect(isNumericElement(numericElement)).toBe(true)
  expect(isNumericElement(alsoNumeric)).toBe(true)

  const notNumericElement: FormTextField = {
    type: "TextField",
    // tslint:disable-next-line:object-literal-sort-keys
    key: "9oi3",
    label: "Name",
    data_name: "name",
    required: true,
    disabled: false,
    hidden: false,
  }

  expect(isNumericElement(notNumericElement)).toBe(false)
})

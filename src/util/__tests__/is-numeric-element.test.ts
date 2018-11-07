import { CalculatedField, FormTextField } from "../../types/fields"
import isNumericElement from "../is-numeric-element"

test("tests to see if an element is numeric", () => {
  const numericElement: CalculatedField = {
    type: "CalculatedField",
    display: { style: "currency", currency: "us-EN" },
    key: "8ui0",
    label: "My Calculated Field",
    data_name: "my_calculated_field",
    required: false,
    disabled: false,
    hidden: false,
  }

  expect(isNumericElement(numericElement)).toBe(true)

  const notNumericElement: FormTextField = {
    type: "TextField",
    key: "9oi3",
    label: "Name",
    data_name: "name",
    required: true,
    disabled: false,
    hidden: false,
  }

  expect(isNumericElement(notNumericElement)).toBe(false)
})

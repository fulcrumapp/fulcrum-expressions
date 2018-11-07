import { CalculatedField, DateTimeField } from "../../types/fields"
import isDateElement from "../is-date-element"

test("indicates if a form field is a date element or not", () => {
  const calculatedField: CalculatedField = {
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

  const dateField: DateTimeField = {
    type: "DateTimeField",
    // tslint:disable-next-line:object-literal-sort-keys
    key: "8ui0",
    label: "My Date Field",
    data_name: "my_date_field",
    required: false,
    disabled: false,
    hidden: false,
  }

  expect(isDateElement(calculatedField)).toBe(false)
  expect(isDateElement(dateField)).toBe(true)
})

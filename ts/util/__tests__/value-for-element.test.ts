import { DateTimeField, FormTextField } from "../../types/fields"
import valueForElement from "../value-for-element"

test("converts value to a number if numeric field is passed in", () => {
  const numericField: FormTextField = {
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
  expect(valueForElement(numericField, "98")).toBe(98)
})

test("converts value to a Date if date field is passed in", () => {
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

  const expectedDate: Date = new Date("2018-10-7")
  expect(valueForElement(dateField, "2018-10-7")).toEqual(expectedDate)
})

test("returns the original value if neither a date or numeric field are not passed in", () => {
  const textField: FormTextField = {
    type: "TextField",
    // tslint:disable-next-line:object-literal-sort-keys
    key: "9oi3",
    label: "Name",
    data_name: "name",
    required: true,
    disabled: false,
    hidden: false,
  }

  expect(valueForElement(textField, "test")).toBe("test")
})

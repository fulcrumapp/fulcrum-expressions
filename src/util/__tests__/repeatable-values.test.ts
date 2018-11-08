import repeatableValues from "../repeatable-values"

const repeatable: RepeatableField = {
  data_name: "items",
  default_value: "",
  description: "",
  disabled: false,
  // @ts-ignore
  elements: [{
      data_name: "cost",
      default_value: null,
      description: null,
      disabled: false,
      format: "decimal",
      hidden: false,
      key: "1338",
      label: "Cost",
      max: null,
      max_length: null,
      min: null,
      min_length: null,
      numeric: true,
      required: false,
      required_conditions: null,
      required_conditions_type: null,
      type: "TextField",
      visible_conditions: null,
      visible_conditions_type: null,
    },
    {
      type: "ChoiceField",
      // tslint:disable-next-line:object-literal-sort-keys
      key: "362a",
      label: "Choice Picker",
      description: null,
      required: true,
      disabled: false,
      hidden: false,
      data_name: "choice_value",
      default_value: null,
      visible_conditions_type: null,
      visible_conditions: null,
      required_conditions_type: null,
      required_conditions: null,
      multiple: false,
      allow_other: false,
      default_previous_value: false,
      choices: [{
          label: "1",
          value: "widget",
        },
        {
          label: "2",
          value: "spinner",
        },
        {
          label: "4",
          value: "gizmo",
        },
      ],
    },
    {
      data_name: "child_items",
      default_value: null,
      description: null,
      disabled: false,
      elements: [{
        data_name: "child_item_cost",
        default_value: null,
        description: null,
        disabled: false,
        format: "decimal",
        hidden: false,
        key: "1399",
        label: "Child Item Cost",
        max: null,
        max_length: null,
        min: null,
        min_length: null,
        numeric: true,
        required: false,
        required_conditions: null,
        required_conditions_type: null,
        type: "TextField",
        visible_conditions: null,
        visible_conditions_type: null,
      } ],
      geometry_required: false,
      geometry_types: ["Point"],
      hidden: false,
      key: "1347",
      label: "Child Items",
      max_length: null,
      min_length: null,
      required: false,
      required_conditions: null,
      required_conditions_type: null,
      title_field_key: null,
      title_field_keys: ["1399"],
      type: "Repeatable",
      visible_conditions: null,
      visible_conditions_type: null,
    },
  ],
  geometry_required: false,
  geometry_types: ["Point"],
  hidden: false,
  key: "1337",
  label: "Items",
  max_length: null,
  min_length: null,
  required: false,
  title_field_key: null,
  title_field_keys: ["1ce4"],
  type: "Repeatable",
}

const differentItems = [
  { form_values: { "362a": "gizmo" } },
]

const items = [
  { form_values: { 1338: "98.00" } },
]

test("returns an array of values for a specific field contained in a repeatable", () => {
  expect(repeatableValues(repeatable, items, "cost")).toEqual([98])
  expect(repeatableValues(repeatable, differentItems, "choice_value")).toEqual(["gizmo"])
})

test("returns null if a non-array if passed in for items", () => {
  // @ts-ignore second param is non-array by design
  expect(repeatableValues(repeatable, "fail", "fail_field")).toBeNull()
  // @ts-ignore second param is non-array by design
  expect(repeatableValues(repeatable, 78900, "fail_field")).toBeNull()
  // @ts-ignore second param is non-array by design
  expect(repeatableValues(repeatable, true, "fail_field")).toBeNull()
  // @ts-ignore second param is non-array by design
  expect(repeatableValues(repeatable, { badField: "test"} , "fail_field")).toBeNull()
})

test("returns if the dataName param is invalid", () => {
  expect(repeatableValues(repeatable, items, "not_cost")).toBeNull()
  expect(repeatableValues(repeatable, differentItems, "not_choice_value")).toBeNull()
})

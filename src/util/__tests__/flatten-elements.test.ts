import flattenElements from "../flatten-elements"
import repeatable from "../../test/fixtures/repeatable"

test("flattens form elements to one level deep", () => {
  const flattenedArray = flattenElements([repeatable], true, false, undefined, false)
  expect(flattenedArray.length).toBe(5)
  expect(flattenedArray[1]).toEqual(repeatable.elements[0])
})

test("can assign a parent element to elements in array", () => {
  // @ts-ignore repeatable here is a stand-in for a FormField
  const flattenedArray = flattenElements([repeatable], true, true, undefined, false)
  expect(flattenedArray.length).toBe(5)
  // flattenElements sets parent to repeatable element in child records
  expect(flattenedArray[1].parent).toEqual(flattenedArray[0])
})

test("won't attempt to recurseively flatten an empty section or repeatable", () => {
  const mockedFlatten = jest.spyOn(flattenElements, "apply")
  // add an empty section (not elements key) to repeatable.elements
  repeatable.elements.push({
    data_name: "my_section",
    default_value: null,
    description: null,
    disabled: false,
    format: "",
    hidden: false,
    key: "18uh",
    label: "My Section",
    max: null,
    max_length: null,
    min: null,
    min_length: null,
    numeric: true,
    required: false,
    required_conditions: null,
    required_conditions_type: null,
    type: "Section",
    visible_conditions: null,
    visible_conditions_type: null,
  })
  // @ts-ignore explicit any for `this`
  const flattenedArray = flattenElements.apply(this, [[repeatable], true, false, undefined, true])
  expect(flattenedArray.length).toBe(6)
  // initial call above + 2 recursive calls (repeatables.elements and nested repeatable child_items) = 3 calls 
  // should not call a 4th time for the empty section
  expect(mockedFlatten).toHaveBeenCalledTimes(3)
})

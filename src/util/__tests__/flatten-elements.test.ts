import flattenElements from "../flatten-elements"
import repeatable from "../../test/fixtures/repeatable"

test("flattens elements to one level deep", () => {
  const flattenedArray = flattenElements([repeatable], true, false, undefined, false)
  expect(flattenedArray.length).toBe(5)
  expect(flattenedArray[1]).toEqual(repeatable.elements[0])
})

test("can assign a parent element to elements in array", () => {
  // @ts-ignore repeatable here is a stand-in for a FormField
  const flattenedArray = flattenElements([repeatable], true, true, "World's Best Parent", false)
  expect(flattenedArray.length).toBe(5)
  expect(flattenedArray[0].parent).toEqual("World's Best Parent")
})
import numberValue from "../number-value"

test("returns a number value", () => {
  expect(numberValue("90")).toEqual(90)
  expect(numberValue("56778")).toEqual(56778)
  expect(numberValue(97)).toEqual(97)
  expect(numberValue(true)).toEqual(1)
  expect(numberValue(false)).toEqual(0)
  expect(numberValue("test")).toBeNaN()
})

test("returns undefined if the value passed in does not exist", () => {
  expect(numberValue()).toBeUndefined()
  expect(numberValue(undefined)).toBeUndefined()
  expect(numberValue(null)).toBeUndefined()
})

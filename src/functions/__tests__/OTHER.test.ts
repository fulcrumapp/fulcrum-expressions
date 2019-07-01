import OTHER from "../OTHER"

test("returns the other value if a field has it set", () => {
  expect(OTHER({ other_values: ["test"] })).toEqual("test")
  expect(OTHER({ choice_values: ['1'], other_values: ['2'] })).toEqual("2")
})

test("returns undefined if there is no other value", () => {
  expect(OTHER({ other_values: [] })).toBeUndefined()
  expect(OTHER({ other_values: null })).toBeUndefined()
  // @ts-ignore bad input for sake of test
  expect(OTHER()).toBeUndefined()
  expect(OTHER(null)).toBeUndefined()
  expect(OTHER({ choice_values: ['1'] })).toBeUndefined()
})
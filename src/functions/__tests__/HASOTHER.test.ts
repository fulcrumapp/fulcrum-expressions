import HASOTHER from "../HASOTHER"

test("returns true if the field has an other value set", () => {
  expect(HASOTHER({ other_values: ["test"] })).toBe(true)
  expect(HASOTHER({ other_values: [] })).toBe(false)
  expect(HASOTHER({ other_values: null })).toBe(false)
  expect(HASOTHER()).toBe(false)
  expect(HASOTHER(null)).toBe(false)
  expect(HASOTHER({ choice_values: ["1"] })).toBe(false)
  expect(HASOTHER({ choice_values: ["1"], other_values: ["2"] })).toBe(true)
})

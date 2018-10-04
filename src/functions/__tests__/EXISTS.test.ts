import EXISTS from "../EXISTS"

test("checks whether all values passed in exist", () => {
  // truthy things
  expect(EXISTS(0)).toBe(true)
  expect(EXISTS(-1)).toBe(true)
  expect(EXISTS(true)).toBe(true)
  expect(EXISTS(false)).toBe(true)
  expect(EXISTS("test")).toBe(true)
  expect(EXISTS([1])).toBe(true)
  expect(EXISTS({test: 1})).toBe(true)
  expect(EXISTS(1, 2)).toBe(true)
  expect(EXISTS(1, 2, "test")).toBe(true)
  expect(EXISTS(new Date())).toBe(true)
  expect(EXISTS(/test/)).toBe(true)

  // falsey things
  expect(EXISTS([])).toBe(false)
  expect(EXISTS({})).toBe(false)
  expect(EXISTS("")).toBe(false)
  expect(EXISTS(NaN)).toBe(false)
  expect(EXISTS(null)).toBe(false)
  expect(EXISTS(undefined)).toBe(false)
  expect(EXISTS(undefined, null)).toBe(false)
  expect(EXISTS(1, null)).toBe(false)
})

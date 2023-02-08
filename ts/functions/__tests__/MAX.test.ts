import MAX from "../MAX"
import MAXA from "../MAXA"

test.each([
  MAX, MAXA
])("returns the maximum number in a list of numbers", (max) => {
  expect(max(1, 2, 3)).toBe(3)
  expect(max(-1, -2, -3)).toBe(-1)
  expect(max(-1, [-2, 5], -3)).toBe(5)
})

test.each([
  MAX, MAXA
])("it accepts numbers as strings", (max) => {
  expect(max("1", "2", "3")).toBe(3)
  expect(max("1.11", "2.22", "3.33")).toBe(3.33)
  expect(max(["1.11", "2.22"], "3.33")).toBe(3.33)
})

test.each([
  MAX, MAXA
])("it return undefined for invalid input", (max) => {
  expect((max([]))).toBeUndefined()
  expect((max({}))).toBeUndefined()
  expect((max(undefined))).toBeUndefined()
  expect((max(null))).toBeUndefined()
  expect((max(new Date()))).toBeUndefined()
  expect((max(NaN, -2, -3))).toBeUndefined()
  expect((max())).toBeUndefined()
  expect((max(3, 4, 5, "Test"))).toBeUndefined()
})

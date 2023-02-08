import MIN from "../MIN"
import MINA from "../MINA"

test.each([
  MIN, MINA
])('returns the minimum number in a list of numbers', (fn) => {
  expect(fn(1, 2, 3)).toBe(1)
  expect(fn(-1, -2, -3)).toBe(-3)
  expect(fn(-1, [-2, 5], -3)).toBe(-3)
})

test.each([
  MIN, MINA
])('it accepts numbers as strings', (fn) => {
  expect(fn("1", "2", "3")).toBe(1)
  expect(fn("1.11", "2.22", "3.33")).toBe(1.11)
  expect(fn(["1.11", "2.22"], "3.33")).toBe(1.11)
})

test.each([
  MIN, MINA
])('it return undefined for invalid input', (fn) => {
  expect((fn([]))).toBeUndefined()
  expect((fn({}))).toBeUndefined()
  expect((fn(undefined))).toBeUndefined()
  expect((fn(null))).toBeUndefined()
  expect((fn(new Date()))).toBeUndefined()
  expect((fn(NaN, -2, -3))).toBeUndefined()
  expect((fn())).toBeUndefined()
  expect((fn(3, 4, 5, "Test"))).toBeUndefined()
})

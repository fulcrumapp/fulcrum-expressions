import COUNT from "../COUNT"

test("it counts the number of numeric values in an array", () => {
  expect(COUNT([1, 2, 3])).toBe(3)
  expect(COUNT(["1", "2", "3"])).toBe(3)
  expect(COUNT(["1", 2, null, 3, null])).toBe(3)
  expect(COUNT(["foo", "bar"])).toBe(0)
  expect(COUNT([])).toBe(0)
  expect(COUNT([undefined])).toBe(0)
  expect(COUNT([null])).toBe(0)
  expect(COUNT([0])).toBe(1)

})

test("it returns NaN if an array is not passed in", () => {
  expect((COUNT(null))).toBeUndefined()
  expect((COUNT(undefined))).toBeUndefined()
  expect((COUNT({}))).toBeUndefined()
})

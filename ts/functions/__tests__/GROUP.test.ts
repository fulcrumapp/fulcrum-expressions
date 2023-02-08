import GROUP from "../GROUP"

test("returns the grouped values from the parameters", () => {
  expect(GROUP([1, 2, 3])).toEqual({1: [1], 2: [2], 3: [3]})
  expect(GROUP([3, 2, 1, 3, 3, 3])).toEqual({1: [1], 2: [2], 3: [3, 3, 3, 3]})
  expect(GROUP([3, 2, 1, 3, 3, 3])).toEqual({1: [1], 2: [2], 3: [3, 3, 3, 3]})
  expect(GROUP([1, 2, "a"])).toEqual({1: [1], 2: [2], a: ["a"]})
  expect(GROUP([1, 2, "a", "a"])).toEqual({1: [1], 2: [2], a: ["a", "a"]})
  expect(GROUP(["a", "c", "c", "b", "a"])).toEqual({a: ["a", "a"], b: ["b"], c: ["c", "c"]})
  expect(GROUP([1])).toEqual({1: [1]})
})

test("accepts an optional callback to iterate over values", () => {
  expect(GROUP([6.1, 4.2, 6.3], Math.floor)).toEqual({ 4: [4.2], 6: [6.1, 6.3] })

  const sortByLength = (str: string) => {
    return str.length >= 5
  }
  const expected: {} = { false: [ "cat", "cow" ], true: [ "donkey", "snake" ] }

  expect(GROUP(["cat", "donkey", "cow", "snake"], sortByLength)).toEqual(expected)
})

test("returns undefined for invalid input", () => {
  expect(GROUP({1: 1, 2: 2, 3: 3 })).toBeUndefined()
  expect(GROUP(undefined)).toBeUndefined()
  expect(GROUP(null)).toBeUndefined()
  expect(GROUP({})).toBeUndefined()
  expect(GROUP([])).toBeUndefined()
  expect(GROUP(true)).toBeUndefined()
})

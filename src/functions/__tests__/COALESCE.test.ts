import COALESCE from "../COALESCE"

test("returns the first argument passed in that exists", () => {
  expect(COALESCE(["hi", "there", "friends"])).toEqual("hi")
  expect(COALESCE([1])).toEqual(1)
  expect(COALESCE(null, "", undefined, NaN, 0)).toEqual(0)
  expect(COALESCE([null, NaN], [undefined, "a"])).toEqual("a")
  expect(COALESCE([{test: 1}, {stillTest: 2}])).toEqual({test: 1})
  expect(COALESCE({test: 1}, {stillTest: 2})).toEqual({test: 1})
  expect(COALESCE([[2, 3], [3, 6, [5]]])).toEqual(2)
  expect(COALESCE([{}, {}, {foo: "bar"}])).toEqual({foo: "bar"})
})

test("returns undefined if arguments passed in are not values", () => {
  expect(COALESCE()).toBeUndefined()
  expect(COALESCE([null, NaN, undefined])).toBeUndefined()
  expect(COALESCE(null, null, NaN)).toBeUndefined()
  expect(COALESCE(NaN)).toBeUndefined()
  expect(COALESCE([{}, []])).toBeUndefined()
  expect(COALESCE([])).toBeUndefined()
})

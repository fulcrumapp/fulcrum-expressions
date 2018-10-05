import MEMOIZED_FACT, { RESET_MEMOIZED_FACT } from "../MEMOIZED_FACT"

test("it returns a cache array", () => {
  const cache: string[] = MEMOIZED_FACT()
  expect(cache).toEqual([])

  cache.push("orange")
  expect(MEMOIZED_FACT()).toEqual(["orange"])
})

test("it has a function to reset the cache", () => {
  const cache: string[] = MEMOIZED_FACT()
  cache.push("lemon")
  expect(MEMOIZED_FACT()).toEqual(["orange", "lemon"])

  RESET_MEMOIZED_FACT()
  expect(MEMOIZED_FACT()).toEqual([])
})

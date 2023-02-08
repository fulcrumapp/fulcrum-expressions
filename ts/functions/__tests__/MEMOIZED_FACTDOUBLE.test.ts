import MEMOIZED_FACTDOUBLE, { RESET_MEMOIZED_FACTDOUBLE } from "../MEMOIZED_FACTDOUBLE"

test("it returns a cache array", () => {
  const cache: string[] = MEMOIZED_FACTDOUBLE()
  expect(cache).toEqual([])

  cache.push("orange")
  expect(MEMOIZED_FACTDOUBLE()).toEqual(["orange"])
})

test("it has a function to reset the cache", () => {
  const cache: string[] = MEMOIZED_FACTDOUBLE()
  cache.push("lemon")
  expect(MEMOIZED_FACTDOUBLE()).toEqual(["orange", "lemon"])

  RESET_MEMOIZED_FACTDOUBLE()
  expect(MEMOIZED_FACTDOUBLE()).toEqual([])
})

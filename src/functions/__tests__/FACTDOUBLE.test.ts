import FACTDOUBLE from "../FACTDOUBLE"
import { RESET_MEMOIZED_FACTDOUBLE} from "../MEMOIZED_FACTDOUBLE"

beforeEach(RESET_MEMOIZED_FACTDOUBLE)

test("returns the double factorial of postive integers", () => {
  expect(FACTDOUBLE(0)).toBe(1)
  expect(FACTDOUBLE(1)).toBe(1)
  expect(FACTDOUBLE(2)).toBe(2)
  expect(FACTDOUBLE(3)).toBe(3)
  expect(FACTDOUBLE(4)).toBe(8)
  expect(FACTDOUBLE(7)).toBe(105)
  expect(FACTDOUBLE(20)).toBe(3715891200)
})

test("returns NaN for invalid input", () => {
  expect(FACTDOUBLE(-1)).toBeNaN()
  expect(FACTDOUBLE(NaN)).toBeNaN()
  expect(FACTDOUBLE(true)).toBeNaN()
  expect(FACTDOUBLE([])).toBeNaN()
  expect(FACTDOUBLE({})).toBeNaN()
  expect(FACTDOUBLE("")).toBeNaN()
  expect(FACTDOUBLE(null)).toBeNaN()
  expect(FACTDOUBLE(undefined)).toBeNaN()
})

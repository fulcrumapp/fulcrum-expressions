import FACT from "../FACT"
import { RESET_MEMOIZED_FACT} from "../MEMOIZED_FACT"

beforeEach(RESET_MEMOIZED_FACT)

test("returns the factorial of postive integers", () => {
  expect(FACT(0)).toBe(1)
  expect(FACT(1)).toBe(1)
  expect(FACT(2)).toBe(2)
  expect(FACT(3)).toBe(6)
  expect(FACT(4)).toBe(24)
  expect(FACT(7)).toBe(5040)
  expect(FACT(8)).toBe(40320)
})

test("returns NaN for invalid input", () => {
  expect(FACT(-1)).toBeNaN()
  expect(FACT(NaN)).toBeNaN()
  expect(FACT(true)).toBeNaN()
  expect(FACT([])).toBeNaN()
  expect(FACT({})).toBeNaN()
  expect(FACT("")).toBeNaN()
  expect(FACT(null)).toBeNaN()
  expect(FACT(undefined)).toBeNaN()
})

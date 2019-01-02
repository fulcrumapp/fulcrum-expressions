import { extendToBeWithinRange } from "../../test/helpers"
import RANDBETWEEN from "../RANDBETWEEN"

beforeEach(extendToBeWithinRange)

test("returns a random integer between low and high", () => {
  // @ts-ignore Extended expect to include toBeWithinRange matcher
  expect(RANDBETWEEN(5, 10)).toBeWithinRange(4, 11)
  // @ts-ignore Extended expect to include toBeWithinRange matcher
  expect(RANDBETWEEN("5", "10")).toBeWithinRange(4, 11)
  // @ts-ignore Extended expect to include toBeWithinRange matcher
  expect(RANDBETWEEN("3", "5")).not.toBeWithinRange(0, 1)
})

test("returns NaN for invalid input", () => {
  expect(RANDBETWEEN(NaN, 6)).toBeNaN()
  expect(RANDBETWEEN(null)).toBeNaN()
  expect(RANDBETWEEN(undefined)).toBeNaN()
  expect(RANDBETWEEN(true)).toBeNaN()
  expect(RANDBETWEEN([])).toBeNaN()
  expect(RANDBETWEEN({})).toBeNaN()
  expect(RANDBETWEEN(new Date())).toBeNaN()
})

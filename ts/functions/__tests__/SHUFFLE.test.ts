import { extendContainAllElements } from "../../test/helpers"
import SHUFFLE from "../SHUFFLE"

beforeEach(extendContainAllElements)

test("returns an array of shuffled values", () => {
  // @ts-ignore toContainAllElements will exist after extend call
  expect(SHUFFLE([1, 2, 3, 4], 5)).toContainAllElements([1, 2, 3, 4, 5])
  expect(SHUFFLE()).toEqual([])
  // @ts-ignore toContainAllElements will exist after extend call
  expect(SHUFFLE(1, "test", 34, "test")).toContainAllElements([1, "test", 34, "test"])
})
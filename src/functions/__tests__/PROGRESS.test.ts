import { prepareRuntime } from "../../test/helpers"
import PROGRESS, { ProgressResult } from "../PROGRESS"

beforeEach(prepareRuntime)

test("pushes a ProgressResult object to runtime", () => {
  const expectedResult: ProgressResult = {
    message: "So much progress going on right now",
    title: "Progress update",
    type: "progress",
  }

  PROGRESS("Progress update", "So much progress going on right now")
  expect($$runtime.results[0]).toEqual(expectedResult)
})

test("accepts one or two arguments, a title and message", () => {
  const expectedWithTitle: ProgressResult = {
    message: "So much progress going on right now",
    title: "Progress update",
    type: "progress",
  }

  const expectedNoTitle: ProgressResult = {
    message: "So much progress going on right now",
    title: null,
    type: "progress",
  }

  PROGRESS("Progress update", "So much progress going on right now")
  PROGRESS(null, "So much progress going on right now")

  expect($$runtime.results[0]).toEqual(expectedWithTitle)
  expect($$runtime.results[1]).toEqual(expectedNoTitle)
})

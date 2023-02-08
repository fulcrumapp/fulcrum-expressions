import { prepareRuntime } from "../../test/helpers"
import SETSTATUSFILTER from "../SETSTATUSFILTER"

beforeEach(prepareRuntime)

test("accepts an array of statuses", () => {
  const expectedResult = {
    type: "update-element",
    key: "@status",
    attribute: "choice_filter",
    value: '["critical","pending"]',
  }
  SETSTATUSFILTER(["critical", "pending"])
  expect($$runtime.results[0]).toEqual(expectedResult)
})

test("accepts a single status", () => {
  const expectedResult = {
    type: "update-element",
    key: "@status",
    attribute: "choice_filter",
    value: '["pending"]',
  }
  SETSTATUSFILTER("pending")
  expect($$runtime.results[0]).toEqual(expectedResult)
})
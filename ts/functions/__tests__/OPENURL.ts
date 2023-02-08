import OPENURL from "../OPENURL"
import { prepareRuntime } from "../../test/helpers"

beforeEach(prepareRuntime)

test("accepts a url as an argument and pushes a result to runtime", () => {
  OPENURL("htttp://www.example.com/")
  expect($$runtime.results[0]).toEqual({
    type: "open",
    value: "\"htttp://www.example.com/\""
  })
})

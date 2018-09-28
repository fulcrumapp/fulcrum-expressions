import { prepareRuntime } from "../../test/helpers"
import httpRequest, { HTTPRequestCallback } from "../http-request"

beforeEach(prepareRuntime)

test("throwing an error if it is not defined on the host", () => {
  const callback : HTTPRequestCallback = (error: Error | null) => {
    expect(error).toBeInstanceOf(Error)
  }

  httpRequest(`{ foo: "bar" }`, callback)
})

test("when the httpRequest property exists, it dispatches an event", () => {
  $$runtime.$$httpRequest = jest.fn()

  const callback : HTTPRequestCallback = () => {}

  httpRequest(`{ foo: "bar" }`, callback)

  expect($$runtime.$$httpRequest).toHaveBeenCalledWith(`{ foo: "bar" }`, 1)
})

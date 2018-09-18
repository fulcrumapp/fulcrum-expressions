import REQUEST from "../REQUEST"
import { prepareRuntime } from "../../test-helpers"

const url = "http://www.google.com"

let httpRequest = jest.fn()

beforeEach(() => {
  prepareRuntime()
  httpRequest = $$runtime.$$httpRequest = jest.fn()
})

test("it raises an error if no callback is passed", () => {
  expect(() => {
    // @ts-ignore: Testing a missing callback
    REQUEST({ url: "foo.com" })
  }).toThrow()
})

test("Giving an invalid URL as a first argument throws", () => {
  expect(() => {
    REQUEST("", jest.fn())
  }).toThrow()
})

test("it dispatches an HTTP request for a single url", () => {
  REQUEST(url, () => {})

  const call = JSON.parse(httpRequest.mock.calls[0][0])

  expect(call.url).toEqual(url)
  expect(call.method).toEqual("GET")
  expect(call.headers).toEqual({})
  expect(call.followRedirect).toBeTruthy()
})

test("it supports a json property to build a JSON request", () => {
  const json = { test: { json: "is cool" } }

  REQUEST({ url, json }, jest.fn())

  const call = JSON.parse(httpRequest.mock.calls[0][0])

  expect(call.url).toEqual(url)
  expect(call.headers['Content-Type']).toEqual('application/json')
  expect(call.body).toEqual(JSON.stringify(json))
  expect(call.json).toBeUndefined()
})

test("it supports building a query string from the qs prop", () => {
  const qs = { testing: "1" }

  REQUEST({ url, qs }, () => {})

  const call = JSON.parse(httpRequest.mock.calls[0][0])

  expect(call.url).toContain("?testing=1")
  expect(call.qs).toBeUndefined()
})

it("handles the case if the URL has a question mark in it", () => {
  const qs = { testing: "1" }

  REQUEST({ url: `${url}?inline=1`, qs }, () => {})

  const call = JSON.parse(httpRequest.mock.calls[0][0])

  expect(call.url).toContain("?inline=1&testing=1")
})

it("handles the case of trailing ampersands", () => {
  const qs = { testing: "1" }

  REQUEST({ url: `${url}?inline=1&`, qs }, () => {})

  const call = JSON.parse(httpRequest.mock.calls[0][0])

  expect(call.url).toContain("?inline=1&testing=1")
})

it("safely encodes the URL for bad user input", () => {
  REQUEST("http://google.com/some space", () => {})

  const call = JSON.parse(httpRequest.mock.calls[0][0])

  expect(call.url).toEqual("http://google.com/some%20space")
})

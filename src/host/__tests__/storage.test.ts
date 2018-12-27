import { prepareRuntime } from "../../test/helpers"
import storage from "../storage"

beforeEach(prepareRuntime)

describe("setItem call", () => {
  test("it proxies the setItem call to the runtime", () => {
    const mock = $$runtime.$$storageSetItem = jest.fn()
    storage.setItem("foo", "{ bar: 'baz' }")
    expect(mock).toHaveBeenNthCalledWith(1, "default", "foo", "{ bar: 'baz' }")
  })

  test("setItem will no-op if no key is passed in", () => {
    // @ts-ignore Null value key to return undefined
    expect(storage.setItem(null, "some value")).toBeUndefined()
  })

  test("setItem will no-op if $$storageSetItem does not exist on runtime", () => {
    // prepareRuntime does not set up $$storageSetItem, host does
    // just calling setItem here will be sufficient to no-op
    expect(storage.setItem("foo", "some value")).toBeUndefined()
  })
})

describe("getItem call", () => {
  test("it proxies the getItem call to the runtime", () => {
    const mock = $$runtime.$$storageGetItem = jest.fn().mockReturnValue("test_return") 
    expect(storage.getItem("test")).toEqual("test_return")
    expect(mock).toHaveBeenCalled()
  })

  test("getItem will no-op if no key is passed in", () => {
    // @ts-ignore Null value key to return undefined
    expect(storage.getItem(null)).toBeUndefined()
  })

  test("getItem will no-op if $$storageGetItem does not exist on runtime", () => {
    $$runtime.$$storageSetItem = jest.fn()
    storage.setItem("foo", "{ bar: 'baz' }")
    // prepareRuntime does not set up $$storageGetItem, host does
    // just calling getItem here will be sufficient to no-op
    expect(storage.getItem("foo")).toBeUndefined()
  })
})

test("it proxies the clear call to the runtime", () => {
  const mock = $$runtime.$$storageClear = jest.fn()
  storage.clear()
  expect(mock).toHaveBeenCalled()
})

test("it proxies the removeItem call to the runtime", () => {
  const mock = $$runtime.$$storageRemoveItem = jest.fn()
  storage.removeItem("test_key")
  expect(mock).toHaveBeenNthCalledWith(1, "default", "test_key")
})

test("it proxies the length call to the runtime", () => {
  const mock = $$runtime.$$storageLength = jest.fn().mockReturnValue(20)
  expect(storage.length).toEqual(20)
})

test("it proxies the key call to the runtime", () => {
  const mock = $$runtime.$$storageKey = jest.fn()
  storage.key(1)
  expect(mock).toHaveBeenNthCalledWith(1, "default", 1)
})

import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import FIXED from "../FIXED"

beforeEach(RESETCONFIG)

test("returns the fixed represention of a number", () => {
  expect(FIXED(12345678901 / 3, 3)).toEqual("4,115,226,300.333")
  expect(FIXED(12345678901 / 3, 3, true)).toEqual("4115226300.333")
  expect(FIXED(1 / 3, 3, true)).toEqual("0.333")
  expect(FIXED(1 / 3, 3)).toEqual("0.333")
  expect(FIXED(2 / 3, 3)).toEqual("0.667")
  expect(FIXED(13.371337, 3)).toEqual("13.371")
  expect(FIXED(3 * 3.2, 1)).toEqual("9.6")
  expect(FIXED(0)).toEqual("0.00")
  expect(FIXED(1, 10)).toEqual("1.0000000000")
  expect(FIXED(100000, 10)).toEqual("100,000.0000000000")
  expect(FIXED(1000000001, 10)).toEqual("1,000,000,001.0000000000")
  expect(FIXED(9999999999, 10)).toEqual("9,999,999,999.0000000000")
  expect(FIXED(9999999999.001, 3)).toEqual("9,999,999,999.001")
})

test("it uses configuration settings to customize return values", () => {
  CONFIGURE({ decimalSeparator: ",", groupingSeparator: "." })

  expect(FIXED(12345678901 / 3, 3)).toEqual("4.115.226.300,333")
  expect(FIXED(12345678901 / 3, 3, true)).toEqual("4115226300,333")
  expect(FIXED(1 / 3, 3, true)).toEqual("0,333")
  expect(FIXED(1 / 3, 3)).toEqual("0,333")
  expect(FIXED(13.371337, 3)).toEqual("13,371")
  expect(FIXED(3 * 3.2, 1)).toEqual("9,6")
  expect(FIXED(0)).toEqual("0,00")
  expect(FIXED(1, 10)).toEqual("1,0000000000")
  expect(FIXED(100000, 10)).toEqual("100.000,0000000000")
  expect(FIXED(1000000001, 10)).toEqual("1.000.000.001,0000000000")

  CONFIGURE({ decimalSeparator: ".", groupingSeparator: ",", groupingSize: 4 })

  expect(FIXED(12345678901 / 3, 3)).toEqual("41,1522,6300.333")
  expect(FIXED(12345678901 / 3, 3, true)).toEqual("4115226300.333")

})

test("it returns undefined for invalid input", () => {
  expect((FIXED([]))).toBeUndefined()
  expect((FIXED({}))).toBeUndefined()
  expect((FIXED(undefined))).toBeUndefined()
  expect((FIXED(null))).toBeUndefined()
  expect((FIXED(new Date))).toBeUndefined()
  expect((FIXED(new RegExp))).toBeUndefined()
  expect((FIXED(""))).toBeUndefined()
})

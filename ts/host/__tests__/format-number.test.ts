import { prepareRuntime } from "../../test/helpers"
import formatNumber, { NumberFormatOptions } from "../format-number"

beforeEach(prepareRuntime)

test("it proxies the format number call to runtime", () => {
  $$runtime.$$formatNumber = jest.fn()

  const options: NumberFormatOptions = {
    currency: "BRL",
    maximumFractionDigits: 2,
    maximumSignificantDigits: 1,
    minimumIntegerDigits: 2,
    minimumSignificantDigits: 1,
    style: "currency",
    useGrouping: true,
  }

  const value: number = 3000
  const locale: string = "fr-FR"

  formatNumber(value, locale, options)
  expect($$runtime.$$formatNumber).toHaveBeenCalledWith(value, locale, options)
})

test("will fallback to stringifying a value if no other formatting option exists", () => {
  // @ts-ignore resetting global var Intl to test formatNumber edge case
  global.Intl = undefined

  const options: NumberFormatOptions = {
    currency: "BRL",
    maximumFractionDigits: 2,
    maximumSignificantDigits: 1,
    minimumIntegerDigits: 2,
    minimumSignificantDigits: 1,
    style: "currency",
    useGrouping: true,
  }

  const value: number = 3000
  const locale: string = "fr-FR"

  expect(formatNumber(value, locale, options)).toEqual("3000")

  // reset global var Intl
  global.Intl = require("intl")
  expect(typeof(Intl)).toBe("object")
})

test("if it cannot proxy a call to runtime it formats the value using the Intl module", () => {
  const options: NumberFormatOptions = {
    currency: "BRL",
    maximumFractionDigits: 2,
    maximumSignificantDigits: 1,
    minimumIntegerDigits: 2,
    minimumSignificantDigits: 1,
    style: "currency",
    useGrouping: true,
  }

  const value: number = 3000
  const locale: string = "fr-FR"
  expect(formatNumber(value, locale, options)).toEqual("3 000 R$")
})
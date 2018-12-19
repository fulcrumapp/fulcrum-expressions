import { prepareRuntime } from "../../test/helpers"
import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import FORMATNUMBER from "../FORMATNUMBER"

beforeEach(() => {
  RESETCONFIG()
  prepareRuntime()
})

test("formats a number value according to a locale and options passed in", () => {
  expect(FORMATNUMBER(1 / 3)).toEqual("0.333")
  expect(FORMATNUMBER(1 / 3, "pt-BR")).toEqual("0,333")
  expect(FORMATNUMBER(10000 / 3, "pt-BR")).toEqual("3.333,333")
  expect(FORMATNUMBER(10000 / 3, "fr-FR")).toEqual("3 333,333")
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { useGrouping: false })).toEqual("3333,333")
  expect(FORMATNUMBER(10000 / 3, "fr-FR", { useGrouping: false })).toEqual("3333,333")
  expect(FORMATNUMBER(1 / 3, null, { minimumFractionDigits: 5 })).toEqual("0.33333")
  expect(FORMATNUMBER(1 / 3, null, { maximumFractionDigits: 2 })).toEqual("0.33")
  expect(FORMATNUMBER(1 / 3, null, { minimumIntegerDigits: 2 })).toEqual("00.333")
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { style: "currency", currency: "BRL" })).toEqual("R$3.333,33")
  expect(FORMATNUMBER(10000 / 3, "fr-FR", { style: "currency", currency: "EUR" })).toEqual("3 333,33 €")
})

test("formats a number for different locales", () => {
  CONFIGURE({ currencyCode: "EUR" }) // number formatting for the Euro in different locales
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { style: "currency" })).toEqual("€3.333,33")
  expect(FORMATNUMBER(10000 / 3, "fr-FR", { style: "currency" })).toEqual("3 333,33 €")
  expect(FORMATNUMBER(10000 / 3, "en-US", { style: "currency" })).toEqual("€3,333.33")

  CONFIGURE({ currencyCode: "BRL" }) // number formatting for the Brazilian real in different locales
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { style: "currency" })).toEqual("R$3.333,33")
  expect(FORMATNUMBER(10000 / 3, "fr-FR", { style: "currency" })).toEqual("3 333,33 R$")
  expect(FORMATNUMBER(10000 / 3, "en-US", { style: "currency" })).toEqual("R$3,333.33")

  CONFIGURE({ currencyCode: "USD" }) // number formatting for the US dollar in different locales
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { style: "currency" })).toEqual("US$3.333,33")
  expect(FORMATNUMBER(10000 / 3, "fr-FR", { style: "currency" })).toEqual("3 333,33 $US")
  expect(FORMATNUMBER(10000 / 3, "en-US", { style: "currency" })).toEqual("$3,333.33")
})

test("formats percentages", () => {
  expect(FORMATNUMBER(0.21, "en-US", { style: "percent" })).toEqual("21%")
  expect(FORMATNUMBER(0.21, "fr-FR", { style: "percent" })).toEqual("21 %")
})

test("allows user to choose number of significant digits", () => {
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { maximumSignificantDigits: 5 })).toEqual("3.333,3")
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { minimumSignificantDigits: 6 })).toEqual("3.333,33")
  expect(FORMATNUMBER(10000 / 3, "fr-FR", { maximumSignificantDigits: 10 })).toEqual("3 333,333333")
})

test("minimumSignificantDigits and maximumSignificantDigits are forced to fit the range 1-21", () => {
  // maximumSignificantDigits can be no greater than 21
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { maximumSignificantDigits: 21 })).toEqual("3.333,33333333333")
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { maximumSignificantDigits: 22 })).toEqual("3.333,33333333333")
  // minimumSignificantDigits can be no greater than 21
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { minimumSignificantDigits: 21 })).toEqual("3.333,33333333333000000")
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { minimumSignificantDigits: 22 })).toEqual("3.333,33333333333000000")
  // minimumSignificantDigits can be no less 1
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { minimumSignificantDigits: -1 })).toEqual("3.000")
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { minimumSignificantDigits: 0 })).toEqual("3.000")
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { minimumSignificantDigits: 1 })).toEqual("3.000")
  // minimumSignificantDigits can be no less 1
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { maximumSignificantDigits: 0 })).toEqual("3.000")
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { maximumSignificantDigits: -1 })).toEqual("3.000")
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { maximumSignificantDigits: 1 })).toEqual("3.000")
})

test("returns 'NaN' if not value is passed in", () => {
  expect(FORMATNUMBER(null, "pt-BR", { style: "currency" })).toEqual("NaN")
})

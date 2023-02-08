import { prepareRuntime } from "../../test/helpers"
import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import FORMATNUMBER from "../FORMATNUMBER"
import { NumberFormatOptions } from "../../host/format-number"

beforeEach(() => {
  RESETCONFIG()
  prepareRuntime()
})

const largeNum = 10000 / 3
const smaller = 1/3
const runtimeFormatter = (value: number, lang: string = "en-US", opts: NumberFormatOptions = {}) => {
  const nf = new Intl.NumberFormat(lang, opts)
  return nf.format(value)
}

test.each([
  [[smaller]],
  [[smaller, "pt-BR"]],
  [[largeNum, "pt-BR"]],
  [[largeNum, "fr-FR"]],
  [[largeNum, "pt-BR", { useGrouping: false }]],
  [[largeNum, "fr-FR", { useGrouping: false }]],
  [[smaller, null, { minimumFractionDigits: 5 }]],
  [[smaller, null, { maximumFractionDigits: 2 }]],
  [[smaller, null, { minimumIntegerDigits: 2 }]],
  [[largeNum, "pt-BR", { style: "currency", currency: "BRL" }]],
  [[largeNum, "fr-FR", { style: "currency", currency: "EUR" }]]
])("formats a number value according to a locale and options passed in", (args) => {
  const mockArgs = args;
  // set language to english for mocks
  if(mockArgs[1] === null) {
    mockArgs[1] = "en-US"
  }
  expect(FORMATNUMBER.apply(undefined, args)).toEqual(runtimeFormatter.apply(undefined, mockArgs))
})

test("formats a number for different locales", () => {
  CONFIGURE({ currencyCode: "EUR" }) // number formatting for the Euro in different locales
  expect(FORMATNUMBER(largeNum, "pt-BR", { style: "currency" })).toMatch(runtimeFormatter(largeNum, "pt-BR", { style: "currency", currency: "EUR" }))
  expect(FORMATNUMBER(largeNum, "fr-FR", { style: "currency" })).toMatch(runtimeFormatter(largeNum, "fr-FR", { style: "currency", currency: "EUR" }))
  expect(FORMATNUMBER(largeNum, "en-US", { style: "currency" })).toEqual(runtimeFormatter(largeNum, "en-US", { style: "currency", currency: "EUR" }))

  CONFIGURE({ currencyCode: "BRL" }) // number formatting for the Brazilian real in different locales
  expect(FORMATNUMBER(largeNum, "pt-BR", { style: "currency" })).toEqual(runtimeFormatter(largeNum, "pt-BR", { style: "currency", currency: "BRL" }))
  expect(FORMATNUMBER(largeNum, "fr-FR", { style: "currency" })).toEqual(runtimeFormatter(largeNum, "fr-FR", { style: "currency", currency: "BRL" }))
  expect(FORMATNUMBER(largeNum, "en-US", { style: "currency" })).toEqual(runtimeFormatter(largeNum, "en-US", { style: "currency", currency: "BRL" }))

  CONFIGURE({ currencyCode: "USD" }) // number formatting for the US dollar in different locales
  expect(FORMATNUMBER(largeNum, "pt-BR", { style: "currency" })).toEqual(runtimeFormatter(largeNum, "pt-BR", { style: "currency", currency: "USD" }))
  expect(FORMATNUMBER(largeNum, "fr-FR", { style: "currency" })).toEqual(runtimeFormatter(largeNum, "fr-FR", { style: "currency", currency: "USD" }))
  expect(FORMATNUMBER(largeNum, "en-US", { style: "currency" })).toEqual(runtimeFormatter(largeNum, "en-US", { style: "currency", currency: "USD" }))
})

test("formats percentages", () => {
  expect(FORMATNUMBER(0.21, "en-US", { style: "percent" })).toEqual(runtimeFormatter(0.21, "en-US", {style: "percent"}))
  expect(FORMATNUMBER(0.21, "fr-FR", { style: "percent" })).toEqual(runtimeFormatter(0.21, "fr-FR", { style: "percent" }))
})

test("allows user to choose number of significant digits", () => {
  expect(FORMATNUMBER(largeNum, "pt-BR", { maximumSignificantDigits: 5 })).toEqual(runtimeFormatter(largeNum, "pt-BR", { maximumSignificantDigits: 5 }))
  expect(FORMATNUMBER(largeNum, "pt-BR", { minimumSignificantDigits: 6 })).toEqual(runtimeFormatter(largeNum, "pt-BR", { minimumSignificantDigits: 6, maximumSignificantDigits: 6 }))
  expect(FORMATNUMBER(largeNum, "fr-FR", { maximumSignificantDigits: 10 })).toEqual(runtimeFormatter(largeNum, "fr-FR", { maximumSignificantDigits: 10 }))
})

test.each([
  [[largeNum, "pt-BR", { maximumSignificantDigits: 21 }]],
  // maximumSignificantDigits can be no greater than 21
  [[largeNum, "pt-BR", { maximumSignificantDigits: 22 }]],
  [[largeNum, "pt-BR", { minimumSignificantDigits: 21 }]],
  [[largeNum, "pt-BR", { minimumSignificantDigits: 22 }]],
  [[largeNum, "pt-BR", { minimumSignificantDigits: -1 }]],
  [[largeNum, "pt-BR", { minimumSignificantDigits: 0 }]],
  [[largeNum, "pt-BR", { minimumSignificantDigits: 1 }]],
  [[largeNum, "pt-BR", { maximumSignificantDigits: -1 }]],
  [[largeNum, "pt-BR", { maximumSignificantDigits: 0 }]],
  [[largeNum, "pt-BR", { maximumSignificantDigits: 1 }]]
])("minimumSignificantDigits and maximumSignificantDigits are forced to fit the range 1-21", (args) => {
  expect(FORMATNUMBER.apply(undefined, args)).toEqual(runtimeFormatter.apply(undefined, args))
})

test("returns 'NaN' if not value is passed in", () => {
  // @ts-ignore Null passed in for value to test 'NaN' return
  expect(FORMATNUMBER(null, "pt-BR", { style: "currency" })).toEqual("NaN")
})

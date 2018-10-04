import { prepareRuntime } from "../../test/helpers"
import { RESETCONFIG } from "../CONFIG"
import CONFIGURE from "../CONFIGURE"
import FORMATNUMBER from "../FORMATNUMBER"

beforeEach(() => {
  RESETCONFIG()
  prepareRuntime()
})

test("formats a number value according to a locale and options passed in", () => {
  expect(FORMATNUMBER(1 / 3)).toBe("0.333")
  expect(FORMATNUMBER(1 / 3, "pt-BR")).toBe("0,333")
  expect(FORMATNUMBER(10000 / 3, "pt-BR")).toBe("3.333,333")
  expect(FORMATNUMBER(10000 / 3, "fr-FR")).toBe("3 333,333")
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { useGrouping: false })).toBe("3333,333")
  expect(FORMATNUMBER(10000 / 3, "fr-FR", { useGrouping: false })).toBe("3333,333")
  expect(FORMATNUMBER(1 / 3, null, { minimumFractionDigits: 5 })).toBe("0.33333")
  expect(FORMATNUMBER(1 / 3, null, { maximumFractionDigits: 2 })).toBe("0.33")
  expect(FORMATNUMBER(1 / 3, null, { minimumIntegerDigits: 2 })).toBe("00.333")
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { style: "currency", currency: "BRL" })).toBe("R$3.333,33")
  expect(FORMATNUMBER(10000 / 3, "fr-FR", { style: "currency", currency: "EUR" })).toBe("3 333,33 €")
})

test("formats a number for different locales", () => {
  CONFIGURE({ currencyCode: "EUR" }) // number formatting for the Euro in different locales
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { style: "currency" })).toBe("€3.333,33")
  expect(FORMATNUMBER(10000 / 3, "fr-FR", { style: "currency" })).toBe("3 333,33 €")
  expect(FORMATNUMBER(10000 / 3, "en-US", { style: "currency" })).toBe("€3,333.33")

  CONFIGURE({ currencyCode: "BRL" }) // number formatting for the Brazilian real in different locales
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { style: "currency" })).toBe("R$3.333,33")
  expect(FORMATNUMBER(10000 / 3, "fr-FR", { style: "currency" })).toBe("3 333,33 R$")
  expect(FORMATNUMBER(10000 / 3, "en-US", { style: "currency" })).toBe("R$3,333.33")

  CONFIGURE({ currencyCode: "USD" }) // number formatting for the US dollar in different locales
  expect(FORMATNUMBER(10000 / 3, "pt-BR", { style: "currency" })).toBe("US$3.333,33")
  expect(FORMATNUMBER(10000 / 3, "fr-FR", { style: "currency" })).toBe("3 333,33 $US")
  expect(FORMATNUMBER(10000 / 3, "en-US", { style: "currency" })).toBe("$3,333.33")
})

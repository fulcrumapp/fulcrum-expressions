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

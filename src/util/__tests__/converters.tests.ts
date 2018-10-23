import { converters } from "../converters"
// DateTimeField
// DateField

// TimeField

// ChoiceField
// ClassificationField

// AddressField

// RecordLinkField
describe("converters.TextField", () => {
  test("formats a given value to a string", () => {
    const textField: Function = converters.TextField

    expect(textField("Hello, World")).toEqual("Hello, World")
    expect(textField(234)).toEqual("234")
  })

  test("returns null if value is undefined or null", () => {
    const textField: Function = converters.TextField

    expect(textField()).toBeNull()
    expect(textField(null)).toBeNull()
  })
})

describe("converters.CalculatedField", () => {
  test("calls converters.TextField to format value to string", () => {
    const mockedCall: Function = converters.TextField = jest.fn()
    converters.CalculatedField(2345)
    expect(mockedCall).toHaveBeenCalled()
  })
})

describe("converters.HyperlinkField", () => {
  test("calls converters.TextField to format value to string", () => {
    const mockedCall: Function = converters.TextField = jest.fn()
    converters.HyperlinkField("https://developer.fulcrumapp.com/")
    expect(mockedCall).toHaveBeenCalled()
  })
})

describe("converters.YesNoField", () => {
  test("calls converters.TextField to format value to string", () => {
    const mockedCall: Function = converters.TextField = jest.fn()
    converters.YesNoField("oui")
    expect(mockedCall).toHaveBeenCalled()
  })
})

describe("converters.BarcodeField", () => {
  test("calls converters.TextField to format value to string", () => {
    const mockedCall: Function = converters.TextField = jest.fn()
    converters.BarcodeField("0012345678905")
    expect(mockedCall).toHaveBeenCalled()
  })
})

describe("converters.DateTimeField", () => {
  test("formats a given date string or Date object to a string", () => {
    const dateTimeField = converters.DateTimeField
    // JS is difficult and counts months 0 - 11, 3 below indicates April
    const date: Date = new Date(2018, 3, 15)

    expect(dateTimeField("2018-04-15")).toEqual("2018-04-15")
    expect(dateTimeField(date)).toEqual("2018-04-15")
  })

  test("returns null if a null or undefined value is passed in", () => {
    const dateTimeField = converters.DateTimeField

    expect(dateTimeField()).toBeNull()
    expect(dateTimeField(null)).toBeNull()
  })

  test("returns null if an invalid, i.e. non-Date-convertable, value is passed in", () => {
    const dateTimeField = converters.DateTimeField

    expect(dateTimeField( ["2018-04-15"] )).toBeNull()
    expect(dateTimeField("Hello, World")).toBeNull()
    expect(dateTimeField(20180415)).toBeNull()
  })
})

describe("converters.DateField", () => {
  test("calls converters.DateTimeField to format value to date string", () => {
    const mockedCall: Function = converters.DateTimeField = jest.fn()
    converters.DateField(new Date())
    expect(mockedCall).toHaveBeenCalled()
  })
})

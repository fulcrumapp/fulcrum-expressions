import { AddressFieldValue } from "../../types/values"
import { converters, RecordLinkIds } from "../converters"

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

describe("converters.TimeField", () => {
  test("formats a value to time string", () => {
    const timeField: Function = converters.TimeField

    expect(timeField("10:30")).toEqual("10:30")
    expect(timeField("20:45")).toEqual("20:45")

  })

  test("returns null if value does not represent a valid time", () => {
    const timeField: Function = converters.TimeField

    expect(timeField("25:30")).toBeNull()
    expect(timeField("13:61")).toBeNull()
    expect(timeField("1361")).toBeNull()
    expect(timeField("13:300")).toBeNull()
    expect(timeField(1316)).toBeNull()
    expect(timeField([ "13:61" ])).toBeNull()
  })
})

describe("converters.ChoiceField", () => {
  test("formats params to a ChoiceFieldValue", () => {
    const candyChoices: string[] = ["Mars Bar", "Snickers", "KitKat"]
    const numberChoices: number[] = [1, 2, 3]
    const convertedNumbers: string[] = ["1", "2", "3"]
    const candyObj: {} = { choice_values: candyChoices }
    const choiceField: Function = converters.ChoiceField

    expect(choiceField(candyChoices)).toEqual({ choice_values: candyChoices, other_values: [] })
    expect(choiceField(numberChoices)).toEqual({ choice_values: convertedNumbers, other_values: [] })
    expect(choiceField("Howdy")).toEqual({ choice_values: [ "Howdy" ], other_values: [] })
    expect(choiceField(34)).toEqual({ choice_values: [ "34" ], other_values: [] })
    expect(choiceField(candyObj)).toEqual({ choice_values: candyChoices, other_values: [] })
  })

  test("returns null for invalid input", () => {
    const choiceField: Function = converters.ChoiceField

    expect(choiceField()).toBeNull()
    expect(choiceField("")).toBeNull()
    expect(choiceField(null)).toBeNull()
    expect(choiceField({ not_choice_values: ["nope", "nah"] })).toBeNull()
    expect(choiceField({ choice_values: "wrong format; should be array" })).toBeNull()
  })
})

describe("converters.ClassificationField", () => {
  test("calls converters.ChoiceField to format value to ChoiceFieldValue", () => {
    const mockedCall: Function = converters.ChoiceField = jest.fn()
    converters.ClassificationField(["Golden Retriever", "Jack Russel Terrir", "Poodle"])
    expect(mockedCall).toHaveBeenCalled()
  })
})

describe("converters.AddressField", () => {
  test("formats an AddressFieldValue properly", () => {
    const addressWithoutAdmins: AddressFieldValue = {
      sub_thoroughfare: "360",
      thoroughfare: "Central Ave",
      // tslint:disable-next-line:object-literal-sort-keys
      suite: "200",
      locality: "St. Petersburg",
      postal_code: "33701",
      country: "US",
    }

    const expectNullAdmins: AddressFieldValue = {
      sub_thoroughfare: "360",
      thoroughfare: "Central Ave",
      // tslint:disable-next-line:object-literal-sort-keys
      suite: "200",
      locality: "St. Petersburg",
      sub_admin_area: null,
      admin_area: null,
      postal_code: "33701",
      country: "US",
    }

    expect(converters.AddressField(addressWithoutAdmins)).toEqual(expectNullAdmins)

    const addressWithFewAttrs: AddressFieldValue = {
      sub_thoroughfare: "360",
      thoroughfare: "Central Ave",
      // tslint:disable-next-line:object-literal-sort-keys
      locality: "St. Petersburg",
    }

    const expectManyNulls: AddressFieldValue = {
      sub_thoroughfare: "360",
      thoroughfare: "Central Ave",
      // tslint:disable-next-line:object-literal-sort-keys
      suite: null,
      locality: "St. Petersburg",
      sub_admin_area: null,
      admin_area: null,
      postal_code: null,
      country: null,
    }

    expect(converters.AddressField(addressWithFewAttrs)).toEqual(expectManyNulls)

    const flashCards: {} = {
      bye: "再见",
      hello: "你好",
      thankYou: "谢谢",
    }

    const allNull: AddressFieldValue = {
      sub_thoroughfare: null,
      thoroughfare: null,
      // tslint:disable-next-line:object-literal-sort-keys
      suite: null,
      locality: null,
      sub_admin_area: null,
      admin_area: null,
      postal_code: null,
      country: null,
    }

    expect(converters.AddressField(flashCards)).toEqual(allNull)
  })

  test("returns null if not passed an object", () => {
    const addressField: Function = converters.AddressField
    expect(addressField("Fail")).toBeNull()
    expect(addressField(8972)).toBeNull()
    expect(addressField()).toBeNull()
    expect(addressField(null)).toBeNull()
  })
})
// these are all failing because the UUID regex is not recognizing my ids
describe("converters.RecordLinkField", () => {
  test("formats an array of ids to an array of RecordLinkIds", () => {
    const recordLinkField: Function = converters.RecordLinkField
    const stringIds: string[] = [
      "2bf87213-4523-4742-9518-a29055f5422a",
      "dec90e06-3167-427a-ba2b-4a9f3baaddcc",
    ]
    const expectedStringIds: RecordLinkIds[] = [
      { record_id: "2bf87213-4523-4742-9518-a29055f5422a" },
      { record_id: "dec90e06-3167-427a-ba2b-4a9f3baaddcc" },
    ]

    expect(recordLinkField(stringIds)).toEqual(expectedStringIds)
  })

  test("only returns ids that follow UUID format", () => {
    const recordLinkField: Function = converters.RecordLinkField

    const ids: string[] = [
      "jsl93u42",
      "2bf87213-4523-4742-9518-a29055f5422a",
      "kdhas8f98",
      "dec90e06-3167-427a-ba2b-4a9f3baaddcc",
    ]
    const expectedIds: RecordLinkIds[] = [
      { record_id: "2bf87213-4523-4742-9518-a29055f5422a" },
      { record_id: "dec90e06-3167-427a-ba2b-4a9f3baaddcc" },
    ]

    expect(recordLinkField(ids)).toEqual(expectedIds)
  })

  test("returns null if not passed an array", () => {
    const recordLinkField: Function = converters.RecordLinkField

    expect(recordLinkField("2bf87213-4523-4742-9518-a29055f5422a")).toBeNull()
    expect(recordLinkField({ record_id: "2bf87213-4523-4742-9518-a29055f5422a" })).toBeNull()
    expect(recordLinkField(24587213452347429518029055654229)).toBeNull()
    expect(recordLinkField(null)).toBeNull()
    expect(recordLinkField()).toBeNull()
    expect(recordLinkField(true)).toBeNull()
  })
})

import STRING from "../STRING"

test("returns a string of values extracted from parameters", () => {
  expect(STRING(1, 4, "test", null, "56")).toEqual("1, 4, test, 56")
  expect(STRING([1, 4], "test", null, "56")).toEqual("1, 4, test, 56")
  expect(STRING([1, 4, ["test", null]], "56")).toEqual("1, 4, test, 56")
  expect(STRING(null, null, undefined)).toEqual("")
  expect(STRING()).toEqual("")
  const date = new Date()
  // @ts-ignore Symbol constructor
  const sym = Symbol("test")
  expect(STRING(date)).toEqual(date.toLocaleString())
  expect(STRING(sym)).toEqual("Symbol(test)")
  expect(STRING({ choice_values: ["yes", "no"], other_values: ["maybe"] })).toEqual("yes, no, maybe")
  expect(STRING({ photo_id: "123"} , { video_id: "987" }, { audio_id: "564"})).toEqual("123, 987, 564")
  expect(STRING({ photo_id: "123"} , { video_id: "987" }, { audio_id: "564"})).toEqual("123, 987, 564")
  expect(STRING({ signature_id: "123"} , { record_id: "987" }, { id: "564"})).toEqual("123, 987, 564")
  expect(STRING((a: number, b: number) => a+b, "test", NaN)).toEqual("test")  
})
import CHOICEVALUE from "../CHOICEVALUE"

test("it returns a single choice value if passed a choice field value", () => {
  expect(CHOICEVALUE({choice_values: ["a"], other_values: []})).toEqual("a")
  expect(CHOICEVALUE({choice_values: ["a"], other_values: ["b"]})).toEqual("a")
  expect(CHOICEVALUE({choice_values: ["a", "b"], other_values: ["c"]})).toEqual("a")
  expect(CHOICEVALUE({choice_values: [], other_values: ["b"]})).toEqual("b")
  expect(CHOICEVALUE({choice_values: null, other_values: ["b"]})).toEqual("b")
})

test("it returns undefined if an empty choice field value is passed", () => {
  expect((CHOICEVALUE({choice_values: null}))).toBeUndefined()
  expect((CHOICEVALUE({choice_values: []}))).toBeUndefined()
  expect((CHOICEVALUE({choice_values: [], other_values: []}))).toBeUndefined()
  expect((CHOICEVALUE({choice_values: [], other_values: null}))).toBeUndefined()
  expect((CHOICEVALUE({choice_values: null, other_values: null}))).toBeUndefined()
  expect((CHOICEVALUE({choice_values: null, other_values: []}))).toBeUndefined()
  expect((CHOICEVALUE({other_values: null}))).toBeUndefined()
})

test("it returns undefined if passed a non-choice field value", () => {
  expect((CHOICEVALUE(""))).toBeUndefined()
  expect((CHOICEVALUE(null))).toBeUndefined()
  expect((CHOICEVALUE(undefined))).toBeUndefined()
  expect((CHOICEVALUE(NaN))).toBeUndefined()
  expect((CHOICEVALUE([]))).toBeUndefined()
  expect((CHOICEVALUE({}))).toBeUndefined()
  expect((CHOICEVALUE({ test: 1 }))).toBeUndefined()
  expect((CHOICEVALUE(7))).toBeUndefined()
  expect((CHOICEVALUE(true))).toBeUndefined()
  expect((CHOICEVALUE("test"))).toBeUndefined()
  expect((CHOICEVALUE(new Date()))).toBeUndefined()
})

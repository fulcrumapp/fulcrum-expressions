import OFF from "../OFF"
import Runtime from "../../runtime/index"

test("it removes an event handler", () => {
  const runtime = new Runtime()
  const callback = () => { return true }
  runtime.events = {
    change: {
      __no_param: [ callback ],
      my_field: [ callback ]
    },
    blur: {
      my_other_field: [ callback ]
    }
  }

  OFF("change", "my_field", callback)
  // @ts-ignore 'change' is not a FormFieldEvent, but works for this simple test
  OFF("change", callback)
  expect(runtime.events.change).toEqual({ __no_param: [], my_field: [] })
})

test("throws an error if the first or second parameter are not strings", () => {
  const runtime = new Runtime()
  const callback = () => { return true }
  runtime.events = {
    change: {
      __no_param: [ callback ],
      my_field: [ callback ]
    },
    blur: {
      my_other_field: [ callback ]
    }
  }

  const badName = () => {
  // @ts-ignore need to throw error
    OFF(null, "my_field", callback)
  }

  const badParam = () => {
  // @ts-ignore 'change' is not a FormFieldEvent, but works for this simple test
    OFF("change", true, callback)
  }

  expect(badName).toThrowError("name must be a string")
  expect(badParam).toThrowError("param must be a string")
})

test("throws an error if the third argument is not a function", () => {
  const runtime = new Runtime()
  const callback = () => { return true }
  runtime.events = {
    change: {
      __no_param: [ callback ],
      my_field: [ callback ]
    },
    blur: {
      my_other_field: [ callback ]
    }
  }

  const badCallback = () => {
    //@ts-ignore 'change' is not a FormFieldEvent, but works for this simple test
    OFF("change", "my_field", "not a callback")
  }

  expect(badCallback).toThrow("callback must be a function")
})
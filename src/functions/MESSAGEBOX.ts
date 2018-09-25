import { isArray, isFunction } from "lodash"
import { MaybeString } from "../primitives"
import COMPACT from "./COMPACT"
import ERROR from "./ERROR"
import ISBLANK from "./ISBLANK"

interface MessageBoxPayload {
  title?: MaybeString
  message?: MaybeString
  buttons?: any[]|null|undefined
  validate?: Function|undefined|null
  input?: boolean|undefined|null
  placeholder?: MaybeString
  default?: any[]|null
}

export default function MESSAGEBOX(options: MessageBoxPayload, callback: Function): MessageBoxPayload | Function {
  if (ISBLANK(options)) { ERROR("options must be provided") }
  if (!ISBLANK(options.buttons) && !isArray(options.buttons)) { ERROR("options.buttons must be an array") }
  if (!ISBLANK(options.validate) && !isFunction(options.validate)) { ERROR("options.validate must be a function") }
  if (!ISBLANK(callback) && !isFunction(callback)) { ERROR("callback must be a function") }

  if (!ISBLANK(options.buttons)) {
    options.buttons = COMPACT(options.buttons).map((item: any) => item.toString())
  } else {
    options.buttons = ["Okay"]
  }
  if (!ISBLANK(options.input)) {
    options.input = !!options.input
  }
  if (!ISBLANK(callback)) {
    return callback
  } else {
    return {
      buttons: !ISBLANK(options.buttons) ? options.buttons : null,
      default: !ISBLANK(options.default) ? options.default : null,
      input: !ISBLANK(options.input) ? options.input : null,
      message: !ISBLANK(options.message) ? options.message.toString() : null,
      placeholder: !ISBLANK(options.placeholder) ? options.placeholder.toString() : null,
      title: !ISBLANK(options.title) ? options.title.toString() : null,
    }
  }
}
//   return callback ? = () - >

//   payload                                =
//   title: if options.title ? then                                options.title.toString() else null
//   message: if options.message ? then                                 options.message.toString() else null
//   buttons: if options.buttons ? then                                 options.buttons else null
//   input: if options.input ? then                                 options.input else null
//   placeholder: if options.placeholder ? then                                 options.placeholder.toString() else null
//   default: if options.default ? then                                  options.default.toString() else null
// }

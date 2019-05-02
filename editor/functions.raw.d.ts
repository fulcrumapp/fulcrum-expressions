declare module 'src/functions/NUM' {
	/**
	 * Parses the passed in value as a numeric value
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/num/
	 * @param value (Number|String, required): value to be coerced to a numeric value
	 * @returns a numeric value
	 * @example
	 * NUM('1') // returns 1
	 */
	export default function NUM(value: any): number;

}
declare module 'src/functions/ABS' {
	/**
	 * Returns the absolute value of a number.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/abs/
	 * @param value (Number, required): number to be evaluated
	 * @returns the absolute value of the `value` parameter
	 * @example
	 * ABS(-1) // returns 1
	 */
	export default function ABS(value: number): number;
	export default function ABS(value: string): number;

}
declare module 'src/functions/ACOS' {
	/**
	 * Returns the inverse cosine of a value, in radians.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/acos/
	 * @param value (Number, required): number to calculate the inverse cosine. Must be between -1 and 1, inclusive.
	 * @returns inverse cosine of `value` parameter
	 * @example
	 * ACOS(0.8) // returns 0.6435011087932843
	 */
	export default function ACOS(value: number): number;
	export default function ACOS(value: string): number;

}
declare module 'src/functions/ACOSH' {
	/**
	 * Returns the inverse hyperbolic cosine of a number.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/acosh/
	 * @param value (Number, required): value to calculate the inverse hyperbolic cosine. Must be greater than or equal to 1.
	 * @example
	 * ACOSH(7) // returns 2.6339157938496336
	 */
	export default function ACOSH(value: number): number;
	export default function ACOSH(value: string): number;

}
declare module 'src/functions/ALERT' {
	interface ToStringable {
	    toString(): string;
	}
	/**
	 * Display a message as an alert. You can provide both the title and message of the alert box.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/alert/
	 * @param title (String, required): short title for alert
	 * @param message (String, required): message to display
	 */
	export default function ALERT(message: ToStringable): void;
	export default function ALERT(title: ToStringable, message: ToStringable): void;
	export {};

}
declare module 'src/functions/CONFIG' {
	export interface Config {
	    /** Optional: Set to record's altitude */
	    recordAltitude?: any;
	    /** Optional: Set to name of application on which Fulcrum is running */
	    application?: string;
	    /** Optional: Set to name of application engine on which Fulcrum is running */
	    applicationBuild?: string;
	    /** Optional: Includes name, version, and engine of application on which Fulcrum is running */
	    applicationInfo?: string;
	    /** Optional: Set to version of application on which Fulcrum is running */
	    applicationVersion?: string;
	    /** Required: sets program locale - defaults to 'en_US' */
	    locale: string;
	    /** Required: sets locale-specific language - defaults to 'en-US' */
	    language: string;
	    /** Required: sets locale-specific country - defaults to 'US' */
	    country: string;
	    /** Required: sets locale-specific currency code - defaults to 'USD' */
	    currencyCode: string;
	    /** Required: sets locale-specific currency Symbol - defaults to '$' */
	    currencySymbol: string;
	    /** Required: sets locale-specific timezone - defaults to 'UTC' */
	    timeZone: string;
	    /** Required: sets locale-specific symbol to delineate fractions - defaults to '.' */
	    decimalSeparator: string;
	    /** Required: sets locale-specific symbol to group large numbers - defaults to ',' */
	    groupingSeparator: string;
	    /** Required: sets locale-specific increment with which to group large numbers - defaults to 3 (thousands) */
	    groupingSize: number;
	    /** Optional:  Set to the current device model or "" */
	    deviceModel?: string;
	    /** Optional: Set to current device manufacter or "" */
	    deviceManufacturer?: string;
	    /** Optional: Set to current user's email */
	    userEmail?: string;
	    /** Optional: Set to current user's role */
	    userRoleName?: string;
	    /** Optional: Indicates where the current feature is new */
	    featureIsNew?: boolean;
	    /** Optional: Object containing feature geometry */
	    featureGeometry?: FeatureGeometry;
	    /** Optional: current platform name */
	    platform?: string;
	    /** Optional: Current platform version */
	    platformVersion?: string;
	    /** Optional: Current project id */
	    recordProject?: string;
	    /** Optional: Current record status */
	    recordStatus?: string;
	    /** Optional: Current project name */
	    recordProjectName?: string;
	    /** Optional: Current record's id */
	    recordID?: string;
	    /** Optional: Current repeatables's id */
	    featureID?: string;
	    /** Optional: Current repeatable field's index */
	    featureIndex?: number;
	    /** Optional: Current user's full name */
	    userFullName?: string;
	}
	export interface FeatureGeometry {
	    coordinates: string[];
	}
	export const DEFAULTS: {
	    country: string;
	    currencyCode: string;
	    currencySymbol: string;
	    decimalSeparator: string;
	    groupingSeparator: string;
	    groupingSize: number;
	    language: string;
	    locale: string;
	    timeZone: string;
	};
	/**
	 * The current configuration of the Form.
	 */
	export const CONFIG: () => Config;
	/**
	 * Resets the config to the application defaults.
	 */
	export const RESETCONFIG: () => void;
	/**
	 * Overwrites the current configuration of the Form to be the object passed in.
	 * This method is destructive and should be private; use CONFIGURE to update configuration.
	 * @param config object to replace configuration of Form
	 */
	export const OVERWRITECONFIG: (config: any) => any;

}
declare module 'src/functions/ALTITUDE' {
	/**
	 * Returns the altitude from the records geometry.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/altitude/
	 */
	export default function ALTITUDE(): number;

}
declare module 'src/functions/AND' {
	/**
	 * Accepts an array of expressions and returns true if both are true, and false if both or one is false
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/and/
	 * @param args (Any|Array required): array/list of items of any type
	 * @returns boolean value
	 * @example
	 * AND('this' === 'that', 4 > 2) // returns false
	 */
	export default function AND(...args: any[]): boolean | null;

}
declare module 'src/functions/APPLICATION' {
	/**
	 * Returns the name of the application Fulcrum is running on.
	 * @returns name of application
	 * @example
	 * // running Fulcrum Desktop on Chrome Browser
	 * APPLICATION() // returns 'Chrome'
	 */
	export default function APPLICATION(): string;

}
declare module 'src/functions/APPLICATIONBUILD' {
	/**
	 * Returns the name of the application engine Fulcrum is running on.
	 * @returns name of application engine
	 * @example
	 * // running Fulcrum Desktop on Chrome Browser
	 * APPLICATIONBUILD() // returns 'WebKit'
	 */
	export default function APPLICATIONBUILD(): string;

}
declare module 'src/functions/APPLICATIONVERSION' {
	/**
	 * Returns application version
	 * @returns application version
	 * @example
	 * APPLICATIONVERSION() // returns 66.0
	 */
	export default function APPLICATIONVERSION(): string;

}
declare module 'src/functions/APPLICATIONINFO' {
	/**
	 * Returns the name of the application engine, application platform, and application version
	 * on which Fulcrum is running
	 * @param separator optional; character string to separate application information, defaults to ", "
	 * @returns name of application engine, application platform, and application version.
	 * @example
	 * // running Fulcrum Desktop on Chrome Browser
	 * APPLICATIONINFO() // returns 'Chrome, 68.43.9.0.1, WebKit'
	 */
	export default function APPLICATIONINFO(separator?: string): string;

}
declare module 'src/functions/FLATTEN' {
	export interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {
	}
	/**
	 * Accepts a nested array and returns an array flattened to one level deep
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/flatten/
	 * @param value (Array, required): nested array to be flattened
	 * @returns a flattened array
	 * @example
	 * FLATTEN([1, [2, [3]]]) // returns [1, 2, 3]
	 */
	export default function FLATTEN(value: RecursiveArray<any>): any[];

}
declare module 'src/functions/ARRAY' {
	/**
	 * Accepts any number of arguments and returns them as an array
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/array/
	 * @param args (Any|Array, required): list of items of any type
	 * @returns an array flattened to on level deep
	 * @example
	 * ARRAY([1, 2], '3', [4, 5]) // returns [1, 2, '3', 4, 5]
	 */
	export default function ARRAY(...args: any[]): any[];

}
declare module 'src/functions/AVERAGE' {
	import { RecursiveArray } from 'src/functions/FLATTEN'; type AverageValues = Array<number | RecursiveArray<number>>;
	/**
	 * Accepts a list of numbers and returns their average (mean)
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/average/
	 * @param values (Number|Array, required): integers or floats
	 * @returns integer or float
	 * @example
	 * AVERAGE(3, 5) // returns 4
	 */
	export default function AVERAGE(...values: AverageValues): number;
	export {};

}
declare module 'src/functions/ISNUMBER' {
	/**
	 * Returns a boolean value indicating if value passed in is a numeric value
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isnumber/
	 * @param value (Any, required): value to be checked
	 * @returns boolean
	 * @example
	 * ISNUMBER(8) // returns true
	 */
	export default function ISNUMBER(value: any): boolean;

}
declare module 'src/functions/ISNAN' {
	/**
	 * Returns a boolean value indicating if the passed in value is not a number
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isnan/
	 * @param value (Any, required): value to be checked
	 * @returns boolean value
	 * @example
	 * ISNAN("a7") // returns true
	 */
	export default function ISNAN(value: any): boolean;

}
declare module 'src/functions/PRECISION' {
	/**
	 * Returns the number of digits to the right of the decimal point
	 * @param value a numeric type
	 * @returns numberic value
	 * @example
	 * PRECISION(9.034) // returns 3
	 * PRECISION(9) // returns 0
	 */
	export default function PRECISION(value: number): number;
	export default function PRECISION(value: string): number;

}
declare module 'src/functions/ROUND' {
	/**
	 * Rounds a number to given scale
	 * @param number numeric value to be rounded
	 * @param scale optional, number of digits required after the decimal point
	 * @returns rounded number
	 * @example
	 * ROUND(5.6) // returns 6
	 * ROUND(-2.3333333, 4) // return -2.3333;
	 */
	export default function ROUND(value: number): number;
	export default function ROUND(value: number, scale: number): number;
	export default function ROUND(value: string): number;
	export default function ROUND(value: string, scale: number): number;

}
declare module 'src/functions/CEILING' {
	/**
	 * Returns number rounded up, away from zero, to the nearest multiple
	 * If a multiple is not specified, number will be rounded to next highest integer (multiple of 1)
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/ceiling/
	 * @param value (Number, required): value to be rounded
	 * @param multiple (Number, optional): multiple to which `value` will be rounded
	 * @returns number rounded to nearest multiple
	 * @example
	 * CEILING(3.45) // returns 4
	 * CEILING(2.3333333, 4) // returns 4
	 */
	export default function CEILING(value: number): number;
	export default function CEILING(value: number, multiple: number): number;
	export default function CEILING(value: string): number;
	export default function CEILING(value: string, multiple: number): number;
	export default function CEILING(): number;

}
declare module 'src/functions/CHAR' {
	/**
	 * Returns the character of a given char code
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/char/
	 * @param value (Number, required): integer (character code)
	 * @returns a character as a string
	 * @example
	 * CHAR(65) // returns 'A'
	 */
	export default function CHAR(value: number): string;
	export default function CHAR(value: string): string;

}
declare module 'src/types/primitives' {
	type GUID = string
	export type MaybeString = string | null | undefined
	export type MaybeError = Error | null
	export type GenericObject = { [k: string]: any }
}
declare module 'src/types/values' {
	export type FormFieldValues =
	  ChoiceFieldValue
	  | AddressFieldValue

	export type TextFieldValue = string | null | undefined

	export type YesNoFieldValue = string | null | undefined

	export type NumericFieldValue = number | null | undefined

	export interface AddressFieldValue {
	  sub_thoroughfare?: string|null,
	  thoroughfare?: string|null,
	  suite?: string|null,
	  locality?: string|null,
	  sub_admin_area?: string|null,
	  admin_area?: string|null,
	  postal_code?: string|null,
	  country?: string|null
	}

	export interface ChoiceFieldValue {
	  choice_values?: string[] | null,
	  other_values?: string[] | null
	}

	export interface ClassificationFieldValue extends ChoiceFieldValue {}

	export interface PhotoFieldItem {
	  photo_id: string,
	  caption: string
	}

	export type PhotoFieldValue = Array<PhotoFieldItem> | null | undefined

	export interface VideoFieldItem {
	  video_id: string,
	  caption: string
	}

	export type VideoFieldValue = Array<VideoFieldItem> | null | undefined

	export interface AudioFieldItem {
	  audio_id: string,
	  caption: string
	}

	export type AudioFieldValue = Array<AudioFieldItem> | null | undefined

	export interface SignatureFieldValue {
	  signature_id: string,
	  timestamp: string
	}

	export interface RecordLinkItem {
	  record_id: string
	}

	export type RecordLinkFieldValue = Array<RecordLinkItem> | null | undefined

	export interface RepeatableItem {
	  id: string,
	  form_values: object
	}

	export type RepeatableFieldValue = Array<RepeatableItem> | null | undefined

	export interface CurrentLocation {
	  latitude: number,
	  longitude: number,
	  altitude: number | null,
	  accuracy: number,
	  course: number | null,
	  speed: number | null,
	  timestamp: number
	}
}
declare module 'src/functions/ISBLANK' {
	import { ChoiceFieldValue } from 'src/types/values';
	/**
	 * Returns a boolean value indiciating whether the object is blank/empty.
	 * Values of null, undefined, and NaN are considered blank and the function will return true.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isblank/
	 * @param value (ChoiceFieldValue|Any, required) item to be checked for blankness or emptiness;
	 * @returns boolean value
	 * @example
	 * ISBLANK('') // returns true
	 */
	export default function ISBLANK(value: ChoiceFieldValue): boolean;
	export default function ISBLANK(value: any): boolean;
	export default function ISBLANK(): boolean;

}
declare module 'src/functions/CHOICEVALUES' {
	import { FormFieldValues as ChoiceFieldValue } from 'src/types/values';
	/**
	 * Converts a choicefield object to an array with null values and blank strings removed
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/choicevalues/
	 * @param field (ChoiceFieldValue, required)
	 * @returns array of choice values
	 * @example
	 * CHOICEVALUES($choice_field) // returns [ 'a', 'b', 'c', 'd' ]
	 */
	export default function CHOICEVALUES(field: ChoiceFieldValue): string[];
	export default function CHOICEVALUES(field: any): any[];
	export default function CHOICEVALUES(): undefined;

}
declare module 'src/functions/CHOICEVALUE' {
	import { MaybeString } from 'src/types/primitives';
	import { ChoiceFieldValue } from 'src/types/values';
	/**
	 * Returns the first choice value in the choice field value passed to the function
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/choicevalue/
	 * @param field (ChoiceField value, required): `{choice_values: ['a', 'b'], other_values" ['c', 'd']}`
	 * @returns string, first choice in a list of choice field values
	 * @example
	 * CHOICEVALUE($choice_field) // returns "Red"
	 */
	export default function CHOICEVALUE(field: ChoiceFieldValue): MaybeString;
	export default function CHOICEVALUE(field: any): MaybeString;

}
declare module 'src/functions/CLEAN' {
	/**
	 * Removes non-printable characters from a string
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/clean/
	 * @param text (String, required): text to be cleaned
	 * @returns cleaned string
	 * @example
	 * CLEAN('test\x00\x1D\x1Etest') // returns 'testtest'
	 */
	export default function CLEAN(text: string): string;

}
declare module 'src/functions/CLEARINTERVAL' {
	/**
	 * Clears an interval that was previously started with `SETINTERVAL`.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/clearinterval/
	 * @param id (Number, required): interval ID to clear
	 */
	export default function CLEARINTERVAL(id: number): void;

}
declare module 'src/functions/CLEARTIMEOUT' {
	/**
	 * Clears a timeout that was previously started with `SETTIMEOUT`.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/cleartimeout/
	 * @param id (Number, required): id of timeout to clear
	 */
	export default function CLEARTIMEOUT(id: number): void;

}
declare module 'src/functions/COALESCE' {
	/**
	 * Returns first value passed in to function that exists
	 * NaN, undefined, null, and empty strings, objects, and arrays are not recognized
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/coalesce/
	 * @param args (Any|Array, required): array of values
	 * @returns first value passed into function
	 * @example
	 * COALESCE([], null, [3, 6, [5]]) // returns 3
	 */
	export default function COALESCE(...args: any[]): string | number | undefined;
	export default function COALESCE(): undefined;

}
declare module 'src/functions/CODE' {
	import { MaybeString } from 'src/types/primitives';
	/**
	 * Returns numeric code for first character in passed in string
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/code/
	 * @param str (String, required): character to be evaluated
	 * @returns numeric code
	 * @example
	 * CODE("A") // returns 65
	 */
	export default function CODE(str: MaybeString): number;
	export default function CODE(str: number): number;
	export default function CODE(str: Object): number;
	export default function CODE(str: any[]): number;
	export default function CODE(): number;

}
declare module 'src/functions/COMPACT' {
	/**
	 * Returns a compacted array without null or undefined values.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/compact/
	 * @param value (Array, required): array to compact
	 * @returns a compacted array with null and undefined values removed
	 * @example
	 * COMPACT(['a', 'b', null, 'c']) // returns ['a', 'b', 'c']
	 */
	export default function COMPACT(value: any[]): any[] | undefined;
	export default function COMPACT(value: any): undefined;
	export default function COMPACT(): undefined;

}
declare module 'src/functions/CONCATENATE' {
	/**
	 * Returns a concatenated string
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/concatenate/
	 * @param strings (String|Array, required): strings to be concatenated
	 * @returns a single concatenated string
	 * @example
	 * CONCATENATE('hello', 'world') // returns 'helloworld'
	 */
	export default function CONCATENATE(...strings: any[]): string;
	export default function CONCATENATE(): string;

}
declare module 'src/functions/CONCAT' {
	import CONCATENATE from 'src/functions/CONCATENATE';
	export default CONCATENATE;

}
declare module 'src/functions/CONFIGURE' {
	import { Config } from 'src/functions/CONFIG';
	/**
	 * CONFIGURE allows the user to update the configuration of the Form.
	 * Calling CONFIGURE without arguments will return the current configuration of the Form.
	 * @param config object, will be merged with current configuration
	 * @returns a config object representing the current app configuration
	 * @example
	 * CONFIGURE({ recordAltitude: 87})
	 * // returns
	 * { recordAltitude: 87
	 * country: "US",
	 * currencyCode: "USD",
	 * currencySymbol: "$",
	 * decimalSeparator: ".",
	 * groupingSeparator: ",",
	 * groupingSize: 3,
	 * language: "en-US",
	 * locale: "en_US",
	 * timeZone: "UTC" }
	 */
	export default function CONFIGURE(config: Config | any): Config;
	export default function CONFIGURE(config: Config | any, merge: boolean): Config;
	export default function CONFIGURE(): Config;

}
declare module 'src/functions/ERROR' {
	/**
	 * Allows throwing of errors for validation, etc.
	 * @param message (String, required): error message to display
	 * @throws Error entered by the user
	 */
	export default function ERROR(message: string): void;

}
declare module 'src/functions/MESSAGEBOX' {
	import { MaybeString } from 'src/types/primitives';
	export interface MessageBoxPayload {
	    title?: MaybeString;
	    message?: MaybeString;
	    buttons?: any[] | null | undefined;
	    validate?: Function | undefined | null;
	    input?: boolean | undefined | null;
	    placeholder?: MaybeString;
	    default?: any[] | null;
	}
	/**
	 * MESSAGEBOX displays a message to the user. You can provide both the title and message of the alert box.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/messagebox/
	 * @param options (MessageBoxPayload, required): options for the message box
	 * @param callback (Function, required): invoked when message box is dismissed
	 * @returns invokes callback or returns an options Object
	 */
	export default function MESSAGEBOX(options: MessageBoxPayload, callback: Function): void;
	export default function MESSAGEBOX(options: MessageBoxPayload): void;
	export default function MESSAGEBOX(options: MessageBoxPayload, callback: Function): void;

}
declare module 'src/functions/CONFIRM' {
	/**
	 * CONFIRM displays a message to the user and allows a callback function
	 * that will be invoked to respond to the result of the question.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/confirm/
	 * @param title (String, required): short title for popup box
	 * @param message (String, required): message to display to the user
	 * @param callback (Function, required): to be invoked upon closing the popup box
	 */
	export default function CONFIRM(title: string, message: string, callback: Function): void;
	export default function CONFIRM(message: string, callback: Function): void;

}
declare module 'src/functions/CONTAINS' {
	import { MaybeString } from 'src/types/primitives';
	/**
	 * Checks that a value is present in a string or array
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/contains/
	 * @param haystack (String|Array, required): collectio to be iterated over
	 * @param needle (String|Number, required): value one is looking for
	 * @param fromIndex (Number, optional): numeric index from which to start looking
	 * @returns boolean, true if value is found, else false
	 * @example
	 * CONTAINS(["apple", "orange", "lemon"], "orange") // returns true
	 */
	export default function CONTAINS(haystack: string | any[], needle: MaybeString | number): boolean;
	export default function CONTAINS(haystack: string | any[], needle: MaybeString | number, fromIndex?: number): boolean;
	export default function CONTAINS(haystack: string | any[], needle: MaybeString | number, fromIndex?: any): boolean;
	export default function CONTAINS(haystack: any, needle: MaybeString | number): boolean;

}
declare module 'src/functions/COS' {
	/**
	 * Returns the cosine of the specified angle value, which must be specified in radians.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/cos/
	 * @param value (Number, required): value specifying radians
	 * @returns number, value between 1 and -1 indicating the angle's cosine
	 * @example
	 * COS(12) // returns 0.8438539587324921
	 */
	export default function COS(value: number): number;
	export default function COS(value: string): number;

}
declare module 'src/functions/COSH' {
	/**
	 * Returns function returns the hyperbolic cosine of a number
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/cosh/
	 * @param value (Number, required)
	 * @returns number, value between 1 and -1 indicating the angle's cosine
	 * @example
	 * COSH(12) // returns 0.8438539587324921
	 */
	export default function COSH(value: number): number;
	export default function COSH(value: string): number;

}
declare module 'src/functions/COUNT' {
	/**
	 * Returns the count of the numeric values in an array.
	 * Will coerce numeric strings (`"1"`) into a numeric value (`1`).
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/count/
	 * @param value (Number|String|Array, required): items to be counted
	 * @returns number
	 * @example
	 * COUNT([1, "2", null, 3, null]) // returns 3
	 */
	export default function COUNT(value: number[]): number;
	export default function COUNT(value: string[]): number;
	export default function COUNT(): undefined;
	export default function COUNT(value: any): number | undefined;

}
declare module 'src/functions/COUNTA' {
	/**
	 * Returns a count of the items in a list that are not null, undefined, or blank
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/counta/
	 * @param value (Any|Array, required): items to be counted
	 * @returns number
	 * @example
	 * COUNTA(["orange", "lemon", null, "grape"]) // returns 3
	 */
	export default function COUNTA(value: any[]): number;
	export default function COUNTA(value: any): number;
	export default function COUNTA(): number;

}
declare module 'src/functions/COUNTBLANK' {
	/**
	 * Returns a count of the number of blank items.
	 * Items considered blank include `null`, `undefined`, `[]`, `{}`, and `""`.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/countblank/
	 * @param args (Any|Array, required): items to be counted
	 * @returns number
	 * @example
	 * COUNTBLANK([1, 2, null, 3]) // returns 1
	 */
	export default function COUNTBLANK(...args: any[]): number;
	export default function COUNTBLANK(): number;

}
declare module 'src/functions/COUNTRY' {
	/**
	 * Returns the current country or, if it's not available, the default country
	 * from the form configuration object.
	 */
	export default function COUNTRY(): string;

}
declare module 'src/functions/CURRENCYCODE' {
	/**
	 * Returns the current currency code or, if it's not available, the default
	 * currency code from the form configuration object.
	 */
	export default function CURRENCYCODE(): string;

}
declare module 'src/functions/CURRENCYSYMBOL' {
	/**
	 * Returns the current currency symbol or, if it's not available, the default
	 * currency symbol from the form configuration object.
	 */
	export default function CURRENCYSYMBOL(): string;

}
declare module 'src/functions/CURRENTLOCATION' {
	import { CurrentLocation } from 'src/types/values';
	/**
	 *  Returns the current device location as an object. This can be used for Q/A purposes or
	 *  other custom processing logic. This is not always the same as the record location.
	 *  For example, if editing an imported record or previously created record, the current
	 *  location will be different.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/currentlocation/
	 */
	export default function CURRENTLOCATION(): CurrentLocation | null;

}
declare module 'src/types/fields' {
	import { GUID } from 'src/types/primitives'

	export type FieldName = string /* noexport */
	export type NumericFieldName = string /* noexport */
	export type TextFieldName = string /* noexport */
	export type YesNoFieldName = string /* noexport */
	export type ChoiceFieldName = string /* noexport */
	export type ClassificationFieldName = string /* noexport */
	export type RepeatableFieldName = string /* noexport */
	export type ContainerFieldName = string /* noexport */
	export type PhotoFieldName = string /* noexport */
	export type AudioFieldName = string /* noexport */
	export type VideoFieldName = string /* noexport */
	export type SignatureFieldName = string /* noexport */
	export type RecordLinkFieldName = string /* noexport */
	export type AddressFieldName = string /* noexport */

	export type FormFieldTypes =
	  "TextField"
	  | "YesNoField"
	  | "Label"
	  | "Section"
	  | "ChoiceField"
	  | "ClassificationField"
	  | "PhotoField"
	  | "VideoField"
	  | "AudioField"
	  | "BarcodeField"
	  | "DateTimeField"
	  | "TimeField"
	  | "Repeatable"
	  | "AddressField"
	  | "SignatureField"
	  | "HyperlinkField"
	  | "CalculatedField"
	  | "RecordLinkField"

	export type FormFields =
	  FormTextField
	  | DateTimeField
	  | DateTimeField
	  | TimeField
	  | YesNoField
	  | ChoiceField
	  | ClassificationField
	  | PhotoField
	  | VideoField
	  | AudioField
	  | Section
	  | AddressField
	  | SignatureField
	  | HyperlinkField
	  | CalculatedField
	  | RecordLinkField
	  | RepeatableField

	export interface FormField {
	  type: FormFieldTypes
	  /** The id for the field. Must be unique to the form and lowercase. The Fulcrum app builder uses
	   * system generated 4 character codes. */
	  key: string
	  /** The field label, visible to mobile and web users. */
	  label: string
	  /** Can be set manually or auto generated using the label of the element. This field will be
	   * the column name on all exported files. It is recommended to use something that works easily
	   * with Esri Shapefiles that have a 10 character maximum column heading limitation. */
	  data_name: string
	  /** Is this field required? */
	  required: boolean
	  /** Is this field read only? */
	  disabled: boolean
	  /** Is this field visible on mobile? */
	  hidden: boolean
	  /** The attribute to use as default value. */
	  default_value?: string
	  /** Helper text for the user. */
	  description?: string
	  /** Match all or any of the conditions to display this field. */
	  visible_conditions_type?: FormFieldConditions
	  /** Array of objects containing visibility conditions */
	  visible_conditions?: FormFieldCondition[]
	  /**	Match all or any of the conditions to make this field required */
	  required_conditions_type?: FormFieldConditions
	  /** Array of objects containing requirement conditions */
	  required_conditions?: FormFieldCondition[]
	  /** Parent element of this field if it is in a section or repeatable */
	  parent?: FormFields,
	}

	interface FormFieldDefaultPreviousValue {
	  /** Whether to automaticyepally set the previously used value. */
	  default_previous_value?: boolean
	}

	interface StatusField {
	  type: "StatusField"
	  /** The id for the field. Must be unique to the form and lowercase. The Fulcrum app builder uses
	   * system generated 4 character codes. */
	  key: string
	  /** The field label, visible to mobile and web users. */
	  label: string
	  /** Can be set manually or auto generated using the label of the element. The status field will be
	   * the column name on all exported files. It is recommended to use something that works easily
	   * with Esri Shapefiles that have a 10 character maximum column heading limitation. */
	  data_name: string
	  /** Is the status field required? */
	  required: boolean
	  /** Is the status field read only? */
	  enabled: boolean
	  /** Is the status field visible on mobile? */
	  hidden: boolean
	  /** The attribute to use as default value. */
	  default_value: string
	  /** Whether the status can be modified by the user */
	  read_only: boolean
	  /** Helper text for the user. */
	  description?: string
	  /** List of choices for the status field */
	  choices: StatusChoiceOption[]
	  /** Whether to automatically set the previously used value. */
	  default_previous_value?: boolean
	}

	interface StatusChoiceOption {
	  /** What’s shown to the user in the web and mobile apps when they select a status for records in this app. */
	  label: string
	  /** What’s stored in the record. */
	  value: string
	  /** The hexadecimal value for the color used for the status and the marker color on the map. */
	  color: string
	}

	type FormFieldConditions = "all" | "any"

	interface FormFieldCondition {
	  /** The key of the record link field to match */
	  field_key: string
	  /** Condition operator */
	  operator: ConditionOperator,
	  /** The value to match against key field. (empty string for `is_empty` and `is_not_empty`) */
	  value: string
	}


	interface FormTextField extends FormField, FormFieldDefaultPreviousValue {
	  type: "TextField",
	  /** Is it a numeric field? */
	  numeric?: boolean
	  /** If it a numeric field, what is the format? */
	  format?: "decimal" | "integer"
	  /** Custom validation pattern using a regular expression (regex) pattern. */
	  pattern?: string
	  /** Description to show user on validation error. */
	  pattern_description?: string
	  /** Minimum length of text string (when numeric=false). */
	  min_length?: number
	  /** Maximum length of text string (when numeric=false). */
	  max_length?: number
	  /** Minimum number (when numeric=true). */
	  min?: number
	  /** Maximum number (when numeric=true). */
	  max?: number
	}

	interface DateTimeField extends FormField, FormFieldDefaultPreviousValue {
	  type: "DateTimeField"
	}

	interface TimeField extends FormField, FormFieldDefaultPreviousValue {
	  type: "TimeField"
	}

	interface ChoiceOption {
	  label: string
	  value: string
	}

	interface YesNoField extends FormField, FormFieldDefaultPreviousValue {
	  type: "YesNoField"
	  /** Enable N/A choice? */
	  neutral_enabled: boolean
	  /**
	   * Label/Value for neutral choice
	   * @default {"label": "N/A", "value": "n/a"}
	   */
	  neutral?: ChoiceOption
	  /**
	   * Label/Value for positive choice
	   * @default {"label": "Yes", "value": "yes"}
	   */
	  positive: ChoiceOption
	  /**
	   * Label/Value for negative choice
	   * @default {"label": "No", "value": "no"}
	   */
	  negative: ChoiceOption
	}

	interface ChoiceField extends FormField, FormFieldDefaultPreviousValue {
	  type: "ChoiceField"
	  choices: ChoiceOption[]
	  /** Multiple choice field? */
	  multiple?: boolean
	  /** Allow other values? */
	  alow_other?: boolean
	}

	interface ClassificationField extends FormField, FormFieldDefaultPreviousValue {
	  type: "ClassificationField"
	  /** The id of the classification set to reference. */
	  classification_set_id: GUID
	}

	interface PhotoField extends FormField {
	  type: "PhotoField"
	  /** Minimum number of photos. */
	  min_length?: number
	  /** Maximum number of photos. */
	  max_length?: number
	}

	interface VideoField extends FormField {
	  type: "VideoField"
	  /** GPS track enabled? */
	  track_enabled?: boolean
	  /** Audio enabled? */
	  audio_enabled?: boolean
	  /** Minimum number of videos */
	  min_length?: number
	  /** Maximum number of videos. */
	  max_length?: number
	}

	interface AudioField extends FormField {
	  type: "AudioField"
	  /** GPS track enabled? */
	  track_enabled?: boolean
	  /** Minimum number of audio recordings */
	  min_length?: number
	  /** Maximum number of audio recordings. */
	  max_length?: number
	}

	interface Section extends FormField {
	  type: "Section"
	  /** Display type for the section */
	  display: "inline" | "drilldown"
	  /** FormField's nested inside of this section */
	  elements: FormFields[]
	}

	interface AddressField extends FormField {
	  type: "AddressField"
	  /** Automatically reverse geocode to determine address? */
	  auto_populate?: boolean
	}

	interface SignatureField extends FormField {
	  type: "SignatureField"
	  /** The text that appears below the signature line. */
	  agreement_text?: string
	}

	interface HyperlinkField extends FormField {
	  type: "HyperlinkField"
	  /** Optional default URL. */
	  default_url?: string
	}

	interface CalculatedFieldCurrencyDisplay {
	  style: "currency"
	  currency: string
	}

	interface CalculatedField extends FormField, FormFieldDefaultPreviousValue {
	  type: "CalculatedField"
	  /** Calculation display object. If the style is "currnecy" then a local currecy is required. */
	  display: { style: "text" | "number" | "date" } | { style: "currency", currency: string }
	}

	type ConditionOperator = "equal_to" | "not_equal_to" | "is_empty" | "is_not_empty"

	interface RecordLinkDefaultProperty {
	  /** The key of the source field. */
	  source_field_key: string
	  /** The key of the destination field. */
	  destination_field_key: string
	}

	interface RecordLinkField extends FormField, FormFieldDefaultPreviousValue {
	  type: "RecordLinkField"
	  /** Whether to allow the user to select existing records from the app linked in the record link field. */
	  allow_existing_records: boolean
	  /** Whether to allow the user to create new records in the app that is linked to the record link field. */
	  allow_creating_records: boolean
	  /** Whether to allow the user to update data in existing records in the app linked to the record link field. */
	  allow_updating_records: boolean
	  /** Whether to allow the user to select multiple records to link from the app linked to the record link field. */
	  allow_multiple_records: boolean
	  /** Match all or any of the conditions to filter linked records. */
	  record_conditions_type: FormFieldConditions
	  /** Array of objects containing conditions to filter linked records */
	  record_conditions: FormFieldCondition[]
	  /** Array of objects containing conditions to filter linked records */
	  record_defaults: RecordLinkDefaultProperty[]
	}

	interface RepeatableField extends FormField {
	  type: "Repeatable"
	  /** FormField's nested inside of this section */
	  elements: FormFields[]
	}

}
declare module 'src/functions/DATANAMES' {
	import { FormFieldTypes, FieldName } from 'src/types/fields';
	/**
	 * Returns the data names of the form fields. Also accepts an optional
	 * type argument to filter form fields by type.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/datanames/
	 * @param type (String, optional): FormFieldType: e.g. "YesNoField"
	 * @returns array of datanames
	 * @example
	 * DATANAMES('Repeatable') // returns [ "items", "child_items" ]
	 */
	export default function DATANAMES(): FieldName[];
	export default function DATANAMES(type: FormFieldTypes): FieldName[];
	export default function DATANAMES(type: string): FieldName[];

}
declare module 'src/functions/FLOOR' {
	/**
	 * Returns number rounded down, away from zero, to the nearest multiple
	 * If a multiple is not specified, number will be rounded to next lowest integer (multiple of 1)
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/floor/
	 * @param number (Number, required): value to be rounded
	 * @param multiple (Number, optional): multiple to which a number will be rounded
	 * @returns number rounded to nearest multiple
	 * @example
	 * FLOOR(3.45) // returns 3
	 */
	export default function FLOOR(value: number): number;
	export default function FLOOR(value: number, multiple: number): number;
	export default function FLOOR(value: string): number;
	export default function FLOOR(value: string, multiple: number): number;
	export default function FLOOR(): number;

}
declare module 'src/functions/INT' {
	/**
	 * Returns number rounded down, away from zero, to the nearest interger
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/int/
	 * @param number (Number, required): value to be converted
	 * @param multiple (Number, optional): multiple to which a `number` will be converted
	 * @returns number converted to an int, rounded to nearest multiple
	 * @example
	 * INT(3.45) // returns 3
	 */
	export default function INT(number: number, multiple?: number): number;

}
declare module 'src/functions/DATE' {
	/**
	 * Returns a new Date object given a year, month, and day.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/date/
	 * @param year (Number, required): four-digit number
	 * @param month (Number, required): one-two digit number
	 * @param day (Number, required): one-two digit number
	 * @returns Date object
	 */
	export default function DATE(year: number, month: number, day: number): Date;
	export default function DATE(year: string, month: string, day: string): Date | undefined;
	export default function DATE(year?: any, month?: any, day?: any): undefined;
	export default function DATE(): undefined;

}
declare module 'src/functions/RIGHT' {
	import { MaybeString } from 'src/types/primitives';
	/**
	 * Returns the right characters of a string, i.e. the characters starting at index -1
	 * @param value required; string
	 * @param numberOfCharacters optional; number indicating the amount of characters to be returned
	 * @returns a substring of characters
	 * @example
	 * RIGHT("abc") // returns "c"
	 * RIGHT("abc", 2) // returns "bc"
	 */
	export default function RIGHT(value: string, numberOfCharacters: number): MaybeString;
	export default function RIGHT(value: any, numberOfCharacters?: any): MaybeString;
	export default function RIGHT(): undefined;

}
declare module 'src/functions/LPAD' {
	import { MaybeString } from 'src/types/primitives';
	/**
	 * Returns a string padded to the left with a character of choice.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/lpad/
	 * @param value (String, required): string to be padded
	 * @param count (Number, required): integer indicating the total length of the desired string
	 * @param padding (String, option): character to use for padding, defaults to " "
	 * @returns a padded string
	 * @example
	 * LPAD("abc", 5) // returns "  abc"
	 */
	export default function LPAD(value: string, count: number, padding?: string): MaybeString;
	export default function LPAD(value: any, count: any, padding?: any): MaybeString;
	export default function LPAD(): undefined;

}
declare module 'src/functions/DATEVALUE' {
	import { MaybeString } from 'src/types/primitives';
	/**
	 * Returns a date value given a date and optional time string
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/datevalue/
	 * @param dateString (String|Date, required): string in XXXX-XX-XX format or a Date object
	 * @param timeString (String, optional): string in XX:XX or XX:XX:XX format
	 * @returns Date value
	 */
	export default function DATEVALUE(dateString: Date | MaybeString, timeString?: string): Date;
	export default function DATEVALUE(dateString: string): Date;
	export default function DATEVALUE(dateString: Date): Date;
	export default function DATEVALUE(): undefined;

}
declare module 'src/functions/DATEADD' {
	import { MaybeString } from 'src/types/primitives';
	/**
	 * Adds a given number of days to a date.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/dateadd/
	 * @param date (Date|String, required): Date object or string in XXXX-XX-XX format
	 * @param number (Number, required): number of days to be added as an integer
	 * @returns Date object
	 */
	export default function DATEADD(date: Date | MaybeString, number: number): Date | undefined;

}
declare module 'src/functions/DAY' {
	import { MaybeString } from 'src/types/primitives';
	/**
	 * Returns a day given a date.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/day/
	 * @param date (Date|String, required): Date object or a string in XXXX-XX-XX format
	 * @returns day as numeric value
	 * @example
	 * DAY("2015/12/16") // returns 16
	 */
	export default function DAY(date: Date): number;
	export default function DAY(date: MaybeString): number;
	export default function DAY(): undefined;

}
declare module 'src/functions/DECIMALSEPARATOR' {
	/**
	 * Returns the decimal seperator character or, if it's not available, the default character
	 * from the form configuration object.
	 */
	export default function DECIMALSEPARATOR(): string;

}
declare module 'src/functions/DEGREES' {
	/**
	 * Returns degrees for an input of radians.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/degrees/
	 * @param value (Number, required): numeric value representing a value in radians
	 * @returns numeric value representing degrees
	 * @example
	 * DEGREES(Math.PI) // returns 180
	 */
	export default function DEGREES(value: number | string): number;
	export default function DEGREES(value: undefined | null): number;
	export default function DEGREES(): number;
	export default function DEGREES(value?: any): number;

}
declare module 'src/functions/FIELD' {
	import { FormFields as FormField, FieldName } from 'src/types/fields';
	/**
	 * Returns definition object for a specified field
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/field/
	 * @param dataName (String, required): data name of the field
	 * @example
	 * FIELD('child_item_cost').label // returns "Child Item Cost"
	 */
	export default function FIELD(dataName: FieldName): FormField;
	export default function FIELD(dataName: FieldName | string | null | undefined): FormField | undefined;

}
declare module 'src/functions/DESCRIPTION' {
	import { MaybeString } from 'src/types/primitives';
	/**
	 * Returns a field's description.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/description/
	 * @param dataName (String, required): data name of desired field
	 * @returns string, the field's description
	 */
	export default function DESCRIPTION(dataName: MaybeString): string | undefined;
	export default function DESCRIPTION(): undefined;

}
declare module 'src/functions/DEVICEMANUFACTURER' {
	/**
	 * Returns the device manufacturer or an empty string
	 */
	export default function DEVICEMANUFACTURER(): string;

}
declare module 'src/functions/DEVICEMODEL' {
	/**
	 * Returns the device model or an empty string if the device model is not present.
	 */
	export default function DEVICEMODEL(): string;

}
declare module 'src/functions/DEVICEINFO' {
	/**
	 * Returns device info, including the device manufacturer and model
	 * @param separator (String, optional): character to separate device manufacturer and model, defauls to `", "`
	 * @returns string
	 * @example
	 * DEVICEINFO() // returns "Apple, MQCK2LL/A"
	 */
	export default function DEVICEINFO(separator?: string): string;
	export default function DEVICEINFO(separator?: any): string;

}
declare module 'src/functions/EMAIL' {
	/**
	 * Returns the user's email from the configuration object.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/email/
	 */
	export default function EMAIL(): string | undefined;

}
declare module 'src/functions/EVEN' {
	/**
	 * Returns number rounded up to the nearest even integer
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/even/
	 * @param value (Number, required): number to evaluate
	 * @returns number
	 * @example
	 * EVEN(-3.4) // returns -2
	 */
	export default function EVEN(value: number): number;
	export default function EVEN(value: string): number;
	export default function EVEN(value: any): number;

}
declare module 'src/functions/EXACT' {
	/**
	 * Returns whether two items are deeply equal
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/exact/
	 * @param value1 (Any, required): item of any type
	 * @param value2 (Any, required): item of any type
	 * @returns boolean
	 * @example
	 * EXACT([1, 2, 3], [1, 2, 3]) // returns true
	 */
	export default function EXACT(value1: any, value2: any): boolean;

}
declare module 'src/functions/EXISTS' {
	/**
	 * Checks whether all values passed in exist.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/exists/
	 * @param args (Any|Array): list of items to check
	 * @returns boolean value indicating whether all values exist
	 * @example
	 * EXISTS(1, 3, 7, null) // returns false
	 */
	export default function EXISTS(arg: any, ...args: any[]): arg is number | boolean | string | object;
	export default function EXISTS(...args: any[]): boolean;

}
declare module 'src/functions/EXP' {
	/**
	 * Returns e^x, where `x` is the argument, and `e` is Euler's number, the base of natural logarithms.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/exp/
	 * @param x (Number, required): exponent value
	 * @returns number,`e` to the `x` power
	 * @example
	 * EXP(1) // returns 2.718281828459045
	 */
	export default function EXP(x: number): number;
	export default function EXP(x: string): number;

}
declare module 'src/functions/MEMOIZED_FACT' {
	/**
	 * Memoized store for `FACT` function
	 */
	export default function MEMOIZED_FACT(): number[];
	export function RESET_MEMOIZED_FACT(): number[];

}
declare module 'src/functions/FACT' {
	/**
	 * Returns factorial of a number, n (n!)
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/fact/
	 * @param value (Number, required): postive integer
	 * @returns factorial of `value`
	 * @example
	 * FACT(7) // returns 5040
	 */
	export default function FACT(value: any): number;

}
declare module 'src/functions/MEMOIZED_FACTDOUBLE' {
	/**
	 * Memoized store for `FACTDOUBLE` function
	 */
	export default function MEMOIZED_FACTDOUBLE(): number[];
	export function RESET_MEMOIZED_FACTDOUBLE(): number[];

}
declare module 'src/functions/FACTDOUBLE' {
	/**
	 * Returns double factorial of a number, n (n!!)
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/factdouble/
	 * @param value (Number, required): postive integer
	 * @returns factorial of value
	 * @example
	 * FACT(5) // returns 15
	 */
	export default function FACTDOUBLE(value: any): number;

}
declare module 'src/functions/FALSE' {
	/**
	 * Returns the boolean value `false`.
	 * @example
	 * FALSE() // returns false
	 */
	export default function FALSE(): false;

}
declare module 'src/functions/FIELDS' {
	import { FormFields, ContainerFieldName } from 'src/types/fields';
	export interface FieldsOptions {
	    repeatables?: boolean;
	    sections?: boolean;
	}
	/**
	 * Returns child fields of a repeatable or section field associated with a given data name
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/fields/
	 * @param dataName (String, required): parent field's data name
	 * @param options (Object, optional): object indicating if result should be flattened recursively,
	 * e.g. `{ repeatables: boolean, sections: boolean }`
	 * @returns array of child fields
	 */
	export default function FIELDS(dataName: ContainerFieldName): FormFields[];
	export default function FIELDS(dataName: ContainerFieldName, options: FieldsOptions): FormFields[];
	export default function FIELDS(): undefined;

}
declare module 'src/functions/FIELDNAMES' {
	import { FieldsOptions } from 'src/functions/FIELDS';
	import { ContainerFieldName, FieldName } from 'src/types/fields';
	/**
	 * Returns child field names when passed in a parent's dataname
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/fieldnames/
	 * @param dataName (String, required): parent field's data name
	 * @param options (Object, optional); object indicating if result should be flattened recursively,
	 * e.g. `{ repeatables: boolean, sections: boolean }`
	 * @returns array of child field names
	 */
	export default function FIELDNAMES(dataName: ContainerFieldName, options?: FieldsOptions): FieldName[] | undefined;
	export default function FIELDNAMES(dataName: ContainerFieldName): FieldName[] | undefined;

}
declare module 'src/functions/FIELDTYPE' {
	import { FieldName } from 'src/types/fields';
	/**
	 * Returns a field's type.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/fieldtype/
	 * @param dataName (String, required): data name of desired field
	 * @returns the field's type
	 * @example
	 * FIELDTYPE("operating_hours") // returns "TimeField"
	 */
	export default function FIELDTYPE(dataName: FieldName): string | undefined;

}
declare module 'src/functions/FIRST' {
	/**
	 * Returns the first n items of an array or string.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/first/
	 * @param item (Array, required): array to evaluate
	 * @param n (Number, optional): number of items to return, defaults to 1
	 * @returns a single value or an array of values
	 */
	export default function FIRST(item: any[] | string, n: number): any[] | undefined;
	export default function FIRST(item: any[] | string, n?: number): any[] | undefined;
	export default function FIRST(item: any): any[] | undefined;

}
declare module 'src/functions/GROUPINGSEPARATOR' {
	/**
	 * Returns locale-specific symbol to group large numbers - defaults to ','
	 */
	export default function GROUPINGSEPARATOR(): string;

}
declare module 'src/functions/GROUPINGSIZE' {
	/**
	 * Returns locale-specific increment with which to group large numbers - defaults to 3 (thousands)
	 */
	export default function GROUPINGSIZE(): number;

}
declare module 'src/functions/MAX' {
	/**
	 * Returns max value from a list of values
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/max/
	 * @param args (Number|Array, required): list of numeric values
	 * @returns max value in numeric form
	 * @example
	 * MAX(1, 4, 7, 2, 4) // returns 7
	 */
	export default function MAX(...args: number[]): number | undefined;
	export default function MAX(...args: any[]): number | undefined;

}
declare module 'src/functions/MIN' {
	/**
	 * Returns min value from a list of values
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/min/
	 * @param args (Number|Array, required): list of numeric values
	 * @returns min numberic value among parameters
	 * @example
	 * MIN(7, 4, 1, 2, 4) // returns 1
	 */
	export default function MIN(...args: any[]): number | undefined;

}
declare module 'src/functions/FIXED' {
	/**
	 * Returns fixed represention of a number
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/fixed/
	 * @param num (Number, required): value to be converted
	 * @param decimals  (Number, optional): integer between 0 - 20 indicating total fractional digits, defaults to 2
	 * @param suppressGroupingSeparator (Boolean, optional): whether to separate numbers with
	 * groupingSeparator character, defaults to false
	 * @returns fixed representation of a number as a string
	 * @example
	 * FIXED(12345678901 / 3, 3) // returns "4,115,226,300.333"
	 */
	export default function FIXED(num: number, decimals?: number, suppressGroupingSeparator?: boolean): string | undefined;
	export default function FIXED(num: number, decimals?: number): string | undefined;
	export default function FIXED(num: any): string | undefined;

}
declare module 'src/functions/FORM' {
	/**
	 * Returns the current form object.
	 *
	 * View Documentatino - https://learn.fulcrumapp.com/dev/expressions/reference/form/
	 */
	export default function FORM(): {};

}
declare module 'src/functions/FORMAT' {
	/**
	 * Formats a string
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/format/
	 * @param template (String, required): desired format, `%s` for strings and `%d` for numbers.
	 * @param variables (String|Number, required), values to substitute into the format string
	 * @returns formatted string
	 */
	export default function FORMAT(template: string, ...variables: any[]): string;

}
declare module 'src/functions/FORMATADDRESS' {
	import { AddressFieldValue } from 'src/types/values';
	/**
	 * Returns a formatted address
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/formataddress/
	 * @param address (AddressFieldValue, required) must be valid AddressFieldValue
	 * @param lineSeparator (String, optional): character to separate address lines, defaults to `"\n"`
	 * @param partSeparator (String, optional): character to separate address parts, defaulst to " "
	 * @returns string, formatted address
	 */
	export default function FORMATADDRESS(address: AddressFieldValue, lineSeparator?: string, partSeparator?: string): string | undefined;
	export default function FORMATADDRESS(address: AddressFieldValue): string | undefined;

}
declare module 'src/functions/LANGUAGE' {
	/**
	 * Returns the language value or, if it's not available, the default language
	 * from the form configuration object.
	 */
	export default function LANGUAGE(): string;

}
declare module 'src/functions/FORMATNUMBER' {
	import { NumberFormatOptions } from 'src/host/format-number';
	import { MaybeString } from 'src/types/primitives';
	/**
	 * Returns a number formatted based on the current language and the styling options passed in.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/formatnumber/
	 * @param value (Number, required): number to be formatted
	 * @param langauge (String, optional): languange- and country-specific string, e.g. "en-US"
	 * @param options (NumberFormatOptions, optional): formatting options hash
	 * @returns formatted number string
	 */
	export default function FORMATNUMBER(value: number, language: MaybeString, options: NumberFormatOptions): string;
	export default function FORMATNUMBER(value: number, language: MaybeString): string;
	export default function FORMATNUMBER(value: number): string;

}
declare module 'src/functions/GCD' {
	/**
	 * Returns the greatest common divisor
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/gcd/
	 * @param args (Any|Array, required): list of numbers
	 * @returns greatest commom divisor among the numbers passed in
	 * @example
	 * GCD(8, 16, 32, 36) // returns 4
	 */
	export default function GCD(...args: number[]): number;
	export default function GCD(...args: string[]): number;
	export default function GCD(...args: any[]): number;

}
declare module 'src/functions/GETRESULT' {
	/** Returns result from $$HOST */
	export default function GETRESULT(): any;

}
declare module 'src/functions/GROUP' {
	/**
	 * Returns values grouped according to a passed in iteratee or according to identity
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/group/
	 * @param values (Array, required): array of values
	 * @param iteratee (Function, optional): function to determine value sorting, defaults to identity (`===`)
	 * @returns object of grouped values; keys are determined by the return values of `iteratee`
	 */
	export default function GROUP(values: number[], iteratee: Function): {} | undefined;
	export default function GROUP(values: any[]): {} | undefined;
	export default function GROUP(values: any[], iteratee?: Function): {} | undefined;
	export default function GROUP(values: any, iteratee?: Function): {} | undefined;

}
declare module 'src/functions/HASOTHER' {
	import { ChoiceFieldValue } from 'src/types/values';
	/**
	 * Returns where or not a ChoiceFieldValue has an `other_values` key
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/hasother/
	 * @param value (ChoiceFieldValue, required): `{ choice_values?: string[ ], other_values?: string[ ] }`
	 * @returns boolean value
	 */
	export default function HASOTHER(value: ChoiceFieldValue): boolean;
	export default function HASOTHER(value?: any): boolean;
	export default function HASOTHER(): boolean;

}
declare module 'src/functions/IF' {
	/**
	 * Evaluates a conditional expression and returns a designated `trueValue` or `falseValue`
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/if/
	 * @param test (Expression, required): conditional expression that evaluates to true or false
	 * @param trueValue (Any,required): value to be returned in case of true
	 * @param falseValue (Any, required): vaue to be returned in case of false
	 * @returns`trueValue`/`falseValue` if supplied, else boolean
	 * @example
	 * IF(1 > 0, 10, 20) // returns 10
	 */
	export default function IF(test: any, trueValue: any, falseValue: any): any;

}
declare module 'src/functions/ISERR' {
	/**
	 * Checks if a value is an instance of an Error or has no value
	 * @param value (Error|Any, required): item to be checked
	 * @returns boolean
	 * @example
	 * const badField = FIELD('does_not_exist') // = undefined
	 * ISERR(badField) // returns true
	 */
	export default function ISERR(value: any): boolean;

}
declare module 'src/functions/IFERROR' {
	/**
	 * Evaluates whether a passed in value is an error.
	 * @param value (Error|Any, required): value to be evaluated
	 * @param errorValue (Any, required): value to be returned in event `value` is an error
	 * @returns `errorValue` in case `value` is an error, otherwise `value`
	 * @example
	 * IFERROR(EVEN(null), "ERR") // returns "ERR"
	 */
	export default function IFERROR(value: any, errorValue: any): any;

}
declare module 'src/functions/INSPECT' {
	/**
	 * Returns a string representation of the passed in parameter
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/inspect/
	 * @param value (Number, required): value to inspect
	 * @returns stringified value
	 */
	export default function INSPECT(value: any): string;

}
declare module 'src/types/results' {
	export interface AlertResult {
	  /** result type */
	  type: "message",
	  /** title of alert, optional */
	  title?: string,
	  /** short message, optional */
	  message?: string,
	}

	export interface InvalidResult {
	  /** ID for form. Must be unique to the form and lowercase. The Fulcrum app builder uses
	   * system generated 4 character codes.
	   */
	  key: string|null,
	  /** message to be displayed with invalidation error */
	  message: string|null,
	  /** result type  */
	  type: "validation"
	}

	export interface ProgressResult {
	  /** ID for form. Must be unique to the form and lowercase. The Fulcrum app builder uses
	   * system generated 4 character codes.
	   */
	  title: string|null,
	  /** message to be displayed with invalidation error */
	  message: string|null,
	  /** result type  */
	  type: "progress"
	}

	export interface ConfigurationResult {
	  /** result type */
	  type: "configure",
	  /** attribute of configuration to be changed */
	  attribute: string,
	  /** value to which configuration attribute will be changed */
	  value: any
	}

	export interface SetValueResult {
	  /** result type */
	  type: "set-value",
	  /** ID for form. Must be unique to the form and lowercase. The Fulcrum app builder uses
	   * system generated 4 character codes.
	   */
	  key: string,
	  /** value to which field is to be set */
	  value: string|null
	}

	export interface ExpressionResult {
	  /** result type */
	  type: "calculation",
	  /** ID for form. Must be unique to the form and lowercase. The Fulcrum app builder uses
	   * system generated 4 character codes.
	   */
	  key: string,
	  /* optional error string */
	  error?: MaybeString,
	  /** value of field */
	  value: any
	}

	export interface UpdateFormAttributesResult {
	  type: "update-element",
	  key: string,
	  attribute: string,
	  value: any,
	}

	export interface OpenURLResult {
	  /** result type */
	  type:"open",
	  /** stringified value */
	  value: string
	}
}
declare module 'src/functions/INVALID' {
	/**
	 * Displays an alert and stops a record from being saved
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/invalid/
	 * @param message (String, required): reason for invalidating a record
	 * @param dataName (String, optional): data name of field to be validated
	 */
	export default function INVALID(message: string, dataName?: string): void;
	export default function INVALID(message: string, dataName?: string): void;
	export default function INVALID(message: string): void;

}
declare module 'src/functions/ISERROR' {
	/**
	 * Checks if a value is an instance of an Error or has no value
	 * @param value (Error|Any, required): item to be checked
	 * @returns boolean
	 * @example
	 * const badField = FIELD('does_not_exist') // = undefined
	 * ISERROR(badField) // returns true
	 */
	export default function ISERROR(value: any): boolean;

}
declare module 'src/functions/ISEVEN' {
	/**
	 * Returns whether or not a value is even
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/iseven/
	 * @param value (Number, required): numeric value to be checked
	 * @returns boolean value
	 * @example
	 * ISEVEN(5 * 5) // returns false
	 */
	export default function ISEVEN(value: number): boolean;
	export default function ISEVEN(value: string): boolean;
	export default function ISEVEN(value: any): boolean;

}
declare module 'src/functions/ISPORTRAIT' {
	export interface MediaObject {
	    height: number;
	    width: number;
	    orientation?: number;
	}
	/**
	 * Checks whether the media is in portrait mode.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/isportrait/
	 * @param media (MediaObject, required): media object, height and width attributes must be present
	 * @returns boolean
	 * @example
	 * const mediaObject = { width: 100, height: 200 }
	 * ISPORTRAIT(mediaObject) // returns true
	 */
	export default function ISPORTRAIT(media: MediaObject): boolean;
	export default function ISPORTRAIT(media: any): boolean | undefined;
	export default function ISPORTRAIT(): undefined;

}
declare module 'src/functions/ISLANDSCAPE' {
	import { MediaObject } from 'src/functions/ISPORTRAIT';
	/**
	 * Checks whether the media is in landscape mode.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/islandscape/
	 * @param media (MediaObject, required): height and width attributes must be present
	 * @returns boolean
	 * @example
	 * const mediaObject = { width: 200, height: 100 }
	 * ISLANDSCAPE(mediaObject) // returns true
	 */
	export default function ISLANDSCAPE(media: MediaObject): boolean;
	export default function ISLANDSCAPE(media: any): boolean | undefined;
	export default function ISLANDSCAPE(): undefined;

}
declare module 'src/functions/ISLOGICAL' {
	/**
	 * Checks for a boolean value
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/islogical/
	 * @param value (Any, required): value to be checked
	 * @returns boolean value
	 * @example
	 * ISLOGICAL(2 > 0) // returns true
	 */
	export default function ISLOGICAL(value: any): boolean;

}
declare module 'src/functions/PLATFORM' {
	/** Returns the platform name from the configuration object */
	export default function PLATFORM(): string;

}
declare module 'src/functions/ISMOBILE' {
	/**
	 * Returns true if the record is being edited from the mobile app
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/ismobile/
	 * @returns boolean value
	 */
	export default function ISMOBILE(): boolean;

}
declare module 'src/functions/ISNEW' {
	/**
	 * Returns a boolean indicating whether the feature is new or an update.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isnew/
	 * @returns boolean
	 */
	export default function ISNEW(): boolean;

}
declare module 'src/functions/ISNONTEXT' {
	/**
	 * Checks if a value is a a non-text value (not a string)
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isnontext/
	 * @param value (Any, required): value to be checked
	 * @returns boolean
	 * @example
	 * ISNONTEXT(["a string"]) // returns true
	 */
	export default function ISNONTEXT(value: any): boolean;

}
declare module 'src/functions/ISODD' {
	/**
	 * Returns whether or not a value is odd
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isodd/
	 * @param value (Number, required): numeric value to be checked
	 * @returns boolean value
	 * @example
	 * ISODD(5 * 5) // returns true
	 */
	export default function ISODD(value: number): boolean;
	export default function ISODD(value: string): boolean;
	export default function ISODD(value: any): boolean;

}
declare module 'src/functions/ROLE' {
	/**
	 * Returns the current user's role or, if it's not available, undefined.
	 */
	export default function ROLE(): string | undefined;

}
declare module 'src/functions/ISROLE' {
	/**
	 * Determines whether arguments passed in contain the role of the current user
	 * by comparing it to  userRoleName on the configuration object
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isrole/
	 * @param args (String|Array, required): role(s) to be checked
	 * @returns boolean
	 */
	export default function ISROLE(...args: string[]): boolean;
	export default function ISROLE(...args: any[]): boolean;

}
declare module 'src/functions/ISSELECTED' {
	import { ChoiceFieldValue } from 'src/types/values';
	/**
	 * Checks to see if a choice is selected
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isselected/
	 * @param value (ChoiceFieldValue, required): field object containing possible choices to check against
	 * @param choice (Any|Array, required): choice or array of choices to check if they are selected
	 * @returns boolean
	 */
	export default function ISSELECTED(value: ChoiceFieldValue, choice: string | string[]): boolean;
	export default function ISSELECTED(value: ChoiceFieldValue, choice?: string | string[]): boolean;
	export default function ISSELECTED(value?: any, choice?: any): boolean;

}
declare module 'src/functions/ISTEXT' {
	/**
	 * Checks if a value is a text value (string)
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/istext/
	 * @param value (Any, required): value to be checked
	 * @returns boolean
	 * @example
	 * ISTEXT("a string") // returns true
	 */
	export default function ISTEXT(value: any): boolean;

}
declare module 'src/functions/ISUPDATE' {
	/**
	 * Returns a boolean indicating if the feature being edited is an update
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isupdate/
	 * @returns boolean
	 */
	export default function ISUPDATE(): boolean;

}
declare module 'src/functions/LABEL' {
	import { FieldName } from 'src/types/fields';
	/**
	 * Returns the label of a field
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/label/
	 * @param dataName (String, required): data name of desired field
	 * @returns form label, string
	 * @example
	 * LABEL("business_name") // returns "Business Name"
	 */
	export default function LABEL(dataName: FieldName): string | undefined;

}
declare module 'src/functions/LAST' {
	/**
	 * Returns the last n items of an array or string.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/last/
	 * @param item (Array|String, required): array or string to extract items from
	 * @param n (Number, optional): number of items to be extracted
	 * @returns items extracted; if more than one item is extracted an array is returned
	 * @example
	 * LAST([1 ,2 ,3], 2) // return [2, 3]
	 */
	export default function LAST(item: any[] | string, n: number): any[] | undefined;
	export default function LAST(item: any[] | string, n?: number): any[] | undefined;
	export default function LAST(item: any): any[] | undefined;

}
declare module 'src/functions/LATITUDE' {
	/**
	 * Returns the latitude of the record if it exists.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/latitude/
	 * @returns numeric value
	 */
	export default function LATITUDE(): number;

}
declare module 'src/functions/LCM' {
	/**
	 * Returns the least common multiple of the arguments passed in
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/lcm/
	 * @param args (Number|Array) list of numbers to be evaluated
	 * @returns number, least common multiple
	 * @example
	 * LCM(-50, 25, -45, -18, 90, 447) // returns 67050
	 */
	export default function LCM(...args: number[]): number;
	export default function LCM(...args: string[]): number;
	export default function LCM(...args: any[]): number;

}
declare module 'src/functions/LEFT' {
	/**
	 * Returns n left characters of a string.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/left/
	 * @param value (String, required) string to be parsed
	 * @param numberOfCharacters (Number, optional) number of characters to be returned, defaults to 1
	 * @returns string, number of characters specified
	 * @example
	 * LEFT("Hello, World", 3) // returns "Hel"
	 */
	export default function LEFT(value: string, numberOfCharacters?: number): string | undefined;
	export default function LEFT(value: any, numberOfCharacters?: string): string | undefined;
	export default function LEFT(value: string): string | undefined;
	export default function LEFT(value: any, numberOfCharacters?: any): string | undefined;

}
declare module 'src/functions/LEN' {
	/**
	 * Returns the length of a value as a string or an array-like object.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/len/
	 * @param value (Any, required): item to be measured
	 * @returns number
	 * @example
	 * LEN("test") // returns 4
	 */
	export default function LEN(value: any): number;

}
declare module 'src/functions/LN' {
	/**
	 * Returns the natural logarithm of a value; equivalent to _ln(x)_.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/ln/
	 * @param value (Number, required): positive number for which to calculate the logarithm, base `e`
	 * @returns numeric value indicating the natural log of a value
	 * @example
	 * LN(12) // returns 2.4849066497880004
	 */
	export default function LN(value: number): number;
	export default function LN(value: string): number;
	export default function LN(value: any): number;

}
declare module 'src/functions/LOCALE' {
	/**
	 * Returns the locale of a record.
	 */
	export default function LOCALE(): string;

}
declare module 'src/functions/LOG' {
	/**
	 * Calculates the log of a value given a base.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/log/
	 * @param value (Number, required) number to be logged
	 * @param base (Number, optional): logarithmic base, defaults to 10
	 * @returns number
	 * @example
	 * LOG(100) // returns 2
	 */
	export default function LOG(value: number, base: number): number;
	export default function LOG(value: number): number;
	export default function LOG(value: any, base?: any): number;

}
declare module 'src/functions/LOG10' {
	/**
	 * Calculates the log10 (common logarithm) of a value.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/log10/
	 * @param value (Number, required): number to be calculated
	 * @returns numeric value
	 * @example
	 * LOG10(100) // returns 2
	 */
	export default function LOG10(value: number): number;
	export default function LOG10(value: string): number;
	export default function LOG10(value: any): number;

}
declare module 'src/functions/LONGITUDE' {
	/**
	 * Returns a record's longitude if it exists.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/longitude/
	 * @returns number
	 */
	export default function LONGITUDE(): number;

}
declare module 'src/functions/LOWER' {
	import { GenericObject } from 'src/types/primitives';
	/**
	 * Converts a string value to all lowercase.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/lower/
	 * @param value (String, required): value to be converted to lowercase
	 * @returns string
	 * @example
	 * LOWER("CASE") // returns "case"
	 */
	export default function LOWER(value: string): string;
	export default function LOWER(value: undefined | null | object | Array<any> | GenericObject): undefined;

}
declare module 'src/functions/MAXA' {
	/**
	 * Returns max value from a list of values
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/maxa/
	 * @param args (Number|Array, required): list of numeric values
	 * @returns max value in numeric form
	 * @example
	 * MAXA(1, 4, 7, 2, 4) // returns 7
	 */
	export default function MAXA(...args: number[]): number | undefined;

}
declare module 'src/functions/MEDIAN' {
	/**
	 * Returns the median value of list of numbers.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/median/
	 * @param args (Number|Array, required): numeric values to be evaluated
	 * @returns median value
	 * @example
	 * MEDIAN(3, 4, 2, 5, 1) // returns 3
	 */
	export default function MEDIAN(...args: number[]): number;
	export default function MEDIAN(...args: any[]): number | undefined;

}
declare module 'src/functions/MID' {
	/**
	 * Returns a specific number of characters from a text string.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/mid/
	 * @param value (String, required): text to be parsed
	 * @param startPosition (Number, required): numeric value indicating parsing starting position
	 * @param numberOfCharacters (Number, required): number of chars one wants returned
	 * @returns string
	 * @example
	 * MID("abcd", 2, 2) // returns "bc"
	 */
	export default function MID(value: string, startPosition: number, numberOfCharacters: number): string | undefined;
	export default function MID(value: string, startPosition: string, numberOfCharacters: string): string | undefined;
	export default function MID(value?: any, startPosition?: any, numberOfCharacters?: any): string | undefined;

}
declare module 'src/functions/MINA' {
	/**
	 * Returns min value from a list of values
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/mina/
	 * @param args (Number|Array, required): list of numeric values
	 * @returns min numberic value among parameters
	 * @example
	 * MINA(7, 4, 1, 2, 4) // returns 1
	 */
	export default function MINA(...args: any[]): number | undefined;

}
declare module 'src/functions/MOD' {
	/**
	 * Returns the modulus or remainder of a number divided by a divisor.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/mod/
	 * @param num (Number, required): number to be evaluated
	 * @param divisor (Number, required)
	 * @returns remainder of `num / divisor`
	 * @example
	 * MOD(10, 2) // returns 0
	 */
	export default function MOD(num: number, divisor: number): number;
	export default function MOD(num: string, divisor: string): number;
	export default function MOD(num?: any, divisor?: any): number;

}
declare module 'src/functions/MONTH' {
	import { MaybeString } from 'src/types/primitives';
	/**
	 * Returns a month given a date.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/month/
	 * @param date (Date|String, required): date object or string in "XXXX-XX-XX" format
	 * @returns month as numeric value
	 * @example
	 * MONTH("2015-12-16") // returns 12
	 */
	export default function MONTH(date: Date): number;
	export default function MONTH(date: MaybeString): number;
	export default function MONTH(): void;

}
declare module 'src/functions/N' {
	/**
	 * Returns a numeric value. If a number if passed in, the same number is returned, otherwise
	 * function returns 1 for a true boolean value, and 0 for all other values.
	 * @param value (Number|Any, required): value to be evaluated
	 * @returns a numeric value
	 * @example
	 * N(97) // returns 97
	 * N(false) // returns 0
	 */
	export default function N(value: any): number;

}
declare module 'src/functions/NOT' {
	/**
	 * Returns the negation of a value, i.e. if a value is falsey `NOT()` will return true.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/not/
	 * @param value (Any, required): parameter of any type
	 * @returns boolean
	 * @example
	 * NOT("test") // returns false
	 */
	export default function NOT(value?: any): boolean;

}
declare module 'src/functions/NUMS' {
	/**
	 * Maps over arguments passed in and converts each to a number value.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/nums/
	 * @param args (String|Number|Array, required): list of values to be mapped to numbers
	 * @returns array of numberic values
	 * @example
	 * NUMS("2", "3", "4") // returns [2, 3, 4]
	 */
	export default function NUMS(...args: string[]): number[];
	export default function NUMS(...args: number[]): number[];
	export default function NUMS(...args: any[]): number[];

}
declare module 'src/functions/ODD' {
	/**
	 * Returns the next odd number.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/odd/
	 * @param value (Number, required): number to be evaluated
	 * @returns number
	 * @example
	 * ODD(2) // returns 3
	 */
	export default function ODD(value: number): number;
	export default function ODD(value?: any): number;

}
declare module 'src/types/events' {
	import { GUID } from 'src/types/primitives'
	import { FormFields, FieldName } from 'src/types/fields';
	import { ChoiceFieldValue } from 'src/types/values'

	export interface TriggeredEvent {
	  name: EventNames,
	  value: (
	    FieldEventValue
	    | GeometryEventValue
	    | AddAudioEventValue
	    | AddVideoEventValue
	    | AddPhotoEventValue
	    | RemoveMediaEventValue
	    | null
	  ),
	  field: FieldName | null
	}

	export type EventNames =
	  FormEventNames
	  | FieldEventNames
	  | RepeatableEventNames
	  | ChangeGeometryEventName
	  | AddPhotoEventName
	  | RemovePhotoEventName
	  | ReplacePhotoEventName
	  | AddVideoEventName
	  | RemoveVideoEventName
	  | AddAudioEventName
	  | RemoveAudioEventName

	export type RepeatableEventNames =
	  "load-repeatable"
	  | "unload-repeatable"
	  | "new-repeatable"
	  | "edit-repeatable"
	  | "save-repeatable"
	  | "cancel-repeatable"
	  | "validate-repeatable"
	  | "change-geometry"

	export type FieldEventNames =
	  "change"
	  | "focus"
	  | "blur"
	  | "click"

	export type FormEventNames =
	  "load-record"
	  | "unload-record"
	  | "new-record"
	  | "edit-record"
	  | "save-record"
	  | "cancel-record"
	  | "validate-record"
	  | "change-geometry"
	  | "change-project"
	  | "change-status"
	  | "change-assignment"

	export type ChangeGeometryEventName = "change-geometry"
	export type AddPhotoEventName = "add-photo"
	export type RemovePhotoEventName = "remove-photo"
	export type ReplacePhotoEventName = "replace-photo"
	export type AddVideoEventName = "add-video"
	export type RemoveVideoEventName = "remove-video"
	export type AddAudioEventName = "add-audio"
	export type RemoveAudioEventName = "remove-audio"

	export interface Event {
	  name: EventNames
	}

	export interface EventWithField extends Event {
	  field: FieldName
	}

	export interface FormEvent extends Event {
	  name: FormEventNames
	  field: null,
	  value?: string
	}

	export type FieldEventValue = string | ChoiceFieldValue

	export interface FieldEvent extends EventWithField {
	  name: FieldEventNames,
	  field: FieldName,
	  value: FieldEventValue
	}

	export interface GeometryEventValue {
	  coordinates: number[],
	  type: "Point"
	}

	export interface GeometryEvent extends Event {
	  field?: string
	  name: ChangeGeometryEventName
	  value: GeometryEventValue
	}

	export interface RepeatableEvent extends EventWithField {
	  name: RepeatableEventNames
	}

	export interface AddPhotoEventValue {
	  id: GUID,
	  size: number,
	  latitude: number | null,
	  longitude: number | null,
	  altitude: number | null,
	  accuracy: number | null,
	  direction: number | null,
	  orientation: number | null,
	  width: number,
	  height: number,
	  timestamp: string | null
	}

	export interface ReplacePhotoEventValue extends AddPhotoEventValue {
	  annotated: boolean,
	  replaced: GUID
	}

	export interface AddPhotoEvent extends EventWithField {
	  name: AddPhotoEventName,
	  value: AddPhotoEventValue
	}

	export interface ReplacePhotoEvent extends EventWithField {
	  name: ReplacePhotoEventName,
	  value: ReplacePhotoEventValue
	}

	export interface RemoveMediaEventValue {
	  id: GUID
	}

	export interface RemoveMediaEvent extends EventWithField {
	  value: RemoveMediaEventValue
	}

	export interface RemovePhotoEvent extends RemoveMediaEvent {
	  name: RemovePhotoEventName
	}

	export interface AddVideoEventValue {
	  id: GUID,
	  size: number,
	  duration: number,
	  orientation: number | null,
	  width: number,
	  height: number,
	  track: any
	}

	export interface AddVideoEvent extends EventWithField {
	  name: AddVideoEventName,
	  value: AddVideoEventValue
	}

	export interface RemoveVideoEvent extends RemoveMediaEvent {
	  name: RemovePhotoEventName
	}

	export interface AddAudioEventValue {
	  id: GUID,
	  size: number,
	  duration: number
	}

	export interface AddAudioEvent extends EventWithField {
	  name: AddAudioEventName,
	  value: AddAudioEventValue
	}

	export interface RemoveAudioEvent extends RemoveMediaEvent {
	  name: RemoveAudioEventName
	}

}
declare module 'src/functions/OFF' {
	import { AddAudioEvent, AddAudioEventName, AddPhotoEvent, AddPhotoEventName, ReplacePhotoEvent, ReplacePhotoEventName, AddVideoEvent, AddVideoEventName, ChangeGeometryEventName, FieldEvent, FieldEventNames, FormEvent, FormEventNames, GeometryEvent, RemoveAudioEvent, RemoveAudioEventName, RemoveMediaEvent, RemovePhotoEventName, RemoveVideoEvent, RemoveVideoEventName, RepeatableEvent, RepeatableEventNames } from 'src/types/events';
	import { FieldName, PhotoFieldName, AudioFieldName, VideoFieldName, RepeatableFieldName } from 'src/types/fields';
	/**
	 * Detaches an event handler set by ON.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/off/
	 * @param event (String, required): event name
	 * @param field (String, optional): data name of ield the event was bound to
	 * @param callback (Function, required): callback to detach
	 */
	export default function OFF(name: FormEventNames, callback: (event: FormEvent) => void): void;
	export default function OFF(name: FieldEventNames, field: FieldName, callback: (event: FieldEvent) => void): void;
	export default function OFF(name: RepeatableEventNames, field: RepeatableFieldName, callback: (event: RepeatableEvent) => void): void;
	export default function OFF(name: ChangeGeometryEventName, callback: (event: GeometryEvent) => void): void;
	export default function OFF(name: ChangeGeometryEventName, field: RepeatableFieldName, callback: (event: GeometryEvent) => void): void;
	export default function OFF(name: AddPhotoEventName, field: PhotoFieldName, callback: (event: AddPhotoEvent) => void): void;
	export default function OFF(name: ReplacePhotoEventName, field: PhotoFieldName, callback: (event: ReplacePhotoEvent) => void): void;
	export default function OFF(name: RemovePhotoEventName, field: PhotoFieldName, callback: (event: RemoveMediaEvent) => void): void;
	export default function OFF(name: AddVideoEventName, field: VideoFieldName, callback: (event: AddVideoEvent) => void): void;
	export default function OFF(name: RemoveVideoEventName, field: VideoFieldName, callback: (event: RemoveVideoEvent) => void): void;
	export default function OFF(name: AddAudioEventName, field: AudioFieldName, callback: (event: AddAudioEvent) => void): void;
	export default function OFF(name: RemoveAudioEventName, field: AudioFieldName, callback: (event: RemoveAudioEvent) => void): void;

}
declare module 'src/functions/ON' {
	import { Event, AddAudioEvent, AddAudioEventName, AddPhotoEvent, AddPhotoEventName, ReplacePhotoEvent, ReplacePhotoEventName, AddVideoEvent, AddVideoEventName, ChangeGeometryEventName, EventNames, FieldEvent, FieldEventNames, FormEvent, FormEventNames, GeometryEvent, RemoveAudioEvent, RemoveAudioEventName, RemoveMediaEvent, RemovePhotoEventName, RemoveVideoEvent, RemoveVideoEventName, RepeatableEvent, RepeatableEventNames } from 'src/types/events';
	import { FieldName, PhotoFieldName, AudioFieldName, VideoFieldName, RepeatableFieldName } from 'src/types/fields';
	/**
	 * Attaches an event handler that listens for record, repeatable, or field events.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/on/
	 * @param event (String, required): event name
	 * @param target (String, optional): data name of field to bind the event to
	 * @param callback (Function, required): callback called when the specified event is triggered
	 */
	export default function ON(name: FormEventNames, callback: (event: FormEvent) => void): void;
	export default function ON(name: FieldEventNames, field: FieldName, callback: (event: FieldEvent) => void): void;
	export default function ON(name: RepeatableEventNames, field: RepeatableFieldName, callback: (event: RepeatableEvent) => void): void;
	export default function ON(name: ChangeGeometryEventName, callback: (event: GeometryEvent) => void): void;
	export default function ON(name: ChangeGeometryEventName, field: RepeatableFieldName, callback: (event: GeometryEvent) => void): void;
	export default function ON(name: AddPhotoEventName, field: PhotoFieldName, callback: (event: AddPhotoEvent) => void): void;
	export default function ON(name: ReplacePhotoEventName, field: PhotoFieldName, callback: (event: ReplacePhotoEvent) => void): void;
	export default function ON(name: RemovePhotoEventName, field: PhotoFieldName, callback: (event: RemoveMediaEvent) => void): void;
	export default function ON(name: AddVideoEventName, field: VideoFieldName, callback: (event: AddVideoEvent) => void): void;
	export default function ON(name: RemoveVideoEventName, field: VideoFieldName, callback: (event: RemoveVideoEvent) => void): void;
	export default function ON(name: AddAudioEventName, field: AudioFieldName, callback: (event: AddAudioEvent) => void): void;
	export default function ON(name: RemoveAudioEventName, field: AudioFieldName, callback: (event: RemoveAudioEvent) => void): void;
	export default function ON(name: EventNames, fieldOrCallback: FieldName | ((event: Event) => void), callback?: ((event: Event) => void)): void;

}
declare module 'src/functions/OPENURL' {
	/**
	 * Open a URL for a website or mobile app.
	 *
	 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/openurl/
	 * @param url (String, required): url to open
	 */
	export default function OPENURL(url: string): void;

}
declare module 'src/functions/PI' {
	/**
	 * Returns the value of pi (π).
	 */
	export default function PI(): number;

}
declare module 'src/functions/PLATFORMVERSION' {
	/** Returns the platform version from the configuration object */
	export default function PLATFORMVERSION(): string;

}
declare module 'src/functions/PLATFORMINFO' {
	/**
	 * Returns platform information off the form configuration object including platform name and version.
	 * @param separator optional; separator with which to combine platform name and version - defaults to ", "
	 * @returns string with platform name and version
	 * @example
	 * PLATFORMINFO() // returns "Android, 0.9.3"
	 */
	export default function PLATFORMINFO(separator?: string): string;

}
declare module 'src/functions/PLUCK' {
	/**
	 * Maps over a collection and returns the items based on a property (key).
	 * @param object required; Array-like object to be iterated over\
	 * @param property required; key name being targeted
	 * @returns an array of items that match the `property` param
	 * @example
	 * const users = [ { name: "Daniel" }, { name: "Susie" } ]
	 *
	 * PLUCK(users, "name") // returns [ "Daniel", "Susie" ]
	 */
	export default function PLUCK(object: any[], property: string): any[];

}
declare module 'src/functions/POWER' {
	/**
	 * Returns the base number raised to the exponent power.
	 * @param base required; base number to be exponentially multiplied
	 * @param exponent required; number to serve as exponent
	 * @returns number
	 * @example
	 * POWER(3, 4) // returns 81
	 */
	export default function POWER(base: number, power: number): number;
	export default function POWER(base?: any, power?: any): number;

}
declare module 'src/functions/PRODUCT' {
	/**
	 * Multiplies all the numbers given as arguments
	 * @param args required; list of numbers to be multiplied
	 * @returns product
	 * @example
	 * PRODUCT(-2, 3, 4) // returns -24
	 */
	export default function PRODUCT(...args: number[]): number;
	export default function PRODUCT(...args: any[]): number;

}
declare module 'src/functions/PROGRESS' {
	/**
	 * Displays a non-dismissible message that can be used to provide feedback when performing an asynchronous function.
	 * @description While fetching data from an API using REQUEST it might be desirable
	 * to let the user know that the request is in progress. This is an advanced function that requires thorough
	 * testing and error checking in your logic since the message is not dismissible by the user. To dismiss
	 * the progress message, call PROGRESS();.
	 * @param title required; A short title for the progress message
	 * @param message required; The message content for the progress alert
	 * @example
	 * const url: string = 'https://example.com';
	 * // show progress message while request is happening
	 * PROGRESS('Searching for nearby facilities ...');
	 *
	 * REQUEST(url, function(error, response, body) {
	 *  // resets progress message after request finishes
	 *  PROGRESS();
	 *  if (error) {
	 *    ALERT(INSPECT(error));
	 *  } else {
	 *   // do something with the API response
	 *  }
	 * });
	 */
	export default function PROGRESS(title?: null | string, message?: null | string): void;

}
declare module 'src/functions/PROJECTID' {
	/**
	 * Returns the project ID off the configuration object.
	 */
	export default function PROJECTID(): string | undefined;

}
declare module 'src/functions/PROJECTNAME' {
	/**
	 * Returns the project name from the configuration object
	 */
	export default function PROJECTNAME(): string | undefined;

}
declare module 'src/functions/PROMPT' {
	/**
	 * Display a text field to get input from the user and a callback to respond to the result.
	 * @param title required; A short title for the alert; pass in `null` for no title
	 * @param message required; The message content for the alert
	 * @param callback required; Function to be invoked when the message box is dismissed
	 * @example
	 * PROMPT('Please enter the current year', function (result) {
	 * if (result.input === new Date().getFullYear()) {
	 *   // Correct
	 * } else {
	 *   // Incorrect
	 * }
	 * });
	 */
	export default function PROMPT(title: string | null, message: string, callback: Function): void;

}
declare module 'src/functions/PROPER' {
	/**
	 * Capitalizes the first letter in each word of a string.
	 * @param value required; string to be capitalized
	 * @returns string
	 * @example
	 *
	 * PROPER("test test") // returns "Test Test"
	 */
	export default function PROPER(value: string): string | undefined;
	export default function PROPER(value: any): string | undefined;

}
declare module 'src/functions/QUOTIENT' {
	/**
	 * Returns quotient of numerator and denominator as integer.
	 * @param numerator required; number to be divided
	 * @param denominator required; divisor
	 * @returns integer
	 * @example
	 * QUOTIENT(12, 2) // returns 6
	 * QUOTIENT(12.5, 2) // returns 6
	 */
	export default function QUOTIENT(numerator: number, denominator: number): number;
	export default function QUOTIENT(numerator: any, denominator: any): number;
	export default function QUOTIENT(numerator?: any, denominator?: any): number;

}
declare module 'src/functions/RADIANS' {
	/**
	 * Converts degress into radians.
	 * @param degress required; number of degrees
	 * @returns number of radians
	 * @example
	 * RADIANS(45) // returns 0.7853981633974483
	 */
	export default function RADIANS(degrees: number): number;
	export default function RADIANS(degrees: any): number;

}
declare module 'src/functions/RAND' {
	/**
	 * Returns a random number between 0 and 1.
	 * @example
	 * RAND() // returns 0.45
	 * RAND() // returns 0.91
	 */
	export default function RAND(): number;

}
declare module 'src/functions/RANDBETWEEN' {
	/**
	 * Returns a random integer between the high and low values specified.
	 * @param low required; lowest value of desired range
	 * @param high required; highest value of desired range
	 * @returns random integer within specified range
	 * @example
	 * RANDBETWEEN(1, 10) // returns 2
	 * RANDBETWEEN(1, 10) // returns 8
	 */
	export default function RANDBETWEEN(low: number, high: number): number;
	export default function RANDBETWEEN(low: any, high: any): number;
	export default function RANDBETWEEN(low?: any, high?: any): number;

}
declare module 'src/functions/RECORDID' {
	/**
	 * Returns the current record's id from the form configuration obejct.
	 */
	export default function RECORDID(): string | undefined;

}
declare module 'src/functions/REPEATABLEID' {
	/**
	 * Returns a the id of the repeatable being edited.
	 */
	export default function REPEATABLEID(): string | undefined;

}
declare module 'src/functions/REPEATABLENUMBER' {
	/**
	 * Returns human-readable index of current repeatable field. Subtract 1 from returned value for computer index.
	 */
	export default function REPEATABLENUMBER(): number | undefined;

}
declare module 'src/functions/REPEATABLEVALUES' {
	import { FieldName } from 'src/types/fields';
	/**
	 * Returns a specific field out of a collection of repeatable items.
	 * @param repeatableValue required; array of form_value objects: [ { id: 1, form_values: "value" } ]
	 * @param dataName required; data name of desired field or an array of data names
	 * @returns array of values
	 */
	export default function REPEATABLEVALUES(repeatableValue: any[], dataName: FieldName[] | FieldName): any[] | undefined | null;

}
declare module 'src/functions/SUM' {
	/**
	 * Returns the sum of its arguments.
	 * @param args required; list of numbers
	 * @returns sum of its arguments
	 * @example
	 *
	 * SUM(1, 2, 3, 4) // returns 10
	 */
	export default function SUM(...args: number[]): number;
	export default function SUM(...args: any[]): number;

}
declare module 'src/functions/REPEATABLESUM' {
	import { FieldName } from 'src/types/fields';
	/**
	 * Returns the sum of all the numeric form values in a repeatable field.
	 * @param repeatableValue required; array of form_value objects: [ { id: 1, form_values: "value" } ]
	 * @param dataName required; data name of desired field or an array of data names
	 * @returns sum of numeric form values
	 */
	export default function REPEATABLESUM(repeatableValue: any[], dataName: FieldName | FieldName[]): number;

}
declare module 'src/types/host' {
	export interface Console {
	  log(message?: any, ...optionalParams: any[]): void
	}

	export var console: Console

	/**
	 * @param error error object
	 * @param request HTTP request object
	 * @param body the response body
	 */
	export interface HTTPRequestCallback {
	  (error: Error, response?: null, body?: null): void
	  (error: null, response: object, body: string): void
	}
}
declare module 'src/functions/REQUEST' {
	import { HTTPRequestCallback } from 'src/types/host'; type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";
	interface RequestOptions {
	    /** The url for the request */
	    url?: string;
	    /**
	     * The HTTP method for the request (POST, PUT, DELETE, etc.)
	     * @default "GET"
	     */
	    method?: HTTPMethod;
	    /**
	     * Should the request follow any redirects
	     * @default true
	     */
	    followRedirect?: boolean;
	    /**
	     * An object containing keys and values for additional header items
	     * @default {}
	     */
	    headers?: {
	        [key: string]: string;
	    };
	    /** An object containing query string parameters (url parameters) */
	    qs?: object;
	    /** An object to be passed in the request body, must be `JSON.stringify`able */
	    json?: object | string;
	    /** The request body */
	    body?: string;
	}
	/**
	 * Performs an HTTP request and executes the callback on completion.
	 * The REQUEST function is for making external HTTP requests. It's one of the most powerful data
	 * event functions and enables you to retrieve external data while filling out a form. It can be
	 * combined with the other functions to create very dynamic forms that populate information on-demand
	 * from external sources. It contains the necessary options to perform any HTTP request, including
	 * support for PUT, POST, etc and custom headers.
	 *
	 * ### CORS and Web Browser Support
	 *
	 * To work in the web browser, URLs fetched using REQUEST *require* HTTPS &
	 * [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing). This is not a limitation of
	 * Fulcrum - it's just the way modern web browsers work. Since Fulcrum is hosted on a secure website,
	 * all requests made from the site must also be secure and respond with the proper headers required by
	 * the browser. If you encounter CORS errors when trying to use an API with the REQUEST function, we
	 * recommend contacting the API provider and asking them to
	 * [add CORS support to their API](http://enable-cors.org). As a last resort, you can use a CORS
	 * proxy to proxy requests to URLs that don't support it.
	 *
	 * http://cors-anywhere.herokuapp.com/, http://cors-proxy.htmldriven.com/, and https://crossorigin.me
	 *  are various CORS proxies. Note that these are not Fulcrum services.
	 * Please also note, when using CORS proxies you are effectively exposing everything about a network
	 * request to an unknown host. This should be especially considered if sending information like
	 * passwords, tokens, etc.
	 *
	 * @param options The url or options to pass for the request
	 * @param callback The function to call when the request is complete - The function is
	 * passed `error`, `response`, and `body` parameters
	 * @example
	 * // This example looks up the place name from OpenStreetMap when the location changes and fills in a text
	 * // field with the place name. Replace 'place_name' below with a text field on your form.
	 *
	 * ON('change-geometry', function(event) {
	 *   var options = {
	 *     url: 'https://nominatim.openstreetmap.org/search/' + LATITUDE() + ',' +
	 *          LONGITUDE() + '?format=json&polygon=1&addressdetails=1'
	 *   };
	 *
	 *   REQUEST(options, function(error, response, body) {
	 *     if (error) {
	 *       ALERT('Error with request: ' + INSPECT(error));
	 *     } else {
	 *       var data = JSON.parse(body);
	 *
	 *       if (data.length) {
	 *         SETVALUE('place_name', data[0].display_name);
	 *       }
	 *     }
	 *   });
	 * });
	 */
	export default function REQUEST(options: RequestOptions, callback: HTTPRequestCallback): void;
	export default function REQUEST(url: string, callback: HTTPRequestCallback): void;
	export {};

}
declare module 'src/functions/ROUNDDOWN' {
	/**
	 * Rounds down a given number to the specified number of digits.
	 * @param num required; numeric value to be round down
	 * @param digits optional; number of digits to which `num` is to be rounded down; defaults to `0`
	 * @returns numeric value rounded down to desired number of digits
	 * @example
	 *
	 * ROUNDDOWN(2.6666666, 4) // returns 2.6666
	 */
	export default function ROUNDDOWN(num: number, digits?: number): number;
	export default function ROUNDDOWN(num: string | number, digits?: number): number;
	export default function ROUNDDOWN(num: any, digits?: any): number;

}
declare module 'src/functions/ROUNDUP' {
	/**
	 * Rounds up the given number to the specified number of digits.
	 * @param num required; numeric value to be round up
	 * @param digits optional; desired number of digits to which `num` is to be rounded; defaults to `0`
	 * @returns numeric value rounded up to the desired number of digits
	 *
	 * @example
	 *
	 * ROUNDUP(2.6666666, 4) // returns 2.6667
	 */
	export default function ROUNDUP(num: number, digits?: number): number;
	export default function ROUNDUP(num: string | number, digits?: number): number;
	export default function ROUNDUP(num: any, digits?: any): number;

}
declare module 'src/functions/RPAD' {
	/**
	 * Returns a string padded to the right by a desired character.
	 * @param value required; string value to be padded
	 * @param count required; total number of spaces desired in returned value
	 * @param padding optional; character with which the `value` is to be padded; defaults to `" "`
	 * @returns a padded string value
	 *
	 * @example
	 *
	 * RPAD('1', 2, '0') // returns "10"
	 */
	export default function RPAD(value: string, count: number, padding?: string): string;
	export default function RPAD(value: any, count: any, padding?: any): string | undefined;

}
declare module 'src/functions/SEARCH' {
	/**
	 * Searches a string for a substring and returns a 1-based index.
	 * @param needle required; substring to search for
	 * @param haystack required; string in which to search for `needle` substring
	 * @param startPosition optional; number, 1-based index from which to start searching the `haystack` string
	 * @returns 1-based index indicating where substring is located
	 *
	 * @example
	 * SEARCH('4', '1234') // returns 4
	 * // startPosition = 2 so search begins at second character of string
	 * SEARCH("t", "test", 2) // returns 4
	 */
	export default function SEARCH(needle: string, haystack: string, startPosition?: number): number | undefined;
	export default function SEARCH(needle: any, haystack: any, startPosition?: any): number | undefined;

}
declare module 'src/functions/SETVALUE' {
	import { FieldName } from 'src/types/fields';
	import { AddressFieldValue, ChoiceFieldValue } from 'src/types/values';
	import { ValidGeometry } from 'src/util/is-valid-geometry';
	/**
	 * Sets or clears the value of a field depending on value passed in.
	 * @param dataName required; string, data_name of field to be set
	 * @param value required; value for field, or `null` to clear the field
	 * @example
	 * SETVALUE('yes_no_field', 'yes') // Sets the value of a yes/no field
	 * SETVALUE('name', null) // Clears the value of field called 'name'
	 */
	export default function SETVALUE(dataName: FieldName, value: string | ChoiceFieldValue | AddressFieldValue | ValidGeometry | string[] | number[] | null): void;

}
declare module 'src/functions/SETASSIGNMENT' {
	/**
	 * Assign a user to a record.
	 * @param user required; user's name, must be a string
	 */
	export default function SETASSIGNMENT(user: string): void;

}
declare module 'src/functions/SETFORMATTRIBUTES' {
	/**
	 * Updates a form's attributes.
	 * @param dataName data name of desired form field to be updated
	 * @param attributes optional; object of attributes to be updated and their corresponding values
	 */
	export default function SETFORMATTRIBUTES(dataName: string, attributes?: any): void;
	export default function SETFORMATTRIBUTES(dataName: any): void;

}
declare module 'src/functions/SETCHOICEFILTER' {
	import { ChoiceFieldName } from 'src/types/fields';
	/**
	 * Sets a choice filter for a form.
	 * @param dataName required; data name of field to be updated
	 * @param value required; a value or an array of values on which to filter
	 */
	export default function SETCHOICEFILTER(dataName: ChoiceFieldName, value: any[]): void;
	export default function SETCHOICEFILTER(dataName: ChoiceFieldName, value: any): void;

}
declare module 'src/functions/SETCHOICES' {
	import { ChoiceFieldName } from 'src/types/fields';
	/**
	 * Updates the form choices attribute.
	 * @param dataName required; data name of form field to be updated
	 * @param value required; an array of values; can be `null`
	 */
	export default function SETCHOICES(dataName: ChoiceFieldName, value: any): void;

}
declare module 'src/functions/SETCONFIGURATION' {
	interface Configuration {
	    /** When creating a new form, ensure that the location is set. */
	    auto_populate_location?: boolean;
	    /** Wait for a minimum accuracy before auto populating the location */
	    auto_populate_minimum_accuracy?: number;
	    /** Force a specific photo quality to be used when capturing */
	    photo_quality?: string;
	    /** Force a specific video quality to be used when capturing */
	    video_quality?: string;
	    /** Allow using the photo gallery to attach a photo to a PhotoField */
	    allow_photo_gallery?: boolean;
	    /** Allow using the photo gallery to attach a video to a VideoField */
	    allow_video_gallery?: boolean;
	    /** Enable putting the record in a draft state which cannot be synced. */
	    allow_draft_records?: boolean;
	    /** Enable setting the manual location of a record. */
	    allow_manual_location?: boolean;
	    /** Enable a warning if the accuracy of the GPS is too low */
	    warn_on_location_accuracy?: boolean;
	    title?: string;
	}
	/**
	 * Set form level configuration sttings
	 * @param settings key value pair of settings to configure
	 */
	export default function SETCONFIGURATION(settings: Configuration): void;
	export {};

}
declare module 'src/functions/SETDESCRIPTION' {
	import { FieldName } from 'src/types/fields';
	/**
	 * Sets the description of a field.
	 * @param dataName required; data name of targeted field
	 * @param value value to which description should be set
	 */
	export default function SETDESCRIPTION(dataName: FieldName, value: string): void;
	export default function SETDESCRIPTION(dataName: FieldName, value?: any): void;

}
declare module 'src/functions/SETREADONLY' {
	import { FieldName } from 'src/types/fields';
	/**
	 * Sets a field to read only or removes a read only condition.
	 * @param dataName required; data name of the targeted field
	 * @param value boolean value indicating whether to set as read only
	 * @example
	 *
	 * SETREADONLY("role", true) // sets role field to read only
	 */
	export default function SETREADONLY(dataName: FieldName, value: boolean): void;
	export default function SETREADONLY(dataName: FieldName, value?: boolean): void;

}
declare module 'src/functions/SETDISABLED' {
	import { FieldName } from 'src/types/fields';
	export default function SETDISABLED(dataName: FieldName, value: boolean): void;
	export default function SETDISABLED(dataName: FieldName, value?: boolean): void;

}
declare module 'src/functions/SETGEOMETRY' {
	import { ValidGeometry } from 'src/util/is-valid-geometry';
	/**
	 * Sets geometry values if a valid GeoJSON object is passed in.
	 * @param geometry GeoJSON object containing geometry `type` and lat-long `coordinates`
	 * @example
	 * SETGEOMETRY({ type: "Point", coordinates: [ 0, 0 ]}) // sets geometry to Null Island
	 */
	export default function SETGEOMETRY(geometry: ValidGeometry): void;
	export default function SETGEOMETRY(geometry: any): void;

}
declare module 'src/functions/SETHIDDEN' {
	import { FieldName } from 'src/types/fields';
	/**
	 * Sets a field to hidden or visible.
	 * @param dataName required; data name of targeted field
	 * @param value boolean value indicating whether to hide field
	 * @example
	 *
	 * SETHIDDEN("choice_field", true) // hide field
	 * SETHIDDEN("choice_field", false) // make field visible
	 */
	export default function SETHIDDEN(dataName: FieldName, value: boolean): void;
	export default function SETHIDDEN(dataName: FieldName, value?: boolean): void;

}
declare module 'src/functions/SETINTERVAL' {
	/**
	 * Sets up a function to be called repeatedly after a fixed time delay.
	 * The SETINTERVAL function can be used to repeatedly call a function at a specified interval.
	 * It’s nearly identical to the web platform standard
	 * [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval).
	 * @param function The function to execute after interval
	 * @param delay The number of milliseconds to delay (e.g. 1000 is 1 second)
	 * @returns timer ID that can be used to clear the interval with [CLEARINTERVAL](/data-events/reference/clearinterval)
	 * @example
	 * // Set a field label to the current GPS accuracy every 5 seconds
	 * ON('load-record', function(event) {
	 *  var fiveSeconds = 1000 * 5;

	 *  SETINTERVAL(function() {
	 *    if (CURRENTLOCATION()) {
	 *      SETLABEL('accuracy', CURRENTLOCATION().accuracy);
	 *    }
	 *   }, fiveSeconds);
	 *  });
	 */
	export default function SETINTERVAL(fn: Function, timeout: number): number;

}
declare module 'src/functions/SETLABEL' {
	import { FieldName } from 'src/types/fields';
	/**
	 * Sets the label of a field.
	 * @param dataName required; data name of targeted field
	 * @param value value to which label should be set
	 */
	export default function SETLABEL(dataName: FieldName, value: string): void;
	export default function SETLABEL(dataName: FieldName, value?: any): void;

}
declare module 'src/functions/SETLOCATION' {
	/**
	 * Sets location geometry given a latitude and longitude value.
	 * @param latitude numeric value fo latitude coordinate
	 * @param longitude number value for longitude coordinate
	 */
	export default function SETLOCATION(latitude: number, longitude: number): void;
	export default function SETLOCATION(latitude: string, longitude: string): void;
	export default function SETLOCATION(latitude?: any, longitude?: any): void;

}
declare module 'src/functions/SETMAXLENGTH' {
	import { FieldName } from 'src/types/fields';
	/**
	 * Sets the max length of a field.
	 * @param dataName required; data name of the targeted field
	 * @param value number representing max length desired
	 */
	export default function SETMAXLENGTH(dataName: FieldName, value: number): void;
	export default function SETMAXLENGTH(dataName: FieldName, value?: any): void;

}
declare module 'src/functions/SETMINLENGTH' {
	import { FieldName } from 'src/types/fields';
	/**
	 * Sets the minimum length of a field.
	 * @param dataName required; data name of the targeted field
	 * @param value number representing min length desired
	 */
	export default function SETMINLENGTH(dataName: FieldName, value: number): void;
	export default function SETMINLENGTH(dataName: FieldName, value?: any): void;

}
declare module 'src/functions/SETPROJECT' {
	/**
	 * Sets project for a record.
	 * @param project project name, string
	 */
	export default function SETPROJECT(project: string): void;
	export default function SETPROJECT(project: any): void;

}
declare module 'src/functions/SETREQUIRED' {
	import { FieldName } from 'src/types/fields';
	/**
	 * Sets a field to required or optional.
	 * @param dataName required; data name of targeted field
	 * @param value boolean value indicating whether to require field
	 * @example
	 *
	 * SETREQUIRED("choice_field", true) // set field to required
	 * SETREQUIRED("choice_field", false) // make field optional
	 */
	export default function SETREQUIRED(dataName: FieldName, value: boolean): void;
	export default function SETREQUIRED(dataName: FieldName, value?: boolean): void;

}
declare module 'src/functions/SETRESULT' {
	/**
	 * Sets result variable on runtime.
	 * @param result required; desired result
	 */
	export default function SETRESULT(result: any): void;

}
declare module 'src/functions/SETSTATUS' {
	/**
	 * Sets record's status.
	 * @param status status value, string
	 */
	export default function SETSTATUS(status: string): void;
	export default function SETSTATUS(status?: any): void;

}
declare module 'src/functions/SETSTATUSFILTER' {
	/**
	 * Set status filter values.
	 * @param value required; array of statuses (strings) or a single status to filter by
	 */
	export default function SETSTATUSFILTER(value: string[] | string): void;

}
declare module 'src/functions/SETSTATUSHIDDEN' {
	/**
	 * Sets status to hidden or visible.
	 * @param value boolean value indicating whether to hide status
	 */
	export default function SETSTATUSHIDDEN(value: boolean): void;

}
declare module 'src/functions/SETSTATUSREADONLY' {
	/**
	 * Sets status to read only or removes a read only condition.
	 * @param value required; boolean value indicating whether status should be read-only
	 */
	export default function SETSTATUSREADONLY(value: boolean): void;

}
declare module 'src/functions/SETTIMEOUT' {
	/**
	 * Calls a function after a specified delay.
	 * The SETTIMEOUT function can be used to delay execution of a function for a specified amount of time. It's
	 * nearly identical to the web platform standard
	 * [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout).
	 * @param function The function to execute after the delay
	 * @param delay The number of milliseconds to delay (e.g. 1000 is 1 second)
	 * @returns timer ID that can be used to clear the timeout with [CLEARTIMEOUT](/data-events/reference/cleartimeout/)
	 * @example
	 * ON('load-record', function(event) {
	 *   var fiveMinutes = 1000 * 60 * 5;
	 *
	 *   SETTIMEOUT(function() {
	 *     ALERT("You've been editing this record for 5 minutes.");
	 *   }, fiveMinutes);
	 * });
	 */
	export default function SETTIMEOUT(fn: Function, timeout: number): number;

}
declare module 'src/functions/SHOWERRORS' {
	/**
	 * Can toggle between settings to either show errors or not.
	 * @param showErrors optional; boolean value indiciating whether to show errors or not. Defaults to true.
	 * @example
	 * SHOWERRORS() // errors will be shown
	 * SHOWERRORS(false) // errors will not be shown
	 */
	export default function SHOWERRORS(showErrors?: boolean): void;

}
declare module 'src/functions/SHUFFLE' {
	/**
	 * Randomly shuffles values passed in and returns them as an array.
	 * @param values set of values to be shuffled
	 * @returns a shuffled array
	 * @example
	 *
	 * SHUFFLE([1, 2, 3], 4) // returns [4, 2, 3, 1]
	 */
	export default function SHUFFLE(...values: any[]): any[];

}
declare module 'src/functions/SIGN' {
	/**
	 * Returns the sign of a number.
	 * @param num required; numeric value
	 * @returns sign of a number: 1 for positive numbers, -1 for negative numbers, 0 for 0
	 * @example
	 *
	 * SIGN(9 * -3) // returns -1
	 */
	export default function SIGN(num: number): number;
	export default function SIGN(num: any): number;

}
declare module 'src/functions/SIN' {
	/**
	 * Returns the sine of the specified angle value, which must be specified in radians.
	 * @param value numeric value specifying radians
	 * @returns numeric value between 1 and -1 indicating the angle's sine
	 * @example
	 * SIN(12) // returns -0.5365729180004349
	 */
	export default function SIN(value: number): number;
	export default function SIN(value: string): number;

}
declare module 'src/functions/SINH' {
	/**
	 * Returns function returns the hyperbolic sine of a number
	 * @param value numeric value
	 * @returns numeric value of angle's hyperbolic sine
	 * @example
	 * SINH(12) // returns 0.8438539587324921
	 */
	export default function SINH(value: number): number;
	export default function SINH(value: string): number;
	export default function SINH(value: any): number;

}
declare module 'src/functions/SORT' {
	/**
	 * Sorts parameters passed in according to an optional callback. Defaults to basic comparison sort sans callback.
	 * @param args values to be sorted, optional callback must be passed in last
	 * @returns sorted list of values
	 * @example
	 * SORT(1, 3, 6, 6, 2) // returns [1, 2, 3 , 6, 6]
	 * SORT({test: 2}, {test: 1}, {test: 1}, (a: any, b: any) => a.test) // returns [{test: 1}, {test: 1}, {test: 2}]
	 */
	export default function SORT(...args: any[]): any[] | undefined;

}
declare module 'src/functions/SQRT' {
	/**
	 * Returns the square root of a number.
	 * @param num number to be evaluated
	 * @returns square root of original value
	 */
	export default function SQRT(num: number): number;
	export default function SQRT(num: string): number;
	export default function SQRT(num: any): number;

}
declare module 'src/functions/SQRTPI' {
	/**
	 * Returns the square root of a number times PI.
	 * @param num number to be evaluated
	 * @returns the sqrt of `num` * PI
	 */
	export default function SQRTPI(num: number): number;
	export default function SQRTPI(num: string): number;
	export default function SQRTPI(num: any): number;

}
declare module 'src/functions/STATUS' {
	/**
	 * Returns the record status or undefined if the status is not present.
	 */
	export default function STATUS(): string | undefined;

}
declare module 'src/functions/STATUSLABEL' {
	/**
	 * Returns the status value of a record.
	 */
	export default function STATUSLABEL(): string | undefined;

}
declare module 'src/functions/STORAGE' {
	import storage from 'src/host/storage';
	/**
	 * Returns a storage object for setting and getting local storage items.
	 * @example
	 * storage = STORAGE();
	 * KEY = 'item_key';
	 * storage.setItem(KEY, 'hello world');
	 *
	 * // Sets an item in local storage, must be a string
	 * @example
	 * item = storage.getItem(KEY);
	 *
	 * // Gets an item from storage if it exists, otherwise returns null
	 * @example
	 * geom = { type: 'Point', coordinates: [-100, 40] };
	 * storage.setItem('geometry', JSON.stringify(geom));
	 *
	 * anotherGeom = JSON.parse(storage.getItem('geometry'));
	 *
	 * // Use JSON.stringify and JSON.parse to serialize and deserialize objects in local storage
	 * @example
	 * storage.removeItem(KEY);
	 *
	 * // Removes an item from storage
	 * @example
	 * storage.clear();
	 *
	 * // Removes all items from storage
	 */
	export default function STORAGE(): typeof storage | Storage;

}
declare module 'src/functions/STRING' {
	/**
	 * Returns a single string of stringable values extracted from parameters.
	 * `null`, `undefined`, `NaN` values are ignored. STRING can be used to extract the following values from objects:
	 * `photo_id`, `video_id`, `audio_id`, `signature_id`, `record_id`, and `id`. STRING will unpack Choice field options
	 * if passed in.
	 * @param args list of values
	 * @returns a string of values separated by commas
	 * @example
	 *
	 * STRING(1, 2, null, 4) // returns "1, 2, 4"
	 * STRING({ choice_values: ["yes", "no"], other_values: ["maybe"] }) // returns "yes, no, maybe"
	 */
	export default function STRING(...args: any[]): string;

}
declare module 'src/functions/SUBSTITUTE' {
	/**
	 * Searches a string for a pattern and replaces it with a new substring.
	 * @param text required; text to be searched
	 * @param oldText required; pattern to be replaced
	 * @param newText required; substring to replace `oldText`
	 * @param occurrence optional; numeric value indicating at which occurrence of `oldText` should be replaced
	 * @returns string with new substring incorporated
	 *
	 * @example
	 *
	 * SUBSTITUTE('abc abc abc', 'abc', 'def', 2) // returns 'abc def abc'
	 */
	export default function SUBSTITUTE(text: string, oldText: string, newText: string, occurrence?: number): string | undefined;

}
declare module 'src/functions/SUMSQ' {
	/**
	 * Returns the sum of each number squared.
	 * @param args array of numbers
	 * @returns sum of the square of each argument
	 * @example
	 *
	 * SUMSQ(1, 2, 3, 4) // returns 30
	 */
	export default function SUMSQ(...args: number[]): number;
	export default function SUMSQ(...args: any[]): number;

}
declare module 'src/functions/T' {
	/**
	 * Stringifies the value passed in
	 * @param value required; value to be converted to a string
	 * @returns string value
	 * @example
	 *
	 * T(true) // returns "true"
	 */
	export default function T(value: any): string;

}
declare module 'src/functions/TIMEADD' {
	/**
	 * Adds specified amount of time to a time string.
	 * @param startTime required; string specifying a start time: XX:XX
	 * @param amount required; number of minutes or hours to be added
	 * @param format required; "hours" or "minutes" indicating where amount idicated is to be added
	 * @returns time string
	 */
	export default function TIMEADD(startTime: string, amount: number, format: string): string | undefined;
	export default function TIMEADD(startTime: any, amount: any, format?: any): string | undefined;

}
declare module 'src/functions/TIMEDIFF' {
	/**
	 * Returns the difference between two times in minutes or hours. Format defaults to hours if no format is specified.
	 * @param startTime required; string specifying a start time: XX:XX
	 * @param endTime required; string specifying an end time: XX:XX
	 * @param format optional; "hours" or "minutes"
	 * @returns numeric value indicating the difference between two times in either minutes or hours
	 * @example
	 * TIMEDIFF("14:00", "18:00") // returns 4
	 * TIMEDIFF("14:00", "18:00", "minutes") // returns 240
	 */
	export default function TIMEDIFF(startTime: string, endTime: string, format?: string): number | undefined;
	export default function TIMEDIFF(startTime: any, endTime: any, format?: any): number | undefined;

}
declare module 'src/functions/TIMESTAMP' {
	/**
	 * Returns a time stamp given a date object for display only. As it does not contain a timezone, it should not
	 * be used to perform calculations such as time deltas.
	 * @param date optional; Date object - if nothing is passed in to TIMESTAMP, today's timestamp will be returned
	 * @returns a string timestamp in YYYY-MM-DD HH:MM:SS format
	 * @example
	 * TIMESTAMP("December 16, 1982 03:24:00") // returns "1982-12-16 03:24:00"
	 */
	export default function TIMESTAMP(date: Date): string;
	export default function TIMESTAMP(date?: Date): string;

}
declare module 'src/functions/TIMEZONE' {
	/**
	 * Returns the current timezone or, if it's not available, the default timezone
	 * from the form configuration object.
	 */
	export default function TIMEZONE(): string;

}
declare module 'src/functions/TRIM' {
	/**
	 * Trims leading and trailing whitespace from a string.
	 * @param value required; string to be trimmed
	 * @returns trimmed string
	 * @example
	 * TRIM("  test  ") // returns "test"
	 */
	export default function TRIM(value: string): string;
	export default function TRIM(value: any): string;

}
declare module 'src/functions/TRUE' {
	/**
	 * Returns the boolean value `true`.
	 * @example
	 * TRUE() // returns true
	 */
	export default function TRUE(): true;

}
declare module 'src/functions/TYPEOF' {
	/**
	 * Returns a string describing the type of argument passed in.
	 * @param value required; value to be evaluated
	 * @returns a string indiciating the type of argument passed in
	 * @example
	 * TYPEOF("test") // "string"
	 * TYPEOF(true) // "boolean"
	 * TYPEOF(NaN) // "nan"
	 */
	export default function TYPEOF(value: any): string;

}
declare module 'src/functions/UNIQUE' {
	/**
	 * Evaluates an array of items for unqiueness and returns an array devoid of duplicates.
	 * If objects to be compared require an iteratee to extract data, it should be passed in as the last argument.
	 * @param args required; items to be evaluated
	 * @returns an array of unique items
	 * @example
	 * UNIQUE(1, 2, 5, 6, 3, 2, 1) // returns [ 1, 2, 5, 6, 3]
	 * UNIQUE({test: 1}, {test: 1}, {test: 2}, (a: any) => a.test) //     returns [{test: 1}, {test: 2}]
	 */
	export default function UNIQUE(...args: any[]): any[] | undefined;

}
declare module 'src/functions/UPPER' {
	import { GenericObject } from 'src/types/primitives';
	/**
	 * Returns a string of all uppercase letters
	 * @param value required; value to be converted to uppercase
	 * @returns string of uppercase letters
	 * @example
	 * UPPER("test") // returns "TEST"
	 */
	export default function UPPER(value: string): string;
	export default function UPPER(value: undefined | null | object | Array<any> | GenericObject): undefined;

}
declare module 'src/functions/USERFULLNAME' {
	/**
	 * Returns the current user's full name if it exists in the current configuration.
	 */
	export default function USERFULLNAME(): string | undefined;

}
declare module 'src/functions/VALUE' {
	import { FieldName, TextFieldName, NumericFieldName, YesNoFieldName, PhotoFieldName, VideoFieldName, AudioFieldName, ChoiceFieldName, RepeatableFieldName, SignatureFieldName, RecordLinkFieldName } from 'src/types/fields';
	import { TextFieldValue, NumericFieldValue, YesNoFieldValue, PhotoFieldValue, VideoFieldValue, AudioFieldValue, ChoiceFieldValue, RepeatableFieldValue, SignatureFieldValue, RecordLinkFieldValue } from 'src/types/values';
	/**
	 * Returns a data value when given the field's data name.
	 * @param dataName required; data name of the desired field
	 * @returns a form field value
	 */
	export default function VALUE(dataName: NumericFieldName): NumericFieldValue;
	export default function VALUE(dataName: TextFieldName): TextFieldValue;
	export default function VALUE(dataName: YesNoFieldName): YesNoFieldValue;
	export default function VALUE(dataName: PhotoFieldName): PhotoFieldValue;
	export default function VALUE(dataName: VideoFieldName): VideoFieldValue;
	export default function VALUE(dataName: AudioFieldName): AudioFieldValue;
	export default function VALUE(dataName: ChoiceFieldName): ChoiceFieldValue;
	export default function VALUE(dataName: RepeatableFieldName): RepeatableFieldValue;
	export default function VALUE(dataName: SignatureFieldName): SignatureFieldValue;
	export default function VALUE(dataName: RecordLinkFieldName): RecordLinkFieldValue;
	export default function VALUE(dataName: FieldName): string | undefined;
	export default function VALUE(dataName: string): string | undefined;
	export default function VALUE(dataName: any): any;

}
declare module 'src/functions/VERSIONINFO' {
	/**
	 * Returns device, platform, and application information.
	 * @param separator optional; character to separate each item returned - defaults to " ,"
	 * @example
	 * VERSIONINFO() // returns "Apple MQCK2LL/A, iOS 2.0, Chrome 4.2.3.5.2 Webkit"
	 */
	export default function VERSIONINFO(separator?: string): string;

}
declare module 'src/functions/YEAR' {
	import { MaybeString } from 'src/types/primitives';
	/**
	 * Returns a year given a date.
	 * @param date required; date, either as a Date object or a string
	 * @returns year as numeric value
	 * @example
	 * YEAR("2015/12/16") // returns 2015
	 * YEAR(new Date("2015/12/16 00:00:00") // returns 2015
	 */
	export default function YEAR(date: Date): number;
	export default function YEAR(date: MaybeString): number;
	export default function YEAR(): undefined;

}

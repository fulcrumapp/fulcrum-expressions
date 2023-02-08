export default `
/**
 * Parses the passed in value as a numeric value
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/num/
 * @param value (Number|String, required): value to be coerced to a numeric value
 * @returns a numeric value
 * @example
 * NUM('1') // returns 1
 */
declare function NUM(value: any): number;

/**
 * Returns the absolute value of a number.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/abs/
 * @param value (Number, required): number to be evaluated
 * @returns the absolute value of the \`value\` parameter
 * @example
 * ABS(-1) // returns 1
 */
declare function ABS(value: number): number;
/**
 * Returns the absolute value of a number.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/abs/
 * @param value (Number, required): number to be evaluated
 * @returns the absolute value of the \`value\` parameter
 * @example
 * ABS(-1) // returns 1
 */
declare function ABS(value: string): number;

/**
 * Returns the inverse cosine of a value, in radians.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/acos/
 * @param value (Number, required): number to calculate the inverse cosine. Must be between -1 and 1, inclusive.
 * @returns inverse cosine of \`value\` parameter
 * @example
 * ACOS(0.8) // returns 0.6435011087932843
 */
declare function ACOS(value: number): number;
/**
 * Returns the inverse cosine of a value, in radians.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/acos/
 * @param value (Number, required): number to calculate the inverse cosine. Must be between -1 and 1, inclusive.
 * @returns inverse cosine of \`value\` parameter
 * @example
 * ACOS(0.8) // returns 0.6435011087932843
 */
declare function ACOS(value: string): number;

/**
 * Returns the inverse hyperbolic cosine of a number.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/acosh/
 * @param value (Number, required): value to calculate the inverse hyperbolic cosine. Must be greater than or equal to 1.
 * @example
 * ACOSH(7) // returns 2.6339157938496336
 */
declare function ACOSH(value: number): number;
/**
 * Returns the inverse hyperbolic cosine of a number.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/acosh/
 * @param value (Number, required): value to calculate the inverse hyperbolic cosine. Must be greater than or equal to 1.
 * @example
 * ACOSH(7) // returns 2.6339157938496336
 */
declare function ACOSH(value: string): number;

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
declare function ALERT(message: ToStringable): void;
/**
 * Display a message as an alert. You can provide both the title and message of the alert box.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/alert/
 * @param title (String, required): short title for alert
 * @param message (String, required): message to display
 */
declare function ALERT(title: ToStringable, message: ToStringable): void;

interface Config {
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
interface FeatureGeometry {
    coordinates: string[];
}
 const DEFAULTS: {
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
 const CONFIG: () => Config;
/**
 * Resets the config to the application defaults.
 */
 const RESETCONFIG: () => void;
/**
 * Overwrites the current configuration of the Form to be the object passed in.
 * This method is destructive and should be private; use CONFIGURE to update configuration.
 * @param config object to replace configuration of Form
 */
 const OVERWRITECONFIG: (config: any) => any;

/**
 * Returns the altitude from the records geometry.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/altitude/
 */
declare function ALTITUDE(): number;

/**
 * Accepts an array of expressions and returns true if both are true, and false if both or one is false
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/and/
 * @param args (Any|Array required): array/list of items of any type
 * @returns boolean value
 * @example
 * AND('this' === 'that', 4 > 2) // returns false
 */
declare function AND(...args: any[]): boolean | null;

/**
 * Returns the name of the application Fulcrum is running on.
 * @returns name of application
 * @example
 * // running Fulcrum Desktop on Chrome Browser
 * APPLICATION() // returns 'Chrome'
 */
declare function APPLICATION(): string;

/**
 * Returns the name of the application engine Fulcrum is running on.
 * @returns name of application engine
 * @example
 * // running Fulcrum Desktop on Chrome Browser
 * APPLICATIONBUILD() // returns 'WebKit'
 */
declare function APPLICATIONBUILD(): string;

/**
 * Returns application version
 * @returns application version
 * @example
 * APPLICATIONVERSION() // returns 66.0
 */
declare function APPLICATIONVERSION(): string;

/**
 * Returns the name of the application engine, application platform, and application version
 * on which Fulcrum is running
 * @param separator optional; character string to separate application information, defaults to ", "
 * @returns name of application engine, application platform, and application version.
 * @example
 * // running Fulcrum Desktop on Chrome Browser
 * APPLICATIONINFO() // returns 'Chrome, 68.43.9.0.1, WebKit'
 */
declare function APPLICATIONINFO(separator?: string): string;

interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {
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
declare function FLATTEN(value: RecursiveArray<any>): any[];

/**
 * Accepts any number of arguments and returns them as an array
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/array/
 * @param args (Any|Array, required): list of items of any type
 * @returns an array flattened to on level deep
 * @example
 * ARRAY([1, 2], '3', [4, 5]) // returns [1, 2, '3', 4, 5]
 */
declare function ARRAY(...args: any[]): any[];

type AverageValues = Array<number | RecursiveArray<number>>;
/**
 * Accepts a list of numbers and returns their average (mean)
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/average/
 * @param values (Number|Array, required): integers or floats
 * @returns integer or float
 * @example
 * AVERAGE(3, 5) // returns 4
 */
declare function AVERAGE(...values: AverageValues): number;

/**
 * Returns a boolean value indicating if value passed in is a numeric value
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isnumber/
 * @param value (Any, required): value to be checked
 * @returns boolean
 * @example
 * ISNUMBER(8) // returns true
 */
declare function ISNUMBER(value: any): boolean;

/**
 * Returns a boolean value indicating if the passed in value is not a number
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isnan/
 * @param value (Any, required): value to be checked
 * @returns boolean value
 * @example
 * ISNAN("a7") // returns true
 */
declare function ISNAN(value: any): boolean;

/**
 * Returns the number of digits to the right of the decimal point
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/precision/
 * @param value (Number, required): number to be evaluated
 * @returns numberic value
 * @example
 * PRECISION(9.034) // returns 3
 */
declare function PRECISION(value: number): number;
/**
 * Returns the number of digits to the right of the decimal point
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/precision/
 * @param value (Number, required): number to be evaluated
 * @returns numberic value
 * @example
 * PRECISION(9.034) // returns 3
 */
declare function PRECISION(value: string): number;

/**
 * Rounds a number to given scale
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/round/
 * @param number (Number, required): numeric value to be rounded
 * @param scale (Number, optional): number of digits required after the decimal point
 * @returns rounded number
 * @example
 * ROUND(-2.3333333, 4) // return -2.3333;
 */
declare function ROUND(value: number): number;
/**
 * Rounds a number to given scale
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/round/
 * @param number (Number, required): numeric value to be rounded
 * @param scale (Number, optional): number of digits required after the decimal point
 * @returns rounded number
 * @example
 * ROUND(-2.3333333, 4) // return -2.3333;
 */
declare function ROUND(value: number, scale: number): number;
/**
 * Rounds a number to given scale
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/round/
 * @param number (Number, required): numeric value to be rounded
 * @param scale (Number, optional): number of digits required after the decimal point
 * @returns rounded number
 * @example
 * ROUND(-2.3333333, 4) // return -2.3333;
 */
declare function ROUND(value: string): number;
/**
 * Rounds a number to given scale
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/round/
 * @param number (Number, required): numeric value to be rounded
 * @param scale (Number, optional): number of digits required after the decimal point
 * @returns rounded number
 * @example
 * ROUND(-2.3333333, 4) // return -2.3333;
 */
declare function ROUND(value: string, scale: number): number;

/**
 * Returns number rounded up, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next highest integer (multiple of 1)
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/ceiling/
 * @param value (Number, required): value to be rounded
 * @param multiple (Number, optional): multiple to which \`value\` will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * CEILING(3.45) // returns 4
 * CEILING(2.3333333, 4) // returns 4
 */
declare function CEILING(value: number): number;
/**
 * Returns number rounded up, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next highest integer (multiple of 1)
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/ceiling/
 * @param value (Number, required): value to be rounded
 * @param multiple (Number, optional): multiple to which \`value\` will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * CEILING(3.45) // returns 4
 * CEILING(2.3333333, 4) // returns 4
 */
declare function CEILING(value: number, multiple: number): number;
/**
 * Returns number rounded up, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next highest integer (multiple of 1)
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/ceiling/
 * @param value (Number, required): value to be rounded
 * @param multiple (Number, optional): multiple to which \`value\` will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * CEILING(3.45) // returns 4
 * CEILING(2.3333333, 4) // returns 4
 */
declare function CEILING(value: string): number;
/**
 * Returns number rounded up, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next highest integer (multiple of 1)
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/ceiling/
 * @param value (Number, required): value to be rounded
 * @param multiple (Number, optional): multiple to which \`value\` will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * CEILING(3.45) // returns 4
 * CEILING(2.3333333, 4) // returns 4
 */
declare function CEILING(value: string, multiple: number): number;
/**
 * Returns number rounded up, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next highest integer (multiple of 1)
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/ceiling/
 * @param value (Number, required): value to be rounded
 * @param multiple (Number, optional): multiple to which \`value\` will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * CEILING(3.45) // returns 4
 * CEILING(2.3333333, 4) // returns 4
 */
declare function CEILING(): number;

/**
 * Returns the character of a given char code
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/char/
 * @param value (Number, required): integer (character code)
 * @returns a character as a string
 * @example
 * CHAR(65) // returns 'A'
 */
declare function CHAR(value: number): string;
/**
 * Returns the character of a given char code
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/char/
 * @param value (Number, required): integer (character code)
 * @returns a character as a string
 * @example
 * CHAR(65) // returns 'A'
 */
declare function CHAR(value: string): string;

type GUID = string
 type MaybeString = string | null | undefined
 type MaybeError = Error | null
 type GenericObject = { [k: string]: any }
 type FormFieldValues =
  ChoiceFieldValue
  | AddressFieldValue

 type TextFieldValue = string | null | undefined

 type YesNoFieldValue = string | null | undefined

 type NumericFieldValue = number | null | undefined

interface AddressFieldValue {
  sub_thoroughfare?: string|null,
  thoroughfare?: string|null,
  suite?: string|null,
  locality?: string|null,
  sub_admin_area?: string|null,
  admin_area?: string|null,
  postal_code?: string|null,
  country?: string|null
}

interface ChoiceFieldValue {
  choice_values?: string[] | null,
  other_values?: string[] | null
}

interface ClassificationFieldValue extends ChoiceFieldValue {}

interface PhotoFieldItem {
  photo_id: string,
  caption: string
}

 type PhotoFieldValue = Array<PhotoFieldItem> | null | undefined

interface VideoFieldItem {
  video_id: string,
  caption: string
}

 type VideoFieldValue = Array<VideoFieldItem> | null | undefined

interface AudioFieldItem {
  audio_id: string,
  caption: string
}

 type AudioFieldValue = Array<AudioFieldItem> | null | undefined

interface SignatureFieldValue {
  signature_id: string,
  timestamp: string
}

interface RecordLinkItem {
  record_id: string
}

 type RecordLinkFieldValue = Array<RecordLinkItem> | null | undefined

interface RepeatableItem {
  id: string,
  form_values: object
}

 type RepeatableFieldValue = Array<RepeatableItem> | null | undefined

interface CurrentLocation {
  latitude: number,
  longitude: number,
  altitude: number | null,
  accuracy: number,
  course: number | null,
  speed: number | null,
  timestamp: number
}
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
declare function ISBLANK(value: ChoiceFieldValue): boolean;
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
declare function ISBLANK(value: any): boolean;
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
declare function ISBLANK(): boolean;

/**
 * Converts a choicefield object to an array with null values and blank strings removed
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/choicevalues/
 * @param field (ChoiceFieldValue, required)
 * @returns array of choice values
 * @example
 * CHOICEVALUES($choice_field) // returns [ 'a', 'b', 'c', 'd' ]
 */
declare function CHOICEVALUES(field: ChoiceFieldValue): string[];
/**
 * Converts a choicefield object to an array with null values and blank strings removed
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/choicevalues/
 * @param field (ChoiceFieldValue, required)
 * @returns array of choice values
 * @example
 * CHOICEVALUES($choice_field) // returns [ 'a', 'b', 'c', 'd' ]
 */
declare function CHOICEVALUES(field: any): any[];
/**
 * Converts a choicefield object to an array with null values and blank strings removed
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/choicevalues/
 * @param field (ChoiceFieldValue, required)
 * @returns array of choice values
 * @example
 * CHOICEVALUES($choice_field) // returns [ 'a', 'b', 'c', 'd' ]
 */
declare function CHOICEVALUES(): undefined;

/**
 * Returns the first choice value in the choice field value passed to the function
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/choicevalue/
 * @param field (ChoiceField value, required): \`{choice_values: ['a', 'b'], other_values" ['c', 'd']}\`
 * @returns string, first choice in a list of choice field values
 * @example
 * CHOICEVALUE($choice_field) // returns "Red"
 */
declare function CHOICEVALUE(field: ChoiceFieldValue): MaybeString;
/**
 * Returns the first choice value in the choice field value passed to the function
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/choicevalue/
 * @param field (ChoiceField value, required): \`{choice_values: ['a', 'b'], other_values" ['c', 'd']}\`
 * @returns string, first choice in a list of choice field values
 * @example
 * CHOICEVALUE($choice_field) // returns "Red"
 */
declare function CHOICEVALUE(field: any): MaybeString;

/**
 * Removes non-printable characters from a string
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/clean/
 * @param text (String, required): text to be cleaned
 * @returns cleaned string
 * @example
 * CLEAN('test\x00\x1D\x1Etest') // returns 'testtest'
 */
declare function CLEAN(text: string): string;

interface AsyncFunctionSchema {
    [key: number]: Function;
}
interface SetIntervalSchema {
    [key: number]: number;
}
interface HostState {
    timeouts: AsyncFunctionSchema;
    intervals: SetIntervalSchema;
    nextTimeoutID: number;
    nextIntervalID: number;
}
 const resetState: () => void;
 const state: () => HostState;

/**
 * Removes a timeout call from the host queue.
 * @param id id of the setTimeout call
 */
declare function clearTimeout(id: number): void;

/**
 * Clears an interval from event queue.
 * @param id required; id for interval to be cleared
 */
declare function clearInterval(id: number): void;

/**
 * Clears an interval that was previously started with \`SETINTERVAL\`.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/clearinterval/
 * @param id (Number, required): interval ID to clear
 */
declare function CLEARINTERVAL(id: number): void;

/**
 * Clears a timeout that was previously started with \`SETTIMEOUT\`.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/cleartimeout/
 * @param id (Number, required): id of timeout to clear
 */
declare function CLEARTIMEOUT(id: number): void;

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
declare function COALESCE(...args: any[]): string | number | undefined;
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
declare function COALESCE(): undefined;

/**
 * Returns numeric code for first character in passed in string
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/code/
 * @param str (String, required): character to be evaluated
 * @returns numeric code
 * @example
 * CODE("A") // returns 65
 */
declare function CODE(str: MaybeString): number;
/**
 * Returns numeric code for first character in passed in string
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/code/
 * @param str (String, required): character to be evaluated
 * @returns numeric code
 * @example
 * CODE("A") // returns 65
 */
declare function CODE(str: number): number;
/**
 * Returns numeric code for first character in passed in string
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/code/
 * @param str (String, required): character to be evaluated
 * @returns numeric code
 * @example
 * CODE("A") // returns 65
 */
declare function CODE(str: Object): number;
/**
 * Returns numeric code for first character in passed in string
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/code/
 * @param str (String, required): character to be evaluated
 * @returns numeric code
 * @example
 * CODE("A") // returns 65
 */
declare function CODE(str: any[]): number;
/**
 * Returns numeric code for first character in passed in string
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/code/
 * @param str (String, required): character to be evaluated
 * @returns numeric code
 * @example
 * CODE("A") // returns 65
 */
declare function CODE(): number;

/**
 * Returns a compacted array without null or undefined values.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/compact/
 * @param value (Array, required): array to compact
 * @returns a compacted array with null and undefined values removed
 * @example
 * COMPACT(['a', 'b', null, 'c']) // returns ['a', 'b', 'c']
 */
declare function COMPACT(value: any[]): any[] | undefined;
/**
 * Returns a compacted array without null or undefined values.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/compact/
 * @param value (Array, required): array to compact
 * @returns a compacted array with null and undefined values removed
 * @example
 * COMPACT(['a', 'b', null, 'c']) // returns ['a', 'b', 'c']
 */
declare function COMPACT(value: any): undefined;
/**
 * Returns a compacted array without null or undefined values.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/compact/
 * @param value (Array, required): array to compact
 * @returns a compacted array with null and undefined values removed
 * @example
 * COMPACT(['a', 'b', null, 'c']) // returns ['a', 'b', 'c']
 */
declare function COMPACT(): undefined;

/**
 * Returns a concatenated string
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/concatenate/
 * @param strings (String|Array, required): strings to be concatenated
 * @returns a single concatenated string
 * @example
 * CONCATENATE('hello', 'world') // returns 'helloworld'
 */
declare function CONCATENATE(...strings: any[]): string;
/**
 * Returns a concatenated string
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/concatenate/
 * @param strings (String|Array, required): strings to be concatenated
 * @returns a single concatenated string
 * @example
 * CONCATENATE('hello', 'world') // returns 'helloworld'
 */
declare function CONCATENATE(): string;

/**
 * Returns a concatenated string
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/concat/
 * @param strings (String|Array, required): strings to be concatenated
 * @returns a single concatenated string
 * @example
 * CONCAT('hello', 'world') // returns 'helloworld'
 */
declare function CONCAT(...strings: any[]): string;
/**
 * Returns a concatenated string
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/concat/
 * @param strings (String|Array, required): strings to be concatenated
 * @returns a single concatenated string
 * @example
 * CONCAT('hello', 'world') // returns 'helloworld'
 */
declare function CONCAT(): string;

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
declare function CONFIGURE(config: Config | any): Config;
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
declare function CONFIGURE(config: Config | any, merge: boolean): Config;
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
declare function CONFIGURE(): Config;

/**
 * Allows throwing of errors for validation, etc.
 * @param message (String, required): error message to display
 * @throws Error entered by the user
 */
declare function ERROR(message: string): void;

declare function messageBox(json: string, wrapper: Function): void;

interface MessageBoxPayload {
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
declare function MESSAGEBOX(options: MessageBoxPayload, callback: Function): void;
/**
 * MESSAGEBOX displays a message to the user. You can provide both the title and message of the alert box.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/messagebox/
 * @param options (MessageBoxPayload, required): options for the message box
 * @param callback (Function, required): invoked when message box is dismissed
 * @returns invokes callback or returns an options Object
 */
declare function MESSAGEBOX(options: MessageBoxPayload): void;
/**
 * MESSAGEBOX displays a message to the user. You can provide both the title and message of the alert box.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/messagebox/
 * @param options (MessageBoxPayload, required): options for the message box
 * @param callback (Function, required): invoked when message box is dismissed
 * @returns invokes callback or returns an options Object
 */
declare function MESSAGEBOX(options: MessageBoxPayload, callback: Function): void;

/**
 * CONFIRM displays a message to the user and allows a callback function
 * that will be invoked to respond to the result of the question.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/confirm/
 * @param title (String, required): short title for popup box
 * @param message (String, required): message to display to the user
 * @param callback (Function, required): to be invoked upon closing the popup box
 */
declare function CONFIRM(title: string, message: string, callback: Function): void;
/**
 * CONFIRM displays a message to the user and allows a callback function
 * that will be invoked to respond to the result of the question.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/confirm/
 * @param title (String, required): short title for popup box
 * @param message (String, required): message to display to the user
 * @param callback (Function, required): to be invoked upon closing the popup box
 */
declare function CONFIRM(message: string, callback: Function): void;

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
declare function CONTAINS(haystack: string | any[], needle: MaybeString | number): boolean;
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
declare function CONTAINS(haystack: string | any[], needle: MaybeString | number, fromIndex?: number): boolean;
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
declare function CONTAINS(haystack: string | any[], needle: MaybeString | number, fromIndex?: any): boolean;
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
declare function CONTAINS(haystack: any, needle: MaybeString | number): boolean;

/**
 * Returns the cosine of the specified angle value, which must be specified in radians.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/cos/
 * @param value (Number, required): value specifying radians
 * @returns number, value between 1 and -1 indicating the angle's cosine
 * @example
 * COS(12) // returns 0.8438539587324921
 */
declare function COS(value: number): number;
/**
 * Returns the cosine of the specified angle value, which must be specified in radians.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/cos/
 * @param value (Number, required): value specifying radians
 * @returns number, value between 1 and -1 indicating the angle's cosine
 * @example
 * COS(12) // returns 0.8438539587324921
 */
declare function COS(value: string): number;

/**
 * Returns function returns the hyperbolic cosine of a number
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/cosh/
 * @param value (Number, required)
 * @returns number, value between 1 and -1 indicating the angle's cosine
 * @example
 * COSH(12) // returns 0.8438539587324921
 */
declare function COSH(value: number): number;
/**
 * Returns function returns the hyperbolic cosine of a number
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/cosh/
 * @param value (Number, required)
 * @returns number, value between 1 and -1 indicating the angle's cosine
 * @example
 * COSH(12) // returns 0.8438539587324921
 */
declare function COSH(value: string): number;

/**
 * Returns the count of the numeric values in an array.
 * Will coerce numeric strings (\`"1"\`) into a numeric value (\`1\`).
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/count/
 * @param value (Number|String|Array, required): items to be counted
 * @returns number
 * @example
 * COUNT([1, "2", null, 3, null]) // returns 3
 */
declare function COUNT(value: number[]): number;
/**
 * Returns the count of the numeric values in an array.
 * Will coerce numeric strings (\`"1"\`) into a numeric value (\`1\`).
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/count/
 * @param value (Number|String|Array, required): items to be counted
 * @returns number
 * @example
 * COUNT([1, "2", null, 3, null]) // returns 3
 */
declare function COUNT(value: string[]): number;
/**
 * Returns the count of the numeric values in an array.
 * Will coerce numeric strings (\`"1"\`) into a numeric value (\`1\`).
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/count/
 * @param value (Number|String|Array, required): items to be counted
 * @returns number
 * @example
 * COUNT([1, "2", null, 3, null]) // returns 3
 */
declare function COUNT(): undefined;
/**
 * Returns the count of the numeric values in an array.
 * Will coerce numeric strings (\`"1"\`) into a numeric value (\`1\`).
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/count/
 * @param value (Number|String|Array, required): items to be counted
 * @returns number
 * @example
 * COUNT([1, "2", null, 3, null]) // returns 3
 */
declare function COUNT(value: any): number | undefined;

/**
 * Returns a count of the items in a list that are not null, undefined, or blank
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/counta/
 * @param value (Any|Array, required): items to be counted
 * @returns number
 * @example
 * COUNTA(["orange", "lemon", null, "grape"]) // returns 3
 */
declare function COUNTA(value: any[]): number;
/**
 * Returns a count of the items in a list that are not null, undefined, or blank
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/counta/
 * @param value (Any|Array, required): items to be counted
 * @returns number
 * @example
 * COUNTA(["orange", "lemon", null, "grape"]) // returns 3
 */
declare function COUNTA(value: any): number;
/**
 * Returns a count of the items in a list that are not null, undefined, or blank
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/counta/
 * @param value (Any|Array, required): items to be counted
 * @returns number
 * @example
 * COUNTA(["orange", "lemon", null, "grape"]) // returns 3
 */
declare function COUNTA(): number;

/**
 * Returns a count of the number of blank items.
 * Items considered blank include \`null\`, \`undefined\`, \`[]\`, \`{}\`, and \`""\`.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/countblank/
 * @param args (Any|Array, required): items to be counted
 * @returns number
 * @example
 * COUNTBLANK([1, 2, null, 3]) // returns 1
 */
declare function COUNTBLANK(...args: any[]): number;
/**
 * Returns a count of the number of blank items.
 * Items considered blank include \`null\`, \`undefined\`, \`[]\`, \`{}\`, and \`""\`.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/countblank/
 * @param args (Any|Array, required): items to be counted
 * @returns number
 * @example
 * COUNTBLANK([1, 2, null, 3]) // returns 1
 */
declare function COUNTBLANK(): number;

/**
 * Returns the current country or, if it's not available, the default country
 * from the form configuration object.
 */
declare function COUNTRY(): string;

/**
 * Returns the current currency code or, if it's not available, the default
 * currency code from the form configuration object.
 */
declare function CURRENCYCODE(): string;

/**
 * Returns the current currency symbol or, if it's not available, the default
 * currency symbol from the form configuration object.
 */
declare function CURRENCYSYMBOL(): string;

/**
 *  Returns the current device location as an object. This can be used for Q/A purposes or
 *  other custom processing logic. This is not always the same as the record location.
 *  location will be different.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/currentlocation/
 */
declare function CURRENTLOCATION(): CurrentLocation | null;



 type FormFieldTypes =
  "TextField"
  | "YesNoField"
  | "Label"
  | "Section"
  | "ChoiceField"
  | "ClassificationField"
  | "PhotoField"
  | "VideoField"
  | "AudioField"
  | "AttachmentField"
  | "BarcodeField"
  | "DateTimeField"
  | "TimeField"
  | "Repeatable"
  | "AddressField"
  | "SignatureField"
  | "HyperlinkField"
  | "CalculatedField"
  | "RecordLinkField"

 type FormFields =
  FormTextField
  | DateTimeField
  | DateTimeField
  | TimeField
  | YesNoField
  | BarcodeField
  | ChoiceField
  | ClassificationField
  | PhotoField
  | VideoField
  | AudioField
  | AttachmentField
  | Section
  | Label
  | AddressField
  | SignatureField
  | HyperlinkField
  | CalculatedField
  | RecordLinkField
  | RepeatableField

interface FormField {
  type: FormFieldTypes
  /** The id for the field. Must be unique to the form and lowercase. The Fulcrum app builder uses
   * system generated 4 character codes. */
  key: string
  /** The field label, visible to mobile and web users. */
  label: string
  /** Can be set manually or auto generated using the label of the element. This field will be
   * the column name on all ed files. It is recommended to use something that works easily
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
   * the column name on all ed files. It is recommended to use something that works easily
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
  /** The value to match against key field. (empty string for \`is_empty\` and \`is_not_empty\`) */
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

interface BarcodeField extends FormField, FormFieldDefaultPreviousValue {
  type: "BarcodeField"
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
  allow_other?: boolean,
  /** Reference to a predefined choice list */
  choice_list_id?: string
}

interface ClassificationField extends FormField, FormFieldDefaultPreviousValue {
  type: "ClassificationField"
  /** The id of the classification set to reference. */
  classification_set_id: GUID,
  /** Allow other values? */
  allow_other?: boolean
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

interface AttachmentField extends FormField {
  type: "AttachmentField"
}

interface Section extends FormField {
  type: "Section"
  /** Display type for the section */
  display: "inline" | "drilldown"
  /** FormField's nested inside of this section */
  elements: FormFields[]
}

interface Label extends FormField {
  type: "Label"
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

interface CalculatedField extends FormField, FormFieldDefaultPreviousValue {
  type: "CalculatedField"
  display: DisplayOptions
}

/** Calculation display object. If the style is "currency" then a local currecy is required. */
interface DisplayOptions {
  style: "text" | "number" | "date" | "currency"
  currency?: string
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
declare function DATANAMES(): FieldName[];
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
declare function DATANAMES(type: FormFieldTypes): FieldName[];
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
declare function DATANAMES(type: string): FieldName[];

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
declare function FLOOR(value: number): number;
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
declare function FLOOR(value: number, multiple: number): number;
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
declare function FLOOR(value: string): number;
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
declare function FLOOR(value: string, multiple: number): number;
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
declare function FLOOR(): number;

/**
 * Returns number rounded down, away from zero, to the nearest interger
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/int/
 * @param number (Number, required): value to be converted
 * @param multiple (Number, optional): multiple to which a \`number\` will be converted
 * @returns number converted to an int, rounded to nearest multiple
 * @example
 * INT(3.45) // returns 3
 */
declare function INT(number: number, multiple?: number): number;

/**
 * Returns a new Date object given a year, month, and day.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/date/
 * @param year (Number, required): four-digit number
 * @param month (Number, required): one-two digit number
 * @param day (Number, required): one-two digit number
 * @returns Date object
 */
declare function DATE(year: number, month: number, day: number): Date;
/**
 * Returns a new Date object given a year, month, and day.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/date/
 * @param year (Number, required): four-digit number
 * @param month (Number, required): one-two digit number
 * @param day (Number, required): one-two digit number
 * @returns Date object
 */
declare function DATE(year: string, month: string, day: string): Date | undefined;
/**
 * Returns a new Date object given a year, month, and day.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/date/
 * @param year (Number, required): four-digit number
 * @param month (Number, required): one-two digit number
 * @param day (Number, required): one-two digit number
 * @returns Date object
 */
declare function DATE(year?: any, month?: any, day?: any): undefined;
/**
 * Returns a new Date object given a year, month, and day.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/date/
 * @param year (Number, required): four-digit number
 * @param month (Number, required): one-two digit number
 * @param day (Number, required): one-two digit number
 * @returns Date object
 */
declare function DATE(): undefined;

/**
 * Returns the right characters of a string, i.e. the characters starting at index -1
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/right/
 * @param value (String, required): string to parse
 * @param numberOfCharacters (Number, optional): number of characters to be returned
 * @returns a substring of characters
 * @example
 * RIGHT("abc") // returns "c"
 */
declare function RIGHT(value: string, numberOfCharacters: number): MaybeString;
/**
 * Returns the right characters of a string, i.e. the characters starting at index -1
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/right/
 * @param value (String, required): string to parse
 * @param numberOfCharacters (Number, optional): number of characters to be returned
 * @returns a substring of characters
 * @example
 * RIGHT("abc") // returns "c"
 */
declare function RIGHT(value: any, numberOfCharacters?: any): MaybeString;
/**
 * Returns the right characters of a string, i.e. the characters starting at index -1
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/right/
 * @param value (String, required): string to parse
 * @param numberOfCharacters (Number, optional): number of characters to be returned
 * @returns a substring of characters
 * @example
 * RIGHT("abc") // returns "c"
 */
declare function RIGHT(): undefined;

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
declare function LPAD(value: string, count: number, padding?: string): MaybeString;
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
declare function LPAD(value: any, count: any, padding?: any): MaybeString;
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
declare function LPAD(): undefined;

/**
 * Returns a date value given a date and optional time string
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/datevalue/
 * @param dateString (String|Date, required): string in XXXX-XX-XX format or a Date object
 * @param timeString (String, optional): string in XX:XX or XX:XX:XX format
 * @returns Date value
 */
declare function DATEVALUE(dateString: Date | MaybeString, timeString?: string): Date;
/**
 * Returns a date value given a date and optional time string
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/datevalue/
 * @param dateString (String|Date, required): string in XXXX-XX-XX format or a Date object
 * @param timeString (String, optional): string in XX:XX or XX:XX:XX format
 * @returns Date value
 */
declare function DATEVALUE(dateString: string): Date;
/**
 * Returns a date value given a date and optional time string
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/datevalue/
 * @param dateString (String|Date, required): string in XXXX-XX-XX format or a Date object
 * @param timeString (String, optional): string in XX:XX or XX:XX:XX format
 * @returns Date value
 */
declare function DATEVALUE(dateString: Date): Date;
/**
 * Returns a date value given a date and optional time string
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/datevalue/
 * @param dateString (String|Date, required): string in XXXX-XX-XX format or a Date object
 * @param timeString (String, optional): string in XX:XX or XX:XX:XX format
 * @returns Date value
 */
declare function DATEVALUE(): undefined;

/**
 * Adds a given number of days to a date.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/dateadd/
 * @param date (Date|String, required): Date object or string in XXXX-XX-XX format
 * @param number (Number, required): number of days to be added as an integer
 * @returns Date object
 */
declare function DATEADD(date: Date | MaybeString, number: number): Date | undefined;

/**
 * Returns a day given a date.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/day/
 * @param date (Date|String, required): Date object or a string in XXXX-XX-XX format
 * @returns day as numeric value
 * @example
 * DAY("2015/12/16") // returns 16
 */
declare function DAY(date: Date): number;
/**
 * Returns a day given a date.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/day/
 * @param date (Date|String, required): Date object or a string in XXXX-XX-XX format
 * @returns day as numeric value
 * @example
 * DAY("2015/12/16") // returns 16
 */
declare function DAY(date: MaybeString): number;
/**
 * Returns a day given a date.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/day/
 * @param date (Date|String, required): Date object or a string in XXXX-XX-XX format
 * @returns day as numeric value
 * @example
 * DAY("2015/12/16") // returns 16
 */
declare function DAY(): undefined;

/**
 * Returns the decimal seperator character or, if it's not available, the default character
 * from the form configuration object.
 */
declare function DECIMALSEPARATOR(): string;

/**
 * Returns degrees for an input of radians.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/degrees/
 * @param value (Number, required): numeric value representing a value in radians
 * @returns numeric value representing degrees
 * @example
 * DEGREES(Math.PI) // returns 180
 */
declare function DEGREES(value: number | string): number;
/**
 * Returns degrees for an input of radians.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/degrees/
 * @param value (Number, required): numeric value representing a value in radians
 * @returns numeric value representing degrees
 * @example
 * DEGREES(Math.PI) // returns 180
 */
declare function DEGREES(value: undefined | null): number;
/**
 * Returns degrees for an input of radians.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/degrees/
 * @param value (Number, required): numeric value representing a value in radians
 * @returns numeric value representing degrees
 * @example
 * DEGREES(Math.PI) // returns 180
 */
declare function DEGREES(): number;
/**
 * Returns degrees for an input of radians.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/degrees/
 * @param value (Number, required): numeric value representing a value in radians
 * @returns numeric value representing degrees
 * @example
 * DEGREES(Math.PI) // returns 180
 */
declare function DEGREES(value?: any): number;

/**
 * Returns definition object for a specified field
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/field/
 * @param dataName (String, required): data name of the field
 * @example
 * FIELD('child_item_cost').label // returns "Child Item Cost"
 */
declare function FIELD(dataName: FieldName): FormField;
/**
 * Returns definition object for a specified field
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/field/
 * @param dataName (String, required): data name of the field
 * @example
 * FIELD('child_item_cost').label // returns "Child Item Cost"
 */
declare function FIELD(dataName: FieldName | string | null | undefined): FormField | undefined;

/**
 * Returns a field's description.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/description/
 * @param dataName (String, required): data name of desired field
 * @returns string, the field's description
 */
declare function DESCRIPTION(dataName: MaybeString): string | undefined;
/**
 * Returns a field's description.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/description/
 * @param dataName (String, required): data name of desired field
 * @returns string, the field's description
 */
declare function DESCRIPTION(): undefined;

/**
 * Returns the device manufacturer or an empty string
 */
declare function DEVICEMANUFACTURER(): string;

/**
 * Returns the device model or an empty string if the device model is not present.
 */
declare function DEVICEMODEL(): string;

/**
 * Returns device info, including the device manufacturer and model
 * @param separator (String, optional): character to separate device manufacturer and model, defauls to \`", "\`
 * @returns string
 * @example
 * DEVICEINFO() // returns "Apple, MQCK2LL/A"
 */
declare function DEVICEINFO(separator?: string): string;
/**
 * Returns device info, including the device manufacturer and model
 * @param separator (String, optional): character to separate device manufacturer and model, defauls to \`", "\`
 * @returns string
 * @example
 * DEVICEINFO() // returns "Apple, MQCK2LL/A"
 */
declare function DEVICEINFO(separator?: any): string;

/**
 * Returns the user's email from the configuration object.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/email/
 */
declare function EMAIL(): string | undefined;

/**
 * Returns number rounded up to the nearest even integer
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/even/
 * @param value (Number, required): number to evaluate
 * @returns number
 * @example
 * EVEN(-3.4) // returns -2
 */
declare function EVEN(value: number): number;
/**
 * Returns number rounded up to the nearest even integer
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/even/
 * @param value (Number, required): number to evaluate
 * @returns number
 * @example
 * EVEN(-3.4) // returns -2
 */
declare function EVEN(value: string): number;
/**
 * Returns number rounded up to the nearest even integer
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/even/
 * @param value (Number, required): number to evaluate
 * @returns number
 * @example
 * EVEN(-3.4) // returns -2
 */
declare function EVEN(value: any): number;

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
declare function EXACT(value1: any, value2: any): boolean;

/**
 * Checks whether all values passed in exist.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/exists/
 * @param args (Any|Array): list of items to check
 * @returns boolean value indicating whether all values exist
 * @example
 * EXISTS(1, 3, 7, null) // returns false
 */
declare function EXISTS(arg: any, ...args: any[]): arg is number | boolean | string | object;
/**
 * Checks whether all values passed in exist.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/exists/
 * @param args (Any|Array): list of items to check
 * @returns boolean value indicating whether all values exist
 * @example
 * EXISTS(1, 3, 7, null) // returns false
 */
declare function EXISTS(...args: any[]): boolean;

/**
 * Returns e^x, where \`x\` is the argument, and \`e\` is Euler's number, the base of natural logarithms.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/exp/
 * @param x (Number, required): exponent value
 * @returns number,\`e\` to the \`x\` power
 * @example
 * EXP(1) // returns 2.718281828459045
 */
declare function EXP(x: number): number;
/**
 * Returns e^x, where \`x\` is the argument, and \`e\` is Euler's number, the base of natural logarithms.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/exp/
 * @param x (Number, required): exponent value
 * @returns number,\`e\` to the \`x\` power
 * @example
 * EXP(1) // returns 2.718281828459045
 */
declare function EXP(x: string): number;

/**
 * Memoized store for \`FACT\` function
 */
declare function MEMOIZED_FACT(): number[];
 function RESET_MEMOIZED_FACT(): number[];

/**
 * Returns factorial of a number, n (n!)
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/fact/
 * @param value (Number, required): postive integer
 * @returns factorial of \`value\`
 * @example
 * FACT(7) // returns 5040
 */
declare function FACT(value: any): number;

/**
 * Memoized store for \`FACTDOUBLE\` function
 */
declare function MEMOIZED_FACTDOUBLE(): number[];
 function RESET_MEMOIZED_FACTDOUBLE(): number[];

/**
 * Returns double factorial of a number, n (n!!)
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/factdouble/
 * @param value (Number, required): postive integer
 * @returns factorial of value
 * @example
 * FACT(5) // returns 15
 */
declare function FACTDOUBLE(value: any): number;

/**
 * Returns the boolean value \`false\`.
 * @example
 * FALSE() // returns false
 */
declare function FALSE(): false;


interface FieldsOptions {
    repeatables?: boolean;
    sections?: boolean;
}
/**
 * Returns child fields of a repeatable or section field associated with a given data name
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/fields/
 * @param dataName (String, required): parent field's data name
 * @param options (Object, optional): object indicating if result should be flattened recursively,
 * e.g. \`{ repeatables: boolean, sections: boolean }\`
 * @returns array of child fields
 */
declare function FIELDS(dataName: ContainerFieldName): FormFields[];
/**
 * Returns child fields of a repeatable or section field associated with a given data name
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/fields/
 * @param dataName (String, required): parent field's data name
 * @param options (Object, optional): object indicating if result should be flattened recursively,
 * e.g. \`{ repeatables: boolean, sections: boolean }\`
 * @returns array of child fields
 */
declare function FIELDS(dataName: ContainerFieldName, options: FieldsOptions): FormFields[];
/**
 * Returns child fields of a repeatable or section field associated with a given data name
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/fields/
 * @param dataName (String, required): parent field's data name
 * @param options (Object, optional): object indicating if result should be flattened recursively,
 * e.g. \`{ repeatables: boolean, sections: boolean }\`
 * @returns array of child fields
 */
declare function FIELDS(): undefined;

/**
 * Returns child field names when passed in a parent's dataname
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/fieldnames/
 * @param dataName (String, required): parent field's data name
 * @param options (Object, optional); object indicating if result should be flattened recursively,
 * e.g. \`{ repeatables: boolean, sections: boolean }\`
 * @returns array of child field names
 */
declare function FIELDNAMES(dataName: ContainerFieldName, options?: FieldsOptions): FieldName[] | undefined;
/**
 * Returns child field names when passed in a parent's dataname
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/fieldnames/
 * @param dataName (String, required): parent field's data name
 * @param options (Object, optional); object indicating if result should be flattened recursively,
 * e.g. \`{ repeatables: boolean, sections: boolean }\`
 * @returns array of child field names
 */
declare function FIELDNAMES(dataName: ContainerFieldName): FieldName[] | undefined;

/**
 * Returns a field's type.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/fieldtype/
 * @param dataName (String, required): data name of desired field
 * @returns the field's type
 * @example
 * FIELDTYPE("operating_hours") // returns "TimeField"
 */
declare function FIELDTYPE(dataName: FieldName): string | undefined;

/**
 * Returns the first n items of an array or string.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/first/
 * @param item (Array, required): array to evaluate
 * @param n (Number, optional): number of items to return, defaults to 1
 * @returns a single value or an array of values
 */
declare function FIRST(item: any[] | string, n: number): any[] | undefined;
/**
 * Returns the first n items of an array or string.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/first/
 * @param item (Array, required): array to evaluate
 * @param n (Number, optional): number of items to return, defaults to 1
 * @returns a single value or an array of values
 */
declare function FIRST(item: any[] | string, n?: number): any[] | undefined;
/**
 * Returns the first n items of an array or string.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/first/
 * @param item (Array, required): array to evaluate
 * @param n (Number, optional): number of items to return, defaults to 1
 * @returns a single value or an array of values
 */
declare function FIRST(item: any): any[] | undefined;

/**
 * Returns locale-specific symbol to group large numbers - defaults to ','
 */
declare function GROUPINGSEPARATOR(): string;

/**
 * Returns locale-specific increment with which to group large numbers - defaults to 3 (thousands)
 */
declare function GROUPINGSIZE(): number;

/**
 * Returns max value from a list of values
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/max/
 * @param args (Number|Array, required): list of numeric values
 * @returns max value in numeric form
 * @example
 * MAX(1, 4, 7, 2, 4) // returns 7
 */
declare function MAX(...args: number[]): number | undefined;
/**
 * Returns max value from a list of values
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/max/
 * @param args (Number|Array, required): list of numeric values
 * @returns max value in numeric form
 * @example
 * MAX(1, 4, 7, 2, 4) // returns 7
 */
declare function MAX(...args: any[]): number | undefined;

/**
 * Returns min value from a list of values
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/min/
 * @param args (Number|Array, required): list of numeric values
 * @returns min numberic value among parameters
 * @example
 * MIN(7, 4, 1, 2, 4) // returns 1
 */
declare function MIN(...args: any[]): number | undefined;

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
declare function FIXED(num: number, decimals?: number, suppressGroupingSeparator?: boolean): string | undefined;
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
declare function FIXED(num: number, decimals?: number): string | undefined;
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
declare function FIXED(num: any): string | undefined;

/**
 * Returns the current form object.
 *
 * View Documentatino - https://learn.fulcrumapp.com/dev/expressions/reference/form/
 */
declare function FORM(): {};

/**
 * Formats a string
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/format/
 * @param template (String, required): desired format, \`%s\` for strings and \`%d\` for numbers.
 * @param variables (String|Number, required), values to substitute into the format string
 * @returns formatted string
 */
declare function FORMAT(template: string, ...variables: any[]): any;

/**
 * Returns a formatted address
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/formataddress/
 * @param address (AddressFieldValue, required) must be valid AddressFieldValue
 * @param lineSeparator (String, optional): character to separate address lines, defaults to \`"\n"\`
 * @param partSeparator (String, optional): character to separate address parts, defaulst to " "
 * @returns string, formatted address
 */
declare function FORMATADDRESS(address: AddressFieldValue, lineSeparator?: string, partSeparator?: string): string | undefined;
/**
 * Returns a formatted address
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/formataddress/
 * @param address (AddressFieldValue, required) must be valid AddressFieldValue
 * @param lineSeparator (String, optional): character to separate address lines, defaults to \`"\n"\`
 * @param partSeparator (String, optional): character to separate address parts, defaulst to " "
 * @returns string, formatted address
 */
declare function FORMATADDRESS(address: AddressFieldValue): string | undefined;

/**
 * options hash to determine number formatting
 */
interface NumberFormatOptions {
    localeMatcher?: string | undefined;
    style?: string | undefined;
    currency?: string | undefined;
    minimumSignificantDigits?: number | undefined;
    maximumSignificantDigits?: number | undefined;
    minimumIntegerDigits?: number | undefined;
    minimumFractionDigits?: number | undefined;
    maximumFractionDigits?: number | undefined;
    useGrouping?: boolean | undefined;
}
/**
 * Sends value, locale, and options hash to host for formatting.
 * @param value number value to be formatted
 * @param locale string with a BCP 47 language tag
 * @param options hash of formatting options
 * @returns formatted string value
 */
declare function formatNumber(value: number, locale: string, options: NumberFormatOptions): string;

/**
 * Returns the language value or, if it's not available, the default language
 * from the form configuration object.
 */
declare function LANGUAGE(): string;

/**
 * Returns a number formatted based on the current language and the styling options passed in.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/formatnumber/
 * @param value (Number, required): number to be formatted
 * @param langauge (String, optional): languange- and country-specific string, e.g. "en-US"
 * @param options (NumberFormatOptions, optional): formatting options hash
 * @returns formatted number string
 */
declare function FORMATNUMBER(value: number, language: MaybeString, options: NumberFormatOptions): string;
/**
 * Returns a number formatted based on the current language and the styling options passed in.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/formatnumber/
 * @param value (Number, required): number to be formatted
 * @param langauge (String, optional): languange- and country-specific string, e.g. "en-US"
 * @param options (NumberFormatOptions, optional): formatting options hash
 * @returns formatted number string
 */
declare function FORMATNUMBER(value: number, language: MaybeString): string;
/**
 * Returns a number formatted based on the current language and the styling options passed in.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/formatnumber/
 * @param value (Number, required): number to be formatted
 * @param langauge (String, optional): languange- and country-specific string, e.g. "en-US"
 * @param options (NumberFormatOptions, optional): formatting options hash
 * @returns formatted number string
 */
declare function FORMATNUMBER(value: number): string;

/**
 * Returns the greatest common divisor
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/gcd/
 * @param args (Any|Array, required): list of numbers
 * @returns greatest commom divisor among the numbers passed in
 * @example
 * GCD(8, 16, 32, 36) // returns 4
 */
declare function GCD(...args: number[]): number;
/**
 * Returns the greatest common divisor
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/gcd/
 * @param args (Any|Array, required): list of numbers
 * @returns greatest commom divisor among the numbers passed in
 * @example
 * GCD(8, 16, 32, 36) // returns 4
 */
declare function GCD(...args: string[]): number;
/**
 * Returns the greatest common divisor
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/gcd/
 * @param args (Any|Array, required): list of numbers
 * @returns greatest commom divisor among the numbers passed in
 * @example
 * GCD(8, 16, 32, 36) // returns 4
 */
declare function GCD(...args: any[]): number;

/**
 * Returns the current result value for the current expression
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/getresult/
 */
declare function GETRESULT(): any;

/**
 * Returns values grouped according to a passed in iteratee or according to identity
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/group/
 * @param values (Array, required): array of values
 * @param iteratee (Function, optional): function to determine value sorting, defaults to identity (\`===\`)
 * @returns object of grouped values; keys are determined by the return values of \`iteratee\`
 */
declare function GROUP(values: number[], iteratee: Function): {} | undefined;
/**
 * Returns values grouped according to a passed in iteratee or according to identity
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/group/
 * @param values (Array, required): array of values
 * @param iteratee (Function, optional): function to determine value sorting, defaults to identity (\`===\`)
 * @returns object of grouped values; keys are determined by the return values of \`iteratee\`
 */
declare function GROUP(values: any[]): {} | undefined;
/**
 * Returns values grouped according to a passed in iteratee or according to identity
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/group/
 * @param values (Array, required): array of values
 * @param iteratee (Function, optional): function to determine value sorting, defaults to identity (\`===\`)
 * @returns object of grouped values; keys are determined by the return values of \`iteratee\`
 */
declare function GROUP(values: any[], iteratee?: Function): {} | undefined;
/**
 * Returns values grouped according to a passed in iteratee or according to identity
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/group/
 * @param values (Array, required): array of values
 * @param iteratee (Function, optional): function to determine value sorting, defaults to identity (\`===\`)
 * @returns object of grouped values; keys are determined by the return values of \`iteratee\`
 */
declare function GROUP(values: any, iteratee?: Function): {} | undefined;

/**
 * Returns where or not a ChoiceFieldValue has an \`other_values\` key
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/hasother/
 * @param value (ChoiceFieldValue, required): \`{ choice_values?: string[ ], other_values?: string[ ] }\`
 * @returns boolean value
 */
declare function HASOTHER(value: ChoiceFieldValue): boolean;
/**
 * Returns where or not a ChoiceFieldValue has an \`other_values\` key
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/hasother/
 * @param value (ChoiceFieldValue, required): \`{ choice_values?: string[ ], other_values?: string[ ] }\`
 * @returns boolean value
 */
declare function HASOTHER(value?: any): boolean;
/**
 * Returns where or not a ChoiceFieldValue has an \`other_values\` key
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/hasother/
 * @param value (ChoiceFieldValue, required): \`{ choice_values?: string[ ], other_values?: string[ ] }\`
 * @returns boolean value
 */
declare function HASOTHER(): boolean;

/**
 * Returns a string describing the type of argument passed in.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/typeof/
 * @param value (Any, required): value to be evaluated
 * @returns a string indiciating the type of argument passed in
 * @example
 * TYPEOF("test") // "string"
 */
declare function TYPEOF(value: any): string;

/**
 * Evaluates a conditional expression and returns a designated \`trueValue\` or \`falseValue\`
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/if/
 * @param test (Expression, required): conditional expression that evaluates to true or false
 * @param trueValue (Any,required): value to be returned in case of true
 * @param falseValue (Any, required): vaue to be returned in case of false
 * @returns\`trueValue\`/\`falseValue\` if supplied, else boolean
 * @example
 * IF(1 > 0, 10, 20) // returns 10
 */
declare function IF(test: any, trueValue: any, falseValue: any): any;

/**
 * Checks if a value is an instance of an Error or has no value
 * @param value (Error|Any, required): item to be checked
 * @returns boolean
 * @example
 * const badField = FIELD('does_not_exist') // = undefined
 * ISERR(badField) // returns true
 */
declare function ISERR(value: any): boolean;

/**
 * Evaluates whether a passed in value is an error.
 * @param value (Error|Any, required): value to be evaluated
 * @param errorValue (Any, required): value to be returned in event \`value\` is an error
 * @returns \`errorValue\` in case \`value\` is an error, otherwise \`value\`
 * @example
 * IFERROR(EVEN(null), "ERR") // returns "ERR"
 */
declare function IFERROR(value: any, errorValue: any): any;

/**
 * Returns a string representation of the passed in parameter
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/inspect/
 * @param value (Number, required): value to inspect
 * @returns stringified value
 */
declare function INSPECT(value: any): string;

interface AlertResult {
  /** result type */
  type: "message",
  /** title of alert, optional */
  title?: string,
  /** short message, optional */
  message?: string,
}

interface InvalidResult {
  /** ID for form. Must be unique to the form and lowercase. The Fulcrum app builder uses
   * system generated 4 character codes.
   */
  key: string|null,
  /** message to be displayed with invalidation error */
  message: string|null,
  /** result type  */
  type: "validation"
}

interface ProgressResult {
  /** ID for form. Must be unique to the form and lowercase. The Fulcrum app builder uses
   * system generated 4 character codes.
   */
  title: string|null,
  /** message to be displayed with invalidation error */
  message: string|null,
  /** result type  */
  type: "progress"
}

interface ConfigurationResult {
  /** result type */
  type: "configure",
  /** attribute of configuration to be changed */
  attribute: string,
  /** value to which configuration attribute will be changed */
  value: any
}

interface SetValueResult {
  /** result type */
  type: "set-value",
  /** ID for form. Must be unique to the form and lowercase. The Fulcrum app builder uses
   * system generated 4 character codes.
   */
  key: string,
  /** value to which field is to be set */
  value: string|null
}

interface ExpressionResult {
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

interface UpdateFormAttributesResult {
  type: "update-element",
  key: string,
  attribute: string,
  value: any,
}

interface OpenURLResult {
  /** result type */
  type:"open",
  /** stringified value */
  value: string
}
/**
 * Displays an alert and stops a record from being saved
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/invalid/
 * @param message (String, required): reason for invalidating a record
 * @param dataName (String, optional): data name of field to be validated
 */
declare function INVALID(message: string, dataName?: string): void;
/**
 * Displays an alert and stops a record from being saved
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/invalid/
 * @param message (String, required): reason for invalidating a record
 * @param dataName (String, optional): data name of field to be validated
 */
declare function INVALID(message: string, dataName?: string): void;
/**
 * Displays an alert and stops a record from being saved
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/invalid/
 * @param message (String, required): reason for invalidating a record
 * @param dataName (String, optional): data name of field to be validated
 */
declare function INVALID(message: string): void;

/**
 * Checks if a value is an instance of an Error or has no value
 * @param value (Error|Any, required): item to be checked
 * @returns boolean
 * @example
 * const badField = FIELD('does_not_exist') // = undefined
 * ISERROR(badField) // returns true
 */
declare function ISERROR(value: any): boolean;

/**
 * Returns whether or not a value is even
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/iseven/
 * @param value (Number, required): numeric value to be checked
 * @returns boolean value
 * @example
 * ISEVEN(5 * 5) // returns false
 */
declare function ISEVEN(value: number): boolean;
/**
 * Returns whether or not a value is even
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/iseven/
 * @param value (Number, required): numeric value to be checked
 * @returns boolean value
 * @example
 * ISEVEN(5 * 5) // returns false
 */
declare function ISEVEN(value: string): boolean;
/**
 * Returns whether or not a value is even
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/iseven/
 * @param value (Number, required): numeric value to be checked
 * @returns boolean value
 * @example
 * ISEVEN(5 * 5) // returns false
 */
declare function ISEVEN(value: any): boolean;

interface MediaObject {
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
declare function ISPORTRAIT(media: MediaObject): boolean;
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
declare function ISPORTRAIT(media: any): boolean | undefined;
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
declare function ISPORTRAIT(): undefined;

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
declare function ISLANDSCAPE(media: MediaObject): boolean;
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
declare function ISLANDSCAPE(media: any): boolean | undefined;
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
declare function ISLANDSCAPE(): undefined;

/**
 * Checks for a boolean value
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/islogical/
 * @param value (Any, required): value to be checked
 * @returns boolean value
 * @example
 * ISLOGICAL(2 > 0) // returns true
 */
declare function ISLOGICAL(value: any): boolean;

/** Returns the platform name from the configuration object
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/platform/
*/
declare function PLATFORM(): string;

/**
 * Returns true if the record is being edited from the mobile app
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/ismobile/
 * @returns boolean value
 */
declare function ISMOBILE(): boolean;

/**
 * Returns a boolean indicating whether the feature is new or an update.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isnew/
 * @returns boolean
 */
declare function ISNEW(): boolean;

/**
 * Checks if a value is a a non-text value (not a string)
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isnontext/
 * @param value (Any, required): value to be checked
 * @returns boolean
 * @example
 * ISNONTEXT(["a string"]) // returns true
 */
declare function ISNONTEXT(value: any): boolean;

/**
 * Returns whether or not a value is odd
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isodd/
 * @param value (Number, required): numeric value to be checked
 * @returns boolean value
 * @example
 * ISODD(5 * 5) // returns true
 */
declare function ISODD(value: number): boolean;
/**
 * Returns whether or not a value is odd
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isodd/
 * @param value (Number, required): numeric value to be checked
 * @returns boolean value
 * @example
 * ISODD(5 * 5) // returns true
 */
declare function ISODD(value: string): boolean;
/**
 * Returns whether or not a value is odd
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isodd/
 * @param value (Number, required): numeric value to be checked
 * @returns boolean value
 * @example
 * ISODD(5 * 5) // returns true
 */
declare function ISODD(value: any): boolean;

/**
 * Returns the current user's role or, if it's not available, undefined.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/role/
 */
declare function ROLE(): string | undefined;

/**
 * Determines whether arguments passed in contain the role of the current user
 * by comparing it to  userRoleName on the configuration object
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isrole/
 * @param args (String|Array, required): role(s) to be checked
 * @returns boolean
 */
declare function ISROLE(...args: string[]): boolean;
/**
 * Determines whether arguments passed in contain the role of the current user
 * by comparing it to  userRoleName on the configuration object
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isrole/
 * @param args (String|Array, required): role(s) to be checked
 * @returns boolean
 */
declare function ISROLE(...args: any[]): boolean;

/**
 * Checks to see if a choice is selected
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isselected/
 * @param value (ChoiceFieldValue, required): field object containing possible choices to check against
 * @param choice (Any|Array, required): choice or array of choices to check if they are selected
 * @returns boolean
 */
declare function ISSELECTED(value: ChoiceFieldValue, choice: string | string[]): boolean;
/**
 * Checks to see if a choice is selected
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isselected/
 * @param value (ChoiceFieldValue, required): field object containing possible choices to check against
 * @param choice (Any|Array, required): choice or array of choices to check if they are selected
 * @returns boolean
 */
declare function ISSELECTED(value: ChoiceFieldValue, choice?: string | string[]): boolean;
/**
 * Checks to see if a choice is selected
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isselected/
 * @param value (ChoiceFieldValue, required): field object containing possible choices to check against
 * @param choice (Any|Array, required): choice or array of choices to check if they are selected
 * @returns boolean
 */
declare function ISSELECTED(value?: any, choice?: any): boolean;

/**
 * Checks if a value is a text value (string)
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/istext/
 * @param value (Any, required): value to be checked
 * @returns boolean
 * @example
 * ISTEXT("a string") // returns true
 */
declare function ISTEXT(value: any): boolean;

/**
 * Returns a boolean indicating if the feature being edited is an update
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/isupdate/
 * @returns boolean
 */
declare function ISUPDATE(): boolean;

/**
 * Returns the label of a field
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/label/
 * @param dataName (String, required): data name of desired field
 * @returns form label, string
 * @example
 * LABEL("business_name") // returns "Business Name"
 */
declare function LABEL(dataName: FieldName): string | undefined;

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
declare function LAST(item: any[] | string, n: number): any[] | undefined;
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
declare function LAST(item: any[] | string, n?: number): any[] | undefined;
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
declare function LAST(item: any): any[] | undefined;

/**
 * Returns the latitude of the record if it exists.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/latitude/
 * @returns numeric value
 */
declare function LATITUDE(): number;

/**
 * Returns the least common multiple of the arguments passed in
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/lcm/
 * @param args (Number|Array) list of numbers to be evaluated
 * @returns number, least common multiple
 * @example
 * LCM(-50, 25, -45, -18, 90, 447) // returns 67050
 */
declare function LCM(...args: number[]): number;
/**
 * Returns the least common multiple of the arguments passed in
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/lcm/
 * @param args (Number|Array) list of numbers to be evaluated
 * @returns number, least common multiple
 * @example
 * LCM(-50, 25, -45, -18, 90, 447) // returns 67050
 */
declare function LCM(...args: string[]): number;
/**
 * Returns the least common multiple of the arguments passed in
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/lcm/
 * @param args (Number|Array) list of numbers to be evaluated
 * @returns number, least common multiple
 * @example
 * LCM(-50, 25, -45, -18, 90, 447) // returns 67050
 */
declare function LCM(...args: any[]): number;

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
declare function LEFT(value: string, numberOfCharacters?: number): string | undefined;
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
declare function LEFT(value: any, numberOfCharacters?: string): string | undefined;
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
declare function LEFT(value: string): string | undefined;
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
declare function LEFT(value: any, numberOfCharacters?: any): string | undefined;

/**
 * Returns the length of a value as a string or an array-like object.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/len/
 * @param value (Any, required): item to be measured
 * @returns number
 * @example
 * LEN("test") // returns 4
 */
declare function LEN(value: any): number;

/**
 * Returns the natural logarithm of a value; equivalent to _ln(x)_.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/ln/
 * @param value (Number, required): positive number for which to calculate the logarithm, base \`e\`
 * @returns numeric value indicating the natural log of a value
 * @example
 * LN(12) // returns 2.4849066497880004
 */
declare function LN(value: number): number;
/**
 * Returns the natural logarithm of a value; equivalent to _ln(x)_.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/ln/
 * @param value (Number, required): positive number for which to calculate the logarithm, base \`e\`
 * @returns numeric value indicating the natural log of a value
 * @example
 * LN(12) // returns 2.4849066497880004
 */
declare function LN(value: string): number;
/**
 * Returns the natural logarithm of a value; equivalent to _ln(x)_.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/ln/
 * @param value (Number, required): positive number for which to calculate the logarithm, base \`e\`
 * @returns numeric value indicating the natural log of a value
 * @example
 * LN(12) // returns 2.4849066497880004
 */
declare function LN(value: any): number;

/**
 * Returns the locale of a record.
 */
declare function LOCALE(): string;

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
declare function LOG(value: number, base: number): number;
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
declare function LOG(value: number): number;
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
declare function LOG(value: any, base?: any): number;

/**
 * Calculates the log10 (common logarithm) of a value.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/log10/
 * @param value (Number, required): number to be calculated
 * @returns numeric value
 * @example
 * LOG10(100) // returns 2
 */
declare function LOG10(value: number): number;
/**
 * Calculates the log10 (common logarithm) of a value.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/log10/
 * @param value (Number, required): number to be calculated
 * @returns numeric value
 * @example
 * LOG10(100) // returns 2
 */
declare function LOG10(value: string): number;
/**
 * Calculates the log10 (common logarithm) of a value.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/log10/
 * @param value (Number, required): number to be calculated
 * @returns numeric value
 * @example
 * LOG10(100) // returns 2
 */
declare function LOG10(value: any): number;

/**
 * Returns a record's longitude if it exists.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/longitude/
 * @returns number
 */
declare function LONGITUDE(): number;

/**
 * Converts a string value to all lowercase.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/lower/
 * @param value (String, required): value to be converted to lowercase
 * @returns string
 * @example
 * LOWER("CASE") // returns "case"
 */
declare function LOWER(value: string): string;
/**
 * Converts a string value to all lowercase.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/lower/
 * @param value (String, required): value to be converted to lowercase
 * @returns string
 * @example
 * LOWER("CASE") // returns "case"
 */
declare function LOWER(value: undefined | null | object | Array<any> | GenericObject): undefined;

/**
 * Returns max value from a list of values
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/maxa/
 * @param args (Number|Array, required): list of numeric values
 * @returns max value in numeric form
 * @example
 * MAXA(1, 4, 7, 2, 4) // returns 7
 */
declare function MAXA(...args: number[]): number | undefined;

/**
 * Returns the median value of list of numbers.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/median/
 * @param args (Number|Array, required): numeric values to be evaluated
 * @returns median value
 * @example
 * MEDIAN(3, 4, 2, 5, 1) // returns 3
 */
declare function MEDIAN(...args: number[]): number;
/**
 * Returns the median value of list of numbers.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/median/
 * @param args (Number|Array, required): numeric values to be evaluated
 * @returns median value
 * @example
 * MEDIAN(3, 4, 2, 5, 1) // returns 3
 */
declare function MEDIAN(...args: any[]): number | undefined;

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
declare function MID(value: string, startPosition: number, numberOfCharacters: number): string | undefined;
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
declare function MID(value: string, startPosition: string, numberOfCharacters: string): string | undefined;
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
declare function MID(value?: any, startPosition?: any, numberOfCharacters?: any): string | undefined;

/**
 * Returns min value from a list of values
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/mina/
 * @param args (Number|Array, required): list of numeric values
 * @returns min numberic value among parameters
 * @example
 * MINA(7, 4, 1, 2, 4) // returns 1
 */
declare function MINA(...args: any[]): number | undefined;

/**
 * Returns the modulus or remainder of a number divided by a divisor.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/mod/
 * @param num (Number, required): number to be evaluated
 * @param divisor (Number, required)
 * @returns remainder of \`num / divisor\`
 * @example
 * MOD(10, 2) // returns 0
 */
declare function MOD(num: number, divisor: number): number;
/**
 * Returns the modulus or remainder of a number divided by a divisor.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/mod/
 * @param num (Number, required): number to be evaluated
 * @param divisor (Number, required)
 * @returns remainder of \`num / divisor\`
 * @example
 * MOD(10, 2) // returns 0
 */
declare function MOD(num: string, divisor: string): number;
/**
 * Returns the modulus or remainder of a number divided by a divisor.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/mod/
 * @param num (Number, required): number to be evaluated
 * @param divisor (Number, required)
 * @returns remainder of \`num / divisor\`
 * @example
 * MOD(10, 2) // returns 0
 */
declare function MOD(num?: any, divisor?: any): number;

/**
 * Returns a month given a date.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/month/
 * @param date (Date|String, required): date object or string in "XXXX-XX-XX" format
 * @returns month as numeric value
 * @example
 * MONTH("2015-12-16") // returns 12
 */
declare function MONTH(date: Date): number;
/**
 * Returns a month given a date.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/month/
 * @param date (Date|String, required): date object or string in "XXXX-XX-XX" format
 * @returns month as numeric value
 * @example
 * MONTH("2015-12-16") // returns 12
 */
declare function MONTH(date: MaybeString): number;
/**
 * Returns a month given a date.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/month/
 * @param date (Date|String, required): date object or string in "XXXX-XX-XX" format
 * @returns month as numeric value
 * @example
 * MONTH("2015-12-16") // returns 12
 */
declare function MONTH(): void;

/**
 * Returns a numeric value. If a number if passed in, the same number is returned, otherwise
 * function returns 1 for a true boolean value, and 0 for all other values.
 * @param value (Number|Any, required): value to be evaluated
 * @returns a numeric value
 * @example
 * N(97) // returns 97
 * N(false) // returns 0
 */
declare function N(value: any): number;

/**
 * Returns the negation of a value, i.e. if a value is falsey \`NOT()\` will return true.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/not/
 * @param value (Any, required): parameter of any type
 * @returns boolean
 * @example
 * NOT("test") // returns false
 */
declare function NOT(value?: any): boolean;

/**
 * Maps over arguments passed in and converts each to a number value.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/nums/
 * @param args (String|Number|Array, required): list of values to be mapped to numbers
 * @returns array of numberic values
 * @example
 * NUMS("2", "3", "4") // returns [2, 3, 4]
 */
declare function NUMS(...args: string[]): number[];
/**
 * Maps over arguments passed in and converts each to a number value.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/nums/
 * @param args (String|Number|Array, required): list of values to be mapped to numbers
 * @returns array of numberic values
 * @example
 * NUMS("2", "3", "4") // returns [2, 3, 4]
 */
declare function NUMS(...args: number[]): number[];
/**
 * Maps over arguments passed in and converts each to a number value.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/nums/
 * @param args (String|Number|Array, required): list of values to be mapped to numbers
 * @returns array of numberic values
 * @example
 * NUMS("2", "3", "4") // returns [2, 3, 4]
 */
declare function NUMS(...args: any[]): number[];

/**
 * Returns the next odd number.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/odd/
 * @param value (Number, required): number to be evaluated
 * @returns number
 * @example
 * ODD(2) // returns 3
 */
declare function ODD(value: number): number;
/**
 * Returns the next odd number.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/odd/
 * @param value (Number, required): number to be evaluated
 * @returns number
 * @example
 * ODD(2) // returns 3
 */
declare function ODD(value?: any): number;


interface TriggeredEvent {
  name: EventNames,
  value: (
    FieldEventValue
    | GeometryEventValue
    | AddAudioEventValue
    | AddVideoEventValue
    | AddPhotoEventValue
    | RemoveMediaEventValue
    | ExtensionMessageEventValue
    | null
  ),
  field: FieldName | null
}

 type EventNames =
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
  | ExtensionMessageEventName

 type RepeatableEventNames =
  "load-repeatable"
  | "unload-repeatable"
  | "new-repeatable"
  | "edit-repeatable"
  | "save-repeatable"
  | "cancel-repeatable"
  | "validate-repeatable"
  | "change-geometry"

 type FieldEventNames =
  "change"
  | "focus"
  | "blur"
  | "click"

 type FormEventNames =
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

 type ChangeGeometryEventName = "change-geometry"
 type AddPhotoEventName = "add-photo"
 type RemovePhotoEventName = "remove-photo"
 type ReplacePhotoEventName = "replace-photo"
 type AddVideoEventName = "add-video"
 type RemoveVideoEventName = "remove-video"
 type AddAudioEventName = "add-audio"
 type RemoveAudioEventName = "remove-audio"
 type ExtensionMessageEventName = "extension-message"

interface Event {
  name: EventNames
}

interface EventWithField extends Event {
  field: FieldName
}

interface FormEvent extends Event {
  name: FormEventNames
  field: null,
  value?: string
}

 type FieldEventValue = string | ChoiceFieldValue

interface FieldEvent extends EventWithField {
  name: FieldEventNames,
  field: FieldName,
  value: FieldEventValue
}

interface GeometryEventValue {
  coordinates: number[],
  type: "Point"
}

interface GeometryEvent extends Event {
  field?: string
  name: ChangeGeometryEventName
  value: GeometryEventValue
}

interface RepeatableEvent extends EventWithField {
  name: RepeatableEventNames
}

interface AddPhotoEventValue {
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

interface ReplacePhotoEventValue extends AddPhotoEventValue {
  annotated: boolean,
  replaced: GUID
}

interface AddPhotoEvent extends EventWithField {
  name: AddPhotoEventName,
  value: AddPhotoEventValue
}

interface ReplacePhotoEvent extends EventWithField {
  name: ReplacePhotoEventName,
  value: ReplacePhotoEventValue
}

interface RemoveMediaEventValue {
  id: GUID
}

interface RemoveMediaEvent extends EventWithField {
  value: RemoveMediaEventValue
}

interface RemovePhotoEvent extends RemoveMediaEvent {
  name: RemovePhotoEventName
}

interface AddVideoEventValue {
  id: GUID,
  size: number,
  duration: number,
  orientation: number | null,
  width: number,
  height: number,
  track: any
}

interface AddVideoEvent extends EventWithField {
  name: AddVideoEventName,
  value: AddVideoEventValue
}

interface RemoveVideoEvent extends RemoveMediaEvent {
  name: RemovePhotoEventName
}

interface AddAudioEventValue {
  id: GUID,
  size: number,
  duration: number
}

interface AddAudioEvent extends EventWithField {
  name: AddAudioEventName,
  value: AddAudioEventValue
}

interface RemoveAudioEvent extends RemoveMediaEvent {
  name: RemoveAudioEventName
}

interface ExtensionMessageEventValue {
  source: string,
  data: any,
  cancelled?: boolean
}

interface ExtensionMessageEvent extends Event {
  name: ExtensionMessageEventName
  value: ExtensionMessageEventValue
}
/**
 * Detaches an event handler set by ON.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/off/
 * @param event (String, required): event name
 * @param field (String, optional): data name of ield the event was bound to
 * @param callback (Function, required): callback to detach
 */
declare function OFF(name: FormEventNames, callback: (event: FormEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/off/
 * @param event (String, required): event name
 * @param field (String, optional): data name of ield the event was bound to
 * @param callback (Function, required): callback to detach
 */
declare function OFF(name: FieldEventNames, field: FieldName, callback: (event: FieldEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/off/
 * @param event (String, required): event name
 * @param field (String, optional): data name of ield the event was bound to
 * @param callback (Function, required): callback to detach
 */
declare function OFF(name: RepeatableEventNames, field: RepeatableFieldName, callback: (event: RepeatableEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/off/
 * @param event (String, required): event name
 * @param field (String, optional): data name of ield the event was bound to
 * @param callback (Function, required): callback to detach
 */
declare function OFF(name: ChangeGeometryEventName, callback: (event: GeometryEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/off/
 * @param event (String, required): event name
 * @param field (String, optional): data name of ield the event was bound to
 * @param callback (Function, required): callback to detach
 */
declare function OFF(name: ChangeGeometryEventName, field: RepeatableFieldName, callback: (event: GeometryEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/off/
 * @param event (String, required): event name
 * @param field (String, optional): data name of ield the event was bound to
 * @param callback (Function, required): callback to detach
 */
declare function OFF(name: AddPhotoEventName, field: PhotoFieldName, callback: (event: AddPhotoEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/off/
 * @param event (String, required): event name
 * @param field (String, optional): data name of ield the event was bound to
 * @param callback (Function, required): callback to detach
 */
declare function OFF(name: ReplacePhotoEventName, field: PhotoFieldName, callback: (event: ReplacePhotoEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/off/
 * @param event (String, required): event name
 * @param field (String, optional): data name of ield the event was bound to
 * @param callback (Function, required): callback to detach
 */
declare function OFF(name: RemovePhotoEventName, field: PhotoFieldName, callback: (event: RemoveMediaEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/off/
 * @param event (String, required): event name
 * @param field (String, optional): data name of ield the event was bound to
 * @param callback (Function, required): callback to detach
 */
declare function OFF(name: AddVideoEventName, field: VideoFieldName, callback: (event: AddVideoEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/off/
 * @param event (String, required): event name
 * @param field (String, optional): data name of ield the event was bound to
 * @param callback (Function, required): callback to detach
 */
declare function OFF(name: RemoveVideoEventName, field: VideoFieldName, callback: (event: RemoveVideoEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/off/
 * @param event (String, required): event name
 * @param field (String, optional): data name of ield the event was bound to
 * @param callback (Function, required): callback to detach
 */
declare function OFF(name: AddAudioEventName, field: AudioFieldName, callback: (event: AddAudioEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/off/
 * @param event (String, required): event name
 * @param field (String, optional): data name of ield the event was bound to
 * @param callback (Function, required): callback to detach
 */
declare function OFF(name: RemoveAudioEventName, field: AudioFieldName, callback: (event: RemoveAudioEvent) => void): void;

/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/on/
 * @param event (String, required): event name
 * @param target (String, optional): data name of field to bind the event to
 * @param callback (Function, required): callback called when the specified event is triggered
 */
declare function ON(name: FormEventNames, callback: (event: FormEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/on/
 * @param event (String, required): event name
 * @param target (String, optional): data name of field to bind the event to
 * @param callback (Function, required): callback called when the specified event is triggered
 */
declare function ON(name: ExtensionMessageEventName, callback: (event: ExtensionMessageEventValue) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/on/
 * @param event (String, required): event name
 * @param target (String, optional): data name of field to bind the event to
 * @param callback (Function, required): callback called when the specified event is triggered
 */
declare function ON(name: FieldEventNames, field: FieldName, callback: (event: FieldEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/on/
 * @param event (String, required): event name
 * @param target (String, optional): data name of field to bind the event to
 * @param callback (Function, required): callback called when the specified event is triggered
 */
declare function ON(name: RepeatableEventNames, field: RepeatableFieldName, callback: (event: RepeatableEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/on/
 * @param event (String, required): event name
 * @param target (String, optional): data name of field to bind the event to
 * @param callback (Function, required): callback called when the specified event is triggered
 */
declare function ON(name: ChangeGeometryEventName, callback: (event: GeometryEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/on/
 * @param event (String, required): event name
 * @param target (String, optional): data name of field to bind the event to
 * @param callback (Function, required): callback called when the specified event is triggered
 */
declare function ON(name: ChangeGeometryEventName, field: RepeatableFieldName, callback: (event: GeometryEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/on/
 * @param event (String, required): event name
 * @param target (String, optional): data name of field to bind the event to
 * @param callback (Function, required): callback called when the specified event is triggered
 */
declare function ON(name: AddPhotoEventName, field: PhotoFieldName, callback: (event: AddPhotoEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/on/
 * @param event (String, required): event name
 * @param target (String, optional): data name of field to bind the event to
 * @param callback (Function, required): callback called when the specified event is triggered
 */
declare function ON(name: ReplacePhotoEventName, field: PhotoFieldName, callback: (event: ReplacePhotoEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/on/
 * @param event (String, required): event name
 * @param target (String, optional): data name of field to bind the event to
 * @param callback (Function, required): callback called when the specified event is triggered
 */
declare function ON(name: RemovePhotoEventName, field: PhotoFieldName, callback: (event: RemoveMediaEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/on/
 * @param event (String, required): event name
 * @param target (String, optional): data name of field to bind the event to
 * @param callback (Function, required): callback called when the specified event is triggered
 */
declare function ON(name: AddVideoEventName, field: VideoFieldName, callback: (event: AddVideoEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/on/
 * @param event (String, required): event name
 * @param target (String, optional): data name of field to bind the event to
 * @param callback (Function, required): callback called when the specified event is triggered
 */
declare function ON(name: RemoveVideoEventName, field: VideoFieldName, callback: (event: RemoveVideoEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/on/
 * @param event (String, required): event name
 * @param target (String, optional): data name of field to bind the event to
 * @param callback (Function, required): callback called when the specified event is triggered
 */
declare function ON(name: AddAudioEventName, field: AudioFieldName, callback: (event: AddAudioEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/on/
 * @param event (String, required): event name
 * @param target (String, optional): data name of field to bind the event to
 * @param callback (Function, required): callback called when the specified event is triggered
 */
declare function ON(name: RemoveAudioEventName, field: AudioFieldName, callback: (event: RemoveAudioEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/on/
 * @param event (String, required): event name
 * @param target (String, optional): data name of field to bind the event to
 * @param callback (Function, required): callback called when the specified event is triggered
 */
declare function ON(name: EventNames, fieldOrCallback: FieldName | ((event: Event) => void), callback?: ((event: Event) => void)): void;

/**
 * Returns a value once, given the current value. This is useful to perform a calculation
 * only once, the first time it's evaluated, e.g. pulling the name of the user that
 * created the record so the value doesn't change each time the app is updated.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/once/
 * @param (Any, required): expression/function/value to be evaluated
 * @returns a value given the current value
 * @example
 * ONCE(FULLUSERNAME()) // returns "Jane Doe"
 */
declare function ONCE(value: any): any;

interface OpenExtensionMessage {
    source: string;
    data: any;
}
interface OpenExtensionParams {
    url: string;
    title?: MaybeString;
    data?: any;
    width?: number;
    height?: number;
    onMessage?: (message: OpenExtensionMessage) => void;
}
/**
 * Open an app extension
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/openextension/
 * @param url (String, required): url to open
 */
declare function OPENEXTENSION(params: OpenExtensionParams): void;

/**
 * Open a URL for a website or mobile app.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/openurl/
 * @param url (String, required): url to open
 */
declare function OPENURL(url: string): void;

/**
 * Returns the current 'Other' text value for a Single Choice, Multiple Choice, or Classification Set form field.
 * \`OTHER\` will extract a user-entered 'Other' value from the form for
 * further inspection/action.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/other/
 *
 * @param (ChoiceFieldValue, required): The choice field or classification field variable
 * @returns string - current 'Other' value
 */
declare function OTHER(value: ChoiceFieldValue): string | undefined;
/**
 * Returns the current 'Other' text value for a Single Choice, Multiple Choice, or Classification Set form field.
 * \`OTHER\` will extract a user-entered 'Other' value from the form for
 * further inspection/action.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/other/
 *
 * @param (ChoiceFieldValue, required): The choice field or classification field variable
 * @returns string - current 'Other' value
 */
declare function OTHER(value: Object): string | undefined;
/**
 * Returns the current 'Other' text value for a Single Choice, Multiple Choice, or Classification Set form field.
 * \`OTHER\` will extract a user-entered 'Other' value from the form for
 * further inspection/action.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/other/
 *
 * @param (ChoiceFieldValue, required): The choice field or classification field variable
 * @returns string - current 'Other' value
 */
declare function OTHER(value: any): string | undefined;

/**
 * Returns the value of pi (π).
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/pi/
 */
declare function PI(): number;

/** Returns the platform version from the configuration object */
declare function PLATFORMVERSION(): string;

/**
 * Returns platform information off the form configuration object including platform name and version.
 * @param separator (String, optional): separator with which to combine platform name and version - defaults to ", "
 * @returns string with platform name and version
 * @example
 * PLATFORMINFO() // returns "Android, 0.9.3"
 */
declare function PLATFORMINFO(separator?: string): string;

/**
 * Maps over a collection and returns the items based on a property (key).
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/pluck/
 * @param object (Array, required): Array-like object to be iterated over
 * @param property (String, required): string or key being targeted
 * @returns an array of items that match the \`property\` param
 */
declare function PLUCK(object: any[], property: string): any[];

/**
 * Returns the base number raised to the exponent power.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/power/
 * @param base (Number, required): base number
 * @param exponent (Number, required): exponent
 * @returns number
 * @example
 * POWER(3, 4) // returns 81
 */
declare function POWER(base: number, power: number): number;
/**
 * Returns the base number raised to the exponent power.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/power/
 * @param base (Number, required): base number
 * @param exponent (Number, required): exponent
 * @returns number
 * @example
 * POWER(3, 4) // returns 81
 */
declare function POWER(base?: any, power?: any): number;

/**
 * Multiplies all the numbers given as arguments
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/product/
 * @param args (Number|Array, required): list of numbers to be multiplied
 * @returns product
 * @example
 * PRODUCT(-2, 3, 4) // returns -24
 */
declare function PRODUCT(...args: number[]): number;
/**
 * Multiplies all the numbers given as arguments
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/product/
 * @param args (Number|Array, required): list of numbers to be multiplied
 * @returns product
 * @example
 * PRODUCT(-2, 3, 4) // returns -24
 */
declare function PRODUCT(...args: any[]): number;

/**
 * Displays a non-dismissible message that can be used to provide feedback when performing an asynchronous function.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/progress/
 * @param title (String, required): A short title for the progress message
 * @param message (String, required): The message content for the progress alert
 */
declare function PROGRESS(title?: null | string, message?: null | string): void;

/**
 * Returns the project ID off the configuration object.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/projectid/
 */
declare function PROJECTID(): string | undefined;

/**
 * Returns the project name from the configuration object
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/projectname/
 */
declare function PROJECTNAME(): string | undefined;

/**
 * Display a text field to get input from the user and a callback to respond to the result.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/prompt/
 * @param title (String|Null, required): A short title for the alert; pass in \`null\` for no title
 * @param message (String, required): The message content for the alert
 * @param callback (Function, required): callback
 */
declare function PROMPT(title: string | null, message: string, callback: Function): void;

/**
 * Capitalizes the first letter in each word of a string.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/proper/
 * @param value (String, required): string to be capitalized
 * @returns string
 * @example
 *
 * PROPER("test test") // returns "Test Test"
 */
declare function PROPER(value: string): string | undefined;
/**
 * Capitalizes the first letter in each word of a string.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/proper/
 * @param value (String, required): string to be capitalized
 * @returns string
 * @example
 *
 * PROPER("test test") // returns "Test Test"
 */
declare function PROPER(value: any): string | undefined;

/**
 * Returns quotient of numerator and denominator as integer.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/quotient/
 * @param numerator (Number, required): number to be divided
 * @param denominator (Number, required): divisor
 * @returns integer
 * @example
 * QUOTIENT(12, 2) // returns 6
 */
declare function QUOTIENT(numerator: number, denominator: number): number;
/**
 * Returns quotient of numerator and denominator as integer.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/quotient/
 * @param numerator (Number, required): number to be divided
 * @param denominator (Number, required): divisor
 * @returns integer
 * @example
 * QUOTIENT(12, 2) // returns 6
 */
declare function QUOTIENT(numerator: any, denominator: any): number;
/**
 * Returns quotient of numerator and denominator as integer.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/quotient/
 * @param numerator (Number, required): number to be divided
 * @param denominator (Number, required): divisor
 * @returns integer
 * @example
 * QUOTIENT(12, 2) // returns 6
 */
declare function QUOTIENT(numerator?: any, denominator?: any): number;

/**
 * Converts degress into radians.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/radians/
 * @param degrees (Number, required): number of degrees
 * @returns number of radians
 * @example
 * RADIANS(45) // returns 0.7853981633974483
 */
declare function RADIANS(degrees: number): number;
/**
 * Converts degress into radians.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/radians/
 * @param degrees (Number, required): number of degrees
 * @returns number of radians
 * @example
 * RADIANS(45) // returns 0.7853981633974483
 */
declare function RADIANS(degrees: any): number;

 global {
    interface Window {
        msCrypto?: any;
    }
} const RandomNumber: (int: number) => number;

 const RAND: () => number;

/**
 * Returns a random integer between the high and low values specified.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/randbetween/
 * @param low (Number, required): lowest value of desired range
 * @param high (Number, required): highest value of desired range
 * @returns random integer within specified range
 */
declare function RANDBETWEEN(low: number, high: number): number;

/**
 * Returns the current record's id from the form configuration obejct.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/recordid/
 */
declare function RECORDID(): string | undefined;

/**
 * Returns a the id of the repeatable being edited.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/repeatableid/
 */
declare function REPEATABLEID(): string | undefined;

/**
 * Returns human-readable index of current repeatable field. Subtract 1 from returned value for computer index.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/repeatablenumber/
 */
declare function REPEATABLENUMBER(): number | undefined;

/**
 * Returns the nearest repeatable when passed in a child field.
 */
declare function nearestRepeatable(element: FormFields): FormFields | null;
/**
 * Returns the nearest repeatable when passed in a child field.
 */
declare function nearestRepeatable(element?: any): FormFields | null;

interface RepeatableElementsCache {
    [key: string]: FormFields[];
}
interface RepeatableElements {
    [key: string]: FormFields;
}
interface RepeatableElementsByKey {
    [key: string]: RepeatableElements;
}
interface RepeatableElementsByDataName {
    [dataName: string]: RepeatableElements;
}
interface RepeatableValueElementsResult {
    all: FormFields[];
    byDataName: RepeatableElements;
    byKey: RepeatableElements;
}
 const repeatableValueElementsCache: RepeatableElementsCache;
 const repeatableValueElementsByKeyCache: RepeatableElementsByKey;
 const repeatableValueElementsByDataNameCache: RepeatableElementsByDataName;
/**
 * Returns an object that has the elements of a repeatable field.
 * @param repeatable required; Repeatable field
 * @returns
 *  Object contains three keys:
 * \`all\`: contains all elements of the repeatable field as an array of FormFields.
 * \`byDataName\`: contains all first-level elements of a repeatable field by data_name.
 * \`byKey\`: contains all first-level elements of a repeatable field by the form field's 4 digit key
 */
declare function repeatableValueElements(repeatable: RepeatableField): RepeatableValueElementsResult;

/**
 * Returns a date value given an appropriate date string in ISO 8601 format, i.e. YYYY-MM-DD
 * @param value required; string value of a date
 * @returns date value
 */
declare function dateValue(value: string): Date;
/**
 * Returns a date value given an appropriate date string in ISO 8601 format, i.e. YYYY-MM-DD
 * @param value required; string value of a date
 * @returns date value
 */
declare function dateValue(value: any): any;

/**
 * Checks if an element is a Date Field or not.
 * @param element required; form field to be checked
 * @returns boolean indicating if it is a date field
 */
declare function isDateElement(element: FormFields): boolean;

/**
 * Checks element passed in to see if the element is numeric in nature.
 * @param element required; a form field to be checked
 * @returns boolean indiciating if element is numeric
 */
declare function isNumericElement(element: FormFields): any;

/**
 * Returns a numeric value for the value passed in.
 * @param value required; any value, preferrably a number or a number in string form
 * @returns number
 */
declare function numberValue(value?: any): number | undefined;

/**
 * Returns a value for an element.
 * @description
 * Function converts numeric field values into numbers and date field
 * values into Date instances. Otherwise, it returns the value passed in.
 * @param element required; Form field object to be evaluated
 * @param value required; form value in need of conversion
 * @returns number for numeric fields, Date instances for date fields, else the original value.
 */
declare function valueForElement(element: FormFields, value: number | string): number;
/**
 * Returns a value for an element.
 * @description
 * Function converts numeric field values into numbers and date field
 * values into Date instances. Otherwise, it returns the value passed in.
 * @param element required; Form field object to be evaluated
 * @param value required; form value in need of conversion
 * @returns number for numeric fields, Date instances for date fields, else the original value.
 */
declare function valueForElement(element: FormFields, value: string): Date;
/**
 * Returns a value for an element.
 * @description
 * Function converts numeric field values into numbers and date field
 * values into Date instances. Otherwise, it returns the value passed in.
 * @param element required; Form field object to be evaluated
 * @param value required; form value in need of conversion
 * @returns number for numeric fields, Date instances for date fields, else the original value.
 */
declare function valueForElement(element: FormFields, value: any): any;

/**
 * Returns an array of values for a specific field contained in a repeatable.
 * @param repeatable required; the repeatable field containing the desired field
 * @param items required; array of objects in this format: { form_values: { form_key: value } }
 * @param dataName required; data name of desired field
 * @returns array of values
 */
declare function repeatableValues(repeatable: RepeatableField, items: any[], dataName: string): null | any[];
/**
 * Returns an array of values for a specific field contained in a repeatable.
 * @param repeatable required; the repeatable field containing the desired field
 * @param items required; array of objects in this format: { form_values: { form_key: value } }
 * @param dataName required; data name of desired field
 * @returns array of values
 */
declare function repeatableValues(repeatable: any, items: any, dataName: string): null | any[];

/**
 * Returns a specific field out of a collection of repeatable items.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/repeatablevalues/
 * @param repeatableValue (Array, required): array of form_value objects: \`[ { id: 1, form_values: "value" } ]\`
 * @param dataName (String|Array, required): data name of desired field or an array of data names
 * @returns array of values
 */
declare function REPEATABLEVALUES(repeatableValue: any[], dataName: FieldName[] | FieldName): any[] | undefined | null;

/**
 * Returns the sum of its arguments.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sum/
 * @param args (Array|Any, required): list of numbers
 * @returns sum of its arguments
 */
declare function SUM(...args: number[]): number;
/**
 * Returns the sum of its arguments.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sum/
 * @param args (Array|Any, required): list of numbers
 * @returns sum of its arguments
 */
declare function SUM(...args: any[]): number;

/**
 * Returns the sum of all the numeric form values in a repeatable field.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/repeatablesum/
 * @param repeatableValue (Array, required): array of form_value objects: \`[ { id: 1, form_values: "value" } ]\`
 * @param dataName (String|Array, required):data name of desired field or an array of data names
 * @returns sum of numeric form values
 */
declare function REPEATABLESUM(repeatableValue: any[], dataName: FieldName | FieldName[]): number;

interface Console {
  log(message?: any, ...optionalParams: any[]): void
}

 var console: Console

/**
 * @param error error object
 * @param request HTTP request object
 * @param body the response body
 */
interface HTTPRequestCallback {
  (error: Error, response?: null, body?: null): void
  (error: null, response: object, body: string): void
}

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";
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
    /** An object to be passed in the request body, must be \`JSON.stringify\`able */
    json?: object | string;
    /** The request body */
    body?: string;
}
/**
 * Performs an HTTP request and executes the callback on completion.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/request/
 * @param options (String|Object, required): the url or options to pass for the request
 * @param callback (Function, required): callback to invoke when the request is complete - The function is
 * passed \`error\`, \`response\`, and \`body\` parameters
 */
declare function REQUEST(options: RequestOptions, callback: HTTPRequestCallback): void;
/**
 * Performs an HTTP request and executes the callback on completion.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/request/
 * @param options (String|Object, required): the url or options to pass for the request
 * @param callback (Function, required): callback to invoke when the request is complete - The function is
 * passed \`error\`, \`response\`, and \`body\` parameters
 */
declare function REQUEST(url: string, callback: HTTPRequestCallback): void;

/**
 * Rounds down a given number to the specified number of digits.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/rounddown/
 * @param num (Number, required): numeric value to be round down
 * @param digits (Number, optional): number of digits to which \`num\` is to be rounded down; defaults to \`0\`
 * @returns numeric value rounded down to desired number of digits
 */
declare function ROUNDDOWN(num: number, digits?: number): number;
/**
 * Rounds down a given number to the specified number of digits.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/rounddown/
 * @param num (Number, required): numeric value to be round down
 * @param digits (Number, optional): number of digits to which \`num\` is to be rounded down; defaults to \`0\`
 * @returns numeric value rounded down to desired number of digits
 */
declare function ROUNDDOWN(num: string | number, digits?: number): number;
/**
 * Rounds down a given number to the specified number of digits.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/rounddown/
 * @param num (Number, required): numeric value to be round down
 * @param digits (Number, optional): number of digits to which \`num\` is to be rounded down; defaults to \`0\`
 * @returns numeric value rounded down to desired number of digits
 */
declare function ROUNDDOWN(num: any, digits?: any): number;

/**
 * Rounds up the given number to the specified number of digits.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/roundup/
 * @param num (Number, required): numeric value to be round up
 * @param digits (Number, optional): desired number of digits to which \`num\` is to be rounded; defaults to \`0\`
 * @returns numeric value rounded up to the desired number of digits
 * @example
 * ROUNDUP(2.6666666, 4) // returns 2.6667
 */
declare function ROUNDUP(num: number, digits?: number): number;
/**
 * Rounds up the given number to the specified number of digits.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/roundup/
 * @param num (Number, required): numeric value to be round up
 * @param digits (Number, optional): desired number of digits to which \`num\` is to be rounded; defaults to \`0\`
 * @returns numeric value rounded up to the desired number of digits
 * @example
 * ROUNDUP(2.6666666, 4) // returns 2.6667
 */
declare function ROUNDUP(num: string | number, digits?: number): number;
/**
 * Rounds up the given number to the specified number of digits.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/roundup/
 * @param num (Number, required): numeric value to be round up
 * @param digits (Number, optional): desired number of digits to which \`num\` is to be rounded; defaults to \`0\`
 * @returns numeric value rounded up to the desired number of digits
 * @example
 * ROUNDUP(2.6666666, 4) // returns 2.6667
 */
declare function ROUNDUP(num: any, digits?: any): number;

/**
 * Returns a string padded to the right by a desired character.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/rpad/
 * @param value (String, required): string value to be padded
 * @param count (Number, required): length desired in returned value
 * @param padding (String, optional): character with which the \`value\` is to be padded; defaults to \`" "\`
 * @returns a padded string value
 * @example
 * RPAD('1', 2, '0') // returns "10"
 */
declare function RPAD(value: string, count: number, padding?: string): string;
/**
 * Returns a string padded to the right by a desired character.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/rpad/
 * @param value (String, required): string value to be padded
 * @param count (Number, required): length desired in returned value
 * @param padding (String, optional): character with which the \`value\` is to be padded; defaults to \`" "\`
 * @returns a padded string value
 * @example
 * RPAD('1', 2, '0') // returns "10"
 */
declare function RPAD(value: any, count: any, padding?: any): string | undefined;

/**
 * Searches a string for a substring and returns a 1-based index.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/search/
 * @param needle (String, required): substring to search for
 * @param haystack (Strnig, required): string in which to search for \`needle\`
 * @param startPosition (Number, optional): 1-based index from which to start searching the \`haystack\` string
 * @returns 1-based index indicating where substring is located
 * @example
 * SEARCH('4', '1234') // returns 4
 */
declare function SEARCH(needle: string, haystack: string, startPosition?: number): number | undefined;
/**
 * Searches a string for a substring and returns a 1-based index.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/search/
 * @param needle (String, required): substring to search for
 * @param haystack (Strnig, required): string in which to search for \`needle\`
 * @param startPosition (Number, optional): 1-based index from which to start searching the \`haystack\` string
 * @returns 1-based index indicating where substring is located
 * @example
 * SEARCH('4', '1234') // returns 4
 */
declare function SEARCH(needle: any, haystack: any, startPosition?: any): number | undefined;

/**
 * Creates a ChoiceFieldValue from given params
 * @param choices optional; array of strings
 * @param other optional; array of strings
 * @returns ChoiceFieldValue: { choice_values: [ ... ], other_values: [ ... ] }
 */
declare function makeChoiceValue(choices?: string[] | null, others?: string[] | null): ChoiceFieldValue;

interface Converter {
    [FormField: string]: Function;
}
interface RecordLinkIds {
    record_id: string;
}
/** Object containing functions to convert values to appropriate format for $$HOST.
 * Functions are accessed according to FieldType.
 * @example
 * converters["CalculatedField"]
 */
 const converters: Converter;

interface ValidGeometry {
    type: "Point";
    coordinates: number[];
}
/**
 * Checks to see if a valid GeoJSON object was passed in.
 * @param geometry geometry object to be tested
 * @returns boolean value
 */
declare function isValidGeometry(geometry: ValidGeometry): boolean;
/**
 * Checks to see if a valid GeoJSON object was passed in.
 * @param geometry geometry object to be tested
 * @returns boolean value
 */
declare function isValidGeometry(geometry: any): boolean;
/**
 * Checks to see if a valid GeoJSON object was passed in.
 * @param geometry geometry object to be tested
 * @returns boolean value
 */
declare function isValidGeometry(): boolean;

/**
 * Determines if an element is within the current editing scope.
 * @param containerElements required; array of FormFields representing current editing scope
 * @param dataElement required; single element of type FormFields
 * @returns boolean
 */
declare function isSetValueSupported(containerElements: FormFields[], dataElement: FormFields, type: string): boolean;

/**
 * Converts value to proper format for $$HOST depending on element type.
 * @param element required; single element of type FormFields
 * @param value required; value to be converted
 * @returns converted value as \`string|ChoiceFieldValue|AddressFieldValue|RecordLinkIds[]|null\`
 */
declare function makeValue(element: FormFields, value?: string | ChoiceFieldValue | AddressFieldValue | string[] | number[] | null): string | ChoiceFieldValue | AddressFieldValue | RecordLinkIds[] | null;

/**
 * Sets or clears the value of a field depending on value passed in.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setvalue/
 * @param dataName (String, required): data_name of field to be set
 * @param value (Any, required): value for field, or \`null\` to clear the field
 */
declare function SETVALUE(dataName: FieldName, value: string | ChoiceFieldValue | AddressFieldValue | ValidGeometry | string[] | number[] | null): void;

/**
 * Assign a user to a record.
 * @param user (String, required): user's name
 */
declare function SETASSIGNMENT(user: string): void;

/**
 * Updates a form's attributes.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setformattributes/
 * @param dataName (String, optional): data name of desired form field to be updated
 * @param attributes (Object, required): object of attributes to be updated and their corresponding values
 */
declare function SETFORMATTRIBUTES(dataName: string, attributes?: any): void;
/**
 * Updates a form's attributes.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setformattributes/
 * @param dataName (String, optional): data name of desired form field to be updated
 * @param attributes (Object, required): object of attributes to be updated and their corresponding values
 */
declare function SETFORMATTRIBUTES(dataName: any): void;

/**
 * Sets a choice filter for a form.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setchoicefilter/
 * @param dataName (String, required): data name of field to be updated
 * @param value (Any, required): a value or an array of values on which to filter
 */
declare function SETCHOICEFILTER(dataName: ChoiceFieldName, value: any[]): void;
/**
 * Sets a choice filter for a form.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setchoicefilter/
 * @param dataName (String, required): data name of field to be updated
 * @param value (Any, required): a value or an array of values on which to filter
 */
declare function SETCHOICEFILTER(dataName: ChoiceFieldName, value: any): void;

/**
 * Updates the form choices attribute.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setchoices/
 * @param dataName (String, required): data name of form field to be updated
 * @param value (Array|Null, required) an array of values or \`null\`
 */
declare function SETCHOICES(dataName: ChoiceFieldName, value: any): void;

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
 * @param settings (Object, required): key value pair of settings to configure
 */
declare function SETCONFIGURATION(settings: Configuration): void;

/**
 * Sets the description of a field.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setdescription/
 * @param dataName (String, required): data name of targeted field
 * @param value (Stirng, required): value to which description should be set
 */
declare function SETDESCRIPTION(dataName: FieldName, value: string): void;
/**
 * Sets the description of a field.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setdescription/
 * @param dataName (String, required): data name of targeted field
 * @param value (Stirng, required): value to which description should be set
 */
declare function SETDESCRIPTION(dataName: FieldName, value?: any): void;

/**
 * Sets a field to read only or removes a read only condition.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setreadonly/
 * @param dataName (String, required): data name of the targeted field
 * @param value (Boolean, required): whether to set as read only
 */
declare function SETREADONLY(dataName: FieldName, value: boolean): void;
/**
 * Sets a field to read only or removes a read only condition.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setreadonly/
 * @param dataName (String, required): data name of the targeted field
 * @param value (Boolean, required): whether to set as read only
 */
declare function SETREADONLY(dataName: FieldName, value?: boolean): void;

/**
 * Disables a field.
 *
 * @param dataName (String, required): data name of field
 * @param value (Boolean, required): whether to disable field
 */
declare function SETDISABLED(dataName: FieldName, value: boolean): void;
/**
 * Disables a field.
 *
 * @param dataName (String, required): data name of field
 * @param value (Boolean, required): whether to disable field
 */
declare function SETDISABLED(dataName: FieldName, value?: boolean): void;

/**
 * Sets geometry values
 * @param geometry (GeoJSON, required): object containing geometry \`type\` and lat-long \`coordinates\`
 * @example
 * // set geometry to Null Island
 * SETGEOMETRY({ type: "Point", coordinates: [ 0, 0 ]})
 */
declare function SETGEOMETRY(geometry: ValidGeometry): void;
/**
 * Sets geometry values
 * @param geometry (GeoJSON, required): object containing geometry \`type\` and lat-long \`coordinates\`
 * @example
 * // set geometry to Null Island
 * SETGEOMETRY({ type: "Point", coordinates: [ 0, 0 ]})
 */
declare function SETGEOMETRY(geometry: any): void;

/**
 * Sets a field to hidden or visible.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/sethidden/
 * @param dataName (String, required): data name of targeted field
 * @param value (Boolean, required): whether to hide field
 */
declare function SETHIDDEN(dataName: FieldName, value: boolean): void;
/**
 * Sets a field to hidden or visible.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/sethidden/
 * @param dataName (String, required): data name of targeted field
 * @param value (Boolean, required): whether to hide field
 */
declare function SETHIDDEN(dataName: FieldName, value?: boolean): void;

/**
 * Queues up a function to run after the desired interval on the Host
 * @param callback callback to call
 * @param timeout timeout to call
 */
declare function setTimeout(callback: Function, timeout: number): number;

/**
 * Sets up a function to be called repeatedly after a fixed time delay.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setinterval/
 * @param function (Function, required): function to execute after interval
 * @param delay (Number, required): number of milliseconds to delay (e.g. 1000 is 1 second)
 * @returns timer ID that can be used to clear the interval with \`CLEARINTERVAL\`
 */
declare function SETINTERVAL(fn: Function, timeout: number): number;

/**
 * Sets the label of a field.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setlabel/
 * @param dataName (String, required): data name of targeted field
 * @param value (String, required): value to which label should be set
 */
declare function SETLABEL(dataName: FieldName, value: string): void;
/**
 * Sets the label of a field.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setlabel/
 * @param dataName (String, required): data name of targeted field
 * @param value (String, required): value to which label should be set
 */
declare function SETLABEL(dataName: FieldName, value?: any): void;

/**
 * Sets location geometry given a latitude and longitude value.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setlocation/
 * @param latitude (Number, required): latitude coordinate
 * @param longitude (Numner, required): longitude coordinate
 */
declare function SETLOCATION(latitude: number, longitude: number): void;
/**
 * Sets location geometry given a latitude and longitude value.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setlocation/
 * @param latitude (Number, required): latitude coordinate
 * @param longitude (Numner, required): longitude coordinate
 */
declare function SETLOCATION(latitude: string, longitude: string): void;
/**
 * Sets location geometry given a latitude and longitude value.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setlocation/
 * @param latitude (Number, required): latitude coordinate
 * @param longitude (Numner, required): longitude coordinate
 */
declare function SETLOCATION(latitude?: any, longitude?: any): void;

/**
 * Sets the max length of a field.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setmaxlength/
 * @param dataName (String, required): data name of the targeted field
 * @param value (Number, required): max length desired
 */
declare function SETMAXLENGTH(dataName: FieldName, value: number): void;
/**
 * Sets the max length of a field.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setmaxlength/
 * @param dataName (String, required): data name of the targeted field
 * @param value (Number, required): max length desired
 */
declare function SETMAXLENGTH(dataName: FieldName, value?: any): void;

/**
 * Sets the minimum length of a field.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setminlength/
 * @param dataName (String, required): data name of the targeted field
 * @param value (Number, required): min length desired
 */
declare function SETMINLENGTH(dataName: FieldName, value: number): void;
/**
 * Sets the minimum length of a field.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setminlength/
 * @param dataName (String, required): data name of the targeted field
 * @param value (Number, required): min length desired
 */
declare function SETMINLENGTH(dataName: FieldName, value?: any): void;

/**
 * Sets project for a record.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setproject/
 * @param project (String, required): project name
 */
declare function SETPROJECT(project: string): void;
/**
 * Sets project for a record.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setproject/
 * @param project (String, required): project name
 */
declare function SETPROJECT(project: any): void;

/**
 * Sets project to hidden or visible.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setprojecthidden/
 * @param value (Boolean, required): whether to hide project field
 */
declare function SETPROJECTHIDDEN(value: boolean): void;

/**
 * Sets project to read only or removes a read only condition.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setprojectreadonly/
 * @param value (Boolean, required): whether project should be read-only
 */
declare function SETPROJECTREADONLY(value: boolean): void;

/**
 * Sets a field to required or optional.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setrequired/
 * @param dataName (String, required): data name of targeted field
 * @param value (Boolean, required): whether to require field
 */
declare function SETREQUIRED(dataName: FieldName, value: boolean): void;
/**
 * Sets a field to required or optional.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setrequired/
 * @param dataName (String, required): data name of targeted field
 * @param value (Boolean, required): whether to require field
 */
declare function SETREQUIRED(dataName: FieldName, value?: boolean): void;

/**
 * Sets result variable on runtime.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/setresult/
 * @param result (Any, required): desired result
 */
declare function SETRESULT(result: any): void;

/**
 * Sets record's status.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setstatus/
 * @param status (String, required): status value
 */
declare function SETSTATUS(status: string): void;
/**
 * Sets record's status.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setstatus/
 * @param status (String, required): status value
 */
declare function SETSTATUS(status?: any): void;

/**
 * Set status filter values.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setstatusfilter/
 * @param value (Array|String, required): array of statuses (strings) or a single status to filter by
 */
declare function SETSTATUSFILTER(value: string[] | string): void;

/**
 * Sets status to hidden or visible.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setstatushidden/
 * @param value (Boolean, required): whether to hide status
 */
declare function SETSTATUSHIDDEN(value: boolean): void;

/**
 * Sets status to read only or removes a read only condition.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/setstatusreadonly/
 * @param value (Boolean, required): whether status should be read-only
 */
declare function SETSTATUSREADONLY(value: boolean): void;

/**
 * Calls a function after a specified delay.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/settimeout/
 * @param function (Function, required): function to execute after the delay
 * @param delay (Number, required): number of milliseconds to delay (e.g. 1000 is 1 second)
 * @returns timer ID that can be used to clear the timeout with \`CLEARTIMEOUT\`
 */
declare function SETTIMEOUT(fn: Function, timeout: number): number;

/**
 * Can toggle between settings to either show errors or not.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/showerrors/
 * @param showErrors (Boolean, required): whether to show errors or not
 */
declare function SHOWERRORS(showErrors?: boolean): void;

/**
 * Randomly shuffles values passed in and returns them as an array.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/shuffle/
 * @param values (Array|Any, required): set of values to be shuffled
 * @returns a shuffled array
 */
declare function SHUFFLE(...values: any[]): any[];

/**
 * Returns the sign of a number.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sign/
 * @param num (Number, required): value to evaluate
 * @returns sign of a number: 1 for positive numbers, -1 for negative numbers, 0 for 0
 */
declare function SIGN(num: number): number;
/**
 * Returns the sign of a number.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sign/
 * @param num (Number, required): value to evaluate
 * @returns sign of a number: 1 for positive numbers, -1 for negative numbers, 0 for 0
 */
declare function SIGN(num: any): number;

/**
 * Returns the sine of the specified angle value, which must be specified in radians.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sin/
 * @param value (Number, required)L: numeric value specifying radians
 * @returns numeric value between 1 and -1 indicating the angle's sine
 * @example
 * SIN(12) // returns -0.5365729180004349
 */
declare function SIN(value: number): number;
/**
 * Returns the sine of the specified angle value, which must be specified in radians.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sin/
 * @param value (Number, required)L: numeric value specifying radians
 * @returns numeric value between 1 and -1 indicating the angle's sine
 * @example
 * SIN(12) // returns -0.5365729180004349
 */
declare function SIN(value: string): number;

/**
 * Returns function returns the hyperbolic sine of a number
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sinh/
 * @param value (Number, required): value to evaluate
 * @returns numeric value of angle's hyperbolic sine
 * @example
 * SINH(12) // returns 0.8438539587324921
 */
declare function SINH(value: number): number;
/**
 * Returns function returns the hyperbolic sine of a number
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sinh/
 * @param value (Number, required): value to evaluate
 * @returns numeric value of angle's hyperbolic sine
 * @example
 * SINH(12) // returns 0.8438539587324921
 */
declare function SINH(value: string): number;
/**
 * Returns function returns the hyperbolic sine of a number
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sinh/
 * @param value (Number, required): value to evaluate
 * @returns numeric value of angle's hyperbolic sine
 * @example
 * SINH(12) // returns 0.8438539587324921
 */
declare function SINH(value: any): number;

/**
 * Sorts parameters passed in according to an optional callback.
 * Defaults to basic alphabetic/numeric sort sans callback.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sort/
 * @param args (Array|Any...Function, required): values to be sorted, optional callback must be passed in last
 * @returns sorted list of values
 */
declare function SORT(...args: any[]): any[] | undefined;

/**
 * Returns the square root of a number.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sqrt/
 * @param num (Number, required): number to be evaluated
 * @returns square root of original value
 */
declare function SQRT(num: number): number;
/**
 * Returns the square root of a number.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sqrt/
 * @param num (Number, required): number to be evaluated
 * @returns square root of original value
 */
declare function SQRT(num: string): number;
/**
 * Returns the square root of a number.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sqrt/
 * @param num (Number, required): number to be evaluated
 * @returns square root of original value
 */
declare function SQRT(num: any): number;

/**
 * Returns the square root of a number times PI.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sqrtpi/
 * @param num (Number, required): number to be evaluated
 * @returns the sqrt of \`num\` * PI
 */
declare function SQRTPI(num: number): number;
/**
 * Returns the square root of a number times PI.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sqrtpi/
 * @param num (Number, required): number to be evaluated
 * @returns the sqrt of \`num\` * PI
 */
declare function SQRTPI(num: string): number;
/**
 * Returns the square root of a number times PI.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sqrtpi/
 * @param num (Number, required): number to be evaluated
 * @returns the sqrt of \`num\` * PI
 */
declare function SQRTPI(num: any): number;

/**
 * Returns the record status.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/status/
 */
declare function STATUS(): string | undefined;

/**
 * Returns the status label of a record.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/statuslabel/
 */
declare function STATUSLABEL(): string | undefined;

 class HostStorage {
    scope: string;
    /**
     * Gets the number of keys stored in the local storage
     */
    get length(): number | undefined;
    /**
     * Fetches the key from the storage engine
     * @param index index of the key
     */
    key(index: number): any;
    /**
     * Fetches the value from the store.
     */
    getItem(key: string): any;
    /**
     * Stores a string value in the local storage for the given key
     * @param key key to store the value as
     * @param value stringified value to store
     */
    setItem(key: string, value: string): void;
    /**
     * Remove the selected key from the store
     * @param key key to remove from the store
     */
    removeItem(key: string): void;
    /**
     * Reset the state of the local store.
     */
    clear(): void;
} const _default: HostStorage;

/**
 * Returns a storage object for setting and getting local storage items.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/data-events/reference/storage/
 */
declare function STORAGE(): typeof storage | Storage;

/**
 * Returns a single string of stringable values extracted from parameters.
 * STRING can be used to extract the following values from objects:
 * \`photo_id\`, \`video_id\`, \`audio_id\`, \`signature_id\`, \`record_id\`, and \`id\`. STRING will unpack Choice field options
 * if passed in.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/string/
 * @param args (Any|Array|Object, required): list of values or array-like object
 * @returns a string of values separated by commas
 */
declare function STRING(...args: any[]): string;

/**
 * Searches a string for a pattern and replaces it with a new substring.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/substitute/
 * @param text (String, required): text to be searched
 * @param oldText (String, required): pattern to be replaced
 * @param newText (Stirng, required): substring to replace \`oldText\`
 * @param occurrence (Number, optional): numeric value indicating at which occurrence of \`oldText\` should be replaced
 * @returns string with new substring incorporated
 */
declare function SUBSTITUTE(text: string, oldText: string, newText: string, occurrence?: number): string | undefined;

/**
 * Returns the sum of each number squared.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sumsq/
 * @param args (Array|Number, required): array or list of numbers
 * @returns sum of the square of each argument
 * @example
 * SUMSQ(1, 2, 3, 4) // returns 30
 */
declare function SUMSQ(...args: number[]): number;
/**
 * Returns the sum of each number squared.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/sumsq/
 * @param args (Array|Number, required): array or list of numbers
 * @returns sum of the square of each argument
 * @example
 * SUMSQ(1, 2, 3, 4) // returns 30
 */
declare function SUMSQ(...args: any[]): number;

/**
 * Stringifies the value passed in
 * @param value (Any, required): value to be converted to a string
 * @returns string value
 * @example
 * T(true) // returns "true"
 */
declare function T(value: any): string;

/**
 * Adds specified amount of time to a time string.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/timeadd/
 * @param startTime (String, required): string specifying a start time: XX:XX
 * @param amount (Number, equired): number of minutes or hours to be added
 * @param format ("hours"|"minutes", required): add time to minutes or hours
 * @returns time string
 */
declare function TIMEADD(startTime: string, amount: number, format: string): string | undefined;
/**
 * Adds specified amount of time to a time string.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/timeadd/
 * @param startTime (String, required): string specifying a start time: XX:XX
 * @param amount (Number, equired): number of minutes or hours to be added
 * @param format ("hours"|"minutes", required): add time to minutes or hours
 * @returns time string
 */
declare function TIMEADD(startTime: any, amount: any, format?: any): string | undefined;

/**
 * Returns the difference between two times in minutes or hours.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/timediff/
 * @param startTime (String, required): string specifying a start time: XX:XX
 * @param endTime (String, required): string specifying an end time: XX:XX
 * @param format ("hours"|"minutes", optional): measure difference in minutes or hours; defaults to hours
 * @returns numeric value indicating the difference between two times in either minutes or hours
 * @example
 * TIMEDIFF("14:00", "18:00") // returns 4
 */
declare function TIMEDIFF(startTime: string, endTime: string, format?: string): number | undefined;
/**
 * Returns the difference between two times in minutes or hours.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/timediff/
 * @param startTime (String, required): string specifying a start time: XX:XX
 * @param endTime (String, required): string specifying an end time: XX:XX
 * @param format ("hours"|"minutes", optional): measure difference in minutes or hours; defaults to hours
 * @returns numeric value indicating the difference between two times in either minutes or hours
 * @example
 * TIMEDIFF("14:00", "18:00") // returns 4
 */
declare function TIMEDIFF(startTime: any, endTime: any, format?: any): number | undefined;

/**
 * Returns a time stamp given a date object for display only. As it does not contain a timezone, it should not
 * be used to perform calculations such as time deltas.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/timestamp/
 * @param date (Date, optional): if no Date object is passed in to TIMESTAMP, today's timestamp will be returned
 * @returns a string timestamp in YYYY-MM-DD HH:MM:SS format
 */
declare function TIMESTAMP(date: Date): string;
/**
 * Returns a time stamp given a date object for display only. As it does not contain a timezone, it should not
 * be used to perform calculations such as time deltas.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/timestamp/
 * @param date (Date, optional): if no Date object is passed in to TIMESTAMP, today's timestamp will be returned
 * @returns a string timestamp in YYYY-MM-DD HH:MM:SS format
 */
declare function TIMESTAMP(date?: Date): string;

/**
 * Returns the current timezone or, if it's not available, the default timezone
 * from the form configuration object.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/timezone/
 */
declare function TIMEZONE(): string;

/**
 * Trims leading and trailing whitespace from a string.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/trim/
 * @param value (String, required): string to be trimmed
 * @returns trimmed string
 * @example
 * TRIM("  test  ") // returns "test"
 */
declare function TRIM(value: string): string;
/**
 * Trims leading and trailing whitespace from a string.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/trim/
 * @param value (String, required): string to be trimmed
 * @returns trimmed string
 * @example
 * TRIM("  test  ") // returns "test"
 */
declare function TRIM(value: any): string;

/**
 * Returns the boolean value \`true\`.
 * @example
 * TRUE() // returns true
 */
declare function TRUE(): true;

/**
 * Evaluates an array of items for unqiueness and returns an array devoid of duplicates.
 * If objects to be compared require an iteratee to extract data, it should be passed in as the last argument.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/unique/
 * @param args (Any, required): items to be evaluated
 * @returns an array of unique items
 */
declare function UNIQUE(...args: any[]): any[] | undefined;

/**
 * Returns a string of all uppercase letters
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/upper/
 * @param value (String, required): text to be converted to uppercase
 * @returns string of uppercase letters
 * @example
 * UPPER("test") // returns "TEST"
 */
declare function UPPER(value: string): string;
/**
 * Returns a string of all uppercase letters
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/upper/
 * @param value (String, required): text to be converted to uppercase
 * @returns string of uppercase letters
 * @example
 * UPPER("test") // returns "TEST"
 */
declare function UPPER(value: undefined | null | object | Array<any> | GenericObject): undefined;

/**
 * Returns the current user's full name if it exists in the current configuration.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/userfullname/
 */
declare function USERFULLNAME(): string | undefined;

/**
 * Returns a data value when given the field's data name.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/value/
 * @param dataName (String, required): data name of the desired field
 * @returns a form field value
 */
declare function VALUE(dataName: NumericFieldName): NumericFieldValue;
/**
 * Returns a data value when given the field's data name.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/value/
 * @param dataName (String, required): data name of the desired field
 * @returns a form field value
 */
declare function VALUE(dataName: TextFieldName): TextFieldValue;
/**
 * Returns a data value when given the field's data name.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/value/
 * @param dataName (String, required): data name of the desired field
 * @returns a form field value
 */
declare function VALUE(dataName: YesNoFieldName): YesNoFieldValue;
/**
 * Returns a data value when given the field's data name.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/value/
 * @param dataName (String, required): data name of the desired field
 * @returns a form field value
 */
declare function VALUE(dataName: PhotoFieldName): PhotoFieldValue;
/**
 * Returns a data value when given the field's data name.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/value/
 * @param dataName (String, required): data name of the desired field
 * @returns a form field value
 */
declare function VALUE(dataName: VideoFieldName): VideoFieldValue;
/**
 * Returns a data value when given the field's data name.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/value/
 * @param dataName (String, required): data name of the desired field
 * @returns a form field value
 */
declare function VALUE(dataName: AudioFieldName): AudioFieldValue;
/**
 * Returns a data value when given the field's data name.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/value/
 * @param dataName (String, required): data name of the desired field
 * @returns a form field value
 */
declare function VALUE(dataName: ChoiceFieldName): ChoiceFieldValue;
/**
 * Returns a data value when given the field's data name.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/value/
 * @param dataName (String, required): data name of the desired field
 * @returns a form field value
 */
declare function VALUE(dataName: RepeatableFieldName): RepeatableFieldValue;
/**
 * Returns a data value when given the field's data name.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/value/
 * @param dataName (String, required): data name of the desired field
 * @returns a form field value
 */
declare function VALUE(dataName: SignatureFieldName): SignatureFieldValue;
/**
 * Returns a data value when given the field's data name.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/value/
 * @param dataName (String, required): data name of the desired field
 * @returns a form field value
 */
declare function VALUE(dataName: RecordLinkFieldName): RecordLinkFieldValue;
/**
 * Returns a data value when given the field's data name.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/value/
 * @param dataName (String, required): data name of the desired field
 * @returns a form field value
 */
declare function VALUE(dataName: FieldName): string | undefined;
/**
 * Returns a data value when given the field's data name.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/value/
 * @param dataName (String, required): data name of the desired field
 * @returns a form field value
 */
declare function VALUE(dataName: string): string | undefined;
/**
 * Returns a data value when given the field's data name.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/value/
 * @param dataName (String, required): data name of the desired field
 * @returns a form field value
 */
declare function VALUE(dataName: any): any;

/**
 * Returns versino info about the app.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/versioninfo/
 * @param separator (String, optional): character to separate each item returned - defaults to " ,"
 */
declare function VERSIONINFO(separator?: string): string;

/**
 * Returns a year given a date.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/year/
 * @param date (Date|String, required): date, either as a Date object or a string in XXXX-XX-XX format
 * @returns year as numeric value
 * @example
 * YEAR("2015/12/16") // returns 2015
 */
declare function YEAR(date: Date): number;
/**
 * Returns a year given a date.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/year/
 * @param date (Date|String, required): date, either as a Date object or a string in XXXX-XX-XX format
 * @returns year as numeric value
 * @example
 * YEAR("2015/12/16") // returns 2015
 */
declare function YEAR(date: MaybeString): number;
/**
 * Returns a year given a date.
 *
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/year/
 * @param date (Date|String, required): date, either as a Date object or a string in XXXX-XX-XX format
 * @returns year as numeric value
 * @example
 * YEAR("2015/12/16") // returns 2015
 */
declare function YEAR(): undefined;

interface FunctionMap {
    [functionName: string]: Function | undefined;
}
 const functions: FunctionMap;

 type HostHTTPClient = (json: string, callbackID: number) => void;
 type HostSetTimeout = (duration: number, callbackID: number) => (number | undefined);
 type HostClearTimeout = (id: number) => void;
 type HostStorageLength = (scope: string) => number;
 type HostStorageKey = (scope: string, index: number) => any;
 type HostStorageGetItem = (scope: string, key: string) => any;
 type HostStorageSetItem = (scope: string, key: string, value: string) => void;
 type HostStorageRemoveItem = (scope: string, key: string) => void;
 type HostStorageClear = (scope: string) => void;
 type HostMessageBox = (json: string, callbackID: number) => void;
 type HostFormatNumber = (value: number, locale: string, options: {}) => string;

/**
 * The SETINTERVAL function can be used to repeatedly call a function at a specified interval.
 * It’s nearly identical to the web platform standard setInterval.
 * @param callback required; function to be called
 * @param interval required; numeric value indicating number of milliseconds between subsequent calls
 * @returns numeric id interval on host
 */
declare function setInterval(callback: Function, interval: number): number | undefined;

/**
 * Generate a Results object for a given expression.
 * @param key the form key of the expression field
 * @param rawValue the raw processed result
 * @param value the stringified version of the result
 * @param error errors generated
 * @param showErrors show errors as the value or not
 */
declare function (key: string, rawValue: any, value: MaybeString, error: any, showErrors: boolean): ExpressionResult;

/**
 * Generate a human readable format for use in the data events/expression fields.
 * @param value the value to format
 */
declare function formatValue(value?: any): string | null;

interface ElementStore {
    [key: string]: FormFields;
}
type RuntimeResults = Array<AlertResult | ConfigurationResult | InvalidResult | SetValueResult | ProgressResult | ExpressionResult | UpdateFormAttributesResult | OpenURLResult>;
type RuntimeResultCalculator = () => RuntimeResults;
type HostFunction = HostHTTPClient | HostSetTimeout | HostStorageLength | HostStorageKey | HostStorageGetItem | HostStorageSetItem | HostStorageRemoveItem | HostStorageClear | HostMessageBox | HostFormatNumber | HostClearTimeout;
interface WindowWithRuntime extends Window {
    $$runtime: Runtime;
    $$evaluate: RuntimeResultCalculator;
    $$trigger: RuntimeResultCalculator;
    $$finishAsync: RuntimeResultCalculator;
    $$prepare: () => void;
}
/**
 * The Runtime class handles the state of a data event in the context of a single Record being edited.
 */
    static defaultLocale: string;
    static defaultCurrencyCode: string;
    static defaultCurrencySymbol: string;
    static defaultTimeZone: string;
    callbackArguments: any[];
    $$httpRequest?: HostHTTPClient;
    $$setTimeout?: HostSetTimeout;
    $$storageLength?: HostStorageLength;
    $$storageKey?: HostStorageKey;
    $$storageGetItem?: HostStorageGetItem;
    $$storageSetItem?: HostStorageSetItem;
    $$storageRemoveItem?: HostStorageRemoveItem;
    $$storageClear?: HostStorageClear;
    $$messageBox?: HostMessageBox;
    $$formatNumber?: HostFormatNumber;
    $$clearTimeout?: HostClearTimeout;
    global: WindowWithRuntime;
    expressions: any[];
    form: any;
    values: {
        [key: string]: any;
    };
    repeatable: null | string;
    hooks: {};
    event: {
        name?: EventNames;
        field?: MaybeString;
    };
    events: {
        [key: string]: {
            [grouping: string]: Function[];
        };
    };
    script: null | string;
    customVariables: {
        [key: string]: any;
    };
    currentValue: any;
    locale: string;
    currencyCode: string;
    currencySymbol: string;
    variables: {
        [key: string]: any;
    };
    results: RuntimeResults;
    result: any;
    dataNames: {
        [key: string]: string;
    };
    elements: FormFields[];
    elementsByKey: ElementStore;
    elementsByDataName: ElementStore;
    statusesByValue: {
        [key: string]: string;
    };
    functions: FunctionMap;
    featureIsNew: boolean;
    showErrors: boolean;
    asyncCallbacks: {
        [id: number]: Function;
    };
    callbackID: number | null;
    asyncCount: number;
    scriptInitialized: boolean;
    hooksInitialized: boolean;
    isCalculation: boolean;
    extraVariableNames: string[];
    specialFunctions: {
        [name: string]: boolean;
    };
    constructor();
    /**
     * This is executed by the $$HOST after completing an asycnronous action.
     *
     * @example
     * $$runtime.callbackID = 200
     * $$runtime.callbackArguments = ['Joe Smith']
     * const results = $$finishAsync()
     * results.each((result) => ...)
     */
    finishAsync: RuntimeResultCalculator;
    /**
     * This is executed by the $$HOST when initializing a new session.
     *
     * @example
     * $$runtime.form = { ...formSchema }
     * if (form.script) $$runtime.script = form.script
     * $$prepare()
     */
    prepare: () => void;
    /**
     * Clear the values so that the references from the \`with\` statements remain
     * on the same root object. If we create a new \`variables\` it won't stay the same
     * across executions. This is so the $field variables work in the form-level scripts.
     */
    clearValues: () => void;
    /**
     * Used to reset values when a form value changes and $$evaluate is called.
     */
    setupValues: () => void;
    /**
     * Initialize a script during setupValues call if it is needed.
     */
    initializeScriptIfNecessary: () => undefined;
    /**
     * Executed by the $$HOST when a form value changes.
     *
     * @example
     * $$runtime.values = { ...formValues }
     * const results = $$evaluate()
     * results.each((result) => ...)
     */
    evaluate: RuntimeResultCalculator;
    /**
     * Evaluates an expression and returns an ExpressionResult.
     * @param context required; object that contains a field's dataName, key, and an expression
     * @returns ExpressionResult: { type: 'calculation', key: string, error?: string, value: any }
     */
    evaluateExpression: (context: any) => ExpressionResult;
    /**
     * Executed by the $$HOST when a form level event has occurred.
     *
     * @example
     * $$runtime.values = { ...formValues }
     * $$runtime.event = 'CHANGE'
     * const results = $$trigger()
     * results.each((result) => ...)
     */
    trigger: RuntimeResultCalculator;
    /**
     * Dispatch a function to execute asyncronously on the $$HOST
     * @param func host function to invoke
     * @param args arguments to pass to the $$HOST function
     * @param callback callback to execute after the $$HOST has completed it's async operation
     */
    invokeAsync(func: HostFunction, args: any[], callback: Function): void;
    /**
     * Add a hook to the Events table.
     * @param name event to hook in to
     * @param param field to bind to
     * @param callback callback to execute
     */
    addHook(name: EventNames, param: MaybeString, callback: Function): void;
    /**
     * Remove the hook from the Events table.
     * @param name event to hook in to
     * @param param field to bind to
     * @param callback callback to execute
     */
    removeHook(name: EventNames, param: MaybeString, callback?: Function): void;
    private pathFor;
    private resetResults;
}

/**
 * Setup a new instance of the $$runtime global.
 */
 const prepareRuntime: () => Runtime;
/** Simlate a host finishing an async operation */
 const finishAsync: (callbackID: number) => void;
 const extendToBeWithinRange: () => any;
 const extendContainAllElements: () => any;

 const _default: {
    data_name: string;
    default_value: string;
    description: string;
    disabled: boolean;
    elements: ({
        data_name: string;
        default_value: null;
        description: null;
        disabled: boolean;
        format: string;
        hidden: boolean;
        key: string;
        label: string;
        max: null;
        max_length: null;
        min: null;
        min_length: null;
        numeric: boolean;
        required: boolean;
        required_conditions: null;
        required_conditions_type: null;
        type: string;
        visible_conditions: null;
        visible_conditions_type: null;
        multiple?: undefined;
        allow_other?: undefined;
        default_previous_value?: undefined;
        choices?: undefined;
        elements?: undefined;
        geometry_required?: undefined;
        geometry_types?: undefined;
        title_field_key?: undefined;
        title_field_keys?: undefined;
    } | {
        type: string;
        key: string;
        label: string;
        description: null;
        required: boolean;
        disabled: boolean;
        hidden: boolean;
        data_name: string;
        default_value: null;
        visible_conditions_type: null;
        visible_conditions: null;
        required_conditions_type: null;
        required_conditions: null;
        multiple: boolean;
        allow_other: boolean;
        default_previous_value: boolean;
        choices: {
            label: string;
            value: string;
        }[];
        format?: undefined;
        max?: undefined;
        max_length?: undefined;
        min?: undefined;
        min_length?: undefined;
        numeric?: undefined;
        elements?: undefined;
        geometry_required?: undefined;
        geometry_types?: undefined;
        title_field_key?: undefined;
        title_field_keys?: undefined;
    } | {
        data_name: string;
        default_value: null;
        description: null;
        disabled: boolean;
        elements: {
            data_name: string;
            default_value: null;
            description: null;
            disabled: boolean;
            format: string;
            hidden: boolean;
            key: string;
            label: string;
            max: null;
            max_length: null;
            min: null;
            min_length: null;
            numeric: boolean;
            required: boolean;
            required_conditions: null;
            required_conditions_type: null;
            type: string;
            visible_conditions: null;
            visible_conditions_type: null;
        }[];
        geometry_required: boolean;
        geometry_types: string[];
        hidden: boolean;
        key: string;
        label: string;
        max_length: null;
        min_length: null;
        required: boolean;
        required_conditions: null;
        required_conditions_type: null;
        title_field_key: null;
        title_field_keys: string[];
        type: string;
        visible_conditions: null;
        visible_conditions_type: null;
        format?: undefined;
        max?: undefined;
        min?: undefined;
        numeric?: undefined;
        multiple?: undefined;
        allow_other?: undefined;
        default_previous_value?: undefined;
        choices?: undefined;
    })[];
    geometry_required: boolean;
    geometry_types: string[];
    hidden: boolean;
    key: string;
    label: string;
    max_length: null;
    min_length: null;
    required: boolean;
    title_field_key: null;
    title_field_keys: string[];
    type: string;
};

  var $$runtime: Runtime
} var $$runtime: Runtime

 /**
  * Encode a URL to a percent-encoded form, excluding already-encoded sequences.
  *
  * This function will take an already-encoded URL and encode all the non-URL
  * code points. This function will not encode the "%" character unless it is
  * not part of a valid sequence (\`%20\` will be left as-is, but \`%foo\` will
  * be encoded as \`%25foo\`).
  *
  * This encode is meant to be "safe" and does not throw errors. It will try as
  * hard as it can to properly encode the given URL, including replacing any raw,
  * unpaired surrogate pairs with the Unicode replacement character prior to
  * encoding.
  */
 function encodeurl(url: string): string
  = encodeurl
`;
/**
 * Parses the passed in value as a numeric value
 * @param value any type
 * @returns a numeric value
 * @example
 * NUM('1') // returns 1
 * NUM('a') // returns NaN
 */
declare function NUM(value: any): number;

/**
 * Returns the absolute value of a number.
 * @param value The number of which to return the absolute value.
 * @returns the absolute value of the `value` parameter
 * @example
 * ABS(-1) // returns 1
 * ABS(42) // returns 42
 */
declare function ABS(value: number): number;
/**
 * Returns the absolute value of a number.
 * @param value The number of which to return the absolute value.
 * @returns the absolute value of the `value` parameter
 * @example
 * ABS(-1) // returns 1
 * ABS(42) // returns 42
 */
declare function ABS(value: string): number;

/**
 * Returns the inverse cosine of a value, in radians.
 * @param value The value for which to calculate the inverse cosine. Must be between -1 and 1, inclusive.
 * @returns
 * @example
 * ACOS(0.8) // returns 0.6435011087932843
 */
declare function ACOS(value: number): number;
/**
 * Returns the inverse cosine of a value, in radians.
 * @param value The value for which to calculate the inverse cosine. Must be between -1 and 1, inclusive.
 * @returns
 * @example
 * ACOS(0.8) // returns 0.6435011087932843
 */
declare function ACOS(value: string): number;

/**
 * Returns the inverse hyperbolic cosine of a number.
 * @param value The value for which to calculate the inverse hyperbolic cosine. Must be greater than or equal to 1.
 * @example
 * ACOSH(7) // returns 2.6339157938496336
 */
declare function ACOSH(value: number): number;
/**
 * Returns the inverse hyperbolic cosine of a number.
 * @param value The value for which to calculate the inverse hyperbolic cosine. Must be greater than or equal to 1.
 * @example
 * ACOSH(7) // returns 2.6339157938496336
 */
declare function ACOSH(value: string): number;

interface ToStringable {
    toString(): string;
}
/**
 * Display a message as an alert.
 * ALERT displays a message to the user. You can provide both the title and message of the alert box.
 * @example
 * ALERT('Warning!', 'A depth of 98 feet is high. Are you sure?');
 *
 * // Displays an alert that looks like
 * // +-------------------------------------------+
 * // | Warning!                                  |
 * // +-------------------------------------------|
 * // |                                           |
 * // | A depth of 98 feet is high. Are you sure? |
 * // |                                           |
 * // +-------------------------------------------+
 */
declare function ALERT(message: ToStringable): void;
/**
 * Display a message as an alert.
 * ALERT displays a message to the user. You can provide both the title and message of the alert box.
 * @example
 * ALERT('Warning!', 'A depth of 98 feet is high. Are you sure?');
 *
 * // Displays an alert that looks like
 * // +-------------------------------------------+
 * // | Warning!                                  |
 * // +-------------------------------------------|
 * // |                                           |
 * // | A depth of 98 feet is high. Are you sure? |
 * // |                                           |
 * // +-------------------------------------------+
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
 */
declare function ALTITUDE(): number;

/**
 * Accepts an array of expressions and returns true if both are true, and false if both or one is false
 * @param args list of items of any type
 * @returns boolean value
 * @example
 * AND('this' === 'that', 4 > 2) // returns false
 * AND('this' === 'this', 4 > 2) // returns true
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
 * APPLICATIONVERSION()
 * // if called with
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
 * @returns a flattened array
 * @example
 * FLATTEN([1, [2, [3]]]) // returns [1, 2, 3]
 */
declare function FLATTEN(value: RecursiveArray<any>): any[];

/**
 * Accepts any number of arguments and returns them as an array
 * @param args list of items of any type
 * @returns an array flattened to on level deep
 * @example
 * ARRAY(1, 2, 3) // returns [1, 2, 3]
 * ARRAY([1, 2], '3', [4, 5]) // returns [1, 2, '3', 4, 5]
 */
declare function ARRAY(...args: any[]): any[];

/**
 * Accepts a list of numbers and returns their average (mean)
 * @param multiple integers or floats
 * @returns integer or float
 * @example
 * AVERAGE(3, 5) // returns 4
 * AVERAGE(1, 1.5, 3.75) // returns 2.0833333333333335
 */
declare function AVERAGE(...values: AverageValues): number;

/**
 * Returns a boolean value indicating if value passed in is a numeric value
 * @param value any type
 * @returns boolean
 * @example
 * ISNUMBER(8) // returns true
 * ISNUMBER(3.78) // returns true
 * ISNUMBER('3.67') // returns false
 */
declare function ISNUMBER(value: any): boolean;

/**
 * Returns a boolean value indicating if the passed in value is not a number
 * @param value value of any type
 * @returns boolean value
 * @example
 * ISNAN(9) // returns false
 * ISNAN('a7') // returns true
 */
declare function ISNAN(value: any): boolean;

/**
 * Returns the number of digits to the right of the decimal point
 * @param value a numeric type
 * @returns numberic value
 * @example
 * PRECISION(9.034) // returns 3
 * PRECISION(9) // returns 0
 */
declare function PRECISION(value: number): number;
/**
 * Returns the number of digits to the right of the decimal point
 * @param value a numeric type
 * @returns numberic value
 * @example
 * PRECISION(9.034) // returns 3
 * PRECISION(9) // returns 0
 */
declare function PRECISION(value: string): number;

/**
 * Rounds a number to given scale
 * @param number numeric value to be rounded
 * @param scale optional, number of digits required after the decimal point
 * @returns rounded number
 * @example
 * ROUND(5.6) // returns 6
 * ROUND(-2.3333333, 4) // return -2.3333;
 */
declare function ROUND(value: number): number;
/**
 * Rounds a number to given scale
 * @param number numeric value to be rounded
 * @param scale optional, number of digits required after the decimal point
 * @returns rounded number
 * @example
 * ROUND(5.6) // returns 6
 * ROUND(-2.3333333, 4) // return -2.3333;
 */
declare function ROUND(value: number, scale: number): number;
/**
 * Rounds a number to given scale
 * @param number numeric value to be rounded
 * @param scale optional, number of digits required after the decimal point
 * @returns rounded number
 * @example
 * ROUND(5.6) // returns 6
 * ROUND(-2.3333333, 4) // return -2.3333;
 */
declare function ROUND(value: string): number;
/**
 * Rounds a number to given scale
 * @param number numeric value to be rounded
 * @param scale optional, number of digits required after the decimal point
 * @returns rounded number
 * @example
 * ROUND(5.6) // returns 6
 * ROUND(-2.3333333, 4) // return -2.3333;
 */
declare function ROUND(value: string, scale: number): number;

/**
 * Returns number rounded up, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next highest integer (multiple of 1)
 * @param number numeric value to be rounded
 * @param multiple optional, multiple to which a number will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * CEILING(3.45) // returns 4
 * CEILING(2.3333333, 4) // returns 4
 */
declare function CEILING(value: number): number;
/**
 * Returns number rounded up, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next highest integer (multiple of 1)
 * @param number numeric value to be rounded
 * @param multiple optional, multiple to which a number will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * CEILING(3.45) // returns 4
 * CEILING(2.3333333, 4) // returns 4
 */
declare function CEILING(value: number, multiple: number): number;
/**
 * Returns number rounded up, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next highest integer (multiple of 1)
 * @param number numeric value to be rounded
 * @param multiple optional, multiple to which a number will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * CEILING(3.45) // returns 4
 * CEILING(2.3333333, 4) // returns 4
 */
declare function CEILING(value: string): number;
/**
 * Returns number rounded up, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next highest integer (multiple of 1)
 * @param number numeric value to be rounded
 * @param multiple optional, multiple to which a number will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * CEILING(3.45) // returns 4
 * CEILING(2.3333333, 4) // returns 4
 */
declare function CEILING(value: string, multiple: number): number;
/**
 * Returns number rounded up, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next highest integer (multiple of 1)
 * @param number numeric value to be rounded
 * @param multiple optional, multiple to which a number will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * CEILING(3.45) // returns 4
 * CEILING(2.3333333, 4) // returns 4
 */
declare function CEILING(): number;

/**
 * Returns the character of a given char code
 * @param value integer (character code)
 * @returns a character as a string
 * @example
 * CHAR(65) // returns 'A'
 */
declare function CHAR(value: number): string;
/**
 * Returns the character of a given char code
 * @param value integer (character code)
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

interface CurrentLocation {
  latitude: number | null,
  longitude: number | null,
  altitude: number | null,
  accuracy: number | null,
  course: number | null,
  speed: number | null,
  timestamp: number | null
}
/**
 * Returns a boolean value indiciating whether the object is blank/empty.
 * Values of null, undefined, and NaN are considered blank and the function will return true.
 *
 * @param value item or Choice Field value to be checked for blankness or emptiness;
 * Example: ISBLANK( { choice_values: null, other_values: ['a', 'b'] } )
 * @returns boolean value
 *
 * @example
 * ISBLANK('') // returns true
 * ISBLANK(NaN) // returns true
 * ISBLANK({choice_values: ['a'], other_values: null}) // returns false
 * ISBLANK({choice_values: null, other_values: null}) // returns true
 */
declare function ISBLANK(value: ChoiceFieldValue): boolean;
/**
 * Returns a boolean value indiciating whether the object is blank/empty.
 * Values of null, undefined, and NaN are considered blank and the function will return true.
 *
 * @param value item or Choice Field value to be checked for blankness or emptiness;
 * Example: ISBLANK( { choice_values: null, other_values: ['a', 'b'] } )
 * @returns boolean value
 *
 * @example
 * ISBLANK('') // returns true
 * ISBLANK(NaN) // returns true
 * ISBLANK({choice_values: ['a'], other_values: null}) // returns false
 * ISBLANK({choice_values: null, other_values: null}) // returns true
 */
declare function ISBLANK(value: any): boolean;
/**
 * Returns a boolean value indiciating whether the object is blank/empty.
 * Values of null, undefined, and NaN are considered blank and the function will return true.
 *
 * @param value item or Choice Field value to be checked for blankness or emptiness;
 * Example: ISBLANK( { choice_values: null, other_values: ['a', 'b'] } )
 * @returns boolean value
 *
 * @example
 * ISBLANK('') // returns true
 * ISBLANK(NaN) // returns true
 * ISBLANK({choice_values: ['a'], other_values: null}) // returns false
 * ISBLANK({choice_values: null, other_values: null}) // returns true
 */
declare function ISBLANK(): boolean;

/**
 * Converts a choicefield object to an array with null values and blank strings removed
 * @param field ChoiceFieldValue: {choice_values: [ ... ], other_values: [ ... ]}
 * @returns array
 * @example
 * CHOICEVALUES({choice_values: ['a', 'b'], other_values: ['c', 'd']}) // returns [ 'a', 'b', 'c', 'd' ]
 */
declare function CHOICEVALUES(field: ChoiceFieldValue): string[];
/**
 * Converts a choicefield object to an array with null values and blank strings removed
 * @param field ChoiceFieldValue: {choice_values: [ ... ], other_values: [ ... ]}
 * @returns array
 * @example
 * CHOICEVALUES({choice_values: ['a', 'b'], other_values: ['c', 'd']}) // returns [ 'a', 'b', 'c', 'd' ]
 */
declare function CHOICEVALUES(field: any): any[];
/**
 * Converts a choicefield object to an array with null values and blank strings removed
 * @param field ChoiceFieldValue: {choice_values: [ ... ], other_values: [ ... ]}
 * @returns array
 * @example
 * CHOICEVALUES({choice_values: ['a', 'b'], other_values: ['c', 'd']}) // returns [ 'a', 'b', 'c', 'd' ]
 */
declare function CHOICEVALUES(): undefined;

/**
 * Returns the first choice value in the choice field value passed to the function
 * @param field Choice field value, e.g. `{choice_values: ['a', 'b'], other_values" ['c', 'd']}`
 * @returns string value, first choice in a list of choice field values
 * @example
 * CHOICEVALUE({choice_values: ['a', 'b'], other_values: ['c', 'd']}) // returns 'a'
 */
declare function CHOICEVALUE(field: ChoiceFieldValue): MaybeString;
/**
 * Returns the first choice value in the choice field value passed to the function
 * @param field Choice field value, e.g. `{choice_values: ['a', 'b'], other_values" ['c', 'd']}`
 * @returns string value, first choice in a list of choice field values
 * @example
 * CHOICEVALUE({choice_values: ['a', 'b'], other_values: ['c', 'd']}) // returns 'a'
 */
declare function CHOICEVALUE(field: any): MaybeString;

/**
 * Removes non-printable characters from a string
 * @param text string to be cleaned
 * @returns cleaned string
 * @example
 * CLEAN('test\x00\x1D\x1Etest') // returns 'testtest'
 */
declare function CLEAN(text: string): string;



/**
 * Returns first value passed in to function that exists
 * NaN, undefined, null, and empty strings, objects, and arrays are not recognized
 * @param args array of values
 * @returns first value passed into function
 * @example
 * COALESCE([[2, 3], [3, 6, [5]]]) // returns 2
 * COALESCE([{}, {}, {foo: "bar"}]) // returns {foo: "bar"}
 */
declare function COALESCE(...args: any[]): string | number | undefined;
/**
 * Returns first value passed in to function that exists
 * NaN, undefined, null, and empty strings, objects, and arrays are not recognized
 * @param args array of values
 * @returns first value passed into function
 * @example
 * COALESCE([[2, 3], [3, 6, [5]]]) // returns 2
 * COALESCE([{}, {}, {foo: "bar"}]) // returns {foo: "bar"}
 */
declare function COALESCE(): undefined;

/**
 * Returns numeric code for first character in passed in string
 * @param str string
 * @returns numeric code
 * @example
 * CODE("A") // returns 65
 * CODE("apple") // returns 97
 * CODE(9) // returns 57
 */
declare function CODE(str: MaybeString): number;
/**
 * Returns numeric code for first character in passed in string
 * @param str string
 * @returns numeric code
 * @example
 * CODE("A") // returns 65
 * CODE("apple") // returns 97
 * CODE(9) // returns 57
 */
declare function CODE(str: number): number;
/**
 * Returns numeric code for first character in passed in string
 * @param str string
 * @returns numeric code
 * @example
 * CODE("A") // returns 65
 * CODE("apple") // returns 97
 * CODE(9) // returns 57
 */
declare function CODE(str: Object): number;
/**
 * Returns numeric code for first character in passed in string
 * @param str string
 * @returns numeric code
 * @example
 * CODE("A") // returns 65
 * CODE("apple") // returns 97
 * CODE(9) // returns 57
 */
declare function CODE(str: any[]): number;
/**
 * Returns numeric code for first character in passed in string
 * @param str string
 * @returns numeric code
 * @example
 * CODE("A") // returns 65
 * CODE("apple") // returns 97
 * CODE(9) // returns 57
 */
declare function CODE(): number;

/**
 * Returns a compacted array without null or undefined values.
 * @param value array of values
 * @returns a compacted array with null and undefined values removed
 * @example
 * COMPACT(['a', 'b', null, 'c']) // returns ['a', 'b', 'c']
 */
declare function COMPACT(value: any[]): any[] | undefined;
/**
 * Returns a compacted array without null or undefined values.
 * @param value array of values
 * @returns a compacted array with null and undefined values removed
 * @example
 * COMPACT(['a', 'b', null, 'c']) // returns ['a', 'b', 'c']
 */
declare function COMPACT(value: any): undefined;
/**
 * Returns a compacted array without null or undefined values.
 * @param value array of values
 * @returns a compacted array with null and undefined values removed
 * @example
 * COMPACT(['a', 'b', null, 'c']) // returns ['a', 'b', 'c']
 */
declare function COMPACT(): undefined;

/**
 * Returns a concatenated string
 * @param strings strings to be concatenated
 * @returns a single concatenated string
 * @example
 * CONCATENATE('hello', 'world') // returns 'helloworld'
 * CONCATENATE(['a', 'b', null, 'c']) // returns 'abc'
 */
declare function CONCATENATE(...strings: any[]): string;
/**
 * Returns a concatenated string
 * @param strings strings to be concatenated
 * @returns a single concatenated string
 * @example
 * CONCATENATE('hello', 'world') // returns 'helloworld'
 * CONCATENATE(['a', 'b', null, 'c']) // returns 'abc'
 */
declare function CONCATENATE(): string;


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
 * @param message the error message to display
 * @throws Error entered by the user
 */
declare function ERROR(message: string): void;

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
 * MESSAGEBOX displays a message to the user.
 * You can provide both the title and message of the alert box.
 * Using the buttons parameter you can specify the button titles that are displayed in the message box.
 * @param options Object(required) - options for the message box
 * @param callback function(required) - invoked when message box is dismissed
 * @returns invokes callback or returns an options Object
 * @example
 * const options = {
 * title: 'Confirm',
 * message: 'You selected a safety violation: Are you sure?',
 * buttons: ['Yes', 'No']
 * }
 *
 * const callback = function (result) {
 *               if (result.value === 'Yes') {
 *                  // Selected Yes
 *               } else {
 *                 // Selected No
 *               }
 *            }
 *
 * MESSAGEBOX(options, callback);
 */
declare function MESSAGEBOX(options: MessageBoxPayload, callback: Function): void;
/**
 * MESSAGEBOX displays a message to the user.
 * You can provide both the title and message of the alert box.
 * Using the buttons parameter you can specify the button titles that are displayed in the message box.
 * @param options Object(required) - options for the message box
 * @param callback function(required) - invoked when message box is dismissed
 * @returns invokes callback or returns an options Object
 * @example
 * const options = {
 * title: 'Confirm',
 * message: 'You selected a safety violation: Are you sure?',
 * buttons: ['Yes', 'No']
 * }
 *
 * const callback = function (result) {
 *               if (result.value === 'Yes') {
 *                  // Selected Yes
 *               } else {
 *                 // Selected No
 *               }
 *            }
 *
 * MESSAGEBOX(options, callback);
 */
declare function MESSAGEBOX(options: MessageBoxPayload): void;
/**
 * MESSAGEBOX displays a message to the user.
 * You can provide both the title and message of the alert box.
 * Using the buttons parameter you can specify the button titles that are displayed in the message box.
 * @param options Object(required) - options for the message box
 * @param callback function(required) - invoked when message box is dismissed
 * @returns invokes callback or returns an options Object
 * @example
 * const options = {
 * title: 'Confirm',
 * message: 'You selected a safety violation: Are you sure?',
 * buttons: ['Yes', 'No']
 * }
 *
 * const callback = function (result) {
 *               if (result.value === 'Yes') {
 *                  // Selected Yes
 *               } else {
 *                 // Selected No
 *               }
 *            }
 *
 * MESSAGEBOX(options, callback);
 */
declare function MESSAGEBOX(options: MessageBoxPayload, callback: Function): void;

/**
 * CONFIRM displays a message to the user and allows a callback function
 * that will be invoked to respond to the result of the question.
 * @param title short title for popup box
 * @param message message to display to the user
 * @param callback callback to invoke upon closing the popup box
 * @example
 * CONFIRM('Confirm',
 * 'You have selected a critical safety violation. Are you sure?',
 * function (result) {
 * if (result.value === 'Okay') {
 *  // Selected Okay
 * } else {
 *  // Selected Cancel
 * }
 * });
 * )
 */
declare function CONFIRM(title: string, message: string, callback: Function): void;
/**
 * CONFIRM displays a message to the user and allows a callback function
 * that will be invoked to respond to the result of the question.
 * @param title short title for popup box
 * @param message message to display to the user
 * @param callback callback to invoke upon closing the popup box
 * @example
 * CONFIRM('Confirm',
 * 'You have selected a critical safety violation. Are you sure?',
 * function (result) {
 * if (result.value === 'Okay') {
 *  // Selected Okay
 * } else {
 *  // Selected Cancel
 * }
 * });
 * )
 */
declare function CONFIRM(message: string, callback: Function): void;

/**
 * Checks that a value is present in a string or array
 * @param haystack required; collection, either a string or an array, to be iterated over
 * @param needle required; value one is looking for
 * @param fromIndex optional; numeric index from which to start looking for a value
 * @returns boolean: true if value is found, else false
 * @example
 * CONTAINS(["apple", "orange", "lemon"], "orange") // returns true
 * CONTAINS(["apple", "orange", "lemon"], "apple", 1) // returns false
 */
declare function CONTAINS(haystack: string | any[], needle: MaybeString | number): boolean;
/**
 * Checks that a value is present in a string or array
 * @param haystack required; collection, either a string or an array, to be iterated over
 * @param needle required; value one is looking for
 * @param fromIndex optional; numeric index from which to start looking for a value
 * @returns boolean: true if value is found, else false
 * @example
 * CONTAINS(["apple", "orange", "lemon"], "orange") // returns true
 * CONTAINS(["apple", "orange", "lemon"], "apple", 1) // returns false
 */
declare function CONTAINS(haystack: string | any[], needle: MaybeString | number, fromIndex?: number): boolean;
/**
 * Checks that a value is present in a string or array
 * @param haystack required; collection, either a string or an array, to be iterated over
 * @param needle required; value one is looking for
 * @param fromIndex optional; numeric index from which to start looking for a value
 * @returns boolean: true if value is found, else false
 * @example
 * CONTAINS(["apple", "orange", "lemon"], "orange") // returns true
 * CONTAINS(["apple", "orange", "lemon"], "apple", 1) // returns false
 */
declare function CONTAINS(haystack: string | any[], needle: MaybeString | number, fromIndex?: any): boolean;
/**
 * Checks that a value is present in a string or array
 * @param haystack required; collection, either a string or an array, to be iterated over
 * @param needle required; value one is looking for
 * @param fromIndex optional; numeric index from which to start looking for a value
 * @returns boolean: true if value is found, else false
 * @example
 * CONTAINS(["apple", "orange", "lemon"], "orange") // returns true
 * CONTAINS(["apple", "orange", "lemon"], "apple", 1) // returns false
 */
declare function CONTAINS(haystack: any, needle: MaybeString | number): boolean;

/**
 * Returns the cosine of the specified angle value, which must be specified in radians.
 * @param value numeric value specifying radians
 * @returns numeric value between 1 and -1 indicating the angle's cosine
 * @example
 * COS(12) // returns 0.8438539587324921
 */
declare function COS(value: number): number;
/**
 * Returns the cosine of the specified angle value, which must be specified in radians.
 * @param value numeric value specifying radians
 * @returns numeric value between 1 and -1 indicating the angle's cosine
 * @example
 * COS(12) // returns 0.8438539587324921
 */
declare function COS(value: string): number;

/**
 * Returns function returns the hyperbolic cosine of a number
 * @param value numeric value
 * @returns numeric value between 1 and -1 indicating the angle's cosine
 * @example
 * COSH(12) // returns 0.8438539587324921
 */
declare function COSH(value: number): number;
/**
 * Returns function returns the hyperbolic cosine of a number
 * @param value numeric value
 * @returns numeric value between 1 and -1 indicating the angle's cosine
 * @example
 * COSH(12) // returns 0.8438539587324921
 */
declare function COSH(value: string): number;

/**
 * Returns the count of the numeric values in an array.
 * Will coerce numeric strings (`"1"`) into a numeric value (`1`).
 *
 * @param value array of items to be counted
 * @returns number
 * @example
 * COUNT([1, "2", null, 3, null]) // returns 3
 */
declare function COUNT(value: number[]): number;
/**
 * Returns the count of the numeric values in an array.
 * Will coerce numeric strings (`"1"`) into a numeric value (`1`).
 *
 * @param value array of items to be counted
 * @returns number
 * @example
 * COUNT([1, "2", null, 3, null]) // returns 3
 */
declare function COUNT(value: string[]): number;
/**
 * Returns the count of the numeric values in an array.
 * Will coerce numeric strings (`"1"`) into a numeric value (`1`).
 *
 * @param value array of items to be counted
 * @returns number
 * @example
 * COUNT([1, "2", null, 3, null]) // returns 3
 */
declare function COUNT(): undefined;
/**
 * Returns the count of the numeric values in an array.
 * Will coerce numeric strings (`"1"`) into a numeric value (`1`).
 *
 * @param value array of items to be counted
 * @returns number
 * @example
 * COUNT([1, "2", null, 3, null]) // returns 3
 */
declare function COUNT(value: any): number | undefined;

/**
 * Returns a count of the items in a list that are not null, undefined, or blank
 * @param value array of items
 * @returns number
 * @example
 * COUNTA(["orange", "lemon", null, "grape"]) // returns 3
 */
declare function COUNTA(value: any[]): number;
/**
 * Returns a count of the items in a list that are not null, undefined, or blank
 * @param value array of items
 * @returns number
 * @example
 * COUNTA(["orange", "lemon", null, "grape"]) // returns 3
 */
declare function COUNTA(value: any): number;
/**
 * Returns a count of the items in a list that are not null, undefined, or blank
 * @param value array of items
 * @returns number
 * @example
 * COUNTA(["orange", "lemon", null, "grape"]) // returns 3
 */
declare function COUNTA(): number;

/**
 * Returns a count of the number of blank items.
 * Items considered blank include `null`, `undefined`, `[]`, `{}`, and `""`.
 * @param args list of items
 * @returns number
 * @example
 * COUNTBLANK([1, 2, null, 3]) // returns 1
 */
declare function COUNTBLANK(...args: any[]): number;
/**
 * Returns a count of the number of blank items.
 * Items considered blank include `null`, `undefined`, `[]`, `{}`, and `""`.
 * @param args list of items
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

/**
 * Returns the data names of the form fields. Also accepts an optional
 * type argument to filter form fields by type.
 * @param type optional; string of a FormFieldType: e.g. "YesNoField"
 * @returns array of datanames
 * @example
 * DATANAMES() // returns [ "name", "items", "cost", "choice_value", "child_items", "child_item_cost", "choice_field" ]
 * DATANAMES('Repeatable') // returns [ "items", "child_items" ]
 */
declare function DATANAMES(): any[];
/**
 * Returns the data names of the form fields. Also accepts an optional
 * type argument to filter form fields by type.
 * @param type optional; string of a FormFieldType: e.g. "YesNoField"
 * @returns array of datanames
 * @example
 * DATANAMES() // returns [ "name", "items", "cost", "choice_value", "child_items", "child_item_cost", "choice_field" ]
 * DATANAMES('Repeatable') // returns [ "items", "child_items" ]
 */
declare function DATANAMES(type: FormFieldTypes): any[];
/**
 * Returns the data names of the form fields. Also accepts an optional
 * type argument to filter form fields by type.
 * @param type optional; string of a FormFieldType: e.g. "YesNoField"
 * @returns array of datanames
 * @example
 * DATANAMES() // returns [ "name", "items", "cost", "choice_value", "child_items", "child_item_cost", "choice_field" ]
 * DATANAMES('Repeatable') // returns [ "items", "child_items" ]
 */
declare function DATANAMES(type: string): any[];

/**
 * Returns number rounded down, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next lowest integer (multiple of 1)
 * @param number numeric value to be rounded
 * @param multiple optional, multiple to which a number will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * FLOOR(3.45) // returns 3
 * FLOOR(2.3333333, 4) // returns 2
 */
declare function FLOOR(value: number): number;
/**
 * Returns number rounded down, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next lowest integer (multiple of 1)
 * @param number numeric value to be rounded
 * @param multiple optional, multiple to which a number will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * FLOOR(3.45) // returns 3
 * FLOOR(2.3333333, 4) // returns 2
 */
declare function FLOOR(value: number, multiple: number): number;
/**
 * Returns number rounded down, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next lowest integer (multiple of 1)
 * @param number numeric value to be rounded
 * @param multiple optional, multiple to which a number will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * FLOOR(3.45) // returns 3
 * FLOOR(2.3333333, 4) // returns 2
 */
declare function FLOOR(value: string): number;
/**
 * Returns number rounded down, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next lowest integer (multiple of 1)
 * @param number numeric value to be rounded
 * @param multiple optional, multiple to which a number will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * FLOOR(3.45) // returns 3
 * FLOOR(2.3333333, 4) // returns 2
 */
declare function FLOOR(value: string, multiple: number): number;
/**
 * Returns number rounded down, away from zero, to the nearest multiple
 * If a multiple is not specified, number will be rounded to next lowest integer (multiple of 1)
 * @param number numeric value to be rounded
 * @param multiple optional, multiple to which a number will be rounded
 * @returns number rounded to nearest multiple
 * @example
 * FLOOR(3.45) // returns 3
 * FLOOR(2.3333333, 4) // returns 2
 */
declare function FLOOR(): number;


/**
 * Returns a new Date object given a year, month, and day.
 * @param year four-digit number
 * @param month one-two digit number
 * @param day one-two digit number
 * @returns Date object
 * @example
 * DATE(2012, 3, 14) // returns 2012-04-14T00:00:00.000Z
 */
declare function DATE(year: number, month: number, day: number): Date;
/**
 * Returns a new Date object given a year, month, and day.
 * @param year four-digit number
 * @param month one-two digit number
 * @param day one-two digit number
 * @returns Date object
 * @example
 * DATE(2012, 3, 14) // returns 2012-04-14T00:00:00.000Z
 */
declare function DATE(year: string, month: string, day: string): Date | undefined;
/**
 * Returns a new Date object given a year, month, and day.
 * @param year four-digit number
 * @param month one-two digit number
 * @param day one-two digit number
 * @returns Date object
 * @example
 * DATE(2012, 3, 14) // returns 2012-04-14T00:00:00.000Z
 */
declare function DATE(year?: any, month?: any, day?: any): undefined;
/**
 * Returns a new Date object given a year, month, and day.
 * @param year four-digit number
 * @param month one-two digit number
 * @param day one-two digit number
 * @returns Date object
 * @example
 * DATE(2012, 3, 14) // returns 2012-04-14T00:00:00.000Z
 */
declare function DATE(): undefined;

/**
 * Returns the right characters of a string, i.e. the characters starting at index -1
 * @param value required; string
 * @param numberOfCharacters optional; number indicating the amount of characters to be returned
 * @returns a substring of characters
 * @example
 * RIGHT("abc") // returns "c"
 * RIGHT("abc", 2) // returns "bc"
 */
declare function RIGHT(value: string, numberOfCharacters: number): MaybeString;
/**
 * Returns the right characters of a string, i.e. the characters starting at index -1
 * @param value required; string
 * @param numberOfCharacters optional; number indicating the amount of characters to be returned
 * @returns a substring of characters
 * @example
 * RIGHT("abc") // returns "c"
 * RIGHT("abc", 2) // returns "bc"
 */
declare function RIGHT(value: any, numberOfCharacters?: any): MaybeString;
/**
 * Returns the right characters of a string, i.e. the characters starting at index -1
 * @param value required; string
 * @param numberOfCharacters optional; number indicating the amount of characters to be returned
 * @returns a substring of characters
 * @example
 * RIGHT("abc") // returns "c"
 * RIGHT("abc", 2) // returns "bc"
 */
declare function RIGHT(): undefined;

/**
 * Returns a string padded to the left with a character of choice.
 * @param value required; string to be padded
 * @param count required; integer indicating the total length of the desired string
 * @param padding option; string, character to use for padding, defaults to " "
 * @returns a padded string
 * @example
 * LPAD("abc", 5) // returns "  abc"
 * LPAD("abc", 5, "0") // returns "00abc"
 */
declare function LPAD(value: string, count: number, padding?: string): MaybeString;
/**
 * Returns a string padded to the left with a character of choice.
 * @param value required; string to be padded
 * @param count required; integer indicating the total length of the desired string
 * @param padding option; string, character to use for padding, defaults to " "
 * @returns a padded string
 * @example
 * LPAD("abc", 5) // returns "  abc"
 * LPAD("abc", 5, "0") // returns "00abc"
 */
declare function LPAD(value: any, count: any, padding?: any): MaybeString;
/**
 * Returns a string padded to the left with a character of choice.
 * @param value required; string to be padded
 * @param count required; integer indicating the total length of the desired string
 * @param padding option; string, character to use for padding, defaults to " "
 * @returns a padded string
 * @example
 * LPAD("abc", 5) // returns "  abc"
 * LPAD("abc", 5, "0") // returns "00abc"
 */
declare function LPAD(): undefined;

/**
 * Returns a date value given a date and optional time string
 * @param dateString required; string representing a date in XXXX-XX-XX form or a Date object
 * @param timeString optional; string representing a time
 * @returns Date value
 * @example
 * DATEVALUE("2018-02-07") // returns 2018-02-07T00:00:00.000Z
 * DATEVALUE("2018-02-07", "06:01") // returns 2018-02-07T06:01:00.000Z
 */
declare function DATEVALUE(dateString: Date | MaybeString, timeString?: string): Date;
/**
 * Returns a date value given a date and optional time string
 * @param dateString required; string representing a date in XXXX-XX-XX form or a Date object
 * @param timeString optional; string representing a time
 * @returns Date value
 * @example
 * DATEVALUE("2018-02-07") // returns 2018-02-07T00:00:00.000Z
 * DATEVALUE("2018-02-07", "06:01") // returns 2018-02-07T06:01:00.000Z
 */
declare function DATEVALUE(dateString: string): Date;
/**
 * Returns a date value given a date and optional time string
 * @param dateString required; string representing a date in XXXX-XX-XX form or a Date object
 * @param timeString optional; string representing a time
 * @returns Date value
 * @example
 * DATEVALUE("2018-02-07") // returns 2018-02-07T00:00:00.000Z
 * DATEVALUE("2018-02-07", "06:01") // returns 2018-02-07T06:01:00.000Z
 */
declare function DATEVALUE(dateString: Date): Date;
/**
 * Returns a date value given a date and optional time string
 * @param dateString required; string representing a date in XXXX-XX-XX form or a Date object
 * @param timeString optional; string representing a time
 * @returns Date value
 * @example
 * DATEVALUE("2018-02-07") // returns 2018-02-07T00:00:00.000Z
 * DATEVALUE("2018-02-07", "06:01") // returns 2018-02-07T06:01:00.000Z
 */
declare function DATEVALUE(): undefined;

/**
 * Adds a given number of days to a date.
 * @param date required; Date object or a string representing a string in XXXX-XX-XX format
 * @param number required; number of days to be added as an integer
 * @returns Date object
 *
 * @example
 * DATEADD("2012-03-04", 5) // returns 2012-03-09T00:00:00.000Z
 */
declare function DATEADD(date: Date | MaybeString, number: number): Date | undefined;

/**
 * Returns a day given a date.
 * @param date required; date, either as a Date object or a string
 * @returns day as numeric value
 * @example
 * DAY("2015/12/16") // returns 16
 * DAY(new Date("2015/12/16 00:00:00") // returns 16
 */
declare function DAY(date: Date): number;
/**
 * Returns a day given a date.
 * @param date required; date, either as a Date object or a string
 * @returns day as numeric value
 * @example
 * DAY("2015/12/16") // returns 16
 * DAY(new Date("2015/12/16 00:00:00") // returns 16
 */
declare function DAY(date: MaybeString): number;
/**
 * Returns a day given a date.
 * @param date required; date, either as a Date object or a string
 * @returns day as numeric value
 * @example
 * DAY("2015/12/16") // returns 16
 * DAY(new Date("2015/12/16 00:00:00") // returns 16
 */
declare function DAY(): undefined;

/**
 * Returns the decimal seperator character or, if it's not available, the default character
 * from the form configuration object.
 */
declare function DECIMALSEPARATOR(): string;

/**
 * Returns degrees for an input of radians.
 * @param value required; numeric value or string representing a value in radians
 * @returns numeric value representing degrees
 * @example
 * DEGREES(Math.PI) // returns 180
 * DEGREES("0.78") // returns 44.69070802020421
 */
declare function DEGREES(value: number | string): number;
/**
 * Returns degrees for an input of radians.
 * @param value required; numeric value or string representing a value in radians
 * @returns numeric value representing degrees
 * @example
 * DEGREES(Math.PI) // returns 180
 * DEGREES("0.78") // returns 44.69070802020421
 */
declare function DEGREES(value: undefined | null): number;
/**
 * Returns degrees for an input of radians.
 * @param value required; numeric value or string representing a value in radians
 * @returns numeric value representing degrees
 * @example
 * DEGREES(Math.PI) // returns 180
 * DEGREES("0.78") // returns 44.69070802020421
 */
declare function DEGREES(): number;
/**
 * Returns degrees for an input of radians.
 * @param value required; numeric value or string representing a value in radians
 * @returns numeric value representing degrees
 * @example
 * DEGREES(Math.PI) // returns 180
 * DEGREES("0.78") // returns 44.69070802020421
 */
declare function DEGREES(value?: any): number;

/**
 * Returns definition object for a specified field
 * @param dataName The data name of the field
 * @example
 * FIELD('child_item_cost').label // returns "Child Item Cost"
 * FIELD('child_item_cost').parent.label // returns "Child Items"
 */
declare function FIELD(dataName: FieldName): FormField;
/**
 * Returns definition object for a specified field
 * @param dataName The data name of the field
 * @example
 * FIELD('child_item_cost').label // returns "Child Item Cost"
 * FIELD('child_item_cost').parent.label // returns "Child Items"
 */
declare function FIELD(dataName: FieldName | string | null | undefined): FormField | undefined;

/**
 * Returns a field's description.
 * @param dataName required; data_name of desired field
 * @returns the field's description
 * @example
 * DESCRIPTION("operating_hours") // returns "Stores operating hours in 24-hour time format"
 */
declare function DESCRIPTION(dataName: MaybeString): string | undefined;
/**
 * Returns a field's description.
 * @param dataName required; data_name of desired field
 * @returns the field's description
 * @example
 * DESCRIPTION("operating_hours") // returns "Stores operating hours in 24-hour time format"
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
 * @param separator optional; character to separate device manufacturer and model, defauls to ", "
 * @returns string
 * @example
 * DEVICEINFO() // returns "Apple, MQCK2LL/A"
 * DEVICEINFO(": ") // returns "Apple: MQCK2LL/A"
 */
declare function DEVICEINFO(separator?: string): string;
/**
 * Returns device info, including the device manufacturer and model
 * @param separator optional; character to separate device manufacturer and model, defauls to ", "
 * @returns string
 * @example
 * DEVICEINFO() // returns "Apple, MQCK2LL/A"
 * DEVICEINFO(": ") // returns "Apple: MQCK2LL/A"
 */
declare function DEVICEINFO(separator?: any): string;

/**
 * Returns the user's email from the configuration object.
 */
declare function EMAIL(): string | undefined;

/**
 * Returns number rounded up to the nearest even integer
 * @param value number
 * @returns number or NaN
 * @example
 * EVEN(-3.4) // returns -2
 * EVEN([]) // returns NaN
 */
declare function EVEN(value: number): number;
/**
 * Returns number rounded up to the nearest even integer
 * @param value number
 * @returns number or NaN
 * @example
 * EVEN(-3.4) // returns -2
 * EVEN([]) // returns NaN
 */
declare function EVEN(value: string): number;
/**
 * Returns number rounded up to the nearest even integer
 * @param value number
 * @returns number or NaN
 * @example
 * EVEN(-3.4) // returns -2
 * EVEN([]) // returns NaN
 */
declare function EVEN(value: any): number;

/**
 * Returns whether two items are deeply equal
 * @param value1 item of any type
 * @param value2 item of any type
 * @returns boolean
 * @example
 * EXACT([1, 2, 3], [1, 2, 3]) // returns true
 * EXACT([1, 2, 3], [2, 1, 3]) // returns false
 */
declare function EXACT(value1: any, value2: any): boolean;

/**
 * Checks whether all values passed in exist.
 * @param args list of items to check
 * @returns boolean value indicating whether all values exist
 * @example
 * EXISTS(1, 3, 7, 0) // returns true
 * EXISTS(1, null, 7, 0) // returns false
 */
declare function EXISTS(arg: any, ...args: any[]): arg is number | boolean | string | object;

/**
 * Returns e^x, where `x` is the argument, and `e` is Euler's number, the base of the natural logarithms.
 * @param x option; numeric value
 * @returns number, evaluates to `e` to the `x` power
 * @example
 * EXP(1) // returns 2.718281828459045
 * EXP(2) // 7.38905609893065
 */
declare function EXP(x: number): number;
/**
 * Returns e^x, where `x` is the argument, and `e` is Euler's number, the base of the natural logarithms.
 * @param x option; numeric value
 * @returns number, evaluates to `e` to the `x` power
 * @example
 * EXP(1) // returns 2.718281828459045
 * EXP(2) // 7.38905609893065
 */
declare function EXP(x: string): number;

/**
 * Memoized store for `FACT` function
 */
declare function MEMOIZED_FACT(): number[];
 function RESET_MEMOIZED_FACT(): number[];

/**
 * Returns factorial of a number, n (n!)
 * @param value postive integer
 * @returns factorial of value (value!)
 * @example
 * FACT(0) // returns 1
 * FACT(7) // returns 5040
 */
declare function FACT(value: any): number;

/**
 * Memoized store for `FACTDOUBLE` function
 */
declare function MEMOIZED_FACTDOUBLE(): number[];
 function RESET_MEMOIZED_FACTDOUBLE(): number[];

/**
 * Returns double factorial of a number, n (n!!)
 * @param value postive integer
 * @returns factorial of value (value!!)
 * @example
 * FACT(0) // returns 1
 * FACT(7) // returns 5040
 */
declare function FACTDOUBLE(value: any): number;

/**
 * Returns the boolean value `false`.
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
 * @param dataName required; string
 * @param options optional; object indicating if result should be flattened recursively,
 * e.g. `{ repeatables: boolean, sections: boolean }`
 * @returns array of child fields
 *
 */
declare function FIELDS(dataName: ContainerFieldName): FormFields[];
/**
 * Returns child fields of a repeatable or section field associated with a given data name
 * @param dataName required; string
 * @param options optional; object indicating if result should be flattened recursively,
 * e.g. `{ repeatables: boolean, sections: boolean }`
 * @returns array of child fields
 *
 */
declare function FIELDS(dataName: ContainerFieldName, options: FieldsOptions): FormFields[];
/**
 * Returns child fields of a repeatable or section field associated with a given data name
 * @param dataName required; string
 * @param options optional; object indicating if result should be flattened recursively,
 * e.g. `{ repeatables: boolean, sections: boolean }`
 * @returns array of child fields
 *
 */
declare function FIELDS(): undefined;

/**
 * Returns child field names when passed in a parent's dataname
 * @param dataName required; string
 * @param options optional; object indicating if result should be flattened recursively,
 * e.g. `{ repeatables: boolean, sections: boolean }`
 * @returns array of child field names
 * @example
 * FIELDNAMES('items')
 * // returns ['cost', 'choice_value', 'child_items', 'child_item_cost']
 *
 * // do not recursively look for child records of repeatable children
 * FIELDNAMES('items', { repeatables: false })
 * // returns ['cost', 'choice_value', 'child_items']
 */
declare function FIELDNAMES(dataName: ContainerFieldName, options?: FieldsOptions): FieldName[] | undefined;
/**
 * Returns child field names when passed in a parent's dataname
 * @param dataName required; string
 * @param options optional; object indicating if result should be flattened recursively,
 * e.g. `{ repeatables: boolean, sections: boolean }`
 * @returns array of child field names
 * @example
 * FIELDNAMES('items')
 * // returns ['cost', 'choice_value', 'child_items', 'child_item_cost']
 *
 * // do not recursively look for child records of repeatable children
 * FIELDNAMES('items', { repeatables: false })
 * // returns ['cost', 'choice_value', 'child_items']
 */
declare function FIELDNAMES(dataName: ContainerFieldName): FieldName[] | undefined;

/**
 * Returns a field's type.
 * @param dataName required; data_name of desired field
 * @returns the field's type
 * @example
 * FIELDTYPE("operating_hours") // returns "TimeField"
 */
declare function FIELDTYPE(dataName: FieldName): string | undefined;

/**
 * Returns the first n items of an array or string.
 */
declare function FIRST(item: any[] | string, n: number): any[] | undefined;
/**
 * Returns the first n items of an array or string.
 */
declare function FIRST(item: any[] | string, n?: number): any[] | undefined;
/**
 * Returns the first n items of an array or string.
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
 * @param args a list of numeric values or string number values
 * @returns max value in numeric form
 * @example
 * MAX(1, 4, 7, 2, 4) // returns 7
 * MAX(["45", "50", "32", "51"]) // returns 51
 */
declare function MAX(...args: any[]): number | undefined;

/**
 * Returns min value from a list of values
 * @param args a list of numeric values or string number values
 * @returns min value in numeric form
 * @example
 * MIN(7, 4, 1, 2, 4) // returns 1
 * MIN(["45", "50", "32", "51"]) // returns 32
 */
declare function MIN(...args: any[]): number | undefined;

/**
 * Returns fixed represention of a number
 * @param num required; numeric value to be converted
 * @param decimals  optional; integer between 0 - 20 indicating total fractional digits, defaults to 2
 * @param suppressGroupingSeparator optional; boolean, whether to separate numbers with
 * groupingSeparator character, defaults to false
 * @returns fixed representation of a number as a string
 * @example
 * FIXED(12345678901 / 3, 3) // returns "4,115,226,300.333"
 * FIXED(12345678901 / 3, 3, true) // returns "4115226300.333"
 */
declare function FIXED(num: number, decimals?: number, suppressGroupingSeparator?: boolean): string | undefined;
/**
 * Returns fixed represention of a number
 * @param num required; numeric value to be converted
 * @param decimals  optional; integer between 0 - 20 indicating total fractional digits, defaults to 2
 * @param suppressGroupingSeparator optional; boolean, whether to separate numbers with
 * groupingSeparator character, defaults to false
 * @returns fixed representation of a number as a string
 * @example
 * FIXED(12345678901 / 3, 3) // returns "4,115,226,300.333"
 * FIXED(12345678901 / 3, 3, true) // returns "4115226300.333"
 */
declare function FIXED(num: number, decimals?: number): string | undefined;
/**
 * Returns fixed represention of a number
 * @param num required; numeric value to be converted
 * @param decimals  optional; integer between 0 - 20 indicating total fractional digits, defaults to 2
 * @param suppressGroupingSeparator optional; boolean, whether to separate numbers with
 * groupingSeparator character, defaults to false
 * @returns fixed representation of a number as a string
 * @example
 * FIXED(12345678901 / 3, 3) // returns "4,115,226,300.333"
 * FIXED(12345678901 / 3, 3, true) // returns "4115226300.333"
 */
declare function FIXED(num: any): string | undefined;

/**
 * Returns the current form object.
 */
declare function FORM(): {};

/**
 * Formats a string
 * @param template string format. Use %s for strings and %d for numbers.
 * @param variables Value(s) to substitute into the format string
 * @returns formatted string
 * @example
 * // returns "The pole height is 20 meters and has 3 issues detected."
 * FORMAT('The pole height is %d meters and has %d issues detected.', 20, 3)
 * @example
 * // returns "11/11/2015 12:30:30"
 * FORMAT('%s/%s/%s %s:%s:%s', 11, 11, 2015, 12, 30, 30)
 */
declare function FORMAT(template: string, ...variables: any[]): string;

/**
 * Returns a formatted address
 * @param address required; string, must be valid AddressFieldValue:
 * { sub_thoroughfare?: string, thoroughfare?: string, suite?: string, locality?: string,
 * sub_admin_area?: string, admin_area?: string, postal_code?: string, country?: string }
 * @param lineSeparator optional; string, character to separate address lines, defaults to "\n"
 * @param partSeparator optional; string, character to separate address parts, defaulst to " "
 * @returns string, formatted address
 * @example
 * const exampleAddress = {
 *  sub_thoroughfare: "360",
 *   thoroughfare: "Central Avenue",
 *   suite: "200",
 *   locality: "St. Petersburg",
 *   sub_admin_area: "Pinellas",
 *   admin_area: "FL",
 *   postal_code: "33701",
 *   country: "US",
 * }
 * FORMATADDRESS(exampleAddress) // returns "360 Central Avenue #200\nSt. Petersburg FL 33701\nUS"
 */
declare function FORMATADDRESS(address: AddressFieldValue, lineSeparator?: string, partSeparator?: string): string | undefined;
/**
 * Returns a formatted address
 * @param address required; string, must be valid AddressFieldValue:
 * { sub_thoroughfare?: string, thoroughfare?: string, suite?: string, locality?: string,
 * sub_admin_area?: string, admin_area?: string, postal_code?: string, country?: string }
 * @param lineSeparator optional; string, character to separate address lines, defaults to "\n"
 * @param partSeparator optional; string, character to separate address parts, defaulst to " "
 * @returns string, formatted address
 * @example
 * const exampleAddress = {
 *  sub_thoroughfare: "360",
 *   thoroughfare: "Central Avenue",
 *   suite: "200",
 *   locality: "St. Petersburg",
 *   sub_admin_area: "Pinellas",
 *   admin_area: "FL",
 *   postal_code: "33701",
 *   country: "US",
 * }
 * FORMATADDRESS(exampleAddress) // returns "360 Central Avenue #200\nSt. Petersburg FL 33701\nUS"
 */
declare function FORMATADDRESS(address: AddressFieldValue): string | undefined;

/**
 * Returns the language value or, if it's not available, the default language
 * from the form configuration object.
 */
declare function LANGUAGE(): string;

/**
 * Returns a number formatted based on the current language and the styling options passed in.
 * @param value required; number to be formatted
 * @param langauge optional; languange- and country-specific string, e.g. "en-US", to indicate desired
 * language formatting. Defaults to device's current langauge setting.
 * @param options optional; formatting options hash:
 * {
 *  localeMatcher: locale string, e.g. "en_US",
 *  style: "currency" | "percent" | "decimal",
 *  currency: currency code string, e.g. "USD",
 *  minimumSignificantDigits: number,
 *  maximumSignificantDigits: number,
 *  minimumIntegerDigits: number,
 *  minimumFractionDigits?: number,
 *  maximumFractionDigits?: number,
 *  useGrouping: boolean,
 * }
 * @returns formatted number string
 * @example
 * FORMATNUMBER(10000 / 3, "pt-BR", { style: "currency", currency: "BRL" }) // returns "R$3.333,33"
 * FORMATNUMBER(1 / 3, null, { minimumFractionDigits: 5 }) // returns "0.33333"
 */
declare function FORMATNUMBER(value: number, language: MaybeString, options: NumberFormatOptions): string;
/**
 * Returns a number formatted based on the current language and the styling options passed in.
 * @param value required; number to be formatted
 * @param langauge optional; languange- and country-specific string, e.g. "en-US", to indicate desired
 * language formatting. Defaults to device's current langauge setting.
 * @param options optional; formatting options hash:
 * {
 *  localeMatcher: locale string, e.g. "en_US",
 *  style: "currency" | "percent" | "decimal",
 *  currency: currency code string, e.g. "USD",
 *  minimumSignificantDigits: number,
 *  maximumSignificantDigits: number,
 *  minimumIntegerDigits: number,
 *  minimumFractionDigits?: number,
 *  maximumFractionDigits?: number,
 *  useGrouping: boolean,
 * }
 * @returns formatted number string
 * @example
 * FORMATNUMBER(10000 / 3, "pt-BR", { style: "currency", currency: "BRL" }) // returns "R$3.333,33"
 * FORMATNUMBER(1 / 3, null, { minimumFractionDigits: 5 }) // returns "0.33333"
 */
declare function FORMATNUMBER(value: number, language: MaybeString): string;
/**
 * Returns a number formatted based on the current language and the styling options passed in.
 * @param value required; number to be formatted
 * @param langauge optional; languange- and country-specific string, e.g. "en-US", to indicate desired
 * language formatting. Defaults to device's current langauge setting.
 * @param options optional; formatting options hash:
 * {
 *  localeMatcher: locale string, e.g. "en_US",
 *  style: "currency" | "percent" | "decimal",
 *  currency: currency code string, e.g. "USD",
 *  minimumSignificantDigits: number,
 *  maximumSignificantDigits: number,
 *  minimumIntegerDigits: number,
 *  minimumFractionDigits?: number,
 *  maximumFractionDigits?: number,
 *  useGrouping: boolean,
 * }
 * @returns formatted number string
 * @example
 * FORMATNUMBER(10000 / 3, "pt-BR", { style: "currency", currency: "BRL" }) // returns "R$3.333,33"
 * FORMATNUMBER(1 / 3, null, { minimumFractionDigits: 5 }) // returns "0.33333"
 */
declare function FORMATNUMBER(value: number): string;

/**
 * Returns the greatest common divisor
 * @param args list of numbers
 * @returns number; greatest commom divisor
 * @example
 * GCD(8, 16, 32, 36) // returns 4
 */
declare function GCD(...args: number[]): number;
/**
 * Returns the greatest common divisor
 * @param args list of numbers
 * @returns number; greatest commom divisor
 * @example
 * GCD(8, 16, 32, 36) // returns 4
 */
declare function GCD(...args: string[]): number;
/**
 * Returns the greatest common divisor
 * @param args list of numbers
 * @returns number; greatest commom divisor
 * @example
 * GCD(8, 16, 32, 36) // returns 4
 */
declare function GCD(...args: any[]): number;

/** Returns result from $$HOST */
declare function GETRESULT(): any;

/**
 * Returns values grouped according to a passed in iteratee or according to identity
 * @param values required; array of values
 * @param iteratee optional; function to determine value sorting, defaults to identity (`===`)
 * @returns object of grouped values; keys are determined by the return values of `iteratee`
 * @example
 * GROUP([3, 2, 1, 3, 3, 3]) // returns {1: [1], 2: [2], 3: [3, 3, 3, 3]}
 * GROUP([6.1, 4.2, 6.3], Math.floor) // returns { 4: [4.2], 6: [6.1, 6.3] }
 */
declare function GROUP(values: number[], iteratee: Function): {} | undefined;
/**
 * Returns values grouped according to a passed in iteratee or according to identity
 * @param values required; array of values
 * @param iteratee optional; function to determine value sorting, defaults to identity (`===`)
 * @returns object of grouped values; keys are determined by the return values of `iteratee`
 * @example
 * GROUP([3, 2, 1, 3, 3, 3]) // returns {1: [1], 2: [2], 3: [3, 3, 3, 3]}
 * GROUP([6.1, 4.2, 6.3], Math.floor) // returns { 4: [4.2], 6: [6.1, 6.3] }
 */
declare function GROUP(values: any[]): {} | undefined;
/**
 * Returns values grouped according to a passed in iteratee or according to identity
 * @param values required; array of values
 * @param iteratee optional; function to determine value sorting, defaults to identity (`===`)
 * @returns object of grouped values; keys are determined by the return values of `iteratee`
 * @example
 * GROUP([3, 2, 1, 3, 3, 3]) // returns {1: [1], 2: [2], 3: [3, 3, 3, 3]}
 * GROUP([6.1, 4.2, 6.3], Math.floor) // returns { 4: [4.2], 6: [6.1, 6.3] }
 */
declare function GROUP(values: any[], iteratee?: Function): {} | undefined;
/**
 * Returns values grouped according to a passed in iteratee or according to identity
 * @param values required; array of values
 * @param iteratee optional; function to determine value sorting, defaults to identity (`===`)
 * @returns object of grouped values; keys are determined by the return values of `iteratee`
 * @example
 * GROUP([3, 2, 1, 3, 3, 3]) // returns {1: [1], 2: [2], 3: [3, 3, 3, 3]}
 * GROUP([6.1, 4.2, 6.3], Math.floor) // returns { 4: [4.2], 6: [6.1, 6.3] }
 */
declare function GROUP(values: any, iteratee?: Function): {} | undefined;

/**
 * Returns where or not a ChoiceFieldValue has an `other_values` key
 * @param value ChoiceFieldValue { choice_values?: string[ ], other_values?: string[ ] }
 * @returns boolean value
 * @example
 * const choiceField1 = { choice_values: ["yes", "no"], other_values: ["maybe"] }
 * const choiceField2 = { choice_values: ["yes", "no"] }
 * HASOTHER(choiceField1) // returns true
 * HASOTHER(choiceField2) // returns false
 */
declare function HASOTHER(value: ChoiceFieldValue): boolean;
/**
 * Returns where or not a ChoiceFieldValue has an `other_values` key
 * @param value ChoiceFieldValue { choice_values?: string[ ], other_values?: string[ ] }
 * @returns boolean value
 * @example
 * const choiceField1 = { choice_values: ["yes", "no"], other_values: ["maybe"] }
 * const choiceField2 = { choice_values: ["yes", "no"] }
 * HASOTHER(choiceField1) // returns true
 * HASOTHER(choiceField2) // returns false
 */
declare function HASOTHER(value?: any): boolean;
/**
 * Returns where or not a ChoiceFieldValue has an `other_values` key
 * @param value ChoiceFieldValue { choice_values?: string[ ], other_values?: string[ ] }
 * @returns boolean value
 * @example
 * const choiceField1 = { choice_values: ["yes", "no"], other_values: ["maybe"] }
 * const choiceField2 = { choice_values: ["yes", "no"] }
 * HASOTHER(choiceField1) // returns true
 * HASOTHER(choiceField2) // returns false
 */
declare function HASOTHER(): boolean;

/**
 * Evaluates a conditional expression and returns a designated `trueValue` or `falseValue`
 * @param test required; conditional expression that evaluates to true or false
 * @param trueValue required; value to be returned in case of true
 * @param falseValue required; vaue to be returned in case of false
 * @returns boolean or `trueValue`/`falseValue` if supplied
 * @example
 * IF(1 > 0, 10, 20) // returns 10
 */
declare function IF(test: any, trueValue: any, falseValue: any): any;

/**
 * Checks if a value is an instance of an Error or has no value
 * @param value required; item to be checked
 * @returns boolean
 * @example
 * const badField = FIELD('does_not_exist') // = undefined
 * ISERR(badField) // returns true
 */
declare function ISERR(value: any): boolean;

/**
 * Evaluates whether a passed in value is an error.
 * @param value required; value to be evaluated
 * @param errorValue required; value to be returned in event `value` is an error
 * @returns `errorValue` in case `value` is an error, otherwise `value`
 * @example
 * IFERROR(EVEN(null), "ERR") // returns "ERR"
 */
declare function IFERROR(value: any, errorValue: any): any;

/**
 * Returns a string representation of the passed in parameter
 * @param value value to be inspected
 * @returns stringified value
 * @example
 * INSPECT({ test: "test_test"}) // returns "{ test: 'test_test' }"
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
/**
 * Displays an alert and stops a record from being saved
 * @description
 * The INVALID function is designed for the sole purpose of doing custom validations when saving records.
 * It’s a special purpose function that’s intended to only be used within the `validate-record` and
 * `validate-repeatable` events. It’s different from `ALERT` in a couple of ways. First, it instructs
 * the editor to halt saving the record. And second, messages passed to `INVALID` are combined and displayed
 * alongside the rest of the built-in validations like required fields, pattern validations, and min/max constraints.
 * Thus, custom validation logic can be displayed in a natural way to the end user as if it were a built-in validation.
 * @param message required; string detailing the reason for invalidating a record
 * @param dataName optional; string, data_name of field to be validated
 * @returns void
 */
declare function INVALID(message: string, dataName?: string): void;
/**
 * Displays an alert and stops a record from being saved
 * @description
 * The INVALID function is designed for the sole purpose of doing custom validations when saving records.
 * It’s a special purpose function that’s intended to only be used within the `validate-record` and
 * `validate-repeatable` events. It’s different from `ALERT` in a couple of ways. First, it instructs
 * the editor to halt saving the record. And second, messages passed to `INVALID` are combined and displayed
 * alongside the rest of the built-in validations like required fields, pattern validations, and min/max constraints.
 * Thus, custom validation logic can be displayed in a natural way to the end user as if it were a built-in validation.
 * @param message required; string detailing the reason for invalidating a record
 * @param dataName optional; string, data_name of field to be validated
 * @returns void
 */
declare function INVALID(message: string, dataName?: string): void;
/**
 * Displays an alert and stops a record from being saved
 * @description
 * The INVALID function is designed for the sole purpose of doing custom validations when saving records.
 * It’s a special purpose function that’s intended to only be used within the `validate-record` and
 * `validate-repeatable` events. It’s different from `ALERT` in a couple of ways. First, it instructs
 * the editor to halt saving the record. And second, messages passed to `INVALID` are combined and displayed
 * alongside the rest of the built-in validations like required fields, pattern validations, and min/max constraints.
 * Thus, custom validation logic can be displayed in a natural way to the end user as if it were a built-in validation.
 * @param message required; string detailing the reason for invalidating a record
 * @param dataName optional; string, data_name of field to be validated
 * @returns void
 */
declare function INVALID(message: string): void;


/**
 * Returns whether or not a value is even
 * @param value required; numeric value to be checked
 * @returns boolean value
 * @example
 * ISEVEN(24) // returns true
 * ISEVEN(5 * 5) // returns false
 */
declare function ISEVEN(value: number): boolean;
/**
 * Returns whether or not a value is even
 * @param value required; numeric value to be checked
 * @returns boolean value
 * @example
 * ISEVEN(24) // returns true
 * ISEVEN(5 * 5) // returns false
 */
declare function ISEVEN(value: string): boolean;
/**
 * Returns whether or not a value is even
 * @param value required; numeric value to be checked
 * @returns boolean value
 * @example
 * ISEVEN(24) // returns true
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
 * @param media required; media object, height and width attributes must be present
 * @returns boolean
 * @example
 * const mediaObject = { width: 100, height: 200 }
 * ISPORTRAIT(mediaObject) // returns true
 */
declare function ISPORTRAIT(media: MediaObject): boolean;
/**
 * Checks whether the media is in portrait mode.
 * @param media required; media object, height and width attributes must be present
 * @returns boolean
 * @example
 * const mediaObject = { width: 100, height: 200 }
 * ISPORTRAIT(mediaObject) // returns true
 */
declare function ISPORTRAIT(media: any): boolean | undefined;
/**
 * Checks whether the media is in portrait mode.
 * @param media required; media object, height and width attributes must be present
 * @returns boolean
 * @example
 * const mediaObject = { width: 100, height: 200 }
 * ISPORTRAIT(mediaObject) // returns true
 */
declare function ISPORTRAIT(): undefined;

/**
 * Checks whether the media is in landscape mode.
 * @param media required; media object, height and width attributes must be present
 * @returns boolean
 * @example
 * const mediaObject = { width: 200, height: 100 }
 * ISLANDSCAPE(mediaObject) // returns true
 */
declare function ISLANDSCAPE(media: MediaObject): boolean;
/**
 * Checks whether the media is in landscape mode.
 * @param media required; media object, height and width attributes must be present
 * @returns boolean
 * @example
 * const mediaObject = { width: 200, height: 100 }
 * ISLANDSCAPE(mediaObject) // returns true
 */
declare function ISLANDSCAPE(media: any): boolean | undefined;
/**
 * Checks whether the media is in landscape mode.
 * @param media required; media object, height and width attributes must be present
 * @returns boolean
 * @example
 * const mediaObject = { width: 200, height: 100 }
 * ISLANDSCAPE(mediaObject) // returns true
 */
declare function ISLANDSCAPE(): undefined;

/**
 * Checks for a boolean value
 * @param value required; value to be checked
 * @returns boolean value
 * @example
 * ISLOGICAL(2 > 0) // returns true
 * ISLOGICAL([ false ]) // returns false
 */
declare function ISLOGICAL(value: any): boolean;

/** Returns the platform name from the configuration object */
declare function PLATFORM(): string;

/**
 * Returns true if the record is being edited from the mobile app
 * @returns boolean value
 */
declare function ISMOBILE(): boolean;

/**
 * Returns a boolean indicating whether the feature is new or an update.
 */
declare function ISNEW(): boolean;

/**
 * Checks if a value is a a non-text value (not a string)
 * @param value required; value to be checked
 * @returns boolean
 * @example
 * ISNONTEXT("a string") // returns false
 * ISNONTEXT(["an array"]) // returns true
 */
declare function ISNONTEXT(value: any): boolean;

/**
 * Returns whether or not a value is odd
 * @param value required; numeric value to be checked
 * @returns boolean value
 * @example
 * ISODD(24) // returns false
 * ISODD(5 * 5) // returns true
 */
declare function ISODD(value: number): boolean;
/**
 * Returns whether or not a value is odd
 * @param value required; numeric value to be checked
 * @returns boolean value
 * @example
 * ISODD(24) // returns false
 * ISODD(5 * 5) // returns true
 */
declare function ISODD(value: string): boolean;
/**
 * Returns whether or not a value is odd
 * @param value required; numeric value to be checked
 * @returns boolean value
 * @example
 * ISODD(24) // returns false
 * ISODD(5 * 5) // returns true
 */
declare function ISODD(value: any): boolean;

/**
 * Returns the current user's role or, if it's not available, undefined.
 */
declare function ROLE(): string | undefined;

/**
 * Determines whether arguments passed in contain the role of the current user
 * by comparing it to  userRoleName on the configuration object
 * @param args required; role(s) to be checked as strings
 * @returns boolean
 * @example
 * // userRoleName = Standard User
 * ISROLE("Admin") // returns false
 * ISROLE("Admin", "ReadOnly", "Standard User") // returns true
 */
declare function ISROLE(...args: string[]): boolean;
/**
 * Determines whether arguments passed in contain the role of the current user
 * by comparing it to  userRoleName on the configuration object
 * @param args required; role(s) to be checked as strings
 * @returns boolean
 * @example
 * // userRoleName = Standard User
 * ISROLE("Admin") // returns false
 * ISROLE("Admin", "ReadOnly", "Standard User") // returns true
 */
declare function ISROLE(...args: any[]): boolean;

/**
 * Checks to see if a choice is selected
 * @param value required; ChoiceFieldValues containing possible choices to check against
 * @param choice required; choice or array of choices to check if they are selected
 * @returns boolean
 * @example
 * ISELECTED({choice_values: ["test", "not test"]}, "test")) // returns true
 */
declare function ISSELECTED(value: ChoiceFieldValue, choice: string | string[]): boolean;
/**
 * Checks to see if a choice is selected
 * @param value required; ChoiceFieldValues containing possible choices to check against
 * @param choice required; choice or array of choices to check if they are selected
 * @returns boolean
 * @example
 * ISELECTED({choice_values: ["test", "not test"]}, "test")) // returns true
 */
declare function ISSELECTED(value: ChoiceFieldValue, choice?: string | string[]): boolean;
/**
 * Checks to see if a choice is selected
 * @param value required; ChoiceFieldValues containing possible choices to check against
 * @param choice required; choice or array of choices to check if they are selected
 * @returns boolean
 * @example
 * ISELECTED({choice_values: ["test", "not test"]}, "test")) // returns true
 */
declare function ISSELECTED(value?: any, choice?: any): boolean;

/**
 * Checks if a value is a text value (string)
 * @param value required; value to be checked
 * @returns boolean
 * @example
 * ISTEXT("a string") // returns true
 * ISTEXT(["an array"]) // returns false
 */
declare function ISTEXT(value: any): boolean;

/**
 * Returns a boolean indicating if the feature being edited is an update
 */
declare function ISUPDATE(): boolean;

/**
 * Returns the label of a field
 * @param dataName required; data_name of a form field (string)
 * @returns form label, string
 * @example
 * LABEL("business_name") // returns "Business Name"
 */
declare function LABEL(dataName: FieldName): string | undefined;

/**
 * Returns the last n items of an array or string.
 * @param item required; array or string to extract items from
 * @param n optional; number of items to be extracted
 * @returns items extracted; if more than one item is extracted an array is returned
 * @example
 * LAST([1, 2, 3]) // returns 3
 * LAST([1 ,2 ,3], 2) // return [2, 3]
 */
declare function FIRST(item: any[] | string, n: number): any[] | undefined;
/**
 * Returns the last n items of an array or string.
 * @param item required; array or string to extract items from
 * @param n optional; number of items to be extracted
 * @returns items extracted; if more than one item is extracted an array is returned
 * @example
 * LAST([1, 2, 3]) // returns 3
 * LAST([1 ,2 ,3], 2) // return [2, 3]
 */
declare function FIRST(item: any[] | string, n?: number): any[] | undefined;
/**
 * Returns the last n items of an array or string.
 * @param item required; array or string to extract items from
 * @param n optional; number of items to be extracted
 * @returns items extracted; if more than one item is extracted an array is returned
 * @example
 * LAST([1, 2, 3]) // returns 3
 * LAST([1 ,2 ,3], 2) // return [2, 3]
 */
declare function FIRST(item: any): any[] | undefined;

/**
 * Returns the latitude of the record if it exists.
 */
declare function LATITUDE(): number;

/**
 * Returns the least common multiple of the arguments passed in
 * @param args numbers or numbers as string values to be evaluated
 * @returns number; least common multiple
 * @example
 * LCM(-50, 25, -45, -18, 90, 447) // returns 67050
 */
declare function LCM(...args: number[]): number;
/**
 * Returns the least common multiple of the arguments passed in
 * @param args numbers or numbers as string values to be evaluated
 * @returns number; least common multiple
 * @example
 * LCM(-50, 25, -45, -18, 90, 447) // returns 67050
 */
declare function LCM(...args: string[]): number;
/**
 * Returns the least common multiple of the arguments passed in
 * @param args numbers or numbers as string values to be evaluated
 * @returns number; least common multiple
 * @example
 * LCM(-50, 25, -45, -18, 90, 447) // returns 67050
 */
declare function LCM(...args: any[]): number;

/**
 * Returns n left characters of a string.
 * @param value required; string
 * @param numberOfCharacters optional; number of characters to be returned. If not specified
 * one character will be returned
 * @returns string; number of characters specified
 * @example
 * LEFT("Hello, World", 3) // returns "Hel"
 */
declare function LEFT(value: string, numberOfCharacters?: number): string | undefined;
/**
 * Returns n left characters of a string.
 * @param value required; string
 * @param numberOfCharacters optional; number of characters to be returned. If not specified
 * one character will be returned
 * @returns string; number of characters specified
 * @example
 * LEFT("Hello, World", 3) // returns "Hel"
 */
declare function LEFT(value: any, numberOfCharacters?: string): string | undefined;
/**
 * Returns n left characters of a string.
 * @param value required; string
 * @param numberOfCharacters optional; number of characters to be returned. If not specified
 * one character will be returned
 * @returns string; number of characters specified
 * @example
 * LEFT("Hello, World", 3) // returns "Hel"
 */
declare function LEFT(value: string): string | undefined;
/**
 * Returns n left characters of a string.
 * @param value required; string
 * @param numberOfCharacters optional; number of characters to be returned. If not specified
 * one character will be returned
 * @returns string; number of characters specified
 * @example
 * LEFT("Hello, World", 3) // returns "Hel"
 */
declare function LEFT(value: any, numberOfCharacters?: any): string | undefined;

/**
 * Returns the length of a value as a string or an array-like object.
 * @param value required; item to be measured
 * @returns number
 * @example
 * LEN("test") // returns 4
 * LEN(["test", "test"]) // returns 2
 */
declare function LEN(value: any): number;

/**
 * Returns the returns the natural logarithm of a value. In mathematics, this is equivalent to _ln(x)_.
 * @param value numeric value specifying radians
 * @returns numeric value indicating the natural log of a value
 * @example
 * LN(12) // returns 2.4849066497880004
 */
declare function LN(value: number): number;
/**
 * Returns the returns the natural logarithm of a value. In mathematics, this is equivalent to _ln(x)_.
 * @param value numeric value specifying radians
 * @returns numeric value indicating the natural log of a value
 * @example
 * LN(12) // returns 2.4849066497880004
 */
declare function LN(value: string): number;
/**
 * Returns the returns the natural logarithm of a value. In mathematics, this is equivalent to _ln(x)_.
 * @param value numeric value specifying radians
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
 * @param value required; number to be logged
 * @param base optional; base with which to calculated the log, defaults to 10
 * @returns number
 * @example
 * LOG(100) // returns 2
 */
declare function LOG(value: number, base: number): number;
/**
 * Calculates the log of a value given a base.
 * @param value required; number to be logged
 * @param base optional; base with which to calculated the log, defaults to 10
 * @returns number
 * @example
 * LOG(100) // returns 2
 */
declare function LOG(value: number): number;
/**
 * Calculates the log of a value given a base.
 * @param value required; number to be logged
 * @param base optional; base with which to calculated the log, defaults to 10
 * @returns number
 * @example
 * LOG(100) // returns 2
 */
declare function LOG(value: any, base?: any): number;

/**
 * Calculates the log10 (common logarithm) of a value.
 * @param value required; number to be calculated
 * @returns numeric value
 * @example
 * LOG10(100) // returns 2
 */
declare function LOG10(value: number): number;
/**
 * Calculates the log10 (common logarithm) of a value.
 * @param value required; number to be calculated
 * @returns numeric value
 * @example
 * LOG10(100) // returns 2
 */
declare function LOG10(value: string): number;
/**
 * Calculates the log10 (common logarithm) of a value.
 * @param value required; number to be calculated
 * @returns numeric value
 * @example
 * LOG10(100) // returns 2
 */
declare function LOG10(value: any): number;

/**
 * Returns a record's longitude if it exists.
 */
declare function LONGITUDE(): number;

/**
 * Converts a string value to all lowercase.
 * @param value required; value to be converted to lowercase
 * @returns string
 * @example
 * LOWER("CASE") // returns "case"
 */
declare function LOWER(value: string): string;
/**
 * Converts a string value to all lowercase.
 * @param value required; value to be converted to lowercase
 * @returns string
 * @example
 * LOWER("CASE") // returns "case"
 */
declare function LOWER(value: undefined | null | object | Array<any> | GenericObject): undefined;


/**
 * Returns the median value of list of numbers.
 * @param args required; numeric values to be evaluated
 * @returns median value
 * @example
 * MEDIAN(3, 4, 2, 5, 1) // returns 3
 */
declare function MEDIAN(...args: number[]): number;
/**
 * Returns the median value of list of numbers.
 * @param args required; numeric values to be evaluated
 * @returns median value
 * @example
 * MEDIAN(3, 4, 2, 5, 1) // returns 3
 */
declare function MEDIAN(...args: any[]): number | undefined;

/**
 * Returns a specific number of characters from a text string.
 * @param value required; text string
 * @param startPosition required; numeric value indicating where in the `value` one should start cutting
 * @param numberOfCharacters required; numeric value indiciating the number of chars one wants returned
 * @returns string
 * @example
 * MID("abcd", 2, 2) // returns "bc"
 */
declare function MID(value: string, startPosition: number, numberOfCharacters: number): string | undefined;
/**
 * Returns a specific number of characters from a text string.
 * @param value required; text string
 * @param startPosition required; numeric value indicating where in the `value` one should start cutting
 * @param numberOfCharacters required; numeric value indiciating the number of chars one wants returned
 * @returns string
 * @example
 * MID("abcd", 2, 2) // returns "bc"
 */
declare function MID(value: string, startPosition: string, numberOfCharacters: string): string | undefined;
/**
 * Returns a specific number of characters from a text string.
 * @param value required; text string
 * @param startPosition required; numeric value indicating where in the `value` one should start cutting
 * @param numberOfCharacters required; numeric value indiciating the number of chars one wants returned
 * @returns string
 * @example
 * MID("abcd", 2, 2) // returns "bc"
 */
declare function MID(value?: any, startPosition?: any, numberOfCharacters?: any): string | undefined;


/**
 * Returns the modulus or remainder of a number divided by a divisor.
 * @param num required; number to be divided
 * @param divisor required; number doing the dividing
 * @returns numeric value; remainder of `num / divisor`
 * @example
 * MOD(10, 2) // returns 0
 * MOD(13, 2) // returns 1
 */
declare function MOD(num: number, divisor: number): number;
/**
 * Returns the modulus or remainder of a number divided by a divisor.
 * @param num required; number to be divided
 * @param divisor required; number doing the dividing
 * @returns numeric value; remainder of `num / divisor`
 * @example
 * MOD(10, 2) // returns 0
 * MOD(13, 2) // returns 1
 */
declare function MOD(num: string, divisor: string): number;
/**
 * Returns the modulus or remainder of a number divided by a divisor.
 * @param num required; number to be divided
 * @param divisor required; number doing the dividing
 * @returns numeric value; remainder of `num / divisor`
 * @example
 * MOD(10, 2) // returns 0
 * MOD(13, 2) // returns 1
 */
declare function MOD(num?: any, divisor?: any): number;

/**
 * Returns a month given a date.
 * @param date required; date, either as a Date object or a string
 * @returns month as numeric value
 * @example
 * MONTH("2015/12/16") // returns 12
 * MONTH(new Date("2015/12/16 00:00:00") // returns 12
 */
declare function MONTH(date: Date): number;
/**
 * Returns a month given a date.
 * @param date required; date, either as a Date object or a string
 * @returns month as numeric value
 * @example
 * MONTH("2015/12/16") // returns 12
 * MONTH(new Date("2015/12/16 00:00:00") // returns 12
 */
declare function MONTH(date: MaybeString): number;
/**
 * Returns a month given a date.
 * @param date required; date, either as a Date object or a string
 * @returns month as numeric value
 * @example
 * MONTH("2015/12/16") // returns 12
 * MONTH(new Date("2015/12/16 00:00:00") // returns 12
 */
declare function MONTH(): void;

/**
 * Returns a numeric value. If a number if passed in, the same number is returned, otherwise
 * function returns 1 for a true boolean value, and 0 for all other values.
 * @param value optional
 * @returns a numeric value
 * @example
 * N(97) // returns 97
 * N(false) // returns 0
 */
declare function N(value: any): number;

/**
 * Returns the negation of a value, i.e. if a value is falsey NOT() will return true.
 * @param value parameter of any type
 * @returns boolean
 * @example
 * NOT("test") // returns false
 */
declare function NOT(value?: any): boolean;

/**
 * Maps over arguments passed in and converts each to a number value.
 * @param args list of values to be mapped to numbers
 * @returns array of numberic values
 * @example
 * NUMS("2", "3", "4", "5") // returns [2, 3, 4, 5]
 */
declare function NUMS(...args: string[]): number[];
/**
 * Maps over arguments passed in and converts each to a number value.
 * @param args list of values to be mapped to numbers
 * @returns array of numberic values
 * @example
 * NUMS("2", "3", "4", "5") // returns [2, 3, 4, 5]
 */
declare function NUMS(...args: number[]): number[];
/**
 * Maps over arguments passed in and converts each to a number value.
 * @param args list of values to be mapped to numbers
 * @returns array of numberic values
 * @example
 * NUMS("2", "3", "4", "5") // returns [2, 3, 4, 5]
 */
declare function NUMS(...args: any[]): number[];

/**
 * Returns the next odd number.
 * @param value number to be evaluated
 * @returns number
 * @example
 * ODD(2) // returns 3
 */
declare function ODD(value: number): number;
/**
 * Returns the next odd number.
 * @param value number to be evaluated
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

interface Event {
  name: EventNames
}

interface EventWithField extends Event {
  field: FieldName
}

interface ChoiceFieldValue {
  choice_values: string[],
  other_values: string[]
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

/**
 * Detaches an event handler set by ON.
 * @param event The event name
 * @param field The (optional) field the event was bound to
 * @param callback The function to detach
 * @example
 * OFF('validate-record', callback); // Detaches an event handler from the 'validate-record' event
 * OFF('validate-record'); // Detaches all event handlers listening to the 'validate-record' event
 *
 */
declare function OFF(name: FormEventNames, callback: (event: FormEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 * @param event The event name
 * @param field The (optional) field the event was bound to
 * @param callback The function to detach
 * @example
 * OFF('validate-record', callback); // Detaches an event handler from the 'validate-record' event
 * OFF('validate-record'); // Detaches all event handlers listening to the 'validate-record' event
 *
 */
declare function OFF(name: FieldEventNames, field: FieldName, callback: (event: FieldEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 * @param event The event name
 * @param field The (optional) field the event was bound to
 * @param callback The function to detach
 * @example
 * OFF('validate-record', callback); // Detaches an event handler from the 'validate-record' event
 * OFF('validate-record'); // Detaches all event handlers listening to the 'validate-record' event
 *
 */
declare function OFF(name: RepeatableEventNames, field: RepeatableFieldName, callback: (event: RepeatableEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 * @param event The event name
 * @param field The (optional) field the event was bound to
 * @param callback The function to detach
 * @example
 * OFF('validate-record', callback); // Detaches an event handler from the 'validate-record' event
 * OFF('validate-record'); // Detaches all event handlers listening to the 'validate-record' event
 *
 */
declare function OFF(name: ChangeGeometryEventName, callback: (event: GeometryEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 * @param event The event name
 * @param field The (optional) field the event was bound to
 * @param callback The function to detach
 * @example
 * OFF('validate-record', callback); // Detaches an event handler from the 'validate-record' event
 * OFF('validate-record'); // Detaches all event handlers listening to the 'validate-record' event
 *
 */
declare function OFF(name: ChangeGeometryEventName, field: RepeatableFieldName, callback: (event: GeometryEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 * @param event The event name
 * @param field The (optional) field the event was bound to
 * @param callback The function to detach
 * @example
 * OFF('validate-record', callback); // Detaches an event handler from the 'validate-record' event
 * OFF('validate-record'); // Detaches all event handlers listening to the 'validate-record' event
 *
 */
declare function OFF(name: AddPhotoEventName, field: PhotoFieldName, callback: (event: AddPhotoEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 * @param event The event name
 * @param field The (optional) field the event was bound to
 * @param callback The function to detach
 * @example
 * OFF('validate-record', callback); // Detaches an event handler from the 'validate-record' event
 * OFF('validate-record'); // Detaches all event handlers listening to the 'validate-record' event
 *
 */
declare function OFF(name: ReplacePhotoEventName, field: PhotoFieldName, callback: (event: ReplacePhotoEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 * @param event The event name
 * @param field The (optional) field the event was bound to
 * @param callback The function to detach
 * @example
 * OFF('validate-record', callback); // Detaches an event handler from the 'validate-record' event
 * OFF('validate-record'); // Detaches all event handlers listening to the 'validate-record' event
 *
 */
declare function OFF(name: RemovePhotoEventName, field: PhotoFieldName, callback: (event: RemoveMediaEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 * @param event The event name
 * @param field The (optional) field the event was bound to
 * @param callback The function to detach
 * @example
 * OFF('validate-record', callback); // Detaches an event handler from the 'validate-record' event
 * OFF('validate-record'); // Detaches all event handlers listening to the 'validate-record' event
 *
 */
declare function OFF(name: AddVideoEventName, field: VideoFieldName, callback: (event: AddVideoEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 * @param event The event name
 * @param field The (optional) field the event was bound to
 * @param callback The function to detach
 * @example
 * OFF('validate-record', callback); // Detaches an event handler from the 'validate-record' event
 * OFF('validate-record'); // Detaches all event handlers listening to the 'validate-record' event
 *
 */
declare function OFF(name: RemoveVideoEventName, field: VideoFieldName, callback: (event: RemoveVideoEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 * @param event The event name
 * @param field The (optional) field the event was bound to
 * @param callback The function to detach
 * @example
 * OFF('validate-record', callback); // Detaches an event handler from the 'validate-record' event
 * OFF('validate-record'); // Detaches all event handlers listening to the 'validate-record' event
 *
 */
declare function OFF(name: AddAudioEventName, field: AudioFieldName, callback: (event: AddAudioEvent) => void): void;
/**
 * Detaches an event handler set by ON.
 * @param event The event name
 * @param field The (optional) field the event was bound to
 * @param callback The function to detach
 * @example
 * OFF('validate-record', callback); // Detaches an event handler from the 'validate-record' event
 * OFF('validate-record'); // Detaches all event handlers listening to the 'validate-record' event
 *
 */
declare function OFF(name: RemoveAudioEventName, field: AudioFieldName, callback: (event: RemoveAudioEvent) => void): void;

/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 * The ON function is the starting point for most data event scripts. It wires up an
 * event to a function that gets called when that event happens. Events are things like
 * a record being opened, edited, saved, validated, a field changing, or the record
 * location changing. Using the `ON` function you can add custom logic to be performed
 * when the events happen. The `ON` function by itself is not useful unless it's combined
 * with the other data event functions to manipulate the record data and perform other
 * actions like custom alerts and validations.
 * @param event event name
 * @param target (optional) field to bind the event to
 * @param callback function called when the specified event is triggered
 * @example
 * var callback = function () {
 *   if (!(LATITUDE() >= 40 && LATITUDE() <= 41)) {
 *     INVALID('Latitude must be between 40 and 41.');
 *   }
 * };
 *
 * // Listens for 'save-record' events and stops the record from being saved unless it's within a latitude range
 * ON('validate-record', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the new $weather_summary values
 * };
 *
 * // Listens for changes to the weather summary field and executes callback
 * ON('change', 'weather_summary', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a record's geometry (location) and executes callback
 * ON('change-geometry', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the repeatable location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a repeatable item's geometry and executes callback
 * ON('change-geometry', 'repeatable_item', callback);
 */
declare function ON(name: FormEventNames, callback: (event: FormEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 * The ON function is the starting point for most data event scripts. It wires up an
 * event to a function that gets called when that event happens. Events are things like
 * a record being opened, edited, saved, validated, a field changing, or the record
 * location changing. Using the `ON` function you can add custom logic to be performed
 * when the events happen. The `ON` function by itself is not useful unless it's combined
 * with the other data event functions to manipulate the record data and perform other
 * actions like custom alerts and validations.
 * @param event event name
 * @param target (optional) field to bind the event to
 * @param callback function called when the specified event is triggered
 * @example
 * var callback = function () {
 *   if (!(LATITUDE() >= 40 && LATITUDE() <= 41)) {
 *     INVALID('Latitude must be between 40 and 41.');
 *   }
 * };
 *
 * // Listens for 'save-record' events and stops the record from being saved unless it's within a latitude range
 * ON('validate-record', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the new $weather_summary values
 * };
 *
 * // Listens for changes to the weather summary field and executes callback
 * ON('change', 'weather_summary', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a record's geometry (location) and executes callback
 * ON('change-geometry', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the repeatable location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a repeatable item's geometry and executes callback
 * ON('change-geometry', 'repeatable_item', callback);
 */
declare function ON(name: FieldEventNames, field: FieldName, callback: (event: FieldEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 * The ON function is the starting point for most data event scripts. It wires up an
 * event to a function that gets called when that event happens. Events are things like
 * a record being opened, edited, saved, validated, a field changing, or the record
 * location changing. Using the `ON` function you can add custom logic to be performed
 * when the events happen. The `ON` function by itself is not useful unless it's combined
 * with the other data event functions to manipulate the record data and perform other
 * actions like custom alerts and validations.
 * @param event event name
 * @param target (optional) field to bind the event to
 * @param callback function called when the specified event is triggered
 * @example
 * var callback = function () {
 *   if (!(LATITUDE() >= 40 && LATITUDE() <= 41)) {
 *     INVALID('Latitude must be between 40 and 41.');
 *   }
 * };
 *
 * // Listens for 'save-record' events and stops the record from being saved unless it's within a latitude range
 * ON('validate-record', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the new $weather_summary values
 * };
 *
 * // Listens for changes to the weather summary field and executes callback
 * ON('change', 'weather_summary', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a record's geometry (location) and executes callback
 * ON('change-geometry', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the repeatable location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a repeatable item's geometry and executes callback
 * ON('change-geometry', 'repeatable_item', callback);
 */
declare function ON(name: RepeatableEventNames, field: RepeatableFieldName, callback: (event: RepeatableEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 * The ON function is the starting point for most data event scripts. It wires up an
 * event to a function that gets called when that event happens. Events are things like
 * a record being opened, edited, saved, validated, a field changing, or the record
 * location changing. Using the `ON` function you can add custom logic to be performed
 * when the events happen. The `ON` function by itself is not useful unless it's combined
 * with the other data event functions to manipulate the record data and perform other
 * actions like custom alerts and validations.
 * @param event event name
 * @param target (optional) field to bind the event to
 * @param callback function called when the specified event is triggered
 * @example
 * var callback = function () {
 *   if (!(LATITUDE() >= 40 && LATITUDE() <= 41)) {
 *     INVALID('Latitude must be between 40 and 41.');
 *   }
 * };
 *
 * // Listens for 'save-record' events and stops the record from being saved unless it's within a latitude range
 * ON('validate-record', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the new $weather_summary values
 * };
 *
 * // Listens for changes to the weather summary field and executes callback
 * ON('change', 'weather_summary', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a record's geometry (location) and executes callback
 * ON('change-geometry', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the repeatable location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a repeatable item's geometry and executes callback
 * ON('change-geometry', 'repeatable_item', callback);
 */
declare function ON(name: ChangeGeometryEventName, callback: (event: GeometryEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 * The ON function is the starting point for most data event scripts. It wires up an
 * event to a function that gets called when that event happens. Events are things like
 * a record being opened, edited, saved, validated, a field changing, or the record
 * location changing. Using the `ON` function you can add custom logic to be performed
 * when the events happen. The `ON` function by itself is not useful unless it's combined
 * with the other data event functions to manipulate the record data and perform other
 * actions like custom alerts and validations.
 * @param event event name
 * @param target (optional) field to bind the event to
 * @param callback function called when the specified event is triggered
 * @example
 * var callback = function () {
 *   if (!(LATITUDE() >= 40 && LATITUDE() <= 41)) {
 *     INVALID('Latitude must be between 40 and 41.');
 *   }
 * };
 *
 * // Listens for 'save-record' events and stops the record from being saved unless it's within a latitude range
 * ON('validate-record', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the new $weather_summary values
 * };
 *
 * // Listens for changes to the weather summary field and executes callback
 * ON('change', 'weather_summary', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a record's geometry (location) and executes callback
 * ON('change-geometry', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the repeatable location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a repeatable item's geometry and executes callback
 * ON('change-geometry', 'repeatable_item', callback);
 */
declare function ON(name: ChangeGeometryEventName, field: RepeatableFieldName, callback: (event: GeometryEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 * The ON function is the starting point for most data event scripts. It wires up an
 * event to a function that gets called when that event happens. Events are things like
 * a record being opened, edited, saved, validated, a field changing, or the record
 * location changing. Using the `ON` function you can add custom logic to be performed
 * when the events happen. The `ON` function by itself is not useful unless it's combined
 * with the other data event functions to manipulate the record data and perform other
 * actions like custom alerts and validations.
 * @param event event name
 * @param target (optional) field to bind the event to
 * @param callback function called when the specified event is triggered
 * @example
 * var callback = function () {
 *   if (!(LATITUDE() >= 40 && LATITUDE() <= 41)) {
 *     INVALID('Latitude must be between 40 and 41.');
 *   }
 * };
 *
 * // Listens for 'save-record' events and stops the record from being saved unless it's within a latitude range
 * ON('validate-record', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the new $weather_summary values
 * };
 *
 * // Listens for changes to the weather summary field and executes callback
 * ON('change', 'weather_summary', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a record's geometry (location) and executes callback
 * ON('change-geometry', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the repeatable location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a repeatable item's geometry and executes callback
 * ON('change-geometry', 'repeatable_item', callback);
 */
declare function ON(name: AddPhotoEventName, field: PhotoFieldName, callback: (event: AddPhotoEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 * The ON function is the starting point for most data event scripts. It wires up an
 * event to a function that gets called when that event happens. Events are things like
 * a record being opened, edited, saved, validated, a field changing, or the record
 * location changing. Using the `ON` function you can add custom logic to be performed
 * when the events happen. The `ON` function by itself is not useful unless it's combined
 * with the other data event functions to manipulate the record data and perform other
 * actions like custom alerts and validations.
 * @param event event name
 * @param target (optional) field to bind the event to
 * @param callback function called when the specified event is triggered
 * @example
 * var callback = function () {
 *   if (!(LATITUDE() >= 40 && LATITUDE() <= 41)) {
 *     INVALID('Latitude must be between 40 and 41.');
 *   }
 * };
 *
 * // Listens for 'save-record' events and stops the record from being saved unless it's within a latitude range
 * ON('validate-record', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the new $weather_summary values
 * };
 *
 * // Listens for changes to the weather summary field and executes callback
 * ON('change', 'weather_summary', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a record's geometry (location) and executes callback
 * ON('change-geometry', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the repeatable location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a repeatable item's geometry and executes callback
 * ON('change-geometry', 'repeatable_item', callback);
 */
declare function ON(name: ReplacePhotoEventName, field: PhotoFieldName, callback: (event: ReplacePhotoEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 * The ON function is the starting point for most data event scripts. It wires up an
 * event to a function that gets called when that event happens. Events are things like
 * a record being opened, edited, saved, validated, a field changing, or the record
 * location changing. Using the `ON` function you can add custom logic to be performed
 * when the events happen. The `ON` function by itself is not useful unless it's combined
 * with the other data event functions to manipulate the record data and perform other
 * actions like custom alerts and validations.
 * @param event event name
 * @param target (optional) field to bind the event to
 * @param callback function called when the specified event is triggered
 * @example
 * var callback = function () {
 *   if (!(LATITUDE() >= 40 && LATITUDE() <= 41)) {
 *     INVALID('Latitude must be between 40 and 41.');
 *   }
 * };
 *
 * // Listens for 'save-record' events and stops the record from being saved unless it's within a latitude range
 * ON('validate-record', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the new $weather_summary values
 * };
 *
 * // Listens for changes to the weather summary field and executes callback
 * ON('change', 'weather_summary', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a record's geometry (location) and executes callback
 * ON('change-geometry', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the repeatable location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a repeatable item's geometry and executes callback
 * ON('change-geometry', 'repeatable_item', callback);
 */
declare function ON(name: RemovePhotoEventName, field: PhotoFieldName, callback: (event: RemoveMediaEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 * The ON function is the starting point for most data event scripts. It wires up an
 * event to a function that gets called when that event happens. Events are things like
 * a record being opened, edited, saved, validated, a field changing, or the record
 * location changing. Using the `ON` function you can add custom logic to be performed
 * when the events happen. The `ON` function by itself is not useful unless it's combined
 * with the other data event functions to manipulate the record data and perform other
 * actions like custom alerts and validations.
 * @param event event name
 * @param target (optional) field to bind the event to
 * @param callback function called when the specified event is triggered
 * @example
 * var callback = function () {
 *   if (!(LATITUDE() >= 40 && LATITUDE() <= 41)) {
 *     INVALID('Latitude must be between 40 and 41.');
 *   }
 * };
 *
 * // Listens for 'save-record' events and stops the record from being saved unless it's within a latitude range
 * ON('validate-record', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the new $weather_summary values
 * };
 *
 * // Listens for changes to the weather summary field and executes callback
 * ON('change', 'weather_summary', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a record's geometry (location) and executes callback
 * ON('change-geometry', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the repeatable location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a repeatable item's geometry and executes callback
 * ON('change-geometry', 'repeatable_item', callback);
 */
declare function ON(name: AddVideoEventName, field: VideoFieldName, callback: (event: AddVideoEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 * The ON function is the starting point for most data event scripts. It wires up an
 * event to a function that gets called when that event happens. Events are things like
 * a record being opened, edited, saved, validated, a field changing, or the record
 * location changing. Using the `ON` function you can add custom logic to be performed
 * when the events happen. The `ON` function by itself is not useful unless it's combined
 * with the other data event functions to manipulate the record data and perform other
 * actions like custom alerts and validations.
 * @param event event name
 * @param target (optional) field to bind the event to
 * @param callback function called when the specified event is triggered
 * @example
 * var callback = function () {
 *   if (!(LATITUDE() >= 40 && LATITUDE() <= 41)) {
 *     INVALID('Latitude must be between 40 and 41.');
 *   }
 * };
 *
 * // Listens for 'save-record' events and stops the record from being saved unless it's within a latitude range
 * ON('validate-record', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the new $weather_summary values
 * };
 *
 * // Listens for changes to the weather summary field and executes callback
 * ON('change', 'weather_summary', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a record's geometry (location) and executes callback
 * ON('change-geometry', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the repeatable location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a repeatable item's geometry and executes callback
 * ON('change-geometry', 'repeatable_item', callback);
 */
declare function ON(name: RemoveVideoEventName, field: VideoFieldName, callback: (event: RemoveVideoEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 * The ON function is the starting point for most data event scripts. It wires up an
 * event to a function that gets called when that event happens. Events are things like
 * a record being opened, edited, saved, validated, a field changing, or the record
 * location changing. Using the `ON` function you can add custom logic to be performed
 * when the events happen. The `ON` function by itself is not useful unless it's combined
 * with the other data event functions to manipulate the record data and perform other
 * actions like custom alerts and validations.
 * @param event event name
 * @param target (optional) field to bind the event to
 * @param callback function called when the specified event is triggered
 * @example
 * var callback = function () {
 *   if (!(LATITUDE() >= 40 && LATITUDE() <= 41)) {
 *     INVALID('Latitude must be between 40 and 41.');
 *   }
 * };
 *
 * // Listens for 'save-record' events and stops the record from being saved unless it's within a latitude range
 * ON('validate-record', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the new $weather_summary values
 * };
 *
 * // Listens for changes to the weather summary field and executes callback
 * ON('change', 'weather_summary', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a record's geometry (location) and executes callback
 * ON('change-geometry', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the repeatable location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a repeatable item's geometry and executes callback
 * ON('change-geometry', 'repeatable_item', callback);
 */
declare function ON(name: AddAudioEventName, field: AudioFieldName, callback: (event: AddAudioEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 * The ON function is the starting point for most data event scripts. It wires up an
 * event to a function that gets called when that event happens. Events are things like
 * a record being opened, edited, saved, validated, a field changing, or the record
 * location changing. Using the `ON` function you can add custom logic to be performed
 * when the events happen. The `ON` function by itself is not useful unless it's combined
 * with the other data event functions to manipulate the record data and perform other
 * actions like custom alerts and validations.
 * @param event event name
 * @param target (optional) field to bind the event to
 * @param callback function called when the specified event is triggered
 * @example
 * var callback = function () {
 *   if (!(LATITUDE() >= 40 && LATITUDE() <= 41)) {
 *     INVALID('Latitude must be between 40 and 41.');
 *   }
 * };
 *
 * // Listens for 'save-record' events and stops the record from being saved unless it's within a latitude range
 * ON('validate-record', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the new $weather_summary values
 * };
 *
 * // Listens for changes to the weather summary field and executes callback
 * ON('change', 'weather_summary', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a record's geometry (location) and executes callback
 * ON('change-geometry', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the repeatable location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a repeatable item's geometry and executes callback
 * ON('change-geometry', 'repeatable_item', callback);
 */
declare function ON(name: RemoveAudioEventName, field: AudioFieldName, callback: (event: RemoveAudioEvent) => void): void;
/**
 * Attaches an event handler that listens for record, repeatable, or field events.
 * The ON function is the starting point for most data event scripts. It wires up an
 * event to a function that gets called when that event happens. Events are things like
 * a record being opened, edited, saved, validated, a field changing, or the record
 * location changing. Using the `ON` function you can add custom logic to be performed
 * when the events happen. The `ON` function by itself is not useful unless it's combined
 * with the other data event functions to manipulate the record data and perform other
 * actions like custom alerts and validations.
 * @param event event name
 * @param target (optional) field to bind the event to
 * @param callback function called when the specified event is triggered
 * @example
 * var callback = function () {
 *   if (!(LATITUDE() >= 40 && LATITUDE() <= 41)) {
 *     INVALID('Latitude must be between 40 and 41.');
 *   }
 * };
 *
 * // Listens for 'save-record' events and stops the record from being saved unless it's within a latitude range
 * ON('validate-record', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the new $weather_summary values
 * };
 *
 * // Listens for changes to the weather summary field and executes callback
 * ON('change', 'weather_summary', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a record's geometry (location) and executes callback
 * ON('change-geometry', callback);
 *
 * @example
 * var callback = function () {
 *   // Do something with the repeatable location via LATITUDE() AND LONGITUDE() values
 * };
 *
 * // Listens for changes to a repeatable item's geometry and executes callback
 * ON('change-geometry', 'repeatable_item', callback);
 */
declare function ON(name: EventNames, fieldOrCallback: FieldName | ((event: FormEvent) => void), callback?: ((event: FormEvent) => void)): void;

/**
 * Returns the value of pi (π).
 */
declare function PI(): number;

/** Returns the platform version from the configuration object */
declare function PLATFORMVERSION(): string;

/**
 * Returns platform information off the form configuration object including platform name and version.
 * @param separator optional; separator with which to combine platform name and version - defaults to ", "
 * @returns string with platform name and version
 * @example
 * PLATFORMINFO() // returns "Android, 0.9.3"
 */
declare function PLATFORMINFO(separator?: string): string;

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
declare function PLUCK(object: any[], property: string): any[];

/**
 * Returns the base number raised to the exponent power.
 * @param base required; base number to be exponentially multiplied
 * @param exponent required; number to serve as exponent
 * @returns number
 * @example
 * POWER(3, 4) // returns 81
 */
declare function POWER(base: number, power: number): number;
/**
 * Returns the base number raised to the exponent power.
 * @param base required; base number to be exponentially multiplied
 * @param exponent required; number to serve as exponent
 * @returns number
 * @example
 * POWER(3, 4) // returns 81
 */
declare function POWER(base?: any, power?: any): number;

/**
 * Multiplies all the numbers given as arguments
 * @param args required; list of numbers to be multiplied
 * @returns product
 * @example
 * PRODUCT(-2, 3, 4) // returns -24
 */
declare function PRODUCT(...args: number[]): number;
/**
 * Multiplies all the numbers given as arguments
 * @param args required; list of numbers to be multiplied
 * @returns product
 * @example
 * PRODUCT(-2, 3, 4) // returns -24
 */
declare function PRODUCT(...args: any[]): number;

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
declare function PROGRESS(title?: null | string, message?: null | string): void;

/**
 * Returns the project ID off the configuration object.
 */
declare function PROJECTID(): string | undefined;

/**
 * Returns the project name from the configuration object
 */
declare function PROJECTNAME(): string | undefined;

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
declare function PROMPT(title: string | null, message: string, callback: Function): void;

/**
 * Capitalizes the first letter in each word of a string.
 * @param value required; string to be capitalized
 * @returns string
 * @example
 *
 * PROPER("test test") // returns "Test Test"
 */
declare function PROPER(value: string): string | undefined;
/**
 * Capitalizes the first letter in each word of a string.
 * @param value required; string to be capitalized
 * @returns string
 * @example
 *
 * PROPER("test test") // returns "Test Test"
 */
declare function PROPER(value: any): string | undefined;

/**
 * Returns quotient of numerator and denominator as integer.
 * @param numerator required; number to be divided
 * @param denominator required; divisor
 * @returns integer
 * @example
 * QUOTIENT(12, 2) // returns 6
 * QUOTIENT(12.5, 2) // returns 6
 */
declare function QUOTIENT(numerator: number, denominator: number): number;
/**
 * Returns quotient of numerator and denominator as integer.
 * @param numerator required; number to be divided
 * @param denominator required; divisor
 * @returns integer
 * @example
 * QUOTIENT(12, 2) // returns 6
 * QUOTIENT(12.5, 2) // returns 6
 */
declare function QUOTIENT(numerator: any, denominator: any): number;
/**
 * Returns quotient of numerator and denominator as integer.
 * @param numerator required; number to be divided
 * @param denominator required; divisor
 * @returns integer
 * @example
 * QUOTIENT(12, 2) // returns 6
 * QUOTIENT(12.5, 2) // returns 6
 */
declare function QUOTIENT(numerator?: any, denominator?: any): number;

/**
 * Converts degress into radians.
 * @param degress required; number of degrees
 * @returns number of radians
 * @example
 * RADIANS(45) // returns 0.7853981633974483
 */
declare function RADIANS(degrees: number): number;
/**
 * Converts degress into radians.
 * @param degress required; number of degrees
 * @returns number of radians
 * @example
 * RADIANS(45) // returns 0.7853981633974483
 */
declare function RADIANS(degrees: any): number;

/**
 * Returns a random number between 0 and 1.
 * @example
 * RAND() // returns 0.45
 * RAND() // returns 0.91
 */
declare function RAND(): number;

/**
 * Returns a random integer between the high and low values specified.
 * @param low required; lowest value of desired range
 * @param high required; highest value of desired range
 * @returns random integer within specified range
 * @example
 * RANDBETWEEN(1, 10) // returns 2
 * RANDBETWEEN(1, 10) // returns 8
 */
declare function RANDBETWEEN(low: number, high: number): number;
/**
 * Returns a random integer between the high and low values specified.
 * @param low required; lowest value of desired range
 * @param high required; highest value of desired range
 * @returns random integer within specified range
 * @example
 * RANDBETWEEN(1, 10) // returns 2
 * RANDBETWEEN(1, 10) // returns 8
 */
declare function RANDBETWEEN(low: any, high: any): number;
/**
 * Returns a random integer between the high and low values specified.
 * @param low required; lowest value of desired range
 * @param high required; highest value of desired range
 * @returns random integer within specified range
 * @example
 * RANDBETWEEN(1, 10) // returns 2
 * RANDBETWEEN(1, 10) // returns 8
 */
declare function RANDBETWEEN(low?: any, high?: any): number;

/**
 * Returns the current record's id from the form configuration obejct.
 */
declare function RECORDID(): string | undefined;

/**
 * Returns a the id of the repeatable being edited.
 */
declare function REPEATABLEID(): string | undefined;

/**
 * Returns human-readable index of current repeatable field. Subtract 1 from returned value for computer index.
 */
declare function REPEATABLENUMBER(): number | undefined;

/**
 * Returns a specific field out of a collection of repeatable items.
 * @param repeatableValue required; array of form_value objects: [ { id: 1, form_values: "value" } ]
 * @param dataName required; data name of desired field or an array of data names
 * @returns array of values
 */
declare function REPEATABLEVALUES(repeatableValue: any[], dataName: FieldName[] | FieldName): any[] | undefined | null;

/**
 * Returns the sum of its arguments.
 * @param args required; list of numbers
 * @returns sum of its arguments
 * @example
 *
 * SUM(1, 2, 3, 4) // returns 10
 */
declare function SUM(...args: number[]): number;
/**
 * Returns the sum of its arguments.
 * @param args required; list of numbers
 * @returns sum of its arguments
 * @example
 *
 * SUM(1, 2, 3, 4) // returns 10
 */
declare function SUM(...args: any[]): number;

/**
 * Returns the sum of all the numeric form values in a repeatable field.
 * @param repeatableValue required; array of form_value objects: [ { id: 1, form_values: "value" } ]
 * @param dataName required; data name of desired field or an array of data names
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
declare function REQUEST(options: RequestOptions, callback: HTTPRequestCallback): void;
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
declare function REQUEST(url: string, callback: HTTPRequestCallback): void;

/**
 * Rounds down a given number to the specified number of digits.
 * @param num required; numeric value to be round down
 * @param digits optional; number of digits to which `num` is to be rounded down; defaults to `0`
 * @returns numeric value rounded down to desired number of digits
 * @example
 *
 * ROUNDDOWN(2.6666666, 4) // returns 2.6666
 */
declare function ROUNDDOWN(num: number, digits?: number): number;
/**
 * Rounds down a given number to the specified number of digits.
 * @param num required; numeric value to be round down
 * @param digits optional; number of digits to which `num` is to be rounded down; defaults to `0`
 * @returns numeric value rounded down to desired number of digits
 * @example
 *
 * ROUNDDOWN(2.6666666, 4) // returns 2.6666
 */
declare function ROUNDDOWN(num: string | number, digits?: number): number;
/**
 * Rounds down a given number to the specified number of digits.
 * @param num required; numeric value to be round down
 * @param digits optional; number of digits to which `num` is to be rounded down; defaults to `0`
 * @returns numeric value rounded down to desired number of digits
 * @example
 *
 * ROUNDDOWN(2.6666666, 4) // returns 2.6666
 */
declare function ROUNDDOWN(num: any, digits?: any): number;

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
declare function ROUNDUP(num: number, digits?: number): number;
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
declare function ROUNDUP(num: string | number, digits?: number): number;
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
declare function ROUNDUP(num: any, digits?: any): number;

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
declare function RPAD(value: string, count: number, padding?: string): string;
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
declare function RPAD(value: any, count: any, padding?: any): string | undefined;

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
declare function SEARCH(needle: string, haystack: string, startPosition?: number): number | undefined;
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
declare function SEARCH(needle: any, haystack: any, startPosition?: any): number | undefined;

/**
 * Sets or clears the value of a field depending on value passed in.
 * @param dataName required; string, data_name of field to be set
 * @param value required; value for field, or `null` to clear the field
 * @example
 * SETVALUE('yes_no_field', 'yes') // Sets the value of a yes/no field
 * SETVALUE('name', null) // Clears the value of field called 'name'
 */
declare function SETVALUE(dataName: FieldName, value: string | ChoiceFieldValue | AddressFieldValue | ValidGeometry | string[] | number[] | null): void;

/**
 * Assign a user to a record.
 * @param user required; user's name, must be a string
 */
declare function SETASSIGNMENT(user: string): void;

/**
 * Updates a form's attributes.
 * @param dataName data name of desired form field to be updated
 * @param attributes optional; object of attributes to be updated and their corresponding values
 */
declare function SETFORMATTRIBUTES(dataName: string, attributes?: any): void;
/**
 * Updates a form's attributes.
 * @param dataName data name of desired form field to be updated
 * @param attributes optional; object of attributes to be updated and their corresponding values
 */
declare function SETFORMATTRIBUTES(dataName: any): void;

/**
 * Sets a choice filter for a form.
 * @param dataName required; data name of field to be updated
 * @param value required; a value or an array of values on which to filter
 */
declare function SETCHOICEFILTER(dataName: ChoiceFieldName, value: any[]): void;

/**
 * Updates the form choices attribute.
 * @param dataName required; data name of form field to be updated
 * @param value required; an array of values; can be `null`
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
 * @param settings key value pair of settings to configure
 */
declare function SETCONFIGURATION(settings: Configuration): void;

/**
 * Sets the description of a field.
 * @param dataName required; data name of targeted field
 * @param value value to which description should be set
 */
declare function SETDESCRIPTION(dataName: FieldName, value: string): void;

/**
 * Sets a field to read only or removes a read only condition.
 * @param dataName required; data name of the targeted field
 * @param value boolean value indicating whether to set as read only
 * @example
 *
 * SETREADONLY("role", true) // sets role field to read only
 */
declare function SETREADONLY(dataName: FieldName, value: boolean): void;
/**
 * Sets a field to read only or removes a read only condition.
 * @param dataName required; data name of the targeted field
 * @param value boolean value indicating whether to set as read only
 * @example
 *
 * SETREADONLY("role", true) // sets role field to read only
 */
declare function SETREADONLY(dataName: FieldName, value?: boolean): void;


/**
 * Sets geometry values if a valid GeoJSON object is passed in.
 * @param geometry GeoJSON object containing geometry `type` and lat-long `coordinates`
 * @example
 * SETGEOMETRY({ type: "Point", coordinates: [ 0, 0 ]}) // sets geometry to Null Island
 */
declare function SETGEOMETRY(geometry: ValidGeometry): void;
/**
 * Sets geometry values if a valid GeoJSON object is passed in.
 * @param geometry GeoJSON object containing geometry `type` and lat-long `coordinates`
 * @example
 * SETGEOMETRY({ type: "Point", coordinates: [ 0, 0 ]}) // sets geometry to Null Island
 */
declare function SETGEOMETRY(geometry: any): void;

/**
 * Sets a field to hidden or visible.
 * @param dataName required; data name of targeted field
 * @param value boolean value indicating whether to hide field
 * @example
 *
 * SETHIDDEN("choice_field", true) // hide field
 * SETHIDDEN("choice_field", false) // make field visible
 */
declare function SETHIDDEN(dataName: FieldName, value: boolean): void;
/**
 * Sets a field to hidden or visible.
 * @param dataName required; data name of targeted field
 * @param value boolean value indicating whether to hide field
 * @example
 *
 * SETHIDDEN("choice_field", true) // hide field
 * SETHIDDEN("choice_field", false) // make field visible
 */
declare function SETHIDDEN(dataName: FieldName, value?: boolean): void;

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
declare function SETINTERVAL(fn: Function, timeout: number): number;

/**
 * Sets the label of a field.
 * @param dataName required; data name of targeted field
 * @param value value to which label should be set
 */
declare function SETLABEL(dataName: FieldName, value: string): void;

/**
 * Sets location geometry given a latitude and longitude value.
 * @param latitude numeric value fo latitude coordinate
 * @param longitude number value for longitude coordinate
 */
declare function SETLOCATION(latitude: number, longitude: number): void;
/**
 * Sets location geometry given a latitude and longitude value.
 * @param latitude numeric value fo latitude coordinate
 * @param longitude number value for longitude coordinate
 */
declare function SETLOCATION(latitude: string, longitude: string): void;
/**
 * Sets location geometry given a latitude and longitude value.
 * @param latitude numeric value fo latitude coordinate
 * @param longitude number value for longitude coordinate
 */
declare function SETLOCATION(latitude?: any, longitude?: any): void;

/**
 * Sets the max length of a field.
 * @param dataName required; data name of the targeted field
 * @param value number representing max length desired
 */
declare function SETMAXLENGTH(dataName: FieldName, value: number): void;

/**
 * Sets the minimum length of a field.
 * @param dataName required; data name of the targeted field
 * @param value number representing min length desired
 */
declare function SETMINLENGTH(dataName: FieldName, value: number): void;

/**
 * Sets project for a record.
 * @param project project name, string
 */
declare function SETPROJECT(project: string): void;
/**
 * Sets project for a record.
 * @param project project name, string
 */
declare function SETPROJECT(project: any): void;

/**
 * Sets a field to required or optional.
 * @param dataName required; data name of targeted field
 * @param value boolean value indicating whether to require field
 * @example
 *
 * SETREQUIRED("choice_field", true) // set field to required
 * SETREQUIRED("choice_field", false) // make field optional
 */
declare function SETREQUIRED(dataName: FieldName, value: boolean): void;

/**
 * Sets result variable on runtime.
 * @param result required; desired result
 */
declare function SETRESULT(result: any): void;

/**
 * Sets record's status.
 * @param status status value, string
 */
declare function SETSTATUS(status: string): void;
/**
 * Sets record's status.
 * @param status status value, string
 */
declare function SETSTATUS(status?: any): void;

/**
 * Set status filter values.
 * @param value required; array of statuses (strings) or a single status to filter by
 */
declare function SETSTATUSFILTER(value: string[] | string): void;

/**
 * Sets status to hidden or visible.
 * @param value boolean value indicating whether to hide status
 */
declare function SETSTATUSHIDDEN(value: boolean): void;

/**
 * Sets status to read only or removes a read only condition.
 * @param value required; boolean value indicating whether status should be read-only
 */
declare function SETSTATUSREADONLY(value: boolean): void;

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
declare function SETTIMEOUT(fn: Function, timeout: number): number;

/**
 * Can toggle between settings to either show errors or not.
 * @param showErrors optional; boolean value indiciating whether to show errors or not. Defaults to true.
 * @example
 * SHOWERRORS() // errors will be shown
 * SHOWERRORS(false) // errors will not be shown
 */
declare function SHOWERRORS(showErrors?: boolean): void;

/**
 * Randomly shuffles values passed in and returns them as an array.
 * @param values set of values to be shuffled
 * @returns a shuffled array
 * @example
 *
 * SHUFFLE([1, 2, 3], 4) // returns [4, 2, 3, 1]
 */
declare function SHUFFLE(...values: any[]): any[];

/**
 * Returns the sign of a number.
 * @param num required; numeric value
 * @returns sign of a number: 1 for positive numbers, -1 for negative numbers, 0 for 0
 * @example
 *
 * SIGN(9 * -3) // returns -1
 */
declare function SIGN(num: number): number;
/**
 * Returns the sign of a number.
 * @param num required; numeric value
 * @returns sign of a number: 1 for positive numbers, -1 for negative numbers, 0 for 0
 * @example
 *
 * SIGN(9 * -3) // returns -1
 */
declare function SIGN(num: any): number;

/**
 * Returns the sine of the specified angle value, which must be specified in radians.
 * @param value numeric value specifying radians
 * @returns numeric value between 1 and -1 indicating the angle's sine
 * @example
 * SIN(12) // returns -0.5365729180004349
 */
declare function SIN(value: number): number;
/**
 * Returns the sine of the specified angle value, which must be specified in radians.
 * @param value numeric value specifying radians
 * @returns numeric value between 1 and -1 indicating the angle's sine
 * @example
 * SIN(12) // returns -0.5365729180004349
 */
declare function SIN(value: string): number;

/**
 * Returns function returns the hyperbolic sine of a number
 * @param value numeric value
 * @returns numeric value of angle's hyperbolic sine
 * @example
 * SINH(12) // returns 0.8438539587324921
 */
declare function SINH(value: number): number;
/**
 * Returns function returns the hyperbolic sine of a number
 * @param value numeric value
 * @returns numeric value of angle's hyperbolic sine
 * @example
 * SINH(12) // returns 0.8438539587324921
 */
declare function SINH(value: string): number;
/**
 * Returns function returns the hyperbolic sine of a number
 * @param value numeric value
 * @returns numeric value of angle's hyperbolic sine
 * @example
 * SINH(12) // returns 0.8438539587324921
 */
declare function SINH(value: any): number;

/**
 * Sorts parameters passed in according to an optional callback. Defaults to basic comparison sort sans callback.
 * @param args values to be sorted, optional callback must be passed in last
 * @returns sorted list of values
 * @example
 * SORT(1, 3, 6, 6, 2) // returns [1, 2, 3 , 6, 6]
 * SORT({test: 2}, {test: 1}, {test: 1}, (a: any, b: any) => a.test) // returns [{test: 1}, {test: 1}, {test: 2}]
 */
declare function SORT(...args: any[]): any[] | undefined;

/**
 * Returns the square root of a number.
 * @param num number to be evaluated
 * @returns square root of original value
 */
declare function SQRT(num: number): number;
/**
 * Returns the square root of a number.
 * @param num number to be evaluated
 * @returns square root of original value
 */
declare function SQRT(num: string): number;
/**
 * Returns the square root of a number.
 * @param num number to be evaluated
 * @returns square root of original value
 */
declare function SQRT(num: any): number;

/**
 * Returns the square root of a number times PI.
 * @param num number to be evaluated
 * @returns the sqrt of `num` * PI
 */
declare function SQRTPI(num: number): number;
/**
 * Returns the square root of a number times PI.
 * @param num number to be evaluated
 * @returns the sqrt of `num` * PI
 */
declare function SQRTPI(num: string): number;
/**
 * Returns the square root of a number times PI.
 * @param num number to be evaluated
 * @returns the sqrt of `num` * PI
 */
declare function SQRTPI(num: any): number;

/**
 * Returns the record status or undefined if the status is not present.
 */
declare function STATUS(): string | undefined;

/**
 * Returns the status value of a record.
 */
declare function STATUSLABEL(): string | undefined;

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
declare function STORAGE(): typeof storage | Storage;

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
declare function STRING(...args: any[]): string;

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
declare function SUBSTITUTE(text: string, oldText: string, newText: string, occurrence?: number): string | undefined;

/**
 * Returns the sum of each number squared.
 * @param args array of numbers
 * @returns sum of the square of each argument
 * @example
 *
 * SUMSQ(1, 2, 3, 4) // returns 30
 */
declare function SUMSQ(...args: number[]): number;
/**
 * Returns the sum of each number squared.
 * @param args array of numbers
 * @returns sum of the square of each argument
 * @example
 *
 * SUMSQ(1, 2, 3, 4) // returns 30
 */
declare function SUMSQ(...args: any[]): number;

/**
 * Stringifies the value passed in
 * @param value required; value to be converted to a string
 * @returns string value
 * @example
 *
 * T(true) // returns "true"
 */
declare function T(value: any): string;

/**
 * Adds specified amount of time to a time string.
 * @param startTime required; string specifying a start time: XX:XX
 * @param amount required; number of minutes or hours to be added
 * @param format required; "hours" or "minutes" indicating where amount idicated is to be added
 * @returns time string
 */
declare function TIMEADD(startTime: string, amount: number, format: string): string | undefined;
/**
 * Adds specified amount of time to a time string.
 * @param startTime required; string specifying a start time: XX:XX
 * @param amount required; number of minutes or hours to be added
 * @param format required; "hours" or "minutes" indicating where amount idicated is to be added
 * @returns time string
 */
declare function TIMEADD(startTime: any, amount: any, format?: any): string | undefined;

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
declare function TIMEDIFF(startTime: string, endTime: string, format?: string): number | undefined;
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
declare function TIMEDIFF(startTime: any, endTime: any, format?: any): number | undefined;

/**
 * Returns a time stamp given a date object for display only. As it does not contain a timezone, it should not
 * be used to perform calculations such as time deltas.
 * @param date optional; Date object - if nothing is passed in to TIMESTAMP, today's timestamp will be returned
 * @returns a string timestamp in YYYY-MM-DD HH:MM:SS format
 * @example
 * TIMESTAMP("December 16, 1982 03:24:00") // returns "1982-12-16 03:24:00"
 */
declare function TIMESTAMP(date: Date): string;
/**
 * Returns a time stamp given a date object for display only. As it does not contain a timezone, it should not
 * be used to perform calculations such as time deltas.
 * @param date optional; Date object - if nothing is passed in to TIMESTAMP, today's timestamp will be returned
 * @returns a string timestamp in YYYY-MM-DD HH:MM:SS format
 * @example
 * TIMESTAMP("December 16, 1982 03:24:00") // returns "1982-12-16 03:24:00"
 */
declare function TIMESTAMP(date?: Date): string;

/**
 * Returns the current timezone or, if it's not available, the default timezone
 * from the form configuration object.
 */
declare function TIMEZONE(): string;

/**
 * Trims leading and trailing whitespace from a string.
 * @param value required; string to be trimmed
 * @returns trimmed string
 * @example
 * TRIM("  test  ") // returns "test"
 */
declare function TRIM(value: string): string;
/**
 * Trims leading and trailing whitespace from a string.
 * @param value required; string to be trimmed
 * @returns trimmed string
 * @example
 * TRIM("  test  ") // returns "test"
 */
declare function TRIM(value: any): string;

/**
 * Returns the boolean value `true`.
 * @example
 * TRUE() // returns true
 */
declare function TRUE(): true;

/**
 * Returns a string describing the type of argument passed in.
 * @param value required; value to be evaluated
 * @returns a string indiciating the type of argument passed in
 * @example
 * TYPEOF("test") // "string"
 * TYPEOF(true) // "boolean"
 * TYPEOF(NaN) // "nan"
 */
declare function TYPEOF(value: any): string;

/**
 * Evaluates an array of items for unqiueness and returns an array devoid of duplicates.
 * If objects to be compared require an iteratee to extract data, it should be passed in as the last argument.
 * @param args required; items to be evaluated
 * @returns an array of unique items
 * @example
 * UNIQUE(1, 2, 5, 6, 3, 2, 1) // returns [ 1, 2, 5, 6, 3]
 * UNIQUE({test: 1}, {test: 1}, {test: 2}, (a: any) => a.test) //     returns [{test: 1}, {test: 2}]
 */
declare function UNIQUE(...args: any[]): any[] | undefined;

/**
 * Returns a string of all uppercase letters
 * @param value required; value to be converted to uppercase
 * @returns string of uppercase letters
 * @example
 * UPPER("test") // returns "TEST"
 */
declare function UPPER(value: string): string;
/**
 * Returns a string of all uppercase letters
 * @param value required; value to be converted to uppercase
 * @returns string of uppercase letters
 * @example
 * UPPER("test") // returns "TEST"
 */
declare function UPPER(value: undefined | null | object | Array<any> | GenericObject): undefined;

/**
 * Returns the current user's full name if it exists in the current configuration.
 */
declare function USERFULLNAME(): string | undefined;

/**
 * Returns a data value when given the field's data name.
 * @param dataName required; data name of the desired field
 * @returns a form field value
 */
declare function VALUE(dataName: string): string | undefined;
/**
 * Returns a data value when given the field's data name.
 * @param dataName required; data name of the desired field
 * @returns a form field value
 */
declare function VALUE(dataName: any): string | undefined;

/**
 * Returns device, platform, and application information.
 * @param separator optional; character to separate each item returned - defaults to " ,"
 * @example
 * VERSIONINFO() // returns "Apple MQCK2LL/A, iOS 2.0, Chrome 4.2.3.5.2 Webkit"
 */
declare function VERSIONINFO(separator?: string): string;

/**
 * Returns a year given a date.
 * @param date required; date, either as a Date object or a string
 * @returns year as numeric value
 * @example
 * YEAR("2015/12/16") // returns 2015
 * YEAR(new Date("2015/12/16 00:00:00") // returns 2015
 */
declare function YEAR(date: Date): number;
/**
 * Returns a year given a date.
 * @param date required; date, either as a Date object or a string
 * @returns year as numeric value
 * @example
 * YEAR("2015/12/16") // returns 2015
 * YEAR(new Date("2015/12/16 00:00:00") // returns 2015
 */
declare function YEAR(date: MaybeString): number;
/**
 * Returns a year given a date.
 * @param date required; date, either as a Date object or a string
 * @returns year as numeric value
 * @example
 * YEAR("2015/12/16") // returns 2015
 * YEAR(new Date("2015/12/16 00:00:00") // returns 2015
 */
declare function YEAR(): undefined;


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
 * Accepts a nested array and returns an array flattened to one level deep
 * @returns a flattened array
 * @example
 * FLATTEN([1, [2, [3]]]) // returns [1, 2, 3]
 */
declare function FLATTEN(value: any): any[];

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
 * Returns current location from runtime if available, otherwise returns null.
 */
declare function CURRENTLOCATION(): string | null;


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


////ALERT

/**
 * ALERT
 * Display a message as an alert in the mobile app.
 * @param {String} title A short title for the alert
 * @param {String} message The message content for the alert
 * @example
 * ALERT('Warning!', 'A depth of 98 feet is high. Are you sure?')
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
function ALERT() {}


////INVALID

/**
 * INVALID
 * Display a validation error message and stop the record, or repeatable item, from being saved.
 * @param {String} message The validation error message content for the alert
 * @example
 * INVALID('Depth must be less than 20.')
 *
 * // Displays an alert and stops the record from being saved
 * @example
 * ON('validate-record', function (event) {
 *    if (NUM($depth) >= 20) {
 *      INVALID('Depth must be less than 20.')
 *    }
 * });
 *
 * // Use with the 'validate-record' event to stop a record from being saved
 * @example
 * ON('validate-repeatable', function (event) {
 *    if (!ISSELECTED($choice_field, 'Purple')) {
 *      INVALID('You gotta pick purple!')
 *    }
 * });
 *
 * // Use with the 'validate-repeatable' event to stop a repeatable from being saved
 */
function INVALID() {}


////OPENURL

/**
 * OPENURL
 * Open a URL for a website or mobile app.
 * @param {String} url The URL to open
 * @example
 * OPENURL('https://www.google.com/search?q=Fulcrum+Mobile+Solutions')
 *
 * // Opens a web browser to the specified address
 * @example
 * OPENURL('comgooglemaps://?q=Pizza&center=37.759748,-122.427135')
 *
 * // Opens google maps and searches for Pizza near a location
 * @example
 * OPENURL('mailto:clark.griswold@gmail.com?subject=turn+those+lights+off!&body=jk,+i+love+them.')
 *
 * // Opens an email client with a predefined subject and body
 */
function OPENURL() {}


////PROGRESS

/**
 * PROGRESS
 * Display a non-dismissible progress message in the mobile app.
 * @param {String} title A short title for the progress message
 * @param {String} message The message content for the progress alert
 * @example
 * PROGRESS('Just a sec!', 'Searching for nearby facilities ...')
 *
 * // Displays an progress message that looks like
 * // +-------------------------------------------+
 * // | Just a sec!                               |
 * // +-------------------------------------------|
 * // |                                           |
 * // | Searching for nearby facilities ...       |
 * // |                                           |
 * // +-------------------------------------------+
 * @example
 * PROGRESS()
 *
 * // Call with no parameters to dismiss the progress message.
 */
function PROGRESS() {}


////REQUEST

/**
 * REQUEST
 * Performs an HTTP request and executes the callback on completion.
 * @param {Object} options The options to pass for the request
 * @param {string} options.url The url for the request
 * @param {string} [options.method=GET] The HTTP method for the request (POST, PUT, DELETE, etc.)
 * @param {boolean} [options.followRedirect=true] Should the request follow any redirects
 * @param {Object} [options.headers={}] An object containing keys and values for additional header items
 * @param {Object} [options.qs] An object containing query string parameters (url parameters)
 * @param {Object} [options.json] An object to be passed in the request body, must be `JSON.stringify`able
 * @param {string} [options.body] The request body to send with a POST or PUT request
 * @param {function} callback The function to call when the request is complete - The function is passed `error`, `response`, and `body` parameters
 * @example
 * options = {
 *   url: 'https://api.forecast.io/forecast/your_api_key/40,-100
 * }
 *
 * function callback(error, response, body) {
 *   if (error) {
 *     ALERT('Error with request: ' + error)
 *   } else {
 *     weather = JSON.parse(body)
 *     SETVALUE('weather_summary', weather.currently.summary)
 *   }
 * }
 *
 * REQUEST(options, callback);
 *
 * // Performs a request with options and execute callback on completion
 */
function REQUEST() {}


////SETDESCRIPTION

/**
 * SETDESCRIPTION
 * Set the description of a field.
 * @param {String} field The data name for the field
 * @param {String} value The value to set for the field's description
 * @example
 * SETDESCRIPTION('weather_summary', 'Could not automatically fetch weather data. Briefly describe the current weather.')
 *
 * // Sets the description of a weather summary field
 */
function SETDESCRIPTION() {}


////SETVALUE

/**
 * SETVALUE
 * Set the value of a field.
 * @param {String} field The data name for the field to set
 * @param {String} value The value to set for the field
 * @example
 * SETVALUE('weather_summary', 'Just beautiful')
 *
 * // Sets the value of a weather summary field
 */
function SETVALUE() {}


////SETREADONLY

/**
 * SETREADONLY
 * Sets a field to be read-only or editable.
 * @param {String} field The data name
 * @param {boolean|null} readOnly Boolean value representing whether the field should be read-only
 * @example
 * SETREADONLY('weather_summary', true)
 *
 * // Sets the field to read only, not editable by the user
 * @example
 * SETREADONLY('weather_summary', false)
 *
 * // Sets the field to be active, editable by the user
 * @example
 * SETREADONLY('weather_summary', null)
 *
 * // Unsets any override previously set by SETREADONLY and uses the original setting from form schema
 */
function SETREADONLY() {}

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


////CURRENTLOCATION

/**
 * CURRENTLOCATION
 * Returns a location object containing metadata about the user's current location, not the record's location.
 * @example
 * location = CURRENTLOCATION()
 *
 * if (!location) {
 *   // location could not be determined.
 * } else {
 *   location.latitude  // 35.6443171
 *   location.longitude // -80.8984504
 *   location.altitude  // 213 - meters
 *   location.accuracy  // 5 - meters
 *   location.speed     // 3.4 - meters per second
 *   location.course    // 213
 *   location.timestamp // 1454015950.013456 - ephoch time, seconds
 * }
 */
function CURRENTLOCATION() {}


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


////OFF

/**
 * OFF
 * Detaches an event handler set by ON.
 * @param {string} event The event name
 * @param {function} callback The function to detach
 * @example
 * OFF('validate-record', callback)
 *
 * // Detaches an event handler from the validate-record event
 * @example
 * OFF('validate-record')
 *
 * // Detaches all event handlers listening to the 'validate-record' event
 */
function OFF() {}


////ON

/**
 * ON
 * Attaches an event handler that listens for record, repeatable, or field events.
 * @param {string} event The event name
 * @param {function} callback The function to call when the specified event is triggered
 * @example
 * var callback = function () {
 *   if (!(LATITUDE() >= 40 && LATITUDE() <= 41)) {
 *     INVALID('Latitude must be between 40 and 41.')
 *   }
 * }
 *
 * ON('validate-record', callback)
 *
 * // Listens for 'save-record' events and stops the record from being saved unless it's within a latitude range
 * @example
 * var callback = function () {
 *   // Do something with the new $weather_summary values
 * }
 *
 * ON('change', 'weather_summary', callback)
 *
 * // Listens for changes to the weather summary field and executes callback
 * @example
 * var callback = function () {
 *   // Do something with the location via LATITUDE() AND LONGITUDE() values
 * }
 *
 * ON('change-geometry', callback)
 *
 * // Listens for changes to a record's geometry (location) and executes callback
 * @example
 * var callback = function () {
 *   // Do something with the repeatable location via LATITUDE() AND LONGITUDE() values
 * }
 *
 * ON('change-geometry', 'repeatable_item', callback)
 *
 * // Listens for changes to a repeatable item's geometry and executes callback
 */
function ON() {}


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
 *   url: 'https://api.forecast.io/forecast/your_api_key/40,-100'
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


////SETCHOICEFILTER

/**
 * SETCHOICEFILTER
 * Filter the choices in a choice field.
 * @param {String} field The data name for the field
 * @param {String|Array|null} filter The string or strings to filter choices by
 * @example
 * SETCHOICEFILTER('weather_summary', 'cat')
 *
 * // Filters the choices in the weather summary field to those that contain 'cat'
 * @example
 * SETCHOICEFILTER('weather_summary', ['cat', 'dog'])
 *
 * // Filters the choices in the weather summary field to those that contain 'cat' or 'dog'
 * @example
 * SETCHOICEFILTER('weather_summary', null)
 *
 * // Unsets any filter previously set by SETCHOICEFILTER and applies no filter
 */
function SETCHOICEFILTER() {}


////SETCHOICES

/**
 * SETCHOICES
 * Set the available choices for a choice field.
 * @param {String} field The data name for the field
 * @param {Array|null} choices The choices for the choice field
 * @example
 * choices = ['Rain', 'Hail', 'Snow', 'Graupel']
 * SETCHOICES('weather_summary', choices)
 *
 * // Sets the available choices of the weather summary field to an array of values
 * @example
 * choices = [
 *   ['Light Rain', 'light_rain'],
 *   ['Heavy Rain', 'heavy_rain']
 * ]
 * SETCHOICES('weather_summary', choices)
 *
 * // Sets the available choices of the weather summary field to an array of labels and values in [<label>, <value>] order
 * @example
 * choices = [
 *   { label: 'Light Rain', value: 'light_rain' },
 *   { label: 'Heavy Rain', value: 'heavy_rain' }
 * ]
 * SETCHOICES('weather_summary', choices)
 *
 * // Sets the available choices of the weather summary field to an array of labels and values in an object containing "label" and "value" keys
 * @example
 * SETCHOICES('weather_summary', null)
 *
 * // Unsets any override previously set by SETCHOICES and uses the original setting from the form schema
 */
function SETCHOICES() {}


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


////SETGEOMETRY

/**
 * SETGEOMETRY
 * Set the geometry of a record.
 * @param {Object} geojson The GeoJSON representation of the geometry - currently only 'Point' is supported
 * @example
 * SETGEOMETRY({ type: 'Point', coordinates: [-100, 40] })
 *
 * // Sets the geometry of a record
 */
function SETGEOMETRY() {}


////SETHIDDEN

/**
 * SETHIDDEN
 * Set the visibility of a field.
 * @param {String} field The data name for the field
 * @param {boolean|null} hidden Boolean value representing whether the field should be hidden
 * @example
 * SETHIDDEN('weather_summary', true)
 *
 * // Hides the weather summary field
 * @example
 * SETHIDDEN('weather_summary', false)
 *
 * // Shows the weather summary field
 * @example
 * SETHIDDEN('weather_summary', null)
 *
 * // Unsets any override previously set by SETHIDDEN and uses the original setting from the form schema
 */
function SETHIDDEN() {}


////SETLABEL

/**
 * SETLABEL
 * Set the label of a field.
 * @param {String} field The data name for the field
 * @param {String|null} hidden The text for the field label
 * @example
 * SETLABEL('weather_summary', 'Weather Report')
 *
 * // Sets the field's label to 'Weather Report'
 * @example
 * SETLABEL('weather_summary', null)
 *
 * // Unsets any override previously set by SETLABEL and uses the original setting from the form schema
 */
function SETLABEL() {}


////SETMAXLENGTH

/**
 * SETMAXLENGTH
 * Set the maximum length for a field.
 * @param {String} field The data name for the field
 * @param {number|null} length The maximum length of the field
 * @example
 * SETMAXLENGTH('weather_summary', 25)
 *
 * // Sets the maximum length of the weather summary field to 25
 * @example
 * SETMAXLENGTH('weather_summary', null)
 *
 * // Unsets any override previously set by SETMAXLENGTH and uses the original setting from the form schema
 */
function SETMAXLENGTH() {}


////SETMINLENGTH

/**
 * SETMINLENGTH
 * Set the minimum length for a field.
 * @param {String} field The data name for the field
 * @param {number|null} length The minimum length of the field
 * @example
 * SETMINLENGTH('weather_summary', 25)
 *
 * // Sets the minimum length of the weather summary field to 25
 * @example
 * SETMINLENGTH('weather_summary', null)
 *
 * // Unsets any override previously set by SETMINLENGTH and uses the original setting from the form schema
 */
function SETMINLENGTH() {}


////SETPROJECT

/**
 * SETPROJECT
 * Set the project of a record.
 * @param {String} project The project for the record
 * @example
 * SETPROJECT('Bells Crossing Phase 3')
 *
 * // Sets the project of a record
 */
function SETPROJECT() {}


////SETREQUIRED

/**
 * SETREQUIRED
 * Set whether or not a field is required.
 * @param {String} field The data name for the field
 * @param {boolean|null} hidden Boolean value representing whether the field should be required
 * @example
 * SETREQUIRED('weather_summary', true)
 *
 * // Sets the weather summary field as required
 * @example
 * SETREQUIRED('weather_summary', false)
 *
 * // Sets the weather summary field as not required
 * @example
 * SETREQUIRED('weather_summary', null)
 *
 * // Unsets any override previously set by SETREQUIRED and uses the original setting from the form schema
 */
function SETREQUIRED() {}


////SETSTATUS

/**
 * SETSTATUS
 * Set the status of a record.
 * @param {String} status The status value for the record
 * @example
 * SETSTATUS('inspection_pending')
 *
 * // Sets the status of a record
 */
function SETSTATUS() {}


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
 * // Unsets any override previously set by SETREADONLY and uses the original setting from the form schema
 */
function SETREADONLY() {}


////STORAGE

/**
 * STORAGE
 * Returns a storage object for setting and getting local storage items.
 * @example
 * storage = STORAGE()
 * KEY = 'item_key'
 * storage.setItem(KEY, 'hello world')
 *
 * // Sets an item in local storage, must be a string
 * @example
 * item = storage.getItem(KEY)
 *
 * // Gets an item from storage if it exists, otherwise returns null
 * @example
 * geom = { type: 'Point', coordinates: [-100, 40] }
 * storage.setItem('geometry', JSON.stringify(geom))
 *
 * anotherGeom = JSON.parse(storage.getItem('geometry'))
 *
 * // Use JSON.stringify and JSON.parse to serialize and deserialize objects in local storage
 * @example
 * storage.removeItem(KEY)
 *
 * // Removes an item from storage
 * @example
 * storage.clear()
 *
 * // Removes all items from storage
 */
function STORAGE() {}

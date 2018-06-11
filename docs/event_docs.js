////ALERT

/**
 * ALERT
 * Display a message as an alert.
 * ALERT displays a message to the user. You can provide both the title and message of the alert box.
 * @param {String} title A short title for the alert
 * @param {String} message The message content for the alert
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
function ALERT() {}


////CLEARINTERVAL

/**
 * CLEARINTERVAL
 * Clears an interval that was previously started with SETINTERVAL.
 * The CLEARINTERVAL function clears an interval that was previously started with [SETINTERVAL](/data-events/reference/setinterval/).
 * @param {Number} intervalID The interval ID to clear
 * @example
 * // Starts an interval to update the GPS accuracy every 5 seconds and stops updating after 2 minutes.
 * ON('load-record', function(event) {
 *   var fiveSeconds = 1000 * 5;
 *   var twoMinutes = 1000 * 60 * 2;
 *
 *   var interval = SETINTERVAL(function() {
 *     if (CURRENTLOCATION()) {
 *       SETLABEL('accuracy', CURRENTLOCATION().accuracy);
 *     }
 *   }, fiveSeconds);
 *
 *   SETTIMEOUT(function() {
 *     CLEARINTERVAL(interval);
 *   }, twoMinutes);
 * });
 */
function CLEARINTERVAL() {}


////CLEARTIMEOUT

/**
 * CLEARTIMEOUT
 * Clears a timeout that was previously started with SETTIMEOUT.
 * The CLEARTIMEOUT function clears a timeout that was previously started with [SETTIMEOUT](/data-events/reference/settimeout/).
 * @param {Number} timerID The timer ID to clear
 * @example
 * // Starts a timer to alert after five minutes, and another timeout that clears the first one after four minutes.
 * // No alert is ever displayed.
 * ON('load-record', function(event) {
 *   var fiveMinutes = 1000 * 60 * 5;
 *   var fourMinutes = 1000 * 60 * 4;
 *
 *   var timer = SETTIMEOUT(function() {
 *     ALERT("You've been editing this record for 5 minutes.");
 *   }, fiveMinutes);
 *
 *   SETTIMEOUT(function() {
 *     CLEARTIMEOUT(timer);
 *   }, fourMinutes);
 * });
 */
function CLEARTIMEOUT() {}


////CONFIRM

/**
 * CONFIRM
 * Display a question to the user with an 'Okay or Cancel' response and a callback to respond to the result
 * CONFIRM displays a message to the user and allows a callback function that will be invoked to respond to the result of the question.
 * @param {String} title A short title for the alert
 * @param {String} message The message content for the alert
 * @param {Function} callback invoked when the message box is dismissed
 * @example
 * CONFIRM('Confirm', 'You have selected a critical safety violation. Are you sure?', function (result) {
 *   if (result.value === 'Okay') {
 *     // Selected Okay
 *   } else {
 *     // Selected Cancel
 *   }
 * });
 */
function CONFIRM() {}


////CURRENTLOCATION

/**
 * CURRENTLOCATION
 * Returns a location object containing metadata about the user's current location. This location may be different than the record location.
 * Returns the current device location as an object. This can be used for Q/A purposes or other custom processing logic. This is *not* always the same as the record location. For example, if editing an imported record or previously created record, the current location will be different.
 *
 * Returns data in the following format:
 *
 * ```json
 * {
 *   "latitude": 27.822209699105304,
 *   "longitude": -82.69114932984364,
 *   "altitude": 15.030448913574219,
 *   "accuracy": 10,
 *   "course": 213,
 *   "speed": 3.4,
 *   "timestamp": 1462414931.9999695
 * }
 * ```
 * @example
 * location = CURRENTLOCATION()
 *
 * if (!location) {
 *   // location could not be determined.
 * } else {
 *   lat = location.latitude;   // 35.6443171
 *   lng = location.longitude;  // -80.8984504
 *   alt = location.altitude;   // 213 - meters above sea level. Negative values indicate below sea level.
 *   acc = location.accuracy;   // 5 - meters, the accuracy of the latitude and longitude values
 *   speed = location.speed;    // 3.4 - meters per second
 *   course = location.course;  // 213 - degrees from due north. 0-359, negative values or `null` indicate invalid values.
 *   time = location.timestamp; // 1454015950.013456 - epoch time, seconds
 * }
 */
function CURRENTLOCATION() {}


////INVALID

/**
 * INVALID
 * Display a validation error message and prevent the record or repeatable item from being saved.
 * The INVALID function is designed for the sole purpose of doing custom validations when saving records. It's a special purpose function that's intended to only be used within the `validate-record` and `validate-repeatable` events. It's different from `ALERT` in a couple of ways. First, it instructs the editor to halt saving the record. And second, messages passed to `INVALID` are combined and displayed alongside the rest of the built-in validations like required fields, pattern validations, and min/max constraints. This allows custom validation logic to be displayed in a natural way to the end user as if it were a built-in validation.
 * @param {String} message The validation error message content for the alert
 * @example
 * // Displays an alert and stops the record from being saved
 * INVALID('Depth must be less than 20.');
 *
 * @example
 * // Use with the 'validate-record' event to stop a record from being saved
 * ON('validate-record', function (event) {
 *    if (NUM($depth) >= 20) {
 *      INVALID('Depth must be less than 20.');
 *    }
 * });
 *
 * @example
 * // Use with the 'validate-repeatable' event to stop a repeatable from being saved
 * ON('validate-repeatable', 'repeatable_field_name', function (event) {
 *    if (!ISSELECTED($choice_field, 'Purple')) {
 *      INVALID('You gotta pick purple!');
 *    }
 * });
 */
function INVALID() {}


////ISLANDSCAPE

/**
 * ISLANDSCAPE
 * Returns true if the photo or video is in landscape mode. This is intended to be used inside of the `add-photo` and `add-video` events and operate on the parameter passed to the event handler.
 * @param {Object} value The value of the photo or video
 * @returns {Boolean}
 */
function ISLANDSCAPE() {}


////ISPORTRAIT

/**
 * ISPORTRAIT
 * Returns true if the photo or video is in portrait mode. This is intended to be used inside of the `add-photo` and `add-video` events and operate on the parameter passed to the event handler.
 * @param {Object} value The value of the photo or video
 * @returns {Boolean}
 */
function ISPORTRAIT() {}


////MESSAGEBOX

/**
 * MESSAGEBOX
 * Display a message box with configurable title, message, buttons and optional text input.
 * MESSAGEBOX displays a message to the user. You can provide both the title and message of the alert box. Using the `buttons` parameter you can specify the button titles that are displayed in the message box.
 * @param {Object} options The options for the message box
 * @param {Function} callback invoked when the message box is dismissed
 * @example
 * MESSAGEBOX({title: 'Confirm', message: 'You have selected a critical safety violation. Are you sure?', buttons: ['Yes', 'No']}, function (result) {
 *   if (result.value === 'Yes') {
 *     // Selected Yes
 *   } else {
 *     // Selected No
 *   }
 * });
 */
function MESSAGEBOX() {}


////OFF

/**
 * OFF
 * Detaches an event handler set by ON.
 * @param {string} event The event name
 * @param {function} callback The function to detach
 * @example
 * OFF('validate-record', callback);
 *
 * // Detaches an event handler from the validate-record event
 * @example
 * OFF('validate-record');
 *
 * // Detaches all event handlers listening to the 'validate-record' event
 */
function OFF() {}


////ON

/**
 * ON
 * Attaches an event handler that listens for record, repeatable, or field events.
 * The ON function is the starting point for most data event scripts. It wires up an event to a function that gets called when that event happens. Events are things like a record being opened, edited, saved, validated, a field changing, or the record location changing. Using the `ON` function you can add custom logic to be performed when the events happen. The `ON` function by itself is not useful unless it's combined with the other data event functions to manipulate the record data and perform other actions like custom alerts and validations.
 * @param {string} event The event name
 * @param {function} callback The function to call when the specified event is triggered
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
function ON() {}


////OPENURL

/**
 * OPENURL
 * Open a URL for a website or mobile app.
 * OPENURL is for opening links from within a form. It can be used to open other mobile apps or websites within an event handler. You can use form fields to build the URL to open so the links can be derived from data already entered on the record.
 * @param {String} url The URL to open
 * @example
 * OPENURL('https://www.google.com/search?q=Fulcrum+Mobile+Solutions');
 *
 * // Opens a web browser to the specified address
 * @example
 * OPENURL('comgooglemaps://?q=Pizza&center=37.759748,-122.427135');
 *
 * // Opens google maps and searches for Pizza near a location
 * @example
 * OPENURL('mailto:clark.griswold@gmail.com?subject=turn+those+lights+off!&body=jk,+i+love+them.');
 *
 * // Opens an email client with a predefined subject and body
 * @example
 * if (PLATFORM() === 'iOS') {
 *   OPENURL('mailto:' + $field_1 + '?subject=' + encodeURIComponent($field_2) + '&body=' + encodeURIComponent($field_3));
 * } else {
 *   OPENURL('mailto:' + $field_1 + '?subject=' + $field_2 + '&body=' + $field_3);
 * }
 *
 * // Opens an email client with dynamic to address, subject, and body.
 * @example
 * ON('click', 'driving_directions', function(event) {
 *   OPENURL(encodeURI('https://maps.google.com/maps?daddr=' + $address.sub_thoroughfare + '+' + $address.thoroughfare + '+' + $address.locality + '+' + $address.admin_area + '+' + $address.postal_code));
 * });
 *
 * // Opens the Google Maps app and provides driving directions to address when the 'driving_directions' hyperlink field is clicked.
 */
function OPENURL() {}


////PROGRESS

/**
 * PROGRESS
 * Display a non-dismissible progress message in the mobile app.
 * PROGRESS displays a non-dismissible message that can be used to provide feedback when performing an asynchronous function. For example, while fetching data from an API using [REQUEST](/data-events/reference/request/) it might be desirable to let the user know that the request is in progress. This is an advanced function that requires thorough testing and error checking in your logic since the message is not dismissible by the user. To dismiss the progress message, call `PROGRESS();`.
 * @param {String} title A short title for the progress message
 * @param {String} message The message content for the progress alert
 * @example
 * var url = 'https://example.com';
 *
 * // show progress message while request is happening
 * PROGRESS('Searching for nearby facilities ...');
 *
 * REQUEST(url, function(error, response, body) {
 *   PROGRESS();
 *
 *   if (error) {
 *     ALERT(INSPECT(error));
 *   } else {
 *     // do something with the API response
 *   }
 * });
 *
 * // Displays an progress message that looks like this while the request is in progress
 * // +-------------------------------------------+
 * // | Searching for nearby facilities ...       |
 * // +-------------------------------------------+
 */
function PROGRESS() {}


////PROMPT

/**
 * PROMPT
 * Display a text field to get input from the user and a callback to respond to the result
 * @param {String} title A short title for the alert
 * @param {String} message The message content for the alert
 * @param {Function} callback invoked when the message box is dismissed
 * @example
 * PROMPT('Please enter the current year', function (result) {
 *   if (result.input === new Date().getFullYear()) {
 *     // Correct
 *   } else {
 *     // Incorrect
 *   }
 * });
 */
function PROMPT() {}


////REQUEST

/**
 * REQUEST
 * Performs an HTTP request and executes the callback on completion.
 * The REQUEST function is for making external HTTP requests. It's one of the most powerful data event functions and enables you to retrieve external data while filling out a form. It can be combined with the other functions to create very dynamic forms that populate information on-demand from external sources. It contains the necessary options to perform any HTTP request, including support for PUT, POST, etc and custom headers.
 *
 * ### CORS and Web Browser Support
 *
 * To work in the web browser, URLs fetched using REQUEST *require* HTTPS & [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing). This is not a limitation of Fulcrum - it's just the way modern web browsers work. Since Fulcrum is hosted on a secure website, all requests made from the site must also be secure and respond with the proper headers required by the browser. If you encounter CORS errors when trying to use an API with the REQUEST function, we recommend contacting the API provider and asking them to [add CORS support to their API](http://enable-cors.org). As a last resort, you can use a CORS proxy to proxy requests to URLs that don't support it. http://cors-anywhere.herokuapp.com/, http://cors-proxy.htmldriven.com/, and https://crossorigin.me are various CORS proxies. Note that these are not Fulcrum services. Please also note, when using CORS proxies you are effectively exposing everything about a network request to an unknown host. This should be especially considered if sending information like passwords, tokens, etc.
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
 * // This example looks up the place name from OpenStreetMap when the location changes and fills in a text
 * // field with the place name. Replace 'place_name' below with a text field on your form.
 *
 * ON('change-geometry', function(event) {
 *   var options = {
 *     url: 'https://nominatim.openstreetmap.org/search/' + LATITUDE() + ',' + LONGITUDE() + '?format=json&polygon=1&addressdetails=1'
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
function REQUEST() {}


////SETASSIGNMENT

/**
 * SETASSIGNMENT
 * Set the user assignment of a record
 *
 * *NOTE* This function currently only works within the web record editor. However, scripts should be prepared to handle it working on mobile in the future.
 * @param {String} userEmail The email address of the user, or `null` to unset it
 * @example
 * // Sets the user assignment
 * SETASSIGNMENT('test@example.com')
 */
function SETASSIGNMENT() {}


////SETCHOICEFILTER

/**
 * SETCHOICEFILTER
 * Filter the choices in a choice field or classification field.
 * The SETCHOICEFILTER function allows for dynamic filtering of the choice options on choice fields or classification fields. This function differs from [SETCHOICES](/data-events/reference/setchoices/) in that only filters the existing choices. That distinction is important because it allows you to maintain your choice options as choice lists and classification sets with label+value pairs and control the available options from data events without having to completely redefine the options with labels *and* values. Using `SETCHOICEFILTER` you can supply the filter to apply and it will keep the label and values already defined on the choice options. The filtering is applied to the value portion of the choices and uses case-insensitive "contains" comparison.
 *
 * *NOTE*: SETCHOICEFILTERS() will filter the top level choice options in a classification set.
 * @param {String} field The data name for the field
 * @param {String|Array|null} filter The string or strings to filter choices by
 * @example
 * // Filters the choices in the weather summary field to those that contain 'cat'
 * SETCHOICEFILTER('weather_summary', 'cat');
 *
 * @example
 * // Filters the choices in the weather summary field to those that contain 'cat' or 'dog'
 * SETCHOICEFILTER('weather_summary', ['cat', 'dog']);
 *
 * @example
 * // Unsets any filter previously set by SETCHOICEFILTER and applies no filter
 * SETCHOICEFILTER('weather_summary', null);
 */
function SETCHOICEFILTER() {}


////SETCHOICES

/**
 * SETCHOICES
 * Set the available choices for a choice field.
 * The SETCHOICES function allows for dynamic modification of the choice options on choice fields. For example, if you want to limit or completely replace the pick list options depending on other data scenarios on the form, you can use SETCHOICES to modify the options. Depending on what's required, it might be easier to use [SETCHOICEFILTER](/data-events/reference/setchoicefilter/), which is a similar function except it doesn't completely redefine the choices, it only applies a filter to them.
 *
 * The `choices` parameter can be in 3 possible formats. The first format is provided for simplicity, and the last 2 formats are for more sophisticated scenarios where you want control over the label and value properties of the choices. The examples below demonstrate all 3 formats.
 *
 * * Array of strings - simplest format, the label and value are the same
 * * Array of arrays - each choice item is an array in `[label, value]` order
 * * Array of objects - each object has a `label` and `value` attribute
 * @param {String} field The data name for the field
 * @param {Array|null} choices The choices for the choice field, or `null` to restore the original choices.
 * @example
 * choices = ['Rain', 'Hail', 'Snow', 'Graupel'];
 *
 * // Sets the available choices of the weather summary field to an array of values
 * SETCHOICES('weather_summary', choices);
 *
 * @example
 * choices = [
 *   ['Light Rain', 'light_rain'],
 *   ['Heavy Rain', 'heavy_rain']
 * ];
 *
 * // Sets the available choices of the weather summary field to an array of labels and values in [<label>, <value>] order
 * SETCHOICES('weather_summary', choices);
 *
 * @example
 * choices = [
 *   { label: 'Light Rain', value: 'light_rain' },
 *   { label: 'Heavy Rain', value: 'heavy_rain' }
 * ];
 *
 * // Sets the available choices of the weather summary field to an array of labels and values in an object containing "label" and "value" keys
 * SETCHOICES('weather_summary', choices);
 *
 * @example
 * // Unsets any override previously set by SETCHOICES and uses the original setting from the form schema
 * SETCHOICES('weather_summary', null);
 */
function SETCHOICES() {}


////SETDESCRIPTION

/**
 * SETDESCRIPTION
 * Set the description of a field.
 * @param {String} field The data name for the field
 * @param {String} value The value to set for the field's description, or `null` to restore the original description
 * @example
 * SETDESCRIPTION('weather_summary', 'Could not automatically fetch weather data. Briefly describe the current weather.');
 *
 * // Sets the description of a weather summary field
 */
function SETDESCRIPTION() {}


////SETFORMATTRIBUTES

/**
 * SETFORMATTRIBUTES
 * Configure specific device functionality and behaviors at the form level.
 * Allows you to configure specific device functionality and behaviors at the form level. These configuration options help you control what features the user has available, improving the workflow and data quality for that particular form. You can currently control the following:
 *
 * * Disable adding photos from the camera roll
 * * Force record to be sync’d upon save
 * * Control the minimum accuracy required for the GPS location
 * * Disable the ability to manually move the record location
 * * Disable the “Save as Draft” feature
 * * Control photo and video quality settings
 *
 * The following table contains the available properties that be set:
 *
 * {:.table.table-striped.event-table}
 * | Property | Type | Description | Default |
 * |----------|------|-------------|---------|
 * | `auto_sync_enabled` | boolean | auto-sync this record after saving | user-preference |
 * | `auto_location_enabled` | boolean | auto-populate the record location | true |
 * | `auto_location_minimum_accuracy` | integer | minimum accuracy in meters for the auto-populated location | 1500 |
 * | `manual_location_enabled` | boolean | allow manually changing the record location | true |
 * | `media_gallery_enabled` | boolean | allow media from the gallery or camera roll | true |
 * | `media_capture_enabled` | boolean | allow media from the camera | true |
 * | `photo_quality` | integer | maximum dimension of photos in pixels, or 'native' | user-preference |
 * | `video_quality` | string | video resolution, one of: 480p, 720p, 1080p, 2160p (device/platform dependent) | user-preference |
 * | `drafts_enabled` | boolean | allow saving record as a draft | true |
 * | `edit_locations_enabled` | boolean | track the locations of record edits | true |
 * | `edit_durations_enabled` | boolean | track the durations of record edits | true |
 *
 * @param {Object} config A configuration object with the following optional properties
 * @example
 * ON('load-record', function() {
 *   // This is just an example, it's not required to specify properties you don't want to override.
 *   var config = {
 *     auto_sync_enabled: true,
 *     auto_location_enabled: true,
 *     auto_location_minimum_accuracy: 10,
 *     manual_location_enabled: false,
 *     media_gallery_enabled: false,
 *     media_capture_enabled: true,
 *     photo_quality: '2048',
 *     video_quality: '720p',
 *     drafts_enabled: false,
 *     edit_locations_enabled: true,
 *     edit_durations_enabled: true
 *   };
 *
 *   SETFORMATTRIBUTES(config);
 * });
 */
function SETFORMATTRIBUTES() {}


////SETHIDDEN

/**
 * SETHIDDEN
 * Set the visibility of a field.
 * The SETHIDDEN function hides a form field. It can be used to add custom conditional logic above and beyond what can be configured in the Fulcrum builder. It has the same behavior as the 'Hidden' checkbox in the builder, except data is not automatically cleared out when hiding a field.
 * @param {String} field The data name for the field
 * @param {boolean|null} hidden Boolean value representing whether the field should be hidden, or `null` to restore the original value
 * @example
 * // Hides the weather summary field
 * SETHIDDEN('weather_summary', true);
 *
 * @example
 * // Shows the weather summary field
 * SETHIDDEN('weather_summary', false);
 *
 * @example
 * // Unsets any override previously set by SETHIDDEN and uses the original setting from the form schema
 * SETHIDDEN('weather_summary', null);
 */
function SETHIDDEN() {}


////SETINTERVAL

/**
 * SETINTERVAL
 * Repeatedly calls a function with a fixed time delay between each call.
 * The SETINTERVAL function can be used to repeatedly call a function at a specified interval. It's nearly identical to the web platform standard [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval).
 * @param {Function} function The function to execute at the interval
 * @param {Number} interval The number of milliseconds to delay between each call (e.g. 1000 is 1 second)
 * @returns {Number} interval ID that can be used to clear the interval with [CLEARINTERVAL](/data-events/reference/clearinterval/).
 * @example
 * ON('load-record', function(event) {
 *   var fiveSeconds = 1000 * 5;
 *
 *   SETINTERVAL(function() {
 *     if (CURRENTLOCATION()) {
 *       SETLABEL('accuracy', CURRENTLOCATION().accuracy);
 *     }
 *   }, fiveSeconds);
 * });
 *
 * // Set a field label to the current GPS accuracy every 5 seconds
 */
function SETINTERVAL() {}


////SETLABEL

/**
 * SETLABEL
 * Set the label of a field.
 * @param {String} field The data name for the field
 * @param {String|null} hidden The text for the field label, or `null` to restore the original label
 * @example
 * // Sets the field's label to 'Weather Report'
 * SETLABEL('weather_summary', 'Weather Report');
 *
 * @example
 * // Unsets any override previously set by SETLABEL and uses the original setting from the form schema
 * SETLABEL('weather_summary', null);
 */
function SETLABEL() {}


////SETLOCATION

/**
 * SETLOCATION
 * Set the location of a record.
 * @param {number} latitude The new latitude of the record
 * @param {number} longitude The new longitude of the record
 * @example
 * // Sets the location of a record
 * SETLOCATION(35.5946167, -80.8638915);
 */
function SETLOCATION() {}


////SETMAXLENGTH

/**
 * SETMAXLENGTH
 * Set the maximum length for a field.
 * The SETMAXLENGTH function can be used to set the maximum number of characters for a text field or the maximum count of repeatables, photos, videos, or audio files.
 * @param {String} field The data name for the field
 * @param {number|null} length The maximum length of the field
 * @example
 * SETMAXLENGTH('weather_summary', 25);
 *
 * // Sets the maximum length of the weather summary field to 25
 * @example
 * // Unsets any override previously set by SETMAXLENGTH and uses the original setting from the form schema
 * SETMAXLENGTH('weather_summary', null);
 */
function SETMAXLENGTH() {}


////SETMINLENGTH

/**
 * SETMINLENGTH
 * Set the minimum length for a field.
 * The SETMINLENGTH function can be used to set the minimum number of characters for a text field or the minimum count of repeatables, photos, videos, or audio files. Note that the minimum length is only enforced for non-empty fields. You must also make the field required to enforce the minimum length for empty fields.
 * @param {String} field The data name for the field
 * @param {number|null} length The minimum length of the field
 * @example
 * SETMINLENGTH('weather_summary', 25);
 *
 * // Sets the minimum length of the weather summary field to 25
 * @example
 * // Unsets any override previously set by SETMINLENGTH and uses the original setting from the form schema
 * SETMINLENGTH('weather_summary', null);
 */
function SETMINLENGTH() {}


////SETPROJECT

/**
 * SETPROJECT
 * Set the project of a record.
 * @param {String} project The project name, or `null` to clear the project
 * @example
 * // Sets the project of a record
 * SETPROJECT('Bells Crossing Phase 3');
 */
function SETPROJECT() {}


////SETREADONLY

/**
 * SETREADONLY
 * Sets a field to be read-only or editable.
 * @param {String} field The data name
 * @param {boolean|null} readOnly Boolean value representing whether the field should be read-only, or `null` to restore the original state
 * @example
 * SETREADONLY('weather_summary', true);
 *
 * // Sets the field to read only, not editable by the user
 * @example
 * SETREADONLY('weather_summary', false);
 *
 * // Sets the field to be active, editable by the user
 * @example
 * SETREADONLY('weather_summary', null);
 *
 * // Unsets any override previously set by SETREADONLY and uses the original setting from the form schema
 */
function SETREADONLY() {}


////SETREQUIRED

/**
 * SETREQUIRED
 * Set whether or not a field is required.
 * @param {String} field The data name for the field
 * @param {boolean|null} required Boolean value representing whether the field should be required, or `null` to restore the original state
 * @example
 * // Sets the weather summary field as required
 * SETREQUIRED('weather_summary', true);
 *
 * @example
 * // Sets the weather summary field as not required
 * SETREQUIRED('weather_summary', false);
 *
 * @example
 * // Unsets any override previously set by SETREQUIRED and uses the original setting from the form schema
 * SETREQUIRED('weather_summary', null);
 */
function SETREQUIRED() {}


////SETSTATUS

/**
 * SETSTATUS
 * Set the status of a record.
 * @param {String} status The status value for the record. Must be a valid status option!
 * @example
 * // Sets the status of a record
 * SETSTATUS('inspection_pending');
 */
function SETSTATUS() {}


////SETSTATUSHIDDEN

/**
 * SETSTATUSHIDDEN
 * Set the visibility of the status field.
 * @param {boolean|null} hidden Boolean value representing whether the field should be hidden, or `null` to restore the original value
 * @example
 * SETSTATUSHIDDEN(true);
 *
 * // Sets the status field to be hidden
 */
function SETSTATUSHIDDEN() {}


////SETSTATUSREADONLY

/**
 * SETSTATUSREADONLY
 * Sets the status field to be read-only or editable.
 * @param {boolean|null} readOnly Boolean value representing whether the field should be read-only, or `null` to restore the original state
 * @example
 * SETSTATUSREADONLY(true);
 *
 * // Sets the status field to read only, not editable by the user
 */
function SETSTATUSREADONLY() {}


////SETSTATUSFILTER

/**
 * SETSTATUSFILTER
 * Set the allowable status values for a record.
 * The SETSTATUSFILTER function allows for dynamic filtering of the available status options. This is similar to [SETCHOICEFILTER](/data-events/reference/setchoicefilter/) except it operates on the status field. Using this function it's possible to change the available status options by user role or any other data conditions on record.
 * @param {Array|null} statuses The allowable status values for the record, or `null` to restore the original options
 * @example
 * // Sets the allowable status values for the record to be 'inspection_pending' or 'in_inspection'
 * SETSTATUSFILTER(['inspection_pending', 'in_inspection']);
 *
 * @example
 * // Unsets any previous status filters and allows any status to be selected for the record
 * SETSTATUSFILTER(null);
 *
 * @example
 * // Sets the allowable status values for the record to be 'inspection_pending' or 'in_inspection' for Standard Users
 * ON('load-record', function(event) {
 *   if (ROLE() === 'Standard User') {
 *     SETSTATUSFILTER(['inspection_pending', 'in_inspection']);
 *   }
 * });
 */
function SETSTATUSFILTER() {}


////SETTIMEOUT

/**
 * SETTIMEOUT
 * Calls a function after a specified delay.
 * The SETTIMEOUT function can be used to delay execution of a function for a specified amount of time. It's nearly identical to the web platform standard [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout).
 * @param {Function} function The function to execute after the delay
 * @param {Number} delay The number of milliseconds to delay (e.g. 1000 is 1 second)
 * @returns {Number} timer ID that can be used to clear the timeout with [CLEARTIMEOUT](/data-events/reference/cleartimeout/)
 * @example
 * ON('load-record', function(event) {
 *   var fiveMinutes = 1000 * 60 * 5;
 *
 *   SETTIMEOUT(function() {
 *     ALERT("You've been editing this record for 5 minutes.");
 *   }, fiveMinutes);
 * });
 */
function SETTIMEOUT() {}


////SETVALUE

/**
 * SETVALUE
 * Set the value of a field.
 * @param {String} field The data name for the field to set
 * @param {String} value The value to set for the field, or `null` to clear the value
 * @example
 * // Sets the value of a weather summary field
 * SETVALUE('text_field', 'A Text Value');
 *
 * @example
 * // Sets the value of a time field
 * SETVALUE('time_field', '16:00');
 *
 * @example
 * // Sets the value of a date field
 * SETVALUE('date_field', '2016-04-28');
 *
 * @example
 * // Sets the value of a single choice field
 * SETVALUE('choice_field', 'red');
 *
 * @example
 * // Sets the value of a multiple choice field
 * SETVALUE('multiple_choice_field', ['red', 'green', 'blue']);
 *
 * @example
 * // Sets the value of a classification field to level1 > level2 > level3
 * SETVALUE('classification_field', ['level1', 'level2', 'level3']);
 *
 * @example
 * // Sets the value of a yes/no field
 * SETVALUE('yes_no_field', 'yes');
 *
 * @example
 * // Sets the value of an address field
 * var address = {
 *   sub_thoroughfare: '360',
 *   thoroughfare: 'Central Avenue',
 *   suite: '200',
 *   locality: 'St. Petersburg',
 *   sub_admin_area: 'Pinellas',
 *   admin_area: 'FL',
 *   postal_code: '33701',
 *   country: 'US'
 * };
 *
 * SETVALUE('address_field', address);
 *
 * @example
 * // Sets the value of a record link field
 * SETVALUE('record_link_field', ['fulcrum_id_1', 'fulcrum_id_2']);
 */
function SETVALUE() {}


////STORAGE

/**
 * STORAGE
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
function STORAGE() {}

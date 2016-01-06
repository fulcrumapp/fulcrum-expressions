////ALERT

/**
 * ALERT
 * Display a message as an alert in the mobile app.
 * @param {String} title A short title for the alert.
 * @param {String} message The message content for the alert.
 * @returns {null}
 * @example
 * ALERT('Warning!', 'A depth of 98 feet is high. Are you sure?')
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


////PROGRESS

/**
 * PROGRESS
 * Display a non-dismissible progress message in the mobile app.
 * @param {String} title A short title for the progress message.
 * @param {String} message The message content for the progress alert.
 * @returns {null}
 * @example
 * PROGRESS('Just a sec!', 'Searching for nearby facilities ...')
 * // Displays an progress message that looks like
 * // +-------------------------------------------+
 * // | Just a sec!                               |
 * // +-------------------------------------------|
 * // |                                           |
 * // | Searching for nearby facilities ...       |
 * // |                                           |
 * // +-------------------------------------------+
 * @example
 * // Call with no parameters to dismiss the progress message.
 * PROGRESS()
 */
function PROGRESS() {}

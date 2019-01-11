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
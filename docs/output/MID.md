## MID

Returns a segment of a string value.

### Parameters
`value` : String (required) - The string to extract a segment from.

`start_position` : Number (required) - Index from the left of the string from which to begin extracting. First character is index `1`.

`number_of_characters` : Number (required) - Number of characters to extract.

### Returns
String

### Examples
```
// returns iOS
MID("Fulcrum for iOS", 13, 3)
```
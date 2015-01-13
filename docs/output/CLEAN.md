##CLEAN

Returns the text with the non-printable ASCII characters removed.

### Parameters
`text` : String (required) - The text whose non-printable characters are to be removed.

### Returns
String

### Examples
```
// returns Test
CLEAN('Test' + CHAR(31))
```
## ROUND

Rounds a number to a specified number of decimal places according to standard rounding rules.

### Parameters
`value` : Number (required) - The value to be rounded to `places`.

`places` : Number (required) - The number of decimal places to which to round `value`.

### Returns
Number

### Examples
```
// returns 179.8
ROUND(179.848, 1)
```

```
// returns 900
ROUND(918.268, -2)
```
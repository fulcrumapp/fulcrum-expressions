## AND

Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are logically false.

### Parameters
`var_args_expressions` : * (required) - An expression or reference that represents some logical value, i.e. TRUE or FALSE, or an expression that can be converted to a logical value.

### Returns
Boolean

### Examples
```
// returns false
AND(1, 0, false)
```

```
// returns true
AND(3 + 3 == 6, 10 + 2 == 12)
```
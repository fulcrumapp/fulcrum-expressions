## OR

Returns `true` if any of the provided arguments are logically true, and `false` if all of the provided arguments are logically false.

### Parameters
`var_args_expressions` : * (required) - An expression or reference that represents some logical value, i.e. `true` or `false`, or an expression that can be converted to a logical value.

### Returns
Boolean

### Examples
```
// returns true
OR(true, true, false)
```

```
// returns false
OR(ISEVEN(5),ISODD(6))
```
## OR

Returns `true` if any of the provided arguments are logically true, and `false` if all of the provided arguments are logically false.

### Parameters
`value` : Boolean (required) - Expression(s) or value(s) representing a logical value (`true` or `false`).

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
## COALESCE

Returns the first parameter whose value exists

### Parameters
`parameters` : * (required) - The value to return if it exists

### Returns
* - The first parameter that exists 

### Examples
```
// returns Test
COALESCE(null, null, 'Test', 1)
```

```
// returns 1
COALESCE(1, null, null)
```

```
// returns null
COALESCE(null, null, null)
```
## DATEADD

Adds a number of days to a given date

### Parameters
`date` : Date (required) - date

`days` : Number (required) - the number of days to add

### Returns
Date

### Examples
```
// returns 2015-01-11
DATEADD('2015-01-01', 10)
```

```
// returns 2015-05-01
DATEADD('2015-01-31', 90)
```
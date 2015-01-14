## DATEADD

Adds a number of days to a given date

### Parameters
`date` : Date (required) - date

`days` : Number (required) - the number of days to add

### Returns
Date

### Examples
```
// returns Sun Jan 11 2015 00:00:00 GMT-0500 (EST)
DATEADD('2015-01-01', 10)
```

```
// returns Fri May 01 2015 01:00:00 GMT-0400 (EDT)
DATEADD('2015-01-31', 90)
```
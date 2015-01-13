## REPEATABLEVALUES

Return a specific field from multiple repeatable items

### Parameters
`repeatableVariable` : Object (required) - The repeatable field variable

`repeatableDataName` : String (required) - The data name of the repeatable field for `repeatableVariable`

`dataName` : String (required) - The data name of the field to extract from each repeatable item

### Returns
Array - An array of values of the `dataName` field from each item 

### Examples
```
// returns [1,2,3]
REPEATABLEVALUES($repeatable_field, 'items', 'cost')
```
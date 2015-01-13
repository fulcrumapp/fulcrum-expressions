## REPEATABLESUM

Return the sum of a specific numeric field across multiple repeatable items

### Parameters
`repeatableVariable` : Object (required) - The repeatable field variable

`repeatableDataName` : String (required) - The data name of the repeatable field for `repeatableVariable`

`dataName` : String (required) - The data name of the field to extract from each repeatable item

### Returns
Number - The sum of the `dataName` field within each repeatable item 

### Examples
```
// returns 6
REPEATABLESUM($repeatable_field, 'items', 'cost')
```
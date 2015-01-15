## SEARCH

Returns the position at which a specified string is first found within a block of text. Ignores case.

### Parameters
`search_for` : String (required) - String to search for within `text_to_search`.

`text_to_search` : String (required) - Text to search for the first instance of `search_for`.

`starting_at` : Number (required) - argument Position index to begin the search.

### Returns
Number

### Examples
```
// returns 37
SEARCH("collect", "Data analysts love Fulcrum for data collection needs", 12)
```
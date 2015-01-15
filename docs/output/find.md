---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | FIND"
description: "FIND"
developer: true
permalink: /developers/expressions/find/
---

## FIND

Returns the position at which a string is first found within text, case-sensitive.

### Parameters
`search_for` : String (required) - String to search for within `text_to_search`.

`text_to_search` : String (required) - Text to search for the first instance of `search_for`.

`starting_at` : Number (required) - argument Position index to begin the search.

### Returns
Number

### Examples
```
// returns 15
FIND("haystack", "Needle in the haystack")
```
---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | LEFT"
description: "LEFT"
developer: true
permalink: /developers/expressions/left/
---

## LEFT

Returns a substring from the beginning of a given string.

### Parameters
`value` : String (required) - The string value from which the left portion will be returned.

`number_of_characters` : Number (optional)  [default = 1] - The number of characters to return from the left side of the string.

### Returns
String

### Examples
```
// returns Ful
LEFT("Fulcrum", 3)
```

```
// returns F
LEFT("Fulcrum")
```
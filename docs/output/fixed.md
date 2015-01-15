---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | FIXED"
description: "FIXED"
developer: true
permalink: /developers/expressions/fixed/
---

## FIXED

Formats a number with a fixed number of decimal places.

### Parameters
`value` : Number (required) - Number to format.

`number_of_places` : Number (required) - Number of decimal places to display in the result.

`value` : Boolean (required) - Whether or not to suppress the thousands separator.

### Returns
String

### Examples
```
// returns 3000.14
FIXED(3000.141592, 2, true)
```

```
// returns 6,276.222
FIXED(6276.22241, 3, false)
```
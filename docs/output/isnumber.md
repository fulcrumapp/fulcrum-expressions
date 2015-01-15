---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | ISNUMBER"
description: "ISNUMBER"
developer: true
permalink: /developers/expressions/isnumber/
---

## ISNUMBER

Tests whether a value is a number.

### Parameters
`value` : Number (required) - The value to be verified as a number.

### Returns
Boolean

### Examples
```
// returns true
ISNUMBER(10)
```

```
// returns false
ISNUMBER("Some text")
```
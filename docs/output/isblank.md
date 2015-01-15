---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | ISBLANK"
description: "ISBLANK"
developer: true
permalink: /developers/expressions/isblank/
---

## ISBLANK

Checks whether the field's value is empty.

### Parameters
`value` : String (required) - Field value to check.

### Returns
Boolean

### Examples
```
// returns true
ISBLANK("")
```

```
// returns false
ISBLANK("Test")
```
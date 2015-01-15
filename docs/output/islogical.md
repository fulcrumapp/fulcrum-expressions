---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | ISLOGICAL"
description: "ISLOGICAL"
developer: true
permalink: /developers/expressions/islogical/
---

## ISLOGICAL

Checks whether a value is `true` or `false`.

### Parameters
`value` : String (required) - The value to be verified as `true` or `false`.

### Returns
Boolean

### Examples
```
// returns true
ISLOGICAL(true)
```

```
// returns false
ISLOGICAL("Text")
```
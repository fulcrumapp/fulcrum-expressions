---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | ISTEXT"
description: "ISTEXT"
developer: true
permalink: /developers/expressions/istext/
---

## ISTEXT

Checks whether a value is text.

### Parameters
`value` : String (required) - The value to test as text.

### Returns
Boolean

### Examples
```
// returns true
ISTEXT("Text")
```

```
// returns false
ISTEXT(4)
```
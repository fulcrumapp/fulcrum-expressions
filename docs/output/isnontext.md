---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | ISNONTEXT"
description: "ISNONTEXT"
developer: true
permalink: /developers/expressions/isnontext/
---

## ISNONTEXT

Tests whether a value is non-textual.

### Parameters
`value` : String (required) - The value to test as non-text.

### Returns
Boolean

### Examples
```
// returns true
ISNONTEXT(4)
```

```
// returns false
ISNONTEXT("Some text")
```
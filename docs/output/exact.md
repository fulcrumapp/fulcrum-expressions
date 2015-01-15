---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | EXACT"
description: "EXACT"
developer: true
permalink: /developers/expressions/exact/
---

## EXACT

Tests whether two strings are identical.

### Parameters
`value` : String (required) - First string to compare.

`value` : String (required) - Second string to compare.

### Returns
Boolean

### Examples
```
// returns true
EXACT("String 1", "String 1")
```

```
// returns false
EXACT("String 1", "Another String")
```

```
// returns true
EXACT(4,4)
```
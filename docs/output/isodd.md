---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | ISODD"
description: "ISODD"
developer: true
permalink: /developers/expressions/isodd/
---

## ISODD

Checks whether the provided value is an odd number.

### Parameters
`value` : Number (required) - The value to be verified as odd.

### Returns
Boolean

### Examples
```
// returns false
ISODD(4)
```

```
// returns true
ISODD(5)
```

```
// returns true
ISODD(3.12)
```
---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | CEILING"
description: "CEILING"
developer: true
permalink: /developers/expressions/ceiling/
---

## CEILING

Rounds a number up to the nearest integer multiple of specified significance.

### Parameters
`value` : Number (required) - The value to round up to the nearest integer multiple of factor.

`factor` : Number (optional)  [default = 1] - The number to whose multiples value will be rounded.

### Returns
Number

### Examples
```
// returns 139.9
CEILING(139.85, 0.1)
```

```
// returns 140
CEILING(139.001)
```
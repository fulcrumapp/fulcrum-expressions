---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | FLOOR"
description: "FLOOR"
developer: true
permalink: /developers/expressions/floor/
---

## FLOOR

Rounds a number down to the nearest integer multiple of specified significance.

### Parameters
`value` : Number (required) - Number to round down.

`significance` : Number (required) - The number to whose multiples `value` will be rounded.

### Returns
Number

### Examples
```
// returns 126
FLOOR(126.25, 1)
```

```
// returns 120
FLOOR(126.25, 10)
```
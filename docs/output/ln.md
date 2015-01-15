---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | LN"
description: "LN"
developer: true
permalink: /developers/expressions/ln/
---

## LN

Returns the the logarithm of a number, base `e` (Euler's number).

### Parameters
`value` : Number (required) - The value for which to calculate the logarithm, base `e`. Must be a positive number.

### Returns
Number

### Examples
```
// returns 1.6094379124341003
LN(5)
```

```
// returns NaN
LN("Test")
```
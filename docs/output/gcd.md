---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | GCD"
description: "GCD"
developer: true
permalink: /developers/expressions/gcd/
---

## GCD

Returns the greatest common divisor of one or more integers.

### Parameters
`var_args_values` : Number (required) - Value(s) to consider to calculate the greatest common divisor.

### Returns
Number

### Examples
```
// returns 1
GCD(5, 9)
```

```
// returns 7
GCD(14, 21, 42)
```
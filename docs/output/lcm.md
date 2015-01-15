---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | LCM"
description: "LCM"
developer: true
permalink: /developers/expressions/lcm/
---

## LCM

Returns the least common multiple of one or more integers.

### Parameters
`var_args_values` : Number (required) - Value(s) to consider to calculate the least common multiple.

### Returns
Number

### Examples
```
// returns 10
LCM(2, 5)
```

```
// returns 660
LCM(5, 22, 12)
```
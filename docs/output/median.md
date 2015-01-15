---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | MEDIAN"
description: "MEDIAN"
developer: true
permalink: /developers/expressions/median/
---

## MEDIAN

Returns the median value in a set of numeric values.

### Parameters
`var_args_values` : Number (required) - Values in which to find the median value.

### Returns
Number

### Examples
```
// returns 15
MEDIAN(15,2,9,67,22)
```

```
// returns 4
MEDIAN(1,10,4)
```
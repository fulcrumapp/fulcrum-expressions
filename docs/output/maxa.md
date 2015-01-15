---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | MAXA"
description: "MAXA"
developer: true
permalink: /developers/expressions/maxa/
---

## MAXA

Returns the maximum numeric value in a given set of values.

### Parameters
`var_args_values` : Number (required) - Values in which to find the maximum numeric value.

### Returns
Number

### Examples
```
// returns 10
MAXA([3, 4, -6, '10'])
```
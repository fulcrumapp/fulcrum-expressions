---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | MINA"
description: "MINA"
developer: true
permalink: /developers/expressions/mina/
---

## MINA

Returns the minimum numeric value in a given set of values.

### Parameters
`var_args_values` : Number (required) - Values in which to find the minumum numeric value.

### Returns
Number

### Examples
```
// returns -6
MINA([3, 4, -6, '10'])
```
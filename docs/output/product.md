---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | PRODUCT"
description: "PRODUCT"
developer: true
permalink: /developers/expressions/product/
---

## PRODUCT

Returns the result of multiplying a series of numbers together.

### Parameters
`var_args_values` : Number (required) - Values to multiply together.

### Returns
Number

### Examples
```
// returns 216
PRODUCT(4, 18, 3)
```

```
// returns 0
PRODUCT(23, 5, 0)
```
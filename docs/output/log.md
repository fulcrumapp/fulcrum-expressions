---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | LOG"
description: "LOG"
developer: true
permalink: /developers/expressions/log/
---

## LOG

Returns the the logarithm of a number given a base.

### Parameters
`value` : Number (required) - The value for which to calculate the logarithm given `base`.

`base` : Number (optional)  [default = 10] - The base to use for the logarithm calculation.

### Returns
Number

### Examples
```
// returns 2.8613531161467867
LOG(100, 5)
```

```
// returns 2
LOG(100)
```
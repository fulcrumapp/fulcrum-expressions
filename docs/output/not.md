---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | NOT"
description: "NOT"
developer: true
permalink: /developers/expressions/not/
---

## NOT

Returns the opposite of a logical value - `NOT(true)` returns `false`; `NOT(false)` returns `true`.

### Parameters
`value` : Boolean (required) - The expression or value representing a logical value (`true` or `false`).

### Returns
Boolean

### Examples
```
// returns true
NOT(false)
```

```
// returns false
NOT(5)
```
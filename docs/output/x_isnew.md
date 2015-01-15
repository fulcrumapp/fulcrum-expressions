---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | X_ISNEW"
description: "X_ISNEW"
developer: true
permalink: /developers/expressions/x_isnew/
---

## X_ISNEW

Returns a boolean indicating whether the current feature (record or repeatable item) is new. It returns false if it's being updated.

### Parameters
No parameters

### Returns
Boolean

### Examples
```
// returns true
X_ISNEW()
```
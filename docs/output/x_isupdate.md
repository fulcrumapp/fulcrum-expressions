---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | X_ISUPDATE"
description: "X_ISUPDATE"
developer: true
permalink: /developers/expressions/x_isupdate/
---

## X_ISUPDATE

Returns a boolean indicating whether the current feature (record or repeatable item) is being updated. It returns false if it's a new record.

### Parameters
No parameters

### Returns
Boolean

### Examples
```
// returns false
X_ISUPDATE()
```
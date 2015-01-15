---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | CONCATENATE"
description: "CONCATENATE"
developer: true
permalink: /developers/expressions/concatenate/
---

## CONCATENATE

Returns the concatenation of multiple values.

### Parameters
`var_args_values` : String (required) - Strings to append in sequence.

### Returns
String

### Examples
```
// returns This is a sentence.
CONCATENATE("This ", "is ", "a ", "sentence.")
```

```
// returns 42311
CONCATENATE(42, 31, 1)
```

```
// returns Age is 42
CONCATENATE("Age ", "is ", 42)
```
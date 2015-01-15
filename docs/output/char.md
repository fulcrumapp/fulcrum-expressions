---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | CHAR"
description: "CHAR"
developer: true
permalink: /developers/expressions/char/
---

## CHAR

Convert a number into a character according to the current Unicode table.

### Parameters
`number` : Number (required) - The number of the character to look up from the current Unicode table in decimal format.

### Returns
String

### Examples
```
// returns A
CHAR(65)
```

```
// returns Թ
CHAR(1337)
```
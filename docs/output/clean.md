---
layout: docs
category: expressions
section: developers
class: docs
title: "Developers | Expressions | CLEAN"
description: "CLEAN"
developer: true
permalink: /developers/expressions/clean/
---

## CLEAN

Returns the text with the non-printable ASCII characters removed.

### Parameters
`text` : String (required) - The text whose non-printable characters are to be removed.

### Returns
String

### Examples
```
// returns Test
CLEAN('Test' + CHAR(31))
```